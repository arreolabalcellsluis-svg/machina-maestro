import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function BannerSettings() {
  const [bannerUrl, setBannerUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBanner();
  }, []);

  const loadBanner = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "equipos_banner_image")
      .single();
    if (data?.value) setBannerUrl(data.value);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `banners/equipos-banner.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("product-media")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ variant: "destructive", title: "Error al subir imagen", description: uploadError.message });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("product-media").getPublicUrl(path);
    setBannerUrl(urlData.publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: bannerUrl, updated_at: new Date().toISOString() })
      .eq("key", "equipos_banner_image");

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Banner actualizado correctamente" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Banner de Catálogo de Equipos</h2>

      {bannerUrl && (
        <div className="relative h-40 rounded-lg overflow-hidden border">
          <img src={bannerUrl} alt="Banner preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="text-white font-bold text-lg">Vista previa del banner</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Subir imagen</Label>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 cursor-pointer border rounded-md px-4 py-2 hover:bg-muted transition-colors">
            <Upload className="h-4 w-4" />
            <span className="text-sm">{uploading ? "Subiendo..." : "Seleccionar archivo"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>O pegar URL de imagen</Label>
        <Input
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? "Guardando..." : "Guardar Banner"}
      </Button>
    </div>
  );
}
