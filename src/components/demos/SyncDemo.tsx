import { useState } from 'react';

// Sincronizador. "Mi web, mi Excel y mi inventario no se hablan." Muestra 3
// fuentes con el stock de un producto en números distintos y las unifica.

type Fuente = { nombre: string; icono: string; valor: number };

const PRODUCTO = 'Camiseta negra · Talla M';
const REAL = 34;

const INICIAL: Fuente[] = [
  { nombre: 'Tienda web', icono: '🌐', valor: 41 },
  { nombre: 'Excel de bodega', icono: '📊', valor: 34 },
  { nombre: 'Punto de venta', icono: '🏪', valor: 29 },
];

export default function SyncDemo() {
  const [fuentes, setFuentes] = useState<Fuente[]>(INICIAL);
  const [estado, setEstado] = useState<'desync' | 'sync' | 'ok'>('desync');

  const desincronizadas = new Set(fuentes.map((f) => f.valor)).size > 1;

  function sincronizar() {
    if (estado === 'sync') return;
    setEstado('sync');
    // anima cada fuente hacia el valor real, escalonado
    fuentes.forEach((_, i) => {
      window.setTimeout(() => {
        setFuentes((prev) => prev.map((f, j) => (j === i ? { ...f, valor: REAL } : f)));
        if (i === fuentes.length - 1) window.setTimeout(() => setEstado('ok'), 400);
      }, 500 + i * 550);
    });
  }

  function reset() {
    setFuentes(INICIAL);
    setEstado('desync');
  }

  return (
    <div className="card relative overflow-hidden p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display font-semibold">Stock de: {PRODUCTO}</p>
          <p className="techlabel flex items-center gap-1.5">
            {estado === 'ok' ? (
              <>
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-accent-lime" />
                Sincronizado · las 3 fuentes coinciden
              </>
            ) : (
              <>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                Desincronizado · cada sistema dice algo distinto
              </>
            )}
          </p>
        </div>
        {estado === 'ok' ? (
          <button
            onClick={reset}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            ↺ Ver de nuevo
          </button>
        ) : (
          <button
            onClick={sincronizar}
            disabled={estado === 'sync'}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {estado === 'sync' ? 'Sincronizando…' : '🔄 Sincronizar'}
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {fuentes.map((f) => {
          const coincide = f.valor === REAL;
          return (
            <div
              key={f.nombre}
              className={`rounded-2xl border p-4 text-center transition-colors duration-500 ${
                estado !== 'desync' && coincide
                  ? 'border-accent-lime/40 bg-accent-lime/[0.06]'
                  : 'border-signal/30 bg-signal/[0.05]'
              }`}
            >
              <span className="text-2xl">{f.icono}</span>
              <p className="mt-1 text-sm text-ink-muted">{f.nombre}</p>
              <p
                className={`mt-2 font-display text-3xl font-bold tabular-nums transition-colors duration-500 ${
                  estado !== 'desync' && coincide ? 'text-accent-lime' : 'text-signal'
                }`}
              >
                {f.valor}
              </p>
              <p className="techlabel">unidades</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-ink-muted">
        {estado === 'ok' ? (
          <>
            ✅ Un cliente compró por la web y el stock bajó <strong className="text-ink">en todos lados a la vez</strong>. Nunca
            más vendes algo que no tienes.
          </>
        ) : (
          <>
            😵 Con {desincronizadas ? 'estos números' : 'stock desparejo'} vendes de más, quedas mal y pierdes plata. El
            sincronizador los deja siempre iguales, solo.
          </>
        )}
      </div>
    </div>
  );
}
