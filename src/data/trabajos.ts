// ─────────────────────────────────────────────────────────────
// REGISTRO DE TRABAJOS REALES — única fuente de verdad.
//
// ⚠️ Esto NO es `demos.ts`. La diferencia es la regla del sitio:
//   · `demos.ts`     → fachadas interactivas con datos INVENTADOS.
//   · `trabajos.ts`  → sitios de clientes REALES, publicados y en línea.
//
// Por eso cada campo de acá tiene que ser verificable abriendo el sitio o
// mirando su HTML/headers. Si no se puede verificar, no se escribe.
//
// ➕ Para agregar un trabajo nuevo:
//   1. Capturá las imágenes en public/trabajos/<slug>-{desktop,mobile}.webp
//      y el og en public/trabajos/<slug>-og.jpg (ver README → "Trabajos reales").
//   2. Agregá una entrada acá.
//   Listo: aparece en la Home y en /trabajos/<slug>.
// ─────────────────────────────────────────────────────────────

/**
 * Estado de publicación del sitio del cliente.
 * · `produccion` → indexable, abierto a buscadores.
 * · `vista-previa` → el propio sitio se declara fuera de buscadores
 *   (meta robots noindex y/o robots.txt Disallow) mientras se cierran detalles.
 */
export type EstadoTrabajo = 'produccion' | 'vista-previa';

export interface Trabajo {
  /** Identificador estable */
  id: string;
  /** Slug de URL: /trabajos/<slug> y /contacto?tipo=<slug> */
  slug: string;
  /** Nombre visible del cliente / marca */
  title: string;
  /** Qué es el sitio, en una línea */
  tagline: string;
  /** Etiqueta técnica breve (mono) */
  kicker: string;
  /** Rubro y lugar, tal como el propio sitio los declara */
  rubro: string;
  /** URL pública del sitio */
  url: string;
  /** Host visible, sin protocolo (para mostrar en la ficha) */
  host: string;
  /** Color de marca del cliente, tomado de su propio CSS */
  accent: string;
  /** Estado de publicación — ver EstadoTrabajo */
  estado: EstadoTrabajo;
  /**
   * El sitio se declara `noindex`. Cuando es `true` enlazamos con
   * rel="nofollow" para no empujarlo a buscadores en contra de su intención.
   */
  respetarNoindex?: boolean;
  /**
   * ¿Se puede embeber en un iframe?
   * Verificado el `verificadoEl`: sin cabecera X-Frame-Options ni
   * Content-Security-Policy con frame-ancestors. Puede cambiar sin aviso:
   * por eso la previsualización SIEMPRE ofrece abrir en pestaña aparte.
   */
  embebible: boolean;
  /** Fecha (ISO) de la última verificación de cabeceras y de las capturas */
  verificadoEl: string;
  /** Párrafo de contexto */
  resumen: string;
  /** Lo que se ve en el sitio — cada punto comprobable abriéndolo */
  destacados: { titulo: string; detalle: string }[];
  /** Señales técnicas leídas del HTML y de las cabeceras del sitio */
  tecnica: string[];
  /** Capturas reales */
  shots: {
    desktop: string;
    mobile: string;
    /** Imagen para redes (1200×630) */
    og: string;
    altDesktop: string;
    altMobile: string;
  };
}

export const trabajos: Trabajo[] = [
  {
    id: 'milu',
    slug: 'milu',
    title: 'Milu',
    tagline: 'Tienda de shampoo sólido: catálogo, carrito propio y dos idiomas.',
    kicker: 'WEB · E-COMMERCE',
    rubro: 'Cosmética sólida · Colombia',
    url: 'https://www.miluprana.com',
    host: 'miluprana.com',
    accent: '#e5d3b3',
    estado: 'produccion',
    embebible: true,
    verificadoEl: '2026-09-16',
    resumen:
      'Una marca de barras de shampoo que necesitaba vender en línea sin verse como una plantilla. El sitio abre con el producto a pantalla completa, ordena el catálogo por producto y por ritual, y lleva el carrito adentro: no depende de un marketplace ni de comisiones de terceros.',
    destacados: [
      {
        titulo: 'Catálogo por producto y por ritual',
        detalle: 'Dos entradas al mismo catálogo, para quien busca un producto puntual y para quien busca una rutina.',
      },
      {
        titulo: 'Carrito propio',
        detalle: 'La compra vive dentro del sitio, sin salir a un marketplace.',
      },
      {
        titulo: 'Español e inglés',
        detalle: 'Todo el sitio cambia de idioma desde la barra superior, con la versión en español por defecto para Colombia.',
      },
      {
        titulo: 'WhatsApp a un toque',
        detalle: 'Botón flotante en todas las pantallas para resolver dudas antes de comprar.',
      },
      {
        titulo: 'Listo para que Google lo entienda',
        detalle: 'URL canónica, Open Graph, datos estructurados de organización, sitemap y robots.txt abierto.',
      },
    ],
    tecnica: [
      'Aplicación de una sola página, compilada con Vite y servida con archivos versionados por hash',
      'Animaciones con Framer Motion',
      'Datos del catálogo sobre Supabase',
      'Tipografías Cormorant Garamond, Montserrat y Outfit',
      'Alojado en Vercel sobre HTTPS con HSTS',
    ],
    shots: {
      desktop: '/trabajos/milu-desktop.webp',
      mobile: '/trabajos/milu-mobile.webp',
      og: '/trabajos/milu-og.jpg',
      altDesktop:
        'Portada de miluprana.com en escritorio: una barra de shampoo oscura sobre mármol, con el titular «Puro. Sólido. Deluxe» y el menú Productos y Rituales.',
      altMobile:
        'La misma portada de miluprana.com en un teléfono: menú compacto, titular en tres líneas y botón flotante de WhatsApp.',
    },
  },
  {
    id: 'dabo',
    slug: 'dabo',
    title: 'DABO',
    tagline: 'Sitio-experiencia de un DJ y productor, contado en seis capítulos con metraje propio.',
    kicker: 'WEB · EXPERIENCIA',
    rubro: 'Música electrónica · Cali, Colombia',
    url: 'https://dabomusica.com',
    host: 'dabomusica.com',
    accent: '#e0559a',
    estado: 'vista-previa',
    respetarNoindex: true,
    embebible: true,
    verificadoEl: '2026-09-16',
    resumen:
      'Un artista no se presenta con una grilla de fotos: se presenta con material. El sitio arranca reproduciendo metraje suyo y recorre seis capítulos —raíz, cabina, la voz invitada, la ruta de fechas y la página de contratación— con un reproductor de audio siempre a mano. Todo en una sola página que carga de una.',
    destacados: [
      {
        titulo: 'Seis capítulos, un solo scroll',
        detalle: 'De la portada a la página de contratación sin cambiar de página ni perder el reproductor.',
      },
      {
        titulo: 'Metraje propio como fondo',
        detalle: 'El video de sus sesiones se reproduce detrás del contenido; no es un banco de imágenes.',
      },
      {
        titulo: 'Reproductor fijo con sus tracks',
        detalle: 'Barra inferior con los títulos y los enlaces a SoundCloud, Spotify y Apple Music.',
      },
      {
        titulo: 'Archivo de fechas documentadas',
        detalle: 'Cada sesión con su ciudad, su mes y su galería propia de video y fotos.',
      },
      {
        titulo: 'Página de contratación',
        detalle: 'Formatos, rider y contacto de booking en un solo lugar, pensado para abrirse con datos móviles.',
      },
      {
        titulo: 'Plan B cuando el navegador bloquea el video',
        detalle: 'Si el autoplay se bloquea, el sitio lo avisa y ofrece activarlo a mano en vez de quedar en negro.',
      },
    ],
    tecnica: [
      'Una sola página HTML, sin framework de front-end',
      'Tipografías variables self-hosted (Anybody y IBM Plex Mono), precargadas',
      'Video propio servido como textura de fondo',
      'Alojado en Vercel sobre HTTPS con HSTS',
    ],
    shots: {
      desktop: '/trabajos/dabo-desktop.webp',
      mobile: '/trabajos/dabo-mobile.webp',
      og: '/trabajos/dabo-og.jpg',
      altDesktop:
        'Portada de dabomusica.com en escritorio: el logotipo DABO en grande sobre metraje en movimiento, con el reproductor de tracks fijo abajo.',
      altMobile:
        'La misma portada de dabomusica.com en un teléfono: logotipo centrado, botón Contratar y reproductor en la parte inferior.',
    },
  },
];

export const trabajosBySlug: Record<string, Trabajo> = Object.fromEntries(
  trabajos.map((t) => [t.slug, t]),
);

export function getTrabajo(slug: string): Trabajo | undefined {
  return trabajosBySlug[slug];
}

/** Texto visible del estado, para badges y para la ficha. */
export const ESTADOS: Record<EstadoTrabajo, { label: string; nota: string }> = {
  produccion: {
    label: 'En línea',
    nota: 'Publicado y abierto a buscadores.',
  },
  'vista-previa': {
    label: 'Vista previa',
    nota: 'El sitio está publicado, pero su propio robots.txt lo mantiene fuera de buscadores mientras el cliente termina de confirmar datos.',
  },
};

/** rel para los enlaces salientes: respeta el noindex del cliente cuando corresponde. */
export function relParaTrabajo(t: Trabajo): string {
  return t.respetarNoindex ? 'noopener noreferrer nofollow' : 'noopener noreferrer';
}
