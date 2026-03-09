import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BannerSettings from "@/components/admin/BannerSettings";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "banners">("products");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      // Check role
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (error) throw error;

      if (!data) {
        toast({
          variant: "destructive",
          title: "Acceso denegado",
          description: "No tienes permisos de administrador.",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error: any) {
      console.error(error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <div className="p-8 text-center">Cargando panel de administración...</div>;
  }

  if (!isAdmin) {
    return null;
  }


  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
      </div>

      <div className="flex gap-4 mb-8 border-b pb-4">
        <Button variant={activeTab === "products" ? "default" : "outline"} onClick={() => setActiveTab("products")}>
          Gestión de Productos
        </Button>
        <Button variant={activeTab === "banners" ? "default" : "outline"} onClick={() => setActiveTab("banners")}>
          Banners e Imágenes
        </Button>
      </div>

      {activeTab === "products" && (
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Gestión de Productos</h2>
          <p className="text-muted-foreground mb-4">Administra el catálogo de productos, categorías, imágenes y archivos.</p>
          <Button>Administrar Productos</Button>
        </div>
      )}

      {activeTab === "banners" && <BannerSettings />}
    </div>
  );
}