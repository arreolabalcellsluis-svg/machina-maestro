import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, ShieldCheck, MapPin, Truck, Wrench } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import heroImg from "@/assets/hero-equipment.jpg";
import { useActiveProducts } from "@/hooks/useProducts";

const categorias = [
  { nombre: "Elevadores", slug: "elevadores", img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80" },
  { nombre: "Desmontadoras", slug: "desmontadoras", img: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80" },
  { nombre: "Balanceadoras", slug: "balanceadoras", img: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80" },
  { nombre: "Alineadoras", slug: "alineadoras", img: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80" }
];

const soluciones = [
  { title: "Abrir Llantera", desc: "Paquetes completos de desmontadoras y balanceadoras para iniciar tu negocio." },
  { title: "Equipar Taller Mecánico", desc: "Elevadores, rampas y compresores de grado industrial." },
  { title: "Modernizar Equipo", desc: "Renueva tu taller con tecnología 3D y equipos de alta eficiencia." }
];

const Index = () => {
  const { data: products = [] } = useActiveProducts();
  const destacados = products.filter(p => p.destacado).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center bg-black">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Equipo automotriz REDBUCK" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/30" />
        </div>
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              EQUIPO PROFESIONAL PARA TALLERES EN MÉXICO
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Elevadores, desmontadoras, balanceadoras y equipo especializado de alto rendimiento para mecánicos y llanteras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/equipos">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-bold">VER EQUIPOS</Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 font-bold bg-white/10 text-white border-white/30 hover:bg-white hover:text-black">COTIZAR MI TALLER</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-24 bg-secondary">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Categorías Principales</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categorias.map((cat) => (
              <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="group block">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img src={cat.img} alt={cat.nombre} loading="lazy" width={400} height={256} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <CardContent className="p-6 bg-white flex items-center justify-between">
                    <h3 className="text-xl font-bold">{cat.nombre}</h3>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/equipos"><Button variant="outline" className="h-12 px-8 font-bold uppercase">Ver todo el catálogo</Button></Link>
          </div>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section id="soluciones" className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">Soluciones para tu negocio</h2>
              <p className="text-muted-foreground text-lg mb-8">Entendemos que cada negocio es diferente. Te asesoramos para elegir el equipo exacto que necesitas según tu espacio, presupuesto y tipo de vehículos que atiendes.</p>
              <div className="space-y-6">
                {soluciones.map((sol, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{sol.title}</h4>
                      <p className="text-muted-foreground">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/523313872649?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20con%20un%20asesor%20de%20Redbuck%20Equipment." target="_blank" rel="noopener noreferrer">
                <Button className="mt-10 h-12 px-8 font-bold">SOLICITAR ASESORÍA</Button>
              </a>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80" alt="Taller equipado" loading="lazy" width={600} height={400} className="rounded-lg shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-xl">
                <p className="text-4xl font-bold mb-1">+1000</p>
                <p className="font-semibold uppercase text-sm">Talleres Equipados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-24 bg-secondary">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Equipos Destacados</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            <Link to="/equipos" className="hidden md:flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destacados.map(prod => (
              <Card key={prod.id} className="overflow-hidden flex flex-col">
                <div className="relative h-64 bg-white p-4">
                  <img src={prod.imagenPrincipal} alt={prod.nombre} loading="lazy" width={400} height={256} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{prod.categoria}</div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{prod.nombre}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">{prod.descripcionCorta}</p>
                  <Link to={`/producto/${prod.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full font-bold">VER DETALLE</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANZA REDBUCK */}
      <section className="py-24 bg-black text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-16">¿Por qué elegir REDBUCK?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Garantía Directa</h3>
              <p className="text-gray-400">Respaldo total en todos nuestros equipos contra defectos de fábrica.</p>
            </div>
            <div className="flex flex-col items-center">
              <Wrench className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Servicio Técnico</h3>
              <p className="text-gray-400">Técnicos especializados para instalación, mantenimiento y reparación.</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Cobertura Nacional</h3>
              <p className="text-gray-400">Envíos e instalaciones seguras a cualquier parte de la República Mexicana.</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Refacciones</h3>
              <p className="text-gray-400">Amplio stock de piezas y consumibles para que tu equipo nunca pare.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-24 bg-secondary">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Nosotros</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">Conoce quiénes somos y qué nos impulsa a equipar los mejores talleres de México.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Misión</h3>
                <p className="text-muted-foreground leading-relaxed">Proveer equipo automotriz de alta calidad y rendimiento para talleres mecánicos y llanteras en toda la República Mexicana, impulsando el crecimiento de nuestros clientes.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Visión</h3>
                <p className="text-muted-foreground leading-relaxed">Ser la marca líder en equipamiento automotriz en México, reconocida por la confiabilidad de nuestros productos y la excelencia en nuestro servicio al cliente.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Valores</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" /> Calidad en cada producto</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" /> Compromiso con el cliente</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" /> Innovación constante</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" /> Honestidad y transparencia</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Historia</h3>
                <p className="text-muted-foreground leading-relaxed">REDBUCK nació con la misión de transformar la industria automotriz en México, ofreciendo equipos profesionales con respaldo técnico y garantía directa. Hoy equipamos más de 1,000 talleres en todo el país.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COTIZA TU TALLER */}
      <section className="py-24 bg-white">
        <div className="container px-4 max-w-5xl">
          <div className="bg-secondary rounded-2xl p-8 md:p-12 shadow-sm border">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold uppercase mb-4">Cotiza tu Taller</h2>
              <p className="text-muted-foreground text-lg">Déjanos tus datos y un especialista te contactará con la mejor propuesta.</p>
            </div>
            <LeadForm origen="Homepage - Sección Cotiza" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
