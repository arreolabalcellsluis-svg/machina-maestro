import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";
import ProductForm from "./ProductForm";
import { Product } from "@/types/product";

export default function ProductManager() {
  const { data: products, isLoading } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: `"${nombre}" eliminado` });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const handleToggleActive = async (id: string, activo: boolean) => {
    const { error } = await supabase.from("products").update({ activo: !activo }).eq("id", id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  if (creating || editing) {
    return (
      <ProductForm
        product={editing || undefined}
        onClose={() => { setEditing(null); setCreating(false); }}
        onSaved={() => {
          setEditing(null);
          setCreating(false);
          queryClient.invalidateQueries({ queryKey: ["products"] });
        }}
      />
    );
  }

  const filtered = (products || []).filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, categoría o SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setCreating(true)} className="font-bold">
          <Plus className="h-4 w-4 mr-2" /> Nuevo Producto
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center py-12 text-muted-foreground">Cargando productos...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground">
          {search ? "No se encontraron productos." : "No hay productos. Crea el primero."}
        </p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-semibold">Imagen</th>
                <th className="text-left p-3 font-semibold">Nombre</th>
                <th className="text-left p-3 font-semibold hidden md:table-cell">Categoría</th>
                <th className="text-left p-3 font-semibold hidden lg:table-cell">SKU</th>
                <th className="text-left p-3 font-semibold">Estado</th>
                <th className="text-right p-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                      {p.imagenPrincipal ? (
                        <img src={p.imagenPrincipal} alt="" className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-medium">{p.nombre}</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{p.categoria}</td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground">{p.sku}</td>
                  <td className="p-3">
                    <Badge variant={p.activo ? "default" : "secondary"}>
                      {p.activo ? "Activo" : "Inactivo"}
                    </Badge>
                    {p.destacado && <Badge className="ml-1" variant="outline">Destacado</Badge>}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" title={p.activo ? "Desactivar" : "Activar"} onClick={() => handleToggleActive(p.id, p.activo)}>
                        {p.activo ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditing(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(p.id, p.nombre)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
