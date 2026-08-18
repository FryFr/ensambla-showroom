// ─────────────────────────────────────────────────────────────
// REGISTRO DE DEMOS — única fuente de verdad.
// La Home (menú bento) y /demos/[slug] se generan desde este array.
//
// ➕ Para agregar una demo nueva:
//   1. Creá el componente en src/components/demos/<Nombre>Demo.tsx
//   2. Agregá una entrada aquí.
//   3. Registrá el componente en src/components/demos/registry.ts
//   Listo: aparece sola en la Home y en /demos/<slug>.
// ─────────────────────────────────────────────────────────────

export type Pillar = 'web' | 'ia';

export interface Demo {
  /** Identificador estable */
  id: string;
  /** Slug de URL: /demos/<slug> y /contacto?tipo=<slug> */
  slug: string;
  /** Título visible */
  title: string;
  /** Frase corta bajo el título (en el menú y arriba de la demo) */
  tagline: string;
  /** Pilar: desarrollo web o automatización con IA */
  pillar: Pillar;
  /** Etiqueta técnica breve (mono) */
  kicker: string;
  /** Qué incluye — bullets genéricos, SIN precios */
  includes: string[];
  /** Tamaño en el bento-grid (col/row span en desktop) */
  span: 'sm' | 'md' | 'lg';
  /** ¿Es la demo estrella? (badge destacado) */
  featured?: boolean;
  /** ¿Tiene backend real? (solo el chatbot) */
  hasBackend?: boolean;
  /** Emoji/icono simple para el preview placeholder */
  icon: string;
  /** Tiempo estimado de entrega (diferenciador del sitio) */
  tiempo: string;
  /** Grupo por problema (agrupación del menú) */
  grupo: Grupo;
  /** ¿Se muestra en el menú? flujo va a "Cómo trabajamos" */
  enMenu?: boolean;
}

export const PILLARS: Record<Pillar, { label: string; blurb: string }> = {
  web: {
    label: 'Desarrollo Web',
    blurb: 'Sitios y tiendas rápidos, lindos y que venden. De la landing al e-commerce completo.',
  },
  ia: {
    label: 'Automatización con IA',
    blurb: 'Bots y flujos que atienden, venden y ordenan tu operación mientras duermes.',
  },
};

export type Grupo = 'contacto' | 'venta' | 'atencion' | 'operacion';

export const GRUPOS: Record<Grupo, { label: string; blurb: string }> = {
  contacto: {
    label: 'Que me encuentren y me contacten',
    blurb: 'Tu presencia online para que te encuentren, te conozcan y te escriban.',
  },
  venta: {
    label: 'Que me compren',
    blurb: 'Vende en línea o cierra por chat, con o sin checkout.',
  },
  atencion: {
    label: 'Que los atiendan sin mí',
    blurb: 'Bots que responden, toman pedidos y agendan turnos solos, 24/7.',
  },
  operacion: {
    label: 'Que mi operación esté ordenada',
    blurb: 'Tus clientes, ventas y números en un solo lugar, sin planillas.',
  },
};


export const demos: Demo[] = [
  // ── Vitrina Web ─────────────────────────────────────────────
  {
    id: 'landing',
    slug: 'landing',
    title: 'Landing de venta',
    tagline: 'Una página que convierte visitas en clientes.',
    pillar: 'web',
    kicker: 'WEB · CONVERSIÓN',
    icon: '🚀',
    tiempo: '3 días',
    grupo: 'contacto',
    span: 'md',
    includes: [
      'Hero con propuesta de valor clara',
      'Bloques de beneficios, features y testimonios',
      'Formulario de contacto con validación',
      'Optimizada para velocidad y SEO',
    ],
  },
  {
    id: 'tienda',
    slug: 'tienda',
    title: 'Tienda online',
    tagline: 'Cobra en línea: catálogo, carrito y pago con checkout.',
    pillar: 'web',
    kicker: 'WEB · E-COMMERCE',
    icon: '🛒',
    tiempo: '3-5 días',
    grupo: 'venta',
    span: 'lg',
    includes: [
      'Catálogo con filtros por categoría',
      'Ficha de producto y carrito con drawer',
      'Cantidades, totales y paso de checkout',
      'Base lista para integrar pagos reales',
    ],
  },
  {
    id: 'informativo',
    slug: 'informativo',
    title: 'Sitio informativo',
    tagline: 'Varias páginas para que te conozcan: servicios, nosotros y contacto.',
    pillar: 'web',
    kicker: 'WEB · CORPORATIVO',
    icon: '🏢',
    tiempo: '3 días',
    grupo: 'contacto',
    span: 'sm',
    includes: [
      'Páginas: Inicio, Servicios, Nosotros, Contacto',
      'Navegación clara y responsive',
      'Estructura pensada para SEO local',
      'Fácil de ampliar con más secciones',
    ],
  },

  // ── Vitrina Automatización con IA ───────────────────────────
  {
    id: 'chatbot',
    slug: 'chatbot',
    title: 'Chatbot con IA',
    tagline: 'Responde de verdad, sobre la info de tu negocio.',
    pillar: 'ia',
    kicker: 'IA · EL MOTOR',
    icon: '💬',
    tiempo: '3-4 días',
    grupo: 'atencion',
    span: 'lg',
    featured: true,
    hasBackend: true,
    includes: [
      'Responde con IA sobre tu base de conocimiento',
      'Se mantiene en tema (no inventa fuera de tu info)',
      'Atención automática 24/7',
      'Se conecta a WhatsApp, web o el canal que uses',
    ],
  },
  {
    id: 'pedidos',
    slug: 'pedidos',
    title: 'Bot de pedidos',
    tagline: 'El chatbot aplicado a pedidos: toma la orden y hace el seguimiento.',
    pillar: 'ia',
    kicker: 'IA · PEDIDOS',
    icon: '🛵',
    tiempo: '3-4 días',
    grupo: 'atencion',
    span: 'md',
    includes: [
      'Chat guiado con botones de respuesta rápida',
      'Arma el pedido desde tu menú',
      'Resumen, confirmación y datos de entrega',
      'Seguimiento del domicilio en vivo',
    ],
  },
  {
    id: 'crm',
    slug: 'crm',
    title: 'CRM anti-leads-perdidos',
    tagline: 'Ningún cliente potencial se te vuelve a escapar.',
    pillar: 'ia',
    kicker: 'IA · VENTAS',
    icon: '📊',
    tiempo: '3-4 días',
    grupo: 'operacion',
    span: 'sm',
    includes: [
      'Pipeline visual arrastrando leads por etapa',
      'Ficha de cada lead con su historial',
      'Alertas de nuevos leads al instante',
      'Automatizable con tus canales de captación',
    ],
  },
  {
    id: 'flujo',
    slug: 'flujo',
    title: 'Flujo de automatización',
    tagline: 'Mira cómo tu operación trabaja sola.',
    pillar: 'ia',
    kicker: 'IA · AUTOMATIZACIÓN',
    icon: '🔗',
    tiempo: '3-5 días',
    grupo: 'operacion',
    enMenu: false,
    span: 'lg',
    includes: [
      'Conecta tus canales y herramientas',
      'Responde y deriva sin intervención',
      'Cada lead cargado y con seguimiento',
      'Menos tareas manuales, cero "se me pasó"',
    ],
  },
  {
    id: 'turnos',
    slug: 'turnos',
    title: 'Turnos con recordatorios',
    tagline: 'El chatbot aplicado a tu agenda: reserva y recuerda turnos.',
    pillar: 'ia',
    kicker: 'IA · AGENDA',
    icon: '📅',
    tiempo: '3 días',
    grupo: 'atencion',
    span: 'md',
    includes: [
      'Reserva de turnos online 24/7',
      'Recordatorios automáticos por WhatsApp',
      'Menos ausencias, agenda aprovechada',
      'Se integra con tu calendario',
    ],
  },
  {
    id: 'cotizador',
    slug: 'cotizador',
    title: 'Cotizador instantáneo',
    tagline: 'Presupuestos al toque, sin esperar.',
    pillar: 'ia',
    kicker: 'IA · VENTAS',
    icon: '🧮',
    tiempo: '3 días',
    grupo: 'venta',
    span: 'md',
    includes: [
      'Presupuesto automático en segundos',
      'Captura el lead con sus datos',
      'Cotización enviada por WhatsApp',
      'Menos idas y vueltas para cerrar',
    ],
  },
  {
    id: 'catalogo',
    slug: 'catalogo',
    title: 'Catálogo por WhatsApp',
    tagline: 'Cierra por chat: pedidos por WhatsApp, sin checkout ni comisiones.',
    pillar: 'web',
    kicker: 'WEB · VENTAS',
    icon: '📲',
    tiempo: '3 días',
    grupo: 'venta',
    span: 'md',
    includes: [
      'Catálogo lindo y fácil de actualizar',
      'El pedido se arma y se manda por WhatsApp',
      'Sin comisiones de apps de delivery',
      'Ideal para empezar a vender ya',
    ],
  },
  {
    id: 'panel',
    slug: 'panel',
    title: 'Panel de control',
    tagline: 'Tu negocio en números, sin planillas.',
    pillar: 'web',
    kicker: 'WEB · OPERACIONES',
    icon: '📈',
    tiempo: '3-5 días',
    grupo: 'operacion',
    span: 'lg',
    includes: [
      'Ventas, stock y métricas en vivo',
      'Alertas de stock bajo al instante',
      'Reemplaza planillas eternas',
      'Decisiones con datos, no a ojo',
    ],
  },
  {
    id: 'curso',
    slug: 'curso',
    title: 'Micrositio de curso',
    tagline: 'Vende tu curso o membresía online.',
    pillar: 'web',
    kicker: 'WEB · EDUCACIÓN',
    icon: '🎓',
    tiempo: '3 días',
    grupo: 'contacto',
    span: 'sm',
    includes: [
      'Landing de curso que convierte',
      'Módulos y lecciones organizados',
      'Contenido que se desbloquea al inscribirse',
      'Listo para sumar pagos y alumnos',
    ],
  },
  {
    id: 'portal',
    slug: 'portal',
    title: 'Portal de clientes',
    tagline: 'Tus clientes ven su estado, documentos e historial sin llamarte.',
    pillar: 'web',
    kicker: 'WEB · B2B',
    icon: '🔐',
    tiempo: '4-6 días',
    grupo: 'operacion',
    span: 'md',
    includes: [
      'Login propio para cada cliente',
      'Estado del proyecto o pedido en vivo',
      'Documentos y facturas para descargar',
      'Historial completo, sin cadenas de mails',
    ],
  },
  {
    id: 'bot-interno',
    slug: 'bot-interno',
    title: 'Bot interno de operación',
    tagline: 'Pregúntale a tu negocio: stock, pedidos y ventas al instante.',
    pillar: 'ia',
    kicker: 'IA · INTERNO',
    icon: '🤖',
    tiempo: '3-5 días',
    grupo: 'atencion',
    span: 'sm',
    includes: [
      'Responde desde tus datos reales',
      'Stock, pedidos y ventas al toque',
      'Sin abrir 3 sistemas distintos',
      'Alertas cuando algo se agota',
    ],
  },
  {
    id: 'sync',
    slug: 'sync',
    title: 'Sincronizador',
    tagline: 'Tu web, tu Excel y tu inventario, siempre con el mismo número.',
    pillar: 'ia',
    kicker: 'IA · DATOS',
    icon: '🔄',
    tiempo: '4-6 días',
    grupo: 'operacion',
    span: 'md',
    includes: [
      'Un solo stock para todos tus canales',
      'Se actualiza solo con cada venta',
      'Nunca más vendes lo que no tienes',
      'Conecta web, POS y planillas',
    ],
  },
  {
    id: 'recuperador',
    slug: 'recuperador',
    title: 'Recuperador de conversaciones',
    tagline: 'Trae de vuelta al que preguntó y nunca volvió.',
    pillar: 'ia',
    kicker: 'IA · SEGUIMIENTO',
    icon: '⚡',
    tiempo: '3-4 días',
    grupo: 'contacto',
    span: 'sm',
    includes: [
      'Detecta leads que se enfriaron',
      'Dispara un seguimiento natural, solo',
      'Recupera ventas que dabas por perdidas',
      'Funciona en WhatsApp, IG y web',
    ],
  },
];

export const demosBySlug = Object.fromEntries(demos.map((d) => [d.slug, d]));

export function getDemo(slug: string): Demo | undefined {
  return demosBySlug[slug];
}

export function demosByPillar(pillar: Pillar): Demo[] {
  return demos.filter((d) => d.pillar === pillar);
}

export const demosEnMenu = demos.filter((d) => d.enMenu !== false);

export function demosByGrupo(grupo: Grupo): Demo[] {
  return demosEnMenu.filter((d) => d.grupo === grupo);
}
