import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Download, CheckCircle2, Wrench, ShieldCheck, FileText, Check, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Producto = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product) {
    return <Navigate to="/equipos" />;
  }

  const allImages = [product.imagenPrincipal, ...product.galeria.filter(img => img !== product.imagenPrincipal)];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % allImages.length);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b">
        <div className="container px-4 py-4 flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link to="/equipos" className="hover:text-primary transition-colors">Equipos</Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="font-semibold text-foreground truncate">{product.nombre}</span>
        </div>
      </div>

      <div className="container px-4 py-12">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Gallery Col */}
          <div className="space-y-4">
            <div 
              className="bg-secondary/20 border rounded-xl p-8 flex items-center justify-center h-[500px] cursor-zoom-in"
              onClick={() => openLightbox(selectedImage)}
            >
              <img 
                src={allImages[selectedImage]} 
                alt={product.nombre} 
                className="max-h-full object-contain mix-blend-multiply"
              />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, i) => (
                  <div 
                    key={i} 
                    className={`bg-secondary/20 border-2 rounded-lg p-2 h-24 flex items-center justify-center cursor-pointer transition-colors ${selectedImage === i ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt="" className="max-h-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Col */}
          <div className="flex flex-col">
            <div className="mb-2 text-primary font-black tracking-widest uppercase text-sm">
              {product.marca}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase mb-2">{product.nombre}</h1>
            <div className="text-muted-foreground font-semibold text-lg mb-6 flex items-center gap-4">
              <span>Modelo: {product.modelo}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>SKU: {product.sku}</span>
            </div>

            <p className="text-lg leading-relaxed mb-8">{product.descripcionCorta}</p>
            
            <div className="bg-secondary/50 rounded-lg p-6 mb-8 border border-border/50">
              <h4 className="font-bold uppercase tracking-wider mb-4 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Beneficios Principales
              </h4>
              <ul className="space-y-2">
                {product.beneficios.slice(0, 3).map((ben, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" /> {ben}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 mt-auto">
              <Button className="w-full h-14 text-lg font-bold" onClick={() => {
                document.getElementById('cotizar-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                SOLICITAR COTIZACIÓN
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 font-bold border-2">
                  <Download className="mr-2 h-4 w-4" /> FICHA TÉCNICA
                </Button>
                <Button variant="secondary" className="h-12 font-bold">
                  VER VIDEO
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          <Tabs defaultValue="caracteristicas" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent overflow-x-auto">
              <TabsTrigger value="caracteristicas" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-base font-bold uppercase">Características</TabsTrigger>
              <TabsTrigger value="especificaciones" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-base font-bold uppercase">Especificaciones</TabsTrigger>
              <TabsTrigger value="comercial" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-4 px-6 text-base font-bold uppercase">Detalles Comerciales</TabsTrigger>
            </TabsList>
            
            <div className="py-8">
              <TabsContent value="caracteristicas" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    {product.caracteristicas.map((car, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                        <span className="text-lg text-muted-foreground">{car}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="especificaciones" className="mt-0">
                <div className="max-w-3xl overflow-hidden rounded-xl border">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y">
                      {Object.entries(product.especificaciones).map(([key, value], i) => (
                        <tr key={key} className={i % 2 === 0 ? "bg-secondary/30" : "bg-white"}>
                          <th className="px-6 py-4 font-bold text-foreground w-1/2">{key}</th>
                          <td className="px-6 py-4 text-muted-foreground font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="comercial" className="mt-0">
                <div className="max-w-3xl prose prose-gray">
                  <p className="text-lg leading-relaxed text-muted-foreground">{product.descripcionComercial}</p>
                  
                  <div className="mt-8 grid sm:grid-cols-2 gap-6">
                    <div className="bg-secondary/50 p-6 rounded-lg border">
                      <ShieldCheck className="h-8 w-8 text-primary mb-4" />
                      <h4 className="font-bold mb-2">Garantía</h4>
                      <p className="text-sm text-muted-foreground">{product.garantia}</p>
                    </div>
                    <div className="bg-secondary/50 p-6 rounded-lg border">
                      <Wrench className="h-8 w-8 text-primary mb-4" />
                      <h4 className="font-bold mb-2">Instalación</h4>
                      <p className="text-sm text-muted-foreground">{product.instalacion}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Quote Form Section */}
        <div id="cotizar-section" className="bg-secondary rounded-2xl p-8 md:p-12 mb-20 max-w-4xl mx-auto border shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">¿Interesado en este equipo?</h2>
            <p className="text-muted-foreground">Solicita una cotización formal y uno de nuestros asesores expertos te contactará a la brevedad.</p>
          </div>
          <LeadForm 
            productoPredefinido={`${product.nombre} (Mod. ${product.modelo})`} 
            origen={`Página de Producto: ${product.sku}`} 
          />
        </div>

      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none flex items-center justify-center">
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <div className="flex items-center justify-center w-full h-[85vh] p-8">
            <img 
              src={allImages[lightboxIndex]} 
              alt={product.nombre} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
};

export default Producto;
