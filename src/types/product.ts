export interface Product {
  id: string;
  slug: string;
  sku: string;
  nombre: string;
  marca: string;
  modelo: string;
  categoria: string;
  subcategoria?: string;
  descripcionCorta: string;
  descripcionComercial: string;
  caracteristicas: string[];
  beneficios: string[];
  especificaciones: Record<string, string>;
  aplicaciones: string[];
  imagenPrincipal: string;
  galeria: string[];
  videoOpcional?: string;
  fichaTecnicaPdf?: string;
  garantia: string;
  instalacion: string;
  refaccionesRelacionadas: string[];
  productosRelacionados: string[];
  destacado: boolean;
  activo: boolean;
}
