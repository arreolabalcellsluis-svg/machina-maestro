import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "523313872649";
  const defaultMessage = "Hola REDBUCK, me interesa cotizar equipo para mi taller.";
  const href = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`;


  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
};

export default WhatsAppButton;
