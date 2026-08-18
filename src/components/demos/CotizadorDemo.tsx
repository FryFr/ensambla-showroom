import { useMemo, useState } from 'react';
import type { CotizadorVariant } from '../../data/variants';

// Cotizador instantáneo. Fachada: recalcula un rango de precio en vivo.
// Data genérica (fallback): reformas del hogar "Obra Fina". Con ?nicho= usa otra.

const ARS = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');

const DEFAULT_COTIZADOR: CotizadorVariant = {
  negocio: 'Obra Fina',
  icono: '🧮',
  trabajos: [
    { id: 'pintura', nombre: 'Pintura', emoji: '🎨', base: 60000 },
    { id: 'plomeria', nombre: 'Plomería', emoji: '🔧', base: 45000 },
    { id: 'electricidad', nombre: 'Electricidad', emoji: '💡', base: 55000 },
    { id: 'completa', nombre: 'Reforma completa', emoji: '🏗️', base: 180000 },
  ],
  tamanos: [
    { id: 'chico', nombre: 'Ambiente chico', factor: 1, hint: 'hasta 15 m²' },
    { id: 'mediano', nombre: 'Mediano', factor: 1.8, hint: '15–35 m²' },
    { id: 'grande', nombre: 'Grande', factor: 3, hint: 'más de 35 m²' },
  ],
  extras: [
    { id: 'materiales', nombre: 'Materiales incluidos', add: 0.35 },
    { id: 'urgente', nombre: 'Entrega urgente (48 h)', add: 0.25 },
    { id: 'garantia', nombre: 'Garantía extendida', add: 0.1 },
  ],
};

type Step = 'form' | 'enviado';

export default function CotizadorDemo({ variant }: { variant?: CotizadorVariant }) {
  const cfg = variant ?? DEFAULT_COTIZADOR;
  const { negocio: NEGOCIO, icono, trabajos: TRABAJOS, tamanos: TAMANOS, extras: EXTRAS } = cfg;
  const [trabajo, setTrabajo] = useState(TRABAJOS[0].id);
  const [tamano, setTamano] = useState(TAMANOS[0].id);
  const [extras, setExtras] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState<Step>('form');

  const quote = useMemo(() => {
    const t = TRABAJOS.find((x) => x.id === trabajo)!;
    const sz = TAMANOS.find((x) => x.id === tamano)!;
    const extraFactor = EXTRAS.reduce((acc, e) => acc + (extras[e.id] ? e.add : 0), 0);
    const base = t.base * sz.factor * (1 + extraFactor);
    return { min: base * 0.9, max: base * 1.15, trabajo: t, tamano: sz };
  }, [trabajo, tamano, extras]);

  const extrasElegidos = EXTRAS.filter((e) => extras[e.id]).map((e) => e.nombre);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="card grid gap-0 overflow-hidden md:grid-cols-[1.2fr_1fr]">
        {/* Opciones */}
        <div className="p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-xl">{icono}</span>
            <div>
              <p className="font-display font-semibold leading-tight">{NEGOCIO}</p>
              <p className="techlabel">Cotización al instante</p>
            </div>
          </div>

          <Label>Tipo de trabajo</Label>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {TRABAJOS.map((t) => (
              <Choice key={t.id} active={trabajo === t.id} onClick={() => setTrabajo(t.id)}>
                <span className="mr-1">{t.emoji}</span> {t.nombre}
              </Choice>
            ))}
          </div>

          <Label>Tamaño</Label>
          <div className="mb-4 space-y-2">
            {TAMANOS.map((s) => (
              <Choice key={s.id} active={tamano === s.id} onClick={() => setTamano(s.id)} full>
                <span className="flex items-center justify-between">
                  <span>{s.nombre}</span>
                  <span className="text-xs opacity-70">{s.hint}</span>
                </span>
              </Choice>
            ))}
          </div>

          <Label>Extras</Label>
          <div className="flex flex-wrap gap-2">
            {EXTRAS.map((e) => {
              const on = !!extras[e.id];
              return (
                <button
                  key={e.id}
                  onClick={() => setExtras((x) => ({ ...x, [e.id]: !x[e.id] }))}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                    on ? 'bg-accent font-semibold text-base' : 'border border-white/15 text-ink-muted hover:text-ink'
                  }`}
                >
                  {on ? '✓ ' : '+ '}
                  {e.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cotización en vivo */}
        <div className="flex flex-col justify-between border-t border-white/10 bg-white/[0.02] p-6 md:border-l md:border-t-0">
          {step === 'form' ? (
            <>
              <div>
                <p className="techlabel">Tu presupuesto estimado</p>
                <p className="mt-2 font-display text-3xl font-bold leading-none text-accent">
                  {ARS(quote.min)}
                </p>
                <p className="mt-1 text-sm text-ink-muted">a {ARS(quote.max)}</p>

                <ul className="mt-5 space-y-1.5 text-sm text-ink-muted">
                  <li className="flex justify-between"><span>Trabajo</span><span className="text-ink">{quote.trabajo.nombre}</span></li>
                  <li className="flex justify-between"><span>Tamaño</span><span className="text-ink">{quote.tamano.nombre}</span></li>
                  {extrasElegidos.length > 0 && (
                    <li className="flex justify-between gap-2">
                      <span>Extras</span>
                      <span className="text-right text-ink">{extrasElegidos.join(', ')}</span>
                    </li>
                  )}
                </ul>
              </div>

              <button
                onClick={() => setStep('enviado')}
                className="mt-6 w-full rounded-full bg-signal py-3 font-semibold text-signal-ink transition-transform hover:-translate-y-0.5"
              >
                Recibir por WhatsApp →
              </button>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              {/* Preview de burbuja de WhatsApp (fachada) */}
              <div className="success-check w-full rounded-2xl bg-[#005c4b] p-3 text-left text-sm text-white">
                <p className="font-semibold">{NEGOCIO} · WhatsApp</p>
                <p className="mt-1 text-white/90">
                  ¡Hola! Tu presupuesto para <b>{quote.trabajo.nombre.toLowerCase()}</b> ({quote.tamano.nombre.toLowerCase()}) es de <b>{ARS(quote.min)}</b> a <b>{ARS(quote.max)}</b>. ¿Coordinamos una visita? 🛠️
                </p>
              </div>
              <p className="mt-4 font-display font-bold">¡Cotización enviada!</p>
              <p className="mt-1 text-xs text-ink-muted">Así de rápido captura y responde a un cliente.</p>
              <button
                onClick={() => setStep('form')}
                className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-accent/40"
              >
                Probar otra cotización
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-medium">{children}</p>;
}

function Choice({
  children,
  active,
  onClick,
  full = false,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-3 py-2.5 text-sm transition-all ${full ? 'w-full text-left' : ''} ${
        active ? 'border-accent bg-accent/10 font-semibold' : 'border-white/12 hover:border-accent/40'
      }`}
    >
      {children}
    </button>
  );
}
