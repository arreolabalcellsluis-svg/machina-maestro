import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export function mapDbToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku || "",
    nombre: row.nombre,
    marca: row.marca || "REDBUCK",
    modelo: row.modelo || "",
    categoria: row.categoria,
    subcategoria: row.subcategoria || undefined,
    descripcionCorta: row.descripcion_corta || "",
    descripcionComercial: row.descripcion_comercial || "",
    caracteristicas: row.caracteristicas || [],
    beneficios: row.beneficios || [],
    especificaciones: row.especificaciones || {},
    aplicaciones: row.aplicaciones || [],
    imagenPrincipal: row.imagen_principal || "",
    galeria: row.galeria || [],
    videoOpcional: row.video_opcional || undefined,
    fichaTecnicaPdf: row.ficha_tecnica_pdf || undefined,
    garantia: row.garantia || "",
    instalacion: row.instalacion || "",
    refaccionesRelacionadas: row.refacciones_relacionadas || [],
    productosRelacionados: row.productos_relacionados || [],
    destacado: row.destacado ?? false,
    activo: row.activo ?? true,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return (data || []).map(mapDbToProduct);
    },
  });
}

export function useActiveProducts() {
  return useQuery({
    queryKey: ["products", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("activo", true)
        .order("nombre");
      if (error) throw error;
      return (data || []).map(mapDbToProduct);
    },
  });
}
