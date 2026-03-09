import LeadForm from "@/components/LeadForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-secondary/30 pb-24">
      {/* Header Banner */}
      <div className="bg-black text-white py-16">
        <div className="container px-4">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Contacto</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Estamos listos para asesorarte y equipar tu taller con lo mejor de la industria.
          </p>
        </div>
      </div>

      <div className="container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-6">Comunícate con nosotros</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Ya sea que necesites una cotización, soporte técnico o agendar una visita a nuestro showroom, nuestro equipo está a tu disposición.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Ventas</h4>
                  <p className="text-muted-foreground">33 1387 2649</p>
                  <p className="text-muted-foreground">81 2345 6789</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Correo</h4>
                  <p className="text-muted-foreground">ventas@redbuck.com.mx</p>
                  <p className="text-muted-foreground">soporte@redbuck.com.mx</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Showroom</h4>
                  <p className="text-muted-foreground">Av. Industrial 123,<br/>Parque Industrial,<br/>Monterrey, N.L. C.P. 64000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Horario</h4>
                  <p className="text-muted-foreground">Lunes a Viernes<br/>9:00 am - 6:30 pm</p>
                  <p className="text-muted-foreground">Sábados<br/>9:00 am - 1:00 pm</p>
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full bg-gray-300 rounded-xl overflow-hidden border relative flex items-center justify-center">
              <span className="text-gray-500 font-medium">[Mapa de Ubicación]</span>
              {/* Aquí se incrustaría el iframe de Google Maps */}
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border">
            <h3 className="text-2xl font-bold uppercase mb-6 border-b pb-4">Envíanos un mensaje</h3>
            <LeadForm origen="Página de Contacto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
