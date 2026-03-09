import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useActiveProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";

const extraCategorias = ["Equipo de lubricación", "Equipo de diagnóstico", "Otros"];

const Equipos = () => {
  const { data: products = [], isLoading } = useActiveProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [catFilter, setCatFilter] = useState<string>("Todas");
  const [bannerImage, setBannerImage] = useState("");

  const categorias = Array.from(new Set([...products.map(p => p.categoria), ...extraCategorias])).sort((a, b) => a.localeCompare(b, "es"));

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "equipos_banner_image")
      .single()
      .then(({ data }) => {
        if (data?.value) setBannerImage(data.value);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = catFilter === "Todas" || p.categoria === catFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-secondary/30 min-h-screen pb-20">
      <div className="relative bg-black text-white py-20 overflow-hidden">
        {bannerImage && (
          <img src={bannerImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="container px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Catálogo de Equipos</h1>
          <p className="text-xl text-white/70 max-w-2xl">Encuentra la maquinaria ideal para potenciar la rentabilidad y eficiencia de tu negocio.</p>
        </div>
      </div>

      <div className="container px-4 py-12 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Search className="h-4 w-4" /> Buscar
            </h3>
            <Input placeholder="Nombre o modelo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-white" />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <Filter className="h-4 w-4" /> Categorías
            </h3>
            <div className="flex flex-col gap-2">
              <button onClick={() => setCatFilter("Todas")} className={`text-left text-sm px-2 py-1.5 rounded transition-colors ${catFilter === "Todas" ? "bg-primary text-white font-semibold" : "hover:bg-black/5"}`}>
                Todas las categorías
              </button>
              {categorias.map(cat => (
                <button key={cat} onClick={() => setCatFilter(cat)} className={`text-left text-sm px-2 py-1.5 rounded transition-colors ${catFilter === cat ? "bg-primary text-white font-semibold" : "hover:bg-black/5"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground font-medium">
              {isLoading ? "Cargando..." : `Mostrando ${filteredProducts.length} equipos`}
            </p>
          </div>

          {!isLoading && filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border">
              <p className="text-xl text-muted-foreground">No se encontraron equipos con esos filtros.</p>
              <Button variant="link" className="mt-4" onClick={() => {setSearchTerm(""); setCatFilter("Todas");}}>Limpiar filtros</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <Card key={prod.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative h-56 bg-white p-6 border-b group flex items-center justify-center">
                    {prod.destacado && <Badge className="absolute top-3 right-3 bg-primary z-10">Destacado</Badge>}
                    <img src={prod.imagenPrincipal} alt={prod.nombre} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col bg-white">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      {prod.categoria} • Modelo {prod.modelo}
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-tight">{prod.nombre}</h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">{prod.descripcionCorta}</p>
                    <Link to={`/producto/${prod.slug}`}>
                      <Button className="w-full font-bold h-11">VER PRODUCTO</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Equipos;
