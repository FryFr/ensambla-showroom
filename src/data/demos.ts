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
    tagline: 'E-commerce completo: catálogo, carrito y checkout.',
    pillar: 'web',
    kicker: 'WEB · E-COMMERCE',
    icon: '🛒',
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
    tagline: 'El sitio multipágina que tu negocio necesita.',
    pillar: 'web',
    kicker: 'WEB · CORPORATIVO',
    icon: '🏢',
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
    kicker: 'IA · ATENCIÓN 24/7',
    icon: '💬',
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
    tagline: 'Toma pedidos por chat y muestra el seguimiento.',
    pillar: 'ia',
    kicker: 'IA · PEDIDOS',
    icon: '🛵',
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
    tagline: 'Agenda llena y sin ausencias.',
    pillar: 'ia',
    kicker: 'IA · AGENDA',
    icon: '📅',
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
    tagline: 'Vende por WhatsApp, sin comisiones.',
    pillar: 'web',
    kicker: 'WEB · VENTAS',
    icon: '📲',
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
    span: 'sm',
    includes: [
      'Landing de curso que convierte',
      'Módulos y lecciones organizados',
      'Contenido que se desbloquea al inscribirse',
      'Listo para sumar pagos y alumnos',
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
