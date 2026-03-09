import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import { ArrowLeft, Upload, X, Plus, FileText } from "lucide-react";

interface Props {
  product?: Product;
  onClose: () => void;
  onSaved: () => void;
}

const CATEGORIAS = [
  "Elevadores automotrices",
  "Desmontadoras de llantas",
  "Balanceadoras de llantas",
  "Alineadoras",
  "Compresores de aire",
  "Equipo hidráulico",
  "Equipo de lubricación",
  "Equipo de diagnóstico",
  "Otros",
];

export default function ProductForm({ product, onClose, onSaved }: Props) {
  const isEditing = !!product;
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  // Form state
  const [nombre, setNombre] = useState(product?.nombre || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [sku, setSku] = useState(product?.sku || "");
  const [marca, setMarca] = useState(product?.marca || "REDBUCK");
  const [modelo, setModelo] = useState(product?.modelo || "");
  const [categoria, setCategoria] = useState(product?.categoria || CATEGORIAS[0]);
  const [subcategoria, setSubcategoria] = useState(product?.subcategoria || "");
  const [descripcionCorta, setDescripcionCorta] = useState(product?.descripcionCorta || "");
  const [descripcionComercial, setDescripcionComercial] = useState(product?.descripcionComercial || "");
  const [caracteristicas, setCaracteristicas] = useState<string[]>(product?.caracteristicas || [""]);
  const [beneficios, setBeneficios] = useState<string[]>(product?.beneficios || [""]);
  const [aplicaciones, setAplicaciones] = useState<string[]>(product?.aplicaciones || [""]);
  const [especificaciones, setEspecificaciones] = useState<{ key: string; value: string }[]>(
    product?.especificaciones
      ? Object.entries(product.especificaciones).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );
  const [imagenPrincipal, setImagenPrincipal] = useState(product?.imagenPrincipal || "");
  const [galeria, setGaleria] = useState<string[]>(product?.galeria || []);
  const [fichaTecnicaPdf, setFichaTecnicaPdf] = useState(product?.fichaTecnicaPdf || "");
  const [videoOpcional, setVideoOpcional] = useState(product?.videoOpcional || "");
  const [garantia, setGarantia] = useState(product?.garantia || "");
  const [instalacion, setInstalacion] = useState(product?.instalacion || "");
  const [destacado, setDestacado] = useState(product?.destacado || false);
  const [activo, setActivo] = useState(product?.activo ?? true);
  const [refaccionesRelacionadas, setRefaccionesRelacionadas] = useState<string[]>(
    product?.refaccionesRelacionadas || [""]
  );

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleNombreChange = (val: string) => {
    setNombre(val);
    if (!isEditing || slug === generateSlug(product?.nombre || "")) {
      setSlug(generateSlug(val));
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-media").upload(fileName, file, { upsert: true });
    if (error) {
      toast({ variant: "destructive", title: "Error al subir archivo", description: error.message });
      return null;
    }
    const { data } = supabase.storage.from("product-media").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const url = await uploadFile(file, "productos");
    if (url) setImagenPrincipal(url);
    setUploadingImage(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploadingImage(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "productos");
      if (url) urls.push(url);
    }
    setGaleria(prev => [...prev, ...urls]);
    setUploadingImage(false);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdf(true);
    const url = await uploadFile(file, "fichas-tecnicas");
    if (url) setFichaTecnicaPdf(url);
    setUploadingPdf(false);
  };

  const removeGalleryImage = (index: number) => {
    setGaleria(prev => prev.filter((_, i) => i !== index));
  };

  const handleArrayChange = (arr: string[], setArr: (v: string[]) => void, index: number, value: string) => {
    const updated = [...arr];
    updated[index] = value;
    setArr(updated);
  };

  const addArrayItem = (arr: string[], setArr: (v: string[]) => void) => {
    setArr([...arr, ""]);
  };

  const removeArrayItem = (arr: string[], setArr: (v: string[]) => void, index: number) => {
    if (arr.length <= 1) return;
    setArr(arr.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!nombre.trim() || !slug.trim() || !categoria.trim()) {
      toast({ variant: "destructive", title: "Campos requeridos", description: "Nombre, slug y categoría son obligatorios." });
      return;
    }

    setSaving(true);

    const specs: Record<string, string> = {};
    especificaciones.forEach(s => { if (s.key.trim()) specs[s.key.trim()] = s.value.trim(); });

    const payload = {
      nombre: nombre.trim(),
      slug: slug.trim(),
      sku: sku.trim() || null,
      marca: marca.trim() || null,
      modelo: modelo.trim() || null,
      categoria: categoria.trim(),
      subcategoria: subcategoria.trim() || null,
      descripcion_corta: descripcionCorta.trim() || null,
      descripcion_comercial: descripcionComercial.trim() || null,
      caracteristicas: caracteristicas.filter(c => c.trim()),
      beneficios: beneficios.filter(b => b.trim()),
      aplicaciones: aplicaciones.filter(a => a.trim()),
      especificaciones: specs,
      imagen_principal: imagenPrincipal.trim() || null,
      galeria: galeria.filter(g => g.trim()),
      ficha_tecnica_pdf: fichaTecnicaPdf.trim() || null,
      video_opcional: videoOpcional.trim() || null,
      garantia: garantia.trim() || null,
      instalacion: instalacion.trim() || null,
      refacciones_relacionadas: refaccionesRelacionadas.filter(r => r.trim()),
      destacado,
      activo,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (isEditing) {
      ({ error } = await supabase.from("products").update(payload).eq("id", product!.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: isEditing ? "Producto actualizado" : "Producto creado" });
      onSaved();
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose}><ArrowLeft className="h-4 w-4 mr-2" /> Volver</Button>
        <h2 className="text-2xl font-bold">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h2>
      </div>

      {/* Basic Info */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Información Básica</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre *</Label>
            <Input value={nombre} onChange={e => handleNombreChange(e.target.value)} placeholder="Elevador de 2 Postes 4T" />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL) *</Label>
            <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="elevador-2-postes-4t" />
          </div>
          <div className="space-y-2">
            <Label>SKU</Label>
            <Input value={sku} onChange={e => setSku(e.target.value)} placeholder="RB-EL2P-4T" />
          </div>
          <div className="space-y-2">
            <Label>Marca</Label>
            <Input value={marca} onChange={e => setMarca(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Modelo</Label>
            <Input value={modelo} onChange={e => setModelo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Categoría *</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Subcategoría</Label>
            <Input value={subcategoria} onChange={e => setSubcategoria(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-6 pt-2">
          <div className="flex items-center gap-2">
            <Switch checked={activo} onCheckedChange={setActivo} />
            <Label>Activo</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={destacado} onCheckedChange={setDestacado} />
            <Label>Destacado</Label>
          </div>
        </div>
      </section>

      {/* Descriptions */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Descripciones</h3>
        <div className="space-y-2">
          <Label>Descripción Corta</Label>
          <Textarea value={descripcionCorta} onChange={e => setDescripcionCorta(e.target.value)} rows={2} />
        </div>
        <div className="space-y-2">
          <Label>Descripción Comercial</Label>
          <Textarea value={descripcionComercial} onChange={e => setDescripcionComercial(e.target.value)} rows={4} />
        </div>
      </section>

      {/* Images */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Imágenes</h3>

        <div className="space-y-2">
          <Label>Imagen Principal</Label>
          <div className="flex gap-4 items-start">
            {imagenPrincipal && (
              <div className="h-32 w-32 rounded border bg-muted flex items-center justify-center overflow-hidden relative group">
                <img src={imagenPrincipal} alt="" className="h-full w-full object-contain" />
                <button onClick={() => setImagenPrincipal("")} className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer border rounded-md px-4 py-2 hover:bg-muted transition-colors text-sm">
                <Upload className="h-4 w-4" />
                {uploadingImage ? "Subiendo..." : "Subir imagen"}
                <input type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} disabled={uploadingImage} />
              </label>
              <Input
                placeholder="O pegar URL..."
                value={imagenPrincipal}
                onChange={e => setImagenPrincipal(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Galería de Imágenes</Label>
          <div className="flex flex-wrap gap-3">
            {galeria.map((img, i) => (
              <div key={i} className="h-24 w-24 rounded border bg-muted flex items-center justify-center overflow-hidden relative group">
                <img src={img} alt="" className="h-full w-full object-contain" />
                <button onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <label className="h-24 w-24 rounded border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
              <Plus className="h-6 w-6 text-muted-foreground" />
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} disabled={uploadingImage} />
            </label>
          </div>
        </div>
      </section>

      {/* Technical Sheet */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Ficha Técnica (PDF)</h3>
        <div className="flex items-center gap-4">
          {fichaTecnicaPdf && (
            <a href={fichaTecnicaPdf} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary underline text-sm">
              <FileText className="h-4 w-4" /> Ver ficha actual
            </a>
          )}
          <label className="flex items-center gap-2 cursor-pointer border rounded-md px-4 py-2 hover:bg-muted transition-colors text-sm">
            <Upload className="h-4 w-4" />
            {uploadingPdf ? "Subiendo..." : "Subir PDF"}
            <input type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} disabled={uploadingPdf} />
          </label>
          {fichaTecnicaPdf && (
            <Button variant="ghost" size="sm" onClick={() => setFichaTecnicaPdf("")}>
              <X className="h-4 w-4" /> Quitar
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <Label>Video (URL opcional)</Label>
          <Input value={videoOpcional} onChange={e => setVideoOpcional(e.target.value)} placeholder="https://youtube.com/..." />
        </div>
      </section>

      {/* Characteristics */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Características</h3>
        {caracteristicas.map((c, i) => (
          <div key={i} className="flex gap-2">
            <Input value={c} onChange={e => handleArrayChange(caracteristicas, setCaracteristicas, i, e.target.value)} placeholder={`Característica ${i + 1}`} />
            <Button variant="ghost" size="icon" onClick={() => removeArrayItem(caracteristicas, setCaracteristicas, i)} disabled={caracteristicas.length <= 1}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addArrayItem(caracteristicas, setCaracteristicas)}>
          <Plus className="h-4 w-4 mr-1" /> Agregar
        </Button>
      </section>

      {/* Benefits */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Beneficios</h3>
        {beneficios.map((b, i) => (
          <div key={i} className="flex gap-2">
            <Input value={b} onChange={e => handleArrayChange(beneficios, setBeneficios, i, e.target.value)} placeholder={`Beneficio ${i + 1}`} />
            <Button variant="ghost" size="icon" onClick={() => removeArrayItem(beneficios, setBeneficios, i)} disabled={beneficios.length <= 1}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addArrayItem(beneficios, setBeneficios)}>
          <Plus className="h-4 w-4 mr-1" /> Agregar
        </Button>
      </section>

      {/* Specs */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Especificaciones Técnicas</h3>
        {especificaciones.map((s, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={s.key}
              onChange={e => {
                const updated = [...especificaciones];
                updated[i] = { ...updated[i], key: e.target.value };
                setEspecificaciones(updated);
              }}
              placeholder="Ej: Voltaje"
              className="flex-1"
            />
            <Input
              value={s.value}
              onChange={e => {
                const updated = [...especificaciones];
                updated[i] = { ...updated[i], value: e.target.value };
                setEspecificaciones(updated);
              }}
              placeholder="Ej: 220V / 60Hz"
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={() => {
              if (especificaciones.length <= 1) return;
              setEspecificaciones(especificaciones.filter((_, j) => j !== i));
            }} disabled={especificaciones.length <= 1}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setEspecificaciones([...especificaciones, { key: "", value: "" }])}>
          <Plus className="h-4 w-4 mr-1" /> Agregar
        </Button>
      </section>

      {/* Applications */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Aplicaciones</h3>
        {aplicaciones.map((a, i) => (
          <div key={i} className="flex gap-2">
            <Input value={a} onChange={e => handleArrayChange(aplicaciones, setAplicaciones, i, e.target.value)} placeholder={`Aplicación ${i + 1}`} />
            <Button variant="ghost" size="icon" onClick={() => removeArrayItem(aplicaciones, setAplicaciones, i)} disabled={aplicaciones.length <= 1}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addArrayItem(aplicaciones, setAplicaciones)}>
          <Plus className="h-4 w-4 mr-1" /> Agregar
        </Button>
      </section>

      {/* Warranty & Related */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Garantía e Instalación</h3>
        <div className="space-y-2">
          <Label>Garantía</Label>
          <Textarea value={garantia} onChange={e => setGarantia(e.target.value)} rows={2} />
        </div>
        <div className="space-y-2">
          <Label>Instalación</Label>
          <Textarea value={instalacion} onChange={e => setInstalacion(e.target.value)} rows={2} />
        </div>
      </section>

      {/* Refacciones */}
      <section className="border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-lg">Refacciones Relacionadas</h3>
        {refaccionesRelacionadas.map((r, i) => (
          <div key={i} className="flex gap-2">
            <Input value={r} onChange={e => handleArrayChange(refaccionesRelacionadas, setRefaccionesRelacionadas, i, e.target.value)} placeholder={`Refacción ${i + 1}`} />
            <Button variant="ghost" size="icon" onClick={() => removeArrayItem(refaccionesRelacionadas, setRefaccionesRelacionadas, i)} disabled={refaccionesRelacionadas.length <= 1}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addArrayItem(refaccionesRelacionadas, setRefaccionesRelacionadas)}>
          <Plus className="h-4 w-4 mr-1" /> Agregar
        </Button>
      </section>

      {/* Save */}
      <div className="flex gap-4 pb-8">
        <Button onClick={handleSave} disabled={saving} className="font-bold px-8">
          {saving ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Producto"}
        </Button>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
}
