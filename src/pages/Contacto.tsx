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
                  <p className="text-muted-foreground">33 3327 7030</p>
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
                  <p className="text-muted-foreground">Av. Circunvalación Sur #4101,<br/>Col. Las Fuentes,<br/>C.P. 45070, Zapopan, Jalisco.</p>
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
            
            <div className="w-full rounded-xl overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.0569228628797!2d-103.43329692475437!3d20.62653648092397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ac68564f86f3%3A0xf6b3e47375eeffe3!2sARREOLA%20EQUIPOS%20Y%20SERVICIOS%20SA%20DE%20CV!5e0!3m2!1ses-419!2smx!4v1773025861086!5m2!1ses-419!2smx"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Redbuck Equipment"
              />
              <a href="https://maps.app.goo.gl/SgWZRvVD5L3AUQ9QA" target="_blank" rel="noopener noreferrer" className="block text-center text-sm text-primary font-semibold py-3 hover:underline">
                Ver en Google Maps →
              </a>
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
