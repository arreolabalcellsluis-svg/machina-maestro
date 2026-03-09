import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface LeadFormProps {
  productoPredefinido?: string;
  origen?: string;
}

const LeadForm = ({ productoPredefinido = "", origen = "Sitio Web General" }: LeadFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Aquí iría la lógica de conexión al CRM
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Solicitud enviada!",
        description: "Un asesor de REDBUCK se pondrá en contacto contigo pronto.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo *</Label>
          <Input id="nombre" required placeholder="Ej. Juan Pérez" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa o Taller *</Label>
          <Input id="empresa" required placeholder="Nombre de tu negocio" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
          <Input id="telefono" type="tel" required placeholder="10 dígitos" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ciudad">Ciudad y Estado *</Label>
          <Input id="ciudad" required placeholder="Ej. Monterrey, N.L." />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="equipo">Equipo de interés</Label>
        <Input 
          id="equipo" 
          defaultValue={productoPredefinido} 
          placeholder="¿Qué equipo estás buscando?" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">Mensaje o Dudas</Label>
        <Textarea 
          id="mensaje" 
          placeholder="Cuéntanos más sobre tu proyecto o necesidades específicas..." 
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isLoading}>
        {isLoading ? "Enviando..." : "SOLICITAR COTIZACIÓN"}
      </Button>
      <p className="text-xs text-center text-muted-foreground mt-2">
        Al enviar este formulario, aceptas nuestra política de privacidad. Origen: {origen}.
      </p>
    </form>
  );
};

export default LeadForm;
