import { useParams, Navigate, Link } from "react-router-dom";
import { useActiveProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const categoryMap: Record<string, string> = {
  "elevadores": "Elevadores automotrices",
  "desmontadoras": "Desmontadoras de llantas",
  "balanceadoras": "Balanceadoras de llantas",
  "alineadoras": "Alineadoras",
  "compresores": "Compresores de aire"
};

const Categoria = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading } = useActiveProducts();
  
  if (!slug || !categoryMap[slug]) return <Navigate to="/equipos" />;

  const categoriaNombre = categoryMap[slug];
  const catProducts = products.filter(p => p.categoria === categoriaNombre);

  return (
    <div className="bg-secondary/30 min-h-screen pb-20">
      <div className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/categoria-bg.png')" }} />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container px-4 relative z-10">
          <Link to="/equipos" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors text-sm font-semibold uppercase tracking-wider">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo general
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">{categoriaNombre}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Equipos de alto rendimiento diseñados para uso rudo profesional.</p>
        </div>
      </div>

      <div className="container px-4 py-16">
        {isLoading ? (
          <p className="text-center py-12 text-muted-foreground">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {catProducts.length > 0 ? (
              catProducts.map(prod => (
                <Card key={prod.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-white p-4 border-b group flex items-center justify-center">
                    <img src={prod.imagenPrincipal} alt={prod.nombre} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col bg-white">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Mod. {prod.modelo}</div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-tight">{prod.nombre}</h3>
                    <div className="flex-1"></div>
                    <Link to={`/producto/${prod.slug}`}>
                      <Button className="w-full font-bold">VER PRODUCTO</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-lg border">
                <p className="text-xl text-muted-foreground">Próximamente más equipos en esta categoría.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categoria;
