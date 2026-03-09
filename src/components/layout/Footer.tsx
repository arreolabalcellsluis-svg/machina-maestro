import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logoUrl from "@/assets/logo-redbuck.png";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="flex flex-col">
            <img src={logoUrl} alt="REDBUCK Logo" className="h-40 mb-2 brightness-0 invert" />
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Equipando los mejores talleres y llanteras de México. Maquinaria de grado industrial con soporte, garantía y refacciones.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Navegación</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/equipos" className="text-gray-400 hover:text-primary transition-colors">Catálogo de Equipos</Link></li>
              <li><Link to="/#soluciones" className="text-gray-400 hover:text-primary transition-colors">Soluciones</Link></li>
              <li><Link to="/#casos" className="text-gray-400 hover:text-primary transition-colors">Casos de Éxito</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Categorías</h3>
            <ul className="space-y-3">
              <li><Link to="/categoria/elevadores" className="text-gray-400 hover:text-primary transition-colors">Elevadores Automotrices</Link></li>
              <li><Link to="/categoria/desmontadoras" className="text-gray-400 hover:text-primary transition-colors">Desmontadoras</Link></li>
              <li><Link to="/categoria/balanceadoras" className="text-gray-400 hover:text-primary transition-colors">Balanceadoras</Link></li>
              <li><Link to="/categoria/alineadoras" className="text-gray-400 hover:text-primary transition-colors">Alineadoras 3D</Link></li>
              <li><Link to="/categoria/compresores" className="text-gray-400 hover:text-primary transition-colors">Compresores de Aire</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.app.goo.gl/SgWZRvVD5L3AUQ9QA" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-primary transition-colors">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Av. Industrial 123, Parque Industrial, Monterrey, N.L.</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>800 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>ventas@redbuck.com.mx</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} REDBUCK Equipment. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
            <Link to="#" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
