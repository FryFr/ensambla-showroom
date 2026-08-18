import { useEffect, useRef, useState } from 'react';

// Panel de control "reemplazá la planilla". Fachada con datos falsos que se
// actualizan en vivo (setInterval). Comercio ficticio: "Almacén Central".

const ARS = (n: number) => '$' + n.toLocaleString('es-AR');

const VENTAS_SEMANA = [
  { dia: 'Lun', v: 62 },
  { dia: 'Mar', v: 48 },
  { dia: 'Mié', v: 71 },
  { dia: 'Jue', v: 55 },
  { dia: 'Vie', v: 89 },
  { dia: 'Sáb', v: 100 },
  { dia: 'Hoy', v: 43 },
];

const PRODUCTOS_VENTA = ['Café molido 500g', 'Yerba 1kg', 'Aceite de oliva', 'Galletitas', 'Gaseosa 2,25L', 'Fideos', 'Arroz 1kg'];
const STOCK_BAJO = [
  { nombre: 'Yerba 1kg', quedan: 3 },
  { nombre: 'Aceite de oliva', quedan: 2 },
  { nombre: 'Papel higiénico x4', quedan: 5 },
];

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function PanelDemo() {
  const [ventasHoy, setVentasHoy] = useState(184300);
  const [pedidos, setPedidos] = useState(43);
  const [toast, setToast] = useState<string | null>(null);
  const [hoyBar, setHoyBar] = useState(43);
  const toastTimer = useRef<number | null>(null);

  function nuevaVenta() {
    const prod = PRODUCTOS_VENTA[Math.floor((pedidos * 7) % PRODUCTOS_VENTA.length)];
    const monto = 1500 + ((pedidos * 733) % 6000);
    setVentasHoy((v) => v + monto);
    setPedidos((p) => p + 1);
    setHoyBar((b) => Math.min(100, b + 4));
    setToast(`🛒 Nueva venta · ${prod} · ${ARS(monto)}`);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }

  useEffect(() => {
    if (prefersReduced()) return;
    const id = window.setInterval(nuevaVenta, 3800);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidos]);

  const ticket = Math.round(ventasHoy / pedidos);
  const maxBar = Math.max(...VENTAS_SEMANA.map((d) => d.v), hoyBar);

  return (
    <div className="card relative overflow-hidden p-5 sm:p-6">
      {/* Barra superior */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display font-semibold">Almacén Central · Panel</p>
          <p className="techlabel flex items-center gap-1.5">
            <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-accent-lime" />
            En vivo · datos de ejemplo
          </p>
        </div>
        <button
          onClick={nuevaVenta}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
        >
          + Simular venta
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Ventas hoy" value={ARS(ventasHoy)} tone="accent" />
        <Kpi label="Pedidos hoy" value={String(pedidos)} tone="lime" />
        <Kpi label="Ticket promedio" value={ARS(ticket)} />
        <Kpi label="Productos con stock bajo" value={String(STOCK_BAJO.length)} tone="signal" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Gráfico de ventas */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="techlabel mb-3">Ventas de la semana</p>
          <div className="flex items-end justify-between gap-2">
            {VENTAS_SEMANA.map((d) => {
              const val = d.dia === 'Hoy' ? hoyBar : d.v;
              const hpx = Math.max(6, Math.round((val / maxBar) * 150));
              const isHoy = d.dia === 'Hoy';
              return (
                <div key={d.dia} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${hpx}px`,
                      background: isHoy ? 'var(--color-accent-lime)' : 'color-mix(in srgb, var(--color-accent) 55%, transparent)',
                    }}
                  />
                  <span className={`text-[0.65rem] ${isHoy ? 'font-semibold text-accent-lime' : 'text-ink-muted'}`}>{d.dia}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alertas de stock */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="techlabel mb-3 flex items-center gap-1.5">
            <span className="text-signal">⚠️</span> Repón stock
          </p>
          <ul className="space-y-2">
            {STOCK_BAJO.map((s) => (
              <li key={s.nombre} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-sm">
                <span className="truncate">{s.nombre}</span>
                <span className="ml-2 shrink-0 rounded-full bg-signal/15 px-2 py-0.5 text-xs font-semibold text-signal">
                  {s.quedan} u.
                </span>
              </li>
            ))}
          </ul>
          <p className="techlabel mt-3 border-t border-white/5 pt-3">Todo en una pantalla, sin planillas</p>
        </div>
      </div>

      {/* Toast nueva venta */}
      {toast && (
        <div className="toast-in absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent-lime/30 bg-surface px-4 py-2.5 text-sm shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: 'accent' | 'lime' | 'signal' }) {
  const color =
    tone === 'accent' ? 'text-accent' : tone === 'lime' ? 'text-accent-lime' : tone === 'signal' ? 'text-signal' : 'text-ink';
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <p className="techlabel">{label}</p>
      <p className={`mt-1.5 font-display text-2xl font-bold tabular-nums ${color}`}>{value}</p>
    </div>
  );
}
