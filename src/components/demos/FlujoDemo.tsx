import { useState } from 'react';

// Flujo de automatización visual. Fachada: un grafo de pasos que se ilumina en secuencia.
// Cuenta la historia de "tu operación trabaja sola" — el diferencial del estudio.

type Status = 'idle' | 'running' | 'done';

interface Step {
  id: string;
  icon: string;
  title: string;
  detail: string;
  log: string;
}

const TRIGGER = {
  icon: '⚡',
  title: 'Entra un lead nuevo',
  detail: 'Por WhatsApp, formulario o Instagram',
};

const STEPS: Step[] = [
  { id: 'responder', icon: '💬', title: 'Responde al instante', detail: 'Mensaje automático de bienvenida', log: 'Lead respondido en 2 s — "¡Hola! Gracias por escribir 👋"' },
  { id: 'crm', icon: '🗂️', title: 'Carga el lead en el CRM', detail: 'Con sus datos y el canal de origen', log: 'Lead guardado en el CRM · etapa "Nuevo"' },
  { id: 'equipo', icon: '🔔', title: 'Avisa al equipo', detail: 'Notificación por WhatsApp o Slack', log: 'Equipo notificado · "Nuevo lead para atender"' },
  { id: 'seguimiento', icon: '📅', title: 'Agenda un seguimiento', detail: 'Recordatorio si no hay respuesta en 24 h', log: 'Seguimiento agendado para mañana 10:00' },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function FlujoDemo() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(STEPS.map((s) => [s.id, true])),
  );
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [triggerOn, setTriggerOn] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const activeSteps = STEPS.filter((s) => enabled[s.id]);
  const doneCount = STEPS.filter((s) => status[s.id] === 'done').length;
  const progress = activeSteps.length ? doneCount / activeSteps.length : 0;

  async function run() {
    if (running) return;
    setRunning(true);
    setStatus({});
    setLog([]);
    setTriggerOn(true);

    const fast = prefersReduced();
    await sleep(fast ? 0 : 500);
    setLog((l) => [...l, '⚡ Trigger: nuevo lead detectado']);

    for (const step of activeSteps) {
      setStatus((s) => ({ ...s, [step.id]: 'running' }));
      await sleep(fast ? 0 : 800);
      setStatus((s) => ({ ...s, [step.id]: 'done' }));
      setLog((l) => [...l, `✓ ${step.log}`]);
      await sleep(fast ? 0 : 250);
    }
    setLog((l) => [...l, '🎉 Listo. Todo pasó solo, sin que muevas un dedo.']);
    setRunning(false);
  }

  function reset() {
    setStatus({});
    setLog([]);
    setTriggerOn(false);
  }

  function toggle(id: string) {
    if (running) return;
    setEnabled((e) => ({ ...e, [id]: !e[id] }));
  }

  return (
    <div className="card p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Grafo */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button
              onClick={run}
              disabled={running || activeSteps.length === 0}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-base transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {running ? 'Ejecutando…' : '▶ Ejecutar automatización'}
            </button>
            <button
              onClick={reset}
              disabled={running}
              className="rounded-full border border-white/15 px-4 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink disabled:opacity-40"
            >
              Reiniciar
            </button>
          </div>

          {/* Trigger */}
          <Node
            icon={TRIGGER.icon}
            title={TRIGGER.title}
            detail={TRIGGER.detail}
            state={triggerOn ? 'done' : 'idle'}
            isTrigger
          />

          {/* Conector + pasos */}
          <div className="relative pl-[1.35rem]">
            {/* línea vertical de fondo + relleno */}
            <div className="absolute bottom-6 left-[1.35rem] top-0 w-0.5 -translate-x-1/2 bg-white/10" />
            <div
              className="absolute left-[1.35rem] top-0 w-0.5 -translate-x-1/2 bg-accent transition-all duration-500"
              style={{ height: `calc(${progress * 100}% )` }}
            />

            <div className="space-y-3 pt-3">
              {STEPS.map((step) => (
                <Node
                  key={step.id}
                  icon={step.icon}
                  title={step.title}
                  detail={step.detail}
                  state={enabled[step.id] ? status[step.id] ?? 'idle' : 'off'}
                  onToggle={() => toggle(step.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Log */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <p className="techlabel mb-2 flex items-center gap-2">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${running ? 'dot-live bg-accent-lime' : 'bg-ink-muted'}`} />
            Registro en vivo
          </p>
          {log.length === 0 ? (
            <p className="mt-6 text-center text-sm text-ink-muted">
              Toca <strong className="text-ink">Ejecutar</strong> y mira cómo cada paso pasa solo.
            </p>
          ) : (
            <ul className="space-y-1.5 font-mono text-xs leading-relaxed text-ink">
              {log.map((line, i) => (
                <li key={i} className="page-fade">{line}</li>
              ))}
            </ul>
          )}
          <p className="techlabel mt-4 border-t border-white/5 pt-3">
            💡 Prende o apaga pasos y vuelve a ejecutar
          </p>
        </div>
      </div>
    </div>
  );
}

function Node({
  icon,
  title,
  detail,
  state,
  isTrigger = false,
  onToggle,
}: {
  icon: string;
  title: string;
  detail: string;
  state: Status | 'off';
  isTrigger?: boolean;
  onToggle?: () => void;
}) {
  const done = state === 'done';
  const running = state === 'running';
  const off = state === 'off';

  return (
    <div className={`relative flex items-center gap-3 ${off ? 'opacity-40' : ''}`}>
      <span
        className={`z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border text-lg transition-all duration-300 ${
          done
            ? 'border-accent bg-accent/20 text-accent'
            : running
              ? 'border-accent-lime bg-accent-lime/15 text-accent-lime ring-4 ring-accent-lime/15'
              : isTrigger
                ? 'border-signal/50 bg-signal/10'
                : 'border-white/15 bg-surface'
        }`}
      >
        {done ? '✓' : running ? <Spinner /> : icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-ink-muted">{detail}</p>
      </div>
      {onToggle && (
        <button
          onClick={onToggle}
          role="switch"
          aria-checked={!off}
          aria-label={`${off ? 'Activar' : 'Desactivar'} paso: ${title}`}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${off ? 'bg-white/15' : 'bg-accent/60'}`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${off ? 'left-0.5' : 'left-4'}`}
          />
        </button>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent-lime border-t-transparent"
      style={{ animationDuration: '0.7s' }}
    />
  );
}
