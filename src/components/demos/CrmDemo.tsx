import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';

// CRM Kanban. Datos falsos en memoria. Drag & drop con @dnd-kit.
// Tarjetas arrastrables entre etapas + panel de detalle + toast de nuevo lead.

type Stage = 'nuevo' | 'contactado' | 'propuesta' | 'ganado';
const STAGES: { id: Stage; label: string; color: string }[] = [
  { id: 'nuevo', label: 'Nuevo', color: '#38E8FF' },
  { id: 'contactado', label: 'Contactado', color: '#7C9CFF' },
  { id: 'propuesta', label: 'Propuesta', color: '#FFB443' },
  { id: 'ganado', label: 'Ganado', color: '#7CFF6B' },
];

interface Lead {
  id: string;
  nombre: string;
  empresa: string;
  valor: number;
  fuente: string;
  stage: Stage;
  notas: string;
}

const ARS = (n: number) => '$' + n.toLocaleString('es-CO');

const LEADS_INICIALES: Lead[] = [
  { id: 'l1', nombre: 'María González', empresa: 'Panadería El Trigo', valor: 180000, fuente: 'Instagram', stage: 'nuevo', notas: 'Quiere una tienda online para vender por delivery.' },
  { id: 'l2', nombre: 'Carlos Ruiz', empresa: 'Gimnasio Titan', valor: 320000, fuente: 'Referido', stage: 'nuevo', notas: 'Necesita un bot de reservas de clases.' },
  { id: 'l3', nombre: 'Ana Torres', empresa: 'Estudio Torres', valor: 95000, fuente: 'Web', stage: 'contactado', notas: 'Sitio informativo para su estudio de arquitectura.' },
  { id: 'l4', nombre: 'Julián Paz', empresa: 'Distribuidora Sur', valor: 540000, fuente: 'LinkedIn', stage: 'propuesta', notas: 'Automatización de pedidos mayoristas. Propuesta enviada.' },
  { id: 'l5', nombre: 'Lucía Méndez', empresa: 'Café Aroma', valor: 210000, fuente: 'WhatsApp', stage: 'ganado', notas: 'Chatbot de atención. ¡Cerrado! 🎉' },
];

const NOMBRES_NUEVOS = [
  { nombre: 'Roberto Díaz', empresa: 'Ferretería Central', fuente: 'Instagram', notas: 'Vio la demo de e-commerce y quiere una igual.' },
  { nombre: 'Valentina Sosa', empresa: 'Óptica Visión', fuente: 'Google', notas: 'Consulta por landing de campaña.' },
  { nombre: 'Martín Alba', empresa: 'Pet Shop Guau', fuente: 'Referido', notas: 'Quiere bot de pedidos para delivery de comida de mascotas.' },
];

export default function CrmDemo() {
  const [leads, setLeads] = useState<Lead[]>(LEADS_INICIALES);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [nuevoIdx, setNuevoIdx] = useState(0);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(e: DragEndEvent) {
    const stage = e.over?.id as Stage | undefined;
    if (!stage) return;
    setLeads((ls) => ls.map((l) => (l.id === e.active.id ? { ...l, stage } : l)));
  }

  function nuevoLead() {
    const base = NOMBRES_NUEVOS[nuevoIdx % NOMBRES_NUEVOS.length];
    setNuevoIdx((i) => i + 1);
    const lead: Lead = {
      id: 'n' + Date.now(),
      valor: Math.floor((80 + Math.floor(nuevoIdx * 47) % 400) * 1000),
      stage: 'nuevo',
      ...base,
    };
    setLeads((ls) => [lead, ...ls]);
    setToast(`✨ Nuevo lead: ${lead.nombre} · ${lead.empresa}`);
    window.setTimeout(() => setToast(null), 3200);
  }

  const totalPipeline = leads.filter((l) => l.stage !== 'ganado').reduce((s, l) => s + l.valor, 0);

  return (
    <div className="card relative overflow-hidden p-0">
      {/* Barra superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-3.5">
        <div>
          <p className="font-display font-semibold">Pipeline de ventas</p>
          <p className="techlabel">En pipeline: {ARS(totalPipeline)} · {leads.length} leads</p>
        </div>
        <button
          onClick={nuevoLead}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
        >
          + Simular nuevo lead
        </button>
      </div>

      {/* Tablero */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 gap-3 overflow-x-auto p-4 lg:grid-cols-4">
          {STAGES.map((s) => (
            <Column
              key={s.id}
              stage={s}
              leads={leads.filter((l) => l.stage === s.id)}
              onOpen={setSelected}
            />
          ))}
        </div>
      </DndContext>

      {/* Panel de detalle */}
      {selected && (
        <div
          className="absolute inset-0 z-20 flex bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <aside
            className="ml-auto h-full w-full max-w-xs bg-surface p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-lg font-bold text-accent">
                {selected.nombre.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </span>
              <button onClick={() => setSelected(null)} className="text-ink-muted" aria-label="Cerrar">✕</button>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{selected.nombre}</h3>
            <p className="text-sm text-ink-muted">{selected.empresa}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <Row k="Valor estimado" v={ARS(selected.valor)} />
              <Row k="Fuente" v={selected.fuente} />
              <Row k="Etapa" v={STAGES.find((s) => s.id === selected.stage)?.label ?? ''} />
            </dl>
            <div className="mt-4 rounded-xl border border-white/10 p-3">
              <p className="techlabel">Notas</p>
              <p className="mt-1 text-sm text-ink">{selected.notas}</p>
            </div>
            <p className="mt-4 techlabel">🧪 Datos de ejemplo</p>
          </aside>
        </div>
      )}

      {/* Toast nuevo lead */}
      {toast && (
        <div className="toast-in absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-accent/40 bg-surface px-4 py-2.5 text-sm shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function Column({
  stage,
  leads,
  onOpen,
}: {
  stage: { id: Stage; label: string; color: string };
  leads: Lead[];
  onOpen: (l: Lead) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-48 rounded-2xl border p-2.5 transition-colors ${
        isOver ? 'border-accent/50 bg-accent/5' : 'border-white/8 bg-white/[0.02]'
      }`}
    >
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-full" style={{ background: stage.color }} />
        <span className="text-sm font-semibold">{stage.label}</span>
        <span className="ml-auto techlabel">{leads.length}</span>
      </div>
      <div className="space-y-2">
        {leads.map((l) => (
          <Card key={l.id} lead={l} accent={stage.color} onOpen={onOpen} />
        ))}
        {leads.length === 0 && (
          <p className="px-1 py-4 text-center text-xs text-ink-muted">Suelta una tarjeta aquí</p>
        )}
      </div>
    </div>
  );
}

function Card({ lead, accent, onOpen }: { lead: Lead; accent: string; onOpen: (l: Lead) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: lead.id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => !isDragging && onOpen(lead)}
      className={`cursor-grab touch-none rounded-xl border border-white/10 bg-surface-2 p-3 active:cursor-grabbing ${
        isDragging ? 'opacity-80 shadow-2xl' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{lead.nombre}</p>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      </div>
      <p className="text-xs text-ink-muted">{lead.empresa}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: accent }}>{ARS(lead.valor)}</span>
        <span className="techlabel text-[0.6rem]">{lead.fuente}</span>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <dt className="text-ink-muted">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
