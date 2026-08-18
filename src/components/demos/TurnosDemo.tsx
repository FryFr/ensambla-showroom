import { useEffect, useState } from 'react';
import type { TurnosVariant } from '../../data/variants';

// Turnos con recordatorios anti-ausentismo. Fachada, sin backend.
// Flujo: servicio → día y hora → confirmar → línea de recordatorios automáticos.

interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  dur: string;
  emoji: string;
}
const SERVICIOS: Servicio[] = [
  { id: 'corte', nombre: 'Corte', precio: 7000, dur: '30 min', emoji: '✂️' },
  { id: 'color', nombre: 'Color', precio: 15000, dur: '90 min', emoji: '🎨' },
  { id: 'barba', nombre: 'Barba', precio: 4500, dur: '20 min', emoji: '🧔' },
  { id: 'combo', nombre: 'Corte + Barba', precio: 10000, dur: '45 min', emoji: '💈' },
];

const DIAS = ['Hoy', 'Mañana', 'Sáb 9', 'Lun 11'];
const HORARIOS = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];

const ARS = (n: number) => '$' + n.toLocaleString('es-CO');

const RECORDATORIOS = [
  { emoji: '✅', title: 'Turno confirmado', detail: 'Te llega la confirmación por WhatsApp' },
  { emoji: '📲', title: 'Recordatorio 24 h antes', detail: '"Te esperamos mañana, ¿confirmas?"' },
  { emoji: '⏰', title: 'Recordatorio 2 h antes', detail: '"Tu turno es en un rato 💈"' },
  { emoji: '🎉', title: '¡Asististe!', detail: 'Sin ausencias, agenda llena' },
];

const DEFAULT_TURNOS: TurnosVariant = {
  negocio: 'Studio Norte',
  emoji: '💈',
  headerHint: 'Reserva tu turno online',
  servicios: SERVICIOS,
  recordatorios: RECORDATORIOS,
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

type Step = 'servicio' | 'horario' | 'confirmado';

export default function TurnosDemo({ variant }: { variant?: TurnosVariant }) {
  const cfg = variant ?? DEFAULT_TURNOS;
  const NEGOCIO = cfg.negocio;
  const SERVICIOS = cfg.servicios;
  const RECORDATORIOS = cfg.recordatorios ?? DEFAULT_TURNOS.recordatorios!;
  const headerEmoji = cfg.emoji;
  const headerHint = cfg.headerHint ?? 'Reserva tu turno online';
  const [step, setStep] = useState<Step>('servicio');
  const [servicio, setServicio] = useState<Servicio | null>(null);
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    if (step !== 'confirmado') return;
    let cancel = false;
    (async () => {
      const fast = prefersReduced();
      for (let i = 1; i <= RECORDATORIOS.length; i++) {
        await sleep(fast ? 0 : i === 1 ? 300 : 1200);
        if (!cancel) setReveal(i);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [step]);

  function reset() {
    setStep('servicio');
    setServicio(null);
    setDia(null);
    setHora(null);
    setReveal(0);
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="card overflow-hidden p-0">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-5 py-3.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-lime/15 text-xl">{headerEmoji}</span>
          <div>
            <p className="font-display font-semibold leading-tight">{NEGOCIO}</p>
            <p className="techlabel">{headerHint}</p>
          </div>
          <span className="ml-auto techlabel hidden sm:block">Paso {step === 'servicio' ? '1' : step === 'horario' ? '2' : '3'}/3</span>
        </div>

        <div className="p-5">
          {/* Paso 1: servicio */}
          {step === 'servicio' && (
            <div className="page-fade">
              <p className="mb-3 text-sm font-medium">¿Qué te haces hoy?</p>
              <div className="grid grid-cols-2 gap-3">
                {SERVICIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setServicio(s);
                      setStep('horario');
                    }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <p className="mt-2 font-semibold">{s.nombre}</p>
                    <p className="text-xs text-ink-muted">{s.dur} · {ARS(s.precio)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paso 2: día y hora */}
          {step === 'horario' && servicio && (
            <div className="page-fade">
              <button onClick={() => setStep('servicio')} className="mb-3 text-xs text-ink-muted hover:text-ink">
                ← {servicio.emoji} {servicio.nombre}
              </button>
              <p className="mb-2 text-sm font-medium">Elige el día</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {DIAS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDia(d)}
                    className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                      dia === d ? 'bg-accent font-semibold text-base' : 'border border-white/15 text-ink-muted hover:text-ink'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="mb-2 text-sm font-medium">Elige la hora</p>
              <div className="grid grid-cols-3 gap-2">
                {HORARIOS.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHora(h)}
                    className={`rounded-lg py-2.5 text-sm transition-colors ${
                      hora === h ? 'bg-accent font-semibold text-base' : 'border border-white/15 hover:border-accent/40'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
              <button
                disabled={!dia || !hora}
                onClick={() => setStep('confirmado')}
                className="mt-5 w-full rounded-full bg-signal py-3 font-semibold text-signal-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {dia && hora ? `Confirmar turno · ${dia} ${hora}` : 'Elige día y hora'}
              </button>
            </div>
          )}

          {/* Paso 3: confirmado + recordatorios */}
          {step === 'confirmado' && servicio && (
            <div className="page-fade">
              <div className="mb-5 rounded-2xl border border-accent-lime/25 bg-accent-lime/5 p-4 text-center">
                <div className="success-check mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-lime/15 text-2xl">✓</div>
                <p className="mt-2 font-display text-lg font-bold">¡Turno reservado!</p>
                <p className="text-sm text-ink-muted">
                  {servicio.emoji} {servicio.nombre} · {dia} a las {hora}
                </p>
              </div>

              <p className="techlabel mb-3">Y ahora el sistema trabaja solo:</p>
              <ul className="space-y-2.5">
                {RECORDATORIOS.map((r, i) => {
                  const shown = i < reveal;
                  return (
                    <li
                      key={r.title}
                      className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${
                        shown ? 'border-white/10 bg-white/[0.02] opacity-100' : 'border-transparent opacity-30'
                      }`}
                    >
                      <span className="text-xl">{r.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{r.title}</p>
                        <p className="truncate text-xs text-ink-muted">{r.detail}</p>
                      </div>
                      {shown && <span className="ml-auto text-xs text-accent-lime">enviado</span>}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 rounded-lg bg-white/5 p-3 text-center text-xs text-ink-muted">
                Así se reducen las ausencias hasta un 60%. La agenda se llena sola.
              </p>
              <button
                onClick={reset}
                className="mt-4 w-full rounded-full border border-white/15 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40"
              >
                Reservar otro turno
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
