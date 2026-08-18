import { useState } from 'react';

// Recuperador de conversaciones. Detecta el lead que preguntó y nunca le
// contestaron (o no volvió), y dispara un seguimiento automático. Datos ficticios.

type Lead = {
  id: number;
  nombre: string;
  canal: string;
  ultimo: string;
  dias: number;
  msg: string;
  estado: 'frio' | 'enviado' | 'recuperado';
};

const INICIAL: Lead[] = [
  { id: 1, nombre: 'Laura Gómez', canal: 'WhatsApp', ultimo: '“¿Hacen domicilio a Suba?”', dias: 4, msg: '', estado: 'frio' },
  { id: 2, nombre: 'Andrés Ríos', canal: 'Instagram', ultimo: '“Me interesa el combo x2”', dias: 6, msg: '', estado: 'frio' },
  { id: 3, nombre: 'Ferretería JR', canal: 'WhatsApp', ultimo: '“Pásame cotización”', dias: 3, msg: '', estado: 'frio' },
  { id: 4, nombre: 'Camila Ortiz', canal: 'Web', ultimo: '“¿Tienen talla L?”', dias: 8, msg: '', estado: 'frio' },
];

const SEGUIMIENTO = (nombre: string) =>
  `Hola ${nombre.split(' ')[0]} 👋 Vi que nos escribiste hace unos días y no alcanzamos a cerrarlo. ¿Seguimos? Tengo disponibilidad hoy.`;

export default function RecuperadorDemo() {
  const [leads, setLeads] = useState<Lead[]>(INICIAL);
  const [corriendo, setCorriendo] = useState(false);

  function activar() {
    if (corriendo) return;
    setCorriendo(true);
    const frios = leads.filter((l) => l.estado === 'frio');
    frios.forEach((lead, i) => {
      // envía el seguimiento
      window.setTimeout(() => {
        setLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, estado: 'enviado', msg: SEGUIMIENTO(l.nombre) } : l)),
        );
        // y algunos "responden" → recuperados
        window.setTimeout(() => {
          setLeads((prev) => prev.map((l) => (l.id === lead.id && i % 3 !== 2 ? { ...l, estado: 'recuperado' } : l)));
          if (i === frios.length - 1) setCorriendo(false);
        }, 900);
      }, i * 700);
    });
  }

  const recuperados = leads.filter((l) => l.estado === 'recuperado').length;
  const frios = leads.filter((l) => l.estado === 'frio').length;

  return (
    <div className="card relative overflow-hidden p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display font-semibold">Conversaciones sin cerrar</p>
          <p className="techlabel flex items-center gap-1.5">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${frios ? 'bg-signal' : 'bg-accent-lime'}`} />
            {frios ? `${frios} leads enfriándose` : 'Todos con seguimiento'} · datos de ejemplo
          </p>
        </div>
        <div className="flex items-center gap-3">
          {recuperados > 0 && (
            <span className="rounded-full bg-accent-lime/15 px-3 py-1 text-sm font-semibold text-accent-lime">
              +{recuperados} recuperados
            </span>
          )}
          <button
            onClick={activar}
            disabled={corriendo || frios === 0}
            className="rounded-full bg-signal px-4 py-2 text-sm font-semibold text-signal-ink transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {corriendo ? 'Enviando…' : '⚡ Activar seguimiento'}
          </button>
        </div>
      </div>

      <ul className="space-y-2.5">
        {leads.map((l) => (
          <li key={l.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-medium">
                  {l.nombre}
                  <span className="techlabel rounded bg-white/5 px-1.5 py-0.5">{l.canal}</span>
                </p>
                <p className="truncate text-sm text-ink-muted">{l.ultimo}</p>
              </div>
              <span className="shrink-0 text-right">
                {l.estado === 'frio' && <span className="text-xs text-signal">hace {l.dias} días 🥶</span>}
                {l.estado === 'enviado' && <span className="text-xs text-accent">seguimiento enviado ✓</span>}
                {l.estado === 'recuperado' && (
                  <span className="text-xs font-semibold text-accent-lime">respondió 🔥</span>
                )}
              </span>
            </div>
            {l.msg && (
              <div className="mt-2.5 rounded-xl rounded-tl-sm border border-accent/20 bg-accent/[0.06] px-3 py-2 text-sm">
                {l.msg}
              </div>
            )}
          </li>
        ))}
      </ul>

      <p className="techlabel mt-4 border-t border-white/5 pt-3">
        El bot detecta al que preguntó y no volvió, y lo trae de vuelta — mientras tú atiendes a los demás.
      </p>
    </div>
  );
}
