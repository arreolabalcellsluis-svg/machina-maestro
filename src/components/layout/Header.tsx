import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import logoUrl from "@/assets/logo-redbuck.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashLink = useCallback((path: string) => {
    const [route, hash] = path.split("#");
    const targetRoute = route || "/";
    
    if (location.pathname === targetRoute && hash) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(targetRoute);
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location.pathname, navigate]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Equipos", path: "/equipos" },
    { name: "Soluciones", path: "/#soluciones", isHash: true },
    { name: "Casos de éxito", path: "/#casos", isHash: true },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="REDBUCK Equipment" className="h-12 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>800 123 4567</span>
          </div>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/contacto">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs">
              Cotizar Ahora
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 absolute w-full left-0 top-20 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-base font-semibold text-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col gap-4">
              <div className="flex items-center gap-2 font-bold">
                <Phone className="h-5 w-5 text-primary" />
                <span>800 123 4567</span>
              </div>
              <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90">Cotizar Ahora</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
