import { useState } from 'react';

// Portal de clientes B2B. El cliente entra y ve su proyecto: estado, documentos
// e historial — sin llamar ni escribir mails. Empresa ficticia: "Constructora Andina S.A.S."

const COP = (n: number) => '$' + n.toLocaleString('es-CO');

const FASES = [
  { nombre: 'Diseño', estado: 'listo' as const },
  { nombre: 'Desarrollo', estado: 'curso' as const },
  { nombre: 'Pruebas', estado: 'pend' as const },
  { nombre: 'Entrega', estado: 'pend' as const },
];

const DOCS = [
  { nombre: 'Contrato-2026.pdf', peso: '240 KB', tipo: '📄' },
  { nombre: 'Factura-0012.pdf', peso: '98 KB', tipo: '🧾' },
  { nombre: 'Propuesta-tecnica.pdf', peso: '1,2 MB', tipo: '📐' },
  { nombre: 'Manual-de-uso.pdf', peso: '560 KB', tipo: '📘' },
];

const HISTORIAL = [
  { fecha: '18 ago', txt: 'Se cargó la Factura-0012 · saldo actualizado' },
  { fecha: '15 ago', txt: 'Fase "Diseño" aprobada por el cliente' },
  { fecha: '11 ago', txt: 'Reunión de arranque · alcance confirmado' },
  { fecha: '08 ago', txt: 'Proyecto creado en el portal' },
];

type Tab = 'estado' | 'docs' | 'historial';

export default function PortalDemo() {
  const [tab, setTab] = useState<Tab>('estado');
  const [toast, setToast] = useState<string | null>(null);

  function descargar(nombre: string) {
    setToast(`⬇️ Descargando ${nombre}…`);
    window.setTimeout(() => setToast(null), 2200);
  }

  const listas = FASES.filter((f) => f.estado === 'listo').length;
  const pct = Math.round(((listas + 0.5) / FASES.length) * 100);

  return (
    <div className="card relative overflow-hidden p-5 sm:p-6">
      {/* Barra superior: el cliente logueado */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 font-display font-bold text-accent">
            CA
          </div>
          <div>
            <p className="font-display font-semibold">Constructora Andina S.A.S.</p>
            <p className="techlabel flex items-center gap-1.5">
              <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-accent-lime" />
              Sesión iniciada · datos de ejemplo
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="techlabel">Saldo pendiente</p>
          <p className="font-display text-lg font-bold text-signal">{COP(2400000)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-full bg-white/[0.03] p-1 text-sm">
        {(
          [
            ['estado', 'Estado'],
            ['docs', 'Documentos'],
            ['historial', 'Historial'],
          ] as [Tab, string][]
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`flex-1 rounded-full px-3 py-1.5 font-medium transition-colors ${
              tab === k ? 'bg-accent text-base' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'estado' && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium">Sitio web + panel</p>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {pct}% avanzado
            </span>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <ol className="space-y-2.5">
            {FASES.map((f) => (
              <li key={f.nombre} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${
                    f.estado === 'listo'
                      ? 'bg-accent-lime/20 text-accent-lime'
                      : f.estado === 'curso'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-white/5 text-ink-muted'
                  }`}
                >
                  {f.estado === 'listo' ? '✓' : f.estado === 'curso' ? '●' : '○'}
                </span>
                <span className={f.estado === 'pend' ? 'text-ink-muted' : ''}>{f.nombre}</span>
                {f.estado === 'curso' && <span className="techlabel ml-auto text-accent">en curso</span>}
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === 'docs' && (
        <ul className="space-y-2">
          {DOCS.map((d) => (
            <li
              key={d.nombre}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
            >
              <span className="flex items-center gap-3 text-sm">
                <span className="text-xl">{d.tipo}</span>
                <span>
                  <span className="block">{d.nombre}</span>
                  <span className="techlabel">{d.peso}</span>
                </span>
              </span>
              <button
                onClick={() => descargar(d.nombre)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Descargar
              </button>
            </li>
          ))}
        </ul>
      )}

      {tab === 'historial' && (
        <ol className="relative space-y-4 pl-5">
          <span className="absolute left-1.5 top-1 bottom-1 w-px bg-white/10" />
          {HISTORIAL.map((h) => (
            <li key={h.fecha} className="relative text-sm">
              <span className="absolute -left-[13px] top-1 h-2 w-2 rounded-full bg-accent" />
              <span className="techlabel">{h.fecha}</span>
              <p className="text-ink-muted">{h.txt}</p>
            </li>
          ))}
        </ol>
      )}

      {toast && (
        <div className="toast-in absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/30 bg-surface px-4 py-2.5 text-sm shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
