// ─────────────────────────────────────────────────────────────
// VARIANTES POR NICHO — misma demo, distinta data de ejemplo.
// Un lead de imprenta que abre /demos/cotizador?nicho=impresion-3d ve un
// cotizador de impresión 3D (no de reformas). Convierte mucho más.
//
// El componente recibe un prop `variant`; si no hay, usa su data genérica.
// WF-B (prospección) apenda `&nicho=<key>` a la URL solo cuando existe variante.
// ─────────────────────────────────────────────────────────────

export interface CotizadorVariant {
  negocio: string;
  icono?: string;
  trabajos: { id: string; nombre: string; emoji: string; base: number }[];
  tamanos: { id: string; nombre: string; factor: number; hint: string }[];
  extras: { id: string; nombre: string; add: number }[];
}

export interface TurnoServicio {
  id: string;
  nombre: string;
  precio: number;
  dur: string;
  emoji: string;
}
export interface TurnosVariant {
  negocio: string;
  emoji: string;
  headerHint?: string;
  servicios: TurnoServicio[];
  recordatorios?: { emoji: string; title: string; detail: string }[];
}

export interface PedidoItem {
  id: string;
  nombre: string;
  precio: number;
  emoji: string;
}
export interface PedidosVariant {
  negocio: string;
  emoji: string;
  menu: PedidoItem[];
  direcciones?: string[];
  cierre?: string; // qué se lee en "cerrar pedido"
}

// ── Variantes de COTIZADOR ────────────────────────────────────
const COTIZADOR: Record<string, CotizadorVariant> = {
  'impresion-3d': {
    negocio: 'Imprenta 3D Bogotá',
    icono: '🖨️',
    trabajos: [
      { id: 'pla', nombre: 'Impresión PLA', emoji: '🧵', base: 35000 },
      { id: 'resina', nombre: 'Resina (alta def.)', emoji: '💧', base: 70000 },
      { id: 'proto', nombre: 'Prototipo funcional', emoji: '⚙️', base: 120000 },
      { id: 'lote', nombre: 'Lote / producción', emoji: '📦', base: 250000 },
    ],
    tamanos: [
      { id: 'chica', nombre: 'Pieza chica', factor: 1, hint: 'hasta 8 cm' },
      { id: 'mediana', nombre: 'Mediana', factor: 1.8, hint: '8–20 cm' },
      { id: 'grande', nombre: 'Grande', factor: 3.2, hint: 'más de 20 cm' },
    ],
    extras: [
      { id: 'diseno', nombre: 'Diseño 3D del modelo', add: 0.4 },
      { id: 'postproc', nombre: 'Pintado / postprocesado', add: 0.3 },
      { id: 'urgente', nombre: 'Entrega urgente (48 h)', add: 0.25 },
    ],
  },
  taller: {
    negocio: 'Taller El Motor',
    icono: '🔧',
    trabajos: [
      { id: 'aceite', nombre: 'Cambio de aceite', emoji: '🛢️', base: 90000 },
      { id: 'frenos', nombre: 'Frenos', emoji: '🛑', base: 180000 },
      { id: 'alineacion', nombre: 'Alineación y balanceo', emoji: '🎯', base: 120000 },
      { id: 'diagnostico', nombre: 'Diagnóstico completo', emoji: '🔍', base: 70000 },
    ],
    tamanos: [
      { id: 'moto', nombre: 'Moto', factor: 0.7, hint: '2 ruedas' },
      { id: 'auto', nombre: 'Auto', factor: 1, hint: 'sedán / hatchback' },
      { id: 'camioneta', nombre: 'Camioneta / SUV', factor: 1.5, hint: '4x4 / grande' },
    ],
    extras: [
      { id: 'repuestos', nombre: 'Repuestos incluidos', add: 0.5 },
      { id: 'recogida', nombre: 'Recogida a domicilio', add: 0.15 },
      { id: 'garantia', nombre: 'Garantía 6 meses', add: 0.1 },
    ],
  },
};

// ── Variantes de TURNOS ───────────────────────────────────────
const TURNOS: Record<string, TurnosVariant> = {
  barberia: {
    negocio: 'Barbería La Cuadra',
    emoji: '💈',
    headerHint: 'Reserva tu turno online',
    servicios: [
      { id: 'corte', nombre: 'Corte', precio: 20000, dur: '30 min', emoji: '✂️' },
      { id: 'barba', nombre: 'Barba', precio: 15000, dur: '20 min', emoji: '🧔' },
      { id: 'combo', nombre: 'Corte + Barba', precio: 30000, dur: '45 min', emoji: '💈' },
      { id: 'cejas', nombre: 'Perfilado de cejas', precio: 8000, dur: '15 min', emoji: '👁️' },
    ],
  },
  peluqueria: {
    negocio: 'Salón Bella',
    emoji: '💇‍♀️',
    headerHint: 'Reserva tu cita online',
    servicios: [
      { id: 'corte', nombre: 'Corte dama', precio: 35000, dur: '45 min', emoji: '💇‍♀️' },
      { id: 'color', nombre: 'Color', precio: 90000, dur: '2 h', emoji: '🎨' },
      { id: 'mechas', nombre: 'Mechas / balayage', precio: 150000, dur: '3 h', emoji: '✨' },
      { id: 'keratina', nombre: 'Keratina', precio: 120000, dur: '2 h', emoji: '💧' },
    ],
    recordatorios: [
      { emoji: '✅', title: 'Cita confirmada', detail: 'Te llega la confirmación por WhatsApp' },
      { emoji: '📲', title: 'Recordatorio 24 h antes', detail: '"Te esperamos mañana, ¿confirmas?"' },
      { emoji: '⏰', title: 'Recordatorio 2 h antes', detail: '"Tu cita es en un rato ✨"' },
      { emoji: '🎉', title: '¡Asististe!', detail: 'Sin ausencias, agenda llena' },
    ],
  },
  odontologia: {
    negocio: 'Clínica Dental Sonríe',
    emoji: '🦷',
    headerHint: 'Agenda tu cita online',
    servicios: [
      { id: 'valoracion', nombre: 'Valoración', precio: 30000, dur: '20 min', emoji: '🔎' },
      { id: 'limpieza', nombre: 'Limpieza dental', precio: 80000, dur: '40 min', emoji: '🪥' },
      { id: 'blanqueamiento', nombre: 'Blanqueamiento', precio: 350000, dur: '1 h', emoji: '⚪' },
      { id: 'resina', nombre: 'Resina / calza', precio: 150000, dur: '45 min', emoji: '🦷' },
    ],
    recordatorios: [
      { emoji: '✅', title: 'Cita confirmada', detail: 'Te llega la confirmación por WhatsApp' },
      { emoji: '📲', title: 'Recordatorio 24 h antes', detail: '"Te esperamos mañana en la clínica 🦷"' },
      { emoji: '⏰', title: 'Recordatorio 2 h antes', detail: '"Tu cita es en un rato, no faltes"' },
      { emoji: '🎉', title: '¡Asististe!', detail: 'Sin ausencias, sillón siempre ocupado' },
    ],
  },
};

// ── Variantes de PEDIDOS ──────────────────────────────────────
const PEDIDOS: Record<string, PedidosVariant> = {
  restaurante: {
    negocio: 'Sabor Bogotano',
    emoji: '🍽️',
    menu: [
      { id: 'bandeja', nombre: 'Bandeja paisa', precio: 28000, emoji: '🫘' },
      { id: 'ajiaco', nombre: 'Ajiaco santafereño', precio: 24000, emoji: '🍲' },
      { id: 'sancocho', nombre: 'Sancocho de gallina', precio: 26000, emoji: '🍗' },
      { id: 'arepa', nombre: 'Arepa rellena', precio: 12000, emoji: '🫓' },
      { id: 'jugo', nombre: 'Jugo natural', precio: 6000, emoji: '🥤' },
    ],
    direcciones: ['Calle 85 #12-30', 'Carrera 15 #93-45', 'Otra dirección…'],
  },
};

const REGISTRO = {
  cotizador: COTIZADOR,
  turnos: TURNOS,
  pedidos: PEDIDOS,
} as const;

// Alias: la prospección puede mandar plurales/variantes de nombre → clave canónica.
const ALIAS: Record<string, string> = {
  imprenta: 'impresion-3d',
  'impresion3d': 'impresion-3d',
  'impresion-3d': 'impresion-3d',
  impresion: 'impresion-3d',
  '3d': 'impresion-3d',
  talleres: 'taller',
  'taller-mecanico': 'taller',
  mecanica: 'taller',
  barberias: 'barberia',
  peluquerias: 'peluqueria',
  peluqueria: 'peluqueria',
  odontologos: 'odontologia',
  odontologo: 'odontologia',
  dentista: 'odontologia',
  restaurantes: 'restaurante',
};

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Devuelve la variante para (slug, nicho) o undefined si no hay. */
export function getVariant(slug: string, nicho: string | null | undefined): unknown | undefined {
  if (!nicho) return undefined;
  const tabla = (REGISTRO as Record<string, Record<string, unknown>>)[slug];
  if (!tabla) return undefined;
  const key = norm(nicho);
  return tabla[key] ?? tabla[ALIAS[key] ?? ''] ?? undefined;
}

/** ¿Existe variante para este par? (lo usa WF-B para decidir si apendear &nicho). */
export function hasVariant(slug: string, nicho: string): boolean {
  return getVariant(slug, nicho) !== undefined;
}
