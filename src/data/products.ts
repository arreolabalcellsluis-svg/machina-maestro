import { Product } from "../types/product";

// Catálogo preparado para ~75 productos. Aquí mostramos una muestra representativa.
export const products: Product[] = [
  {
    id: "1",
    slug: "elevador-2-postes-4-toneladas",
    sku: "RB-EL2P-4T",
    nombre: "Elevador de 2 Postes 4 Toneladas",
    marca: "REDBUCK",
    modelo: "ProLift 4000",
    categoria: "Elevadores automotrices",
    subcategoria: "2 Postes",
    descripcionCorta: "Elevador electrohidráulico de 2 postes con capacidad de 4 toneladas, ideal para talleres mecánicos.",
    descripcionComercial: "El elevador de 2 postes ProLift 4000 de REDBUCK es la solución definitiva para tu taller. Diseñado con acero de alta resistencia y un sistema electrohidráulico eficiente, permite elevar vehículos de hasta 4 toneladas con total seguridad y rapidez. Optimiza el espacio de tu taller y aumenta la productividad de tus mecánicos.",
    caracteristicas: [
      "Capacidad de carga de 4000 kg",
      "Sistema de liberación de seguros manual",
      "Brazos asimétricos para mejor apertura de puertas",
      "Almohadillas de elevación ajustables",
      "Motor de aluminio de alto rendimiento"
    ],
    beneficios: [
      "Aumenta la velocidad de servicio",
      "Máxima seguridad para el operador",
      "Bajo costo de mantenimiento",
      "Adaptable a una amplia gama de vehículos"
    ],
    especificaciones: {
      "Capacidad de carga": "4 Toneladas (4000 kg)",
      "Altura máxima de elevación": "1900 mm",
      "Tiempo de elevación": "50 segundos",
      "Tiempo de descenso": "40 segundos",
      "Voltaje": "220V / 60Hz / 1F",
      "Potencia del motor": "2.2 kW",
      "Altura total": "2824 mm"
    },
    aplicaciones: [
      "Talleres mecánicos generales",
      "Centros de servicio rápido",
      "Agencias automotrices"
    ],
    imagenPrincipal: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80"
    ],
    garantia: "2 años en componentes estructurales, 1 año en sistema hidráulico.",
    instalacion: "Servicio de instalación disponible en todo México por técnicos certificados REDBUCK.",
    refaccionesRelacionadas: ["Cables de acero", "Gomas para brazos", "Bomba hidráulica"],
    productosRelacionados: ["2", "4"],
    destacado: true,
    activo: true
  },
  {
    id: "2",
    slug: "desmontadora-llantas-brazo-oscilante",
    sku: "RB-DM-BO",
    nombre: "Desmontadora de Llantas Brazo Oscilante",
    marca: "REDBUCK",
    modelo: "TireMaster Pro",
    categoria: "Desmontadoras de llantas",
    subcategoria: "Automóvil y Camioneta",
    descripcionCorta: "Desmontadora profesional para rines de 10\" a 24\", con sistema neumático de alta precisión.",
    descripcionComercial: "Maximiza la rentabilidad de tu llantera con la desmontadora TireMaster Pro. Su brazo oscilante y plato giratorio de gran fuerza aseguran un desmontaje rápido y sin dañar los rines. Ideal para llantas de perfil bajo y Run-Flat (con brazo de ayuda opcional).",
    caracteristicas: [
      "Sujeción exterior: 10\" - 21\"",
      "Sujeción interior: 12\" - 24\"",
      "Fuerza del destalonador: 2500 kg",
      "Pedales de aluminio fundido",
      "Protecciones plásticas para evitar rayones en rines"
    ],
    beneficios: [
      "Evita daños en rines de clientes",
      "Reduce el esfuerzo del operador",
      "Alta durabilidad para uso rudo continuo"
    ],
    especificaciones: {
      "Diámetro máximo de rueda": "1040 mm (41\")",
      "Ancho máximo de rueda": "355 mm (14\")",
      "Presión de trabajo": "8-10 bar (116-145 psi)",
      "Voltaje": "110V / 60Hz",
      "Potencia": "1.1 kW"
    },
    aplicaciones: [
      "Llanteras de alto volumen",
      "Talleres mecánicos",
      "Agencias automotrices"
    ],
    imagenPrincipal: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80"
    ],
    garantia: "1 año de garantía contra defectos de fábrica.",
    instalacion: "Instalación sencilla. Requiere conexión a compresor de aire y toma eléctrica estándar.",
    refaccionesRelacionadas: ["Uñas plásticas", "Válvula de pedal", "Cilindro neumático"],
    productosRelacionados: ["3", "5"],
    destacado: true,
    activo: true
  },
  {
    id: "3",
    slug: "balanceadora-computarizada-llantas",
    sku: "RB-BAL-COMP",
    nombre: "Balanceadora Computarizada con Pantalla LED",
    marca: "REDBUCK",
    modelo: "SpinTech V2",
    categoria: "Balanceadoras de llantas",
    descripcionCorta: "Balanceadora de alta precisión con ingreso automático de datos y programas ALU.",
    descripcionComercial: "Logra el balance perfecto a la primera con SpinTech V2. Equipada con sensores de alta sensibilidad y software avanzado, detecta desequilibrios mínimos. Su diseño ergonómico e interfaz intuitiva reducen el tiempo de capacitación del personal.",
    caracteristicas: [
      "Pantalla LED de alto brillo",
      "Ingreso automático de distancia y diámetro",
      "Programas ALU para rines de aleación",
      "Autocalibración y autodiagnóstico",
      "Freno de pedal integrado"
    ],
    beneficios: [
      "Precisión absoluta, elimina vibraciones",
      "Ahorro de plomo por cálculo exacto",
      "Operación en menos de 10 segundos por ciclo"
    ],
    especificaciones: {
      "Peso máximo de rueda": "65 kg",
      "Diámetro de rin": "10\" - 24\"",
      "Ancho de rin": "1.5\" - 20\"",
      "Precisión de balanceo": "±1g",
      "Tiempo de ciclo": "8 segundos",
      "Voltaje": "110V / 60Hz"
    },
    aplicaciones: [
      "Llanteras especializadas",
      "Talleres de servicio automotriz"
    ],
    imagenPrincipal: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80"
    ],
    garantia: "1 año de garantía en componentes electrónicos.",
    instalacion: "Auto-instalable con manual en español y soporte por videollamada.",
    refaccionesRelacionadas: ["Conos de centrado", "Tuerca rápida", "Tarjeta madre"],
    productosRelacionados: ["2", "5"],
    destacado: true,
    activo: true
  },
  {
    id: "4",
    slug: "alineadora-3d-hd",
    sku: "RB-ALIN-3D",
    nombre: "Alineadora 3D de Alta Definición",
    marca: "REDBUCK",
    modelo: "Align3D Pro",
    categoria: "Alineadoras",
    descripcionCorta: "Sistema de alineación 3D con cámaras de alta resolución y base de datos actualizada.",
    descripcionComercial: "Ofrece el servicio de alineación más avanzado del mercado. La Align3D Pro utiliza cámaras de alta definición y targets pasivos (sin cables ni baterías) para leer la geometría del vehículo en segundos. Base de datos internacional con más de 20,000 vehículos.",
    caracteristicas: [
      "Cámaras HD de 5 Megapíxeles",
      "Targets sin componentes electrónicos",
      "Compensación por empuje rodado (sin levantar el auto)",
      "Software intuitivo basado en Windows",
      "Gabinete móvil con PC e impresora incluidos"
    ],
    beneficios: [
      "Servicio de alineación en menos de 3 minutos",
      "Alta rentabilidad por servicio premium",
      "Evita errores humanos en la lectura"
    ],
    especificaciones: {
      "Resolución de cámara": "5 MP",
      "Sistema Operativo": "Windows 10",
      "Voltaje": "110V",
      "Base de datos": "Actualizable anualmente"
    },
    aplicaciones: [
      "Centros de alineación y balanceo",
      "Agencias automotrices"
    ],
    imagenPrincipal: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80",
    galeria: [],
    garantia: "1 año de garantía integral.",
    instalacion: "Instalación, calibración y capacitación presencial incluida.",
    refaccionesRelacionadas: ["Targets", "Mordazas"],
    productosRelacionados: ["1", "3"],
    destacado: false,
    activo: true
  },
  {
    id: "5",
    slug: "compresor-aire-500-litros",
    sku: "RB-COMP-500",
    nombre: "Compresor de Aire de 500 Litros 10HP",
    marca: "REDBUCK",
    modelo: "AirForce 500",
    categoria: "Compresores de aire",
    descripcionCorta: "Compresor de pistón de grado industrial, tanque de 500L y motor trifásico de 10HP.",
    descripcionComercial: "El corazón de tu taller. Provee aire continuo y estable para todas tus herramientas neumáticas, desmontadoras y elevadores. Tanque certificado para alta presión.",
    caracteristicas: [
      "Motor eléctrico de 10 HP",
      "Bomba de hierro fundido de 3 cilindros",
      "Tanque horizontal de 500 litros",
      "Presión máxima de 175 PSI"
    ],
    beneficios: [
      "Soporta uso continuo",
      "Menor frecuencia de encendido (ahorro de energía)",
      "Aire limpio para tus herramientas"
    ],
    especificaciones: {
      "Capacidad del tanque": "500 Litros",
      "Potencia": "10 HP",
      "Voltaje": "220V / Trifásico",
      "CFM": "35 @ 90 PSI"
    },
    aplicaciones: [
      "Talleres grandes",
      "Talleres de hojalatería y pintura"
    ],
    imagenPrincipal: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80",
    galeria: [],
    garantia: "1 año.",
    instalacion: "Requiere instalación eléctrica trifásica.",
    refaccionesRelacionadas: ["Aceite compresor", "Filtro de aire", "Bandas"],
    productosRelacionados: ["2", "6"],
    destacado: false,
    activo: true
  },
  {
    id: "6",
    slug: "gato-patin-3-toneladas",
    sku: "RB-GATO-3T",
    nombre: "Gato de Patín Perfil Bajo 3 Toneladas",
    marca: "REDBUCK",
    modelo: "JackPro 3T",
    categoria: "Equipo hidráulico",
    descripcionCorta: "Gato hidráulico de patín, doble bomba para elevación rápida, perfil extra bajo.",
    descripcionComercial: "Indispensable en cualquier bahía de servicio. Su diseño de perfil bajo permite entrar debajo de vehículos deportivos, mientras que su doble bomba levanta el vehículo en menos bombeos.",
    caracteristicas: [
      "Capacidad 3 toneladas",
      "Perfil bajo (75mm de altura mínima)",
      "Sistema de doble bomba rápida",
      "Ruedas de acero reforzado"
    ],
    beneficios: [
      "Rapidez en la elevación",
      "Cabe debajo de casi cualquier auto",
      "Construcción ultra resistente"
    ],
    especificaciones: {
      "Capacidad": "3 Toneladas",
      "Altura mínima": "75 mm",
      "Altura máxima": "505 mm",
      "Peso del equipo": "32 kg"
    },
    aplicaciones: [
      "Cualquier taller mecánico",
      "Llanteras"
    ],
    imagenPrincipal: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80",
    galeria: [],
    garantia: "6 meses.",
    instalacion: "No requiere.",
    refaccionesRelacionadas: ["Kit de sellos"],
    productosRelacionados: ["1"],
    destacado: true,
    activo: true
  }
];
