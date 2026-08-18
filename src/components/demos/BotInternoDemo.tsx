import { useState } from 'react';

// Bot interno de operación. No atiende clientes: le responde AL DUEÑO desde los
// datos del negocio (stock, pedidos, ventas). Ficticio: "Ferretería El Tornillo".

const COP = (n: number) => '$' + n.toLocaleString('es-CO');

type Msg = { de: 'bot' | 'yo'; txt: string };

const RESPUESTAS: { q: string; r: string }[] = [
  {
    q: '¿Cuánto stock de tornillos M8?',
    r: `Quedan 240 unidades de tornillo M8 (bodega A-3). Punto de reposición: 200. Todavía estás por encima. 👍`,
  },
  {
    q: '¿Cuándo llega el pedido 4421?',
    r: `El pedido 4421 (Proveedor Acelca) sale hoy y llega mañana entre 8 y 11 a.m. Incluye brocas y discos de corte.`,
  },
  {
    q: '¿Cómo van las ventas de hoy?',
    r: `Hoy llevas ${COP(1840000)} en 37 tickets. Ticket promedio ${COP(49700)}. Vas 12% arriba del mismo día la semana pasada. 📈`,
  },
  {
    q: '¿Qué producto se está agotando?',
    r: `⚠️ Silicona transparente: quedan 6 y se vendieron 14 esta semana. Te alcanza para ~2 días. ¿Le aviso al proveedor?`,
  },
];

export default function BotInternoDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { de: 'bot', txt: 'Hola jefe 👋 Pregúntame por stock, pedidos o ventas. Toca una pregunta:' },
  ]);
  const [pensando, setPensando] = useState(false);
  const [usadas, setUsadas] = useState<Set<number>>(new Set());

  function preguntar(i: number) {
    if (pensando) return;
    const { q, r } = RESPUESTAS[i];
    setMsgs((m) => [...m, { de: 'yo', txt: q }]);
    setUsadas((u) => new Set(u).add(i));
    setPensando(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { de: 'bot', txt: r }]);
      setPensando(false);
    }, 900);
  }

  const restantes = RESPUESTAS.map((_, i) => i).filter((i) => !usadas.has(i));

  return (
    <div className="card flex h-[26rem] flex-col overflow-hidden p-0">
      {/* Cabecera */}
      <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-signal/15 text-lg">🤖</span>
        <div>
          <p className="font-display font-semibold leading-tight">Bot de operación · El Tornillo</p>
          <p className="techlabel flex items-center gap-1.5">
            <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-accent-lime" />
            Conectado a tu stock · datos de ejemplo
          </p>
        </div>
      </div>

      {/* Conversación */}
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.de === 'yo' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                m.de === 'yo'
                  ? 'rounded-br-sm bg-accent text-base'
                  : 'rounded-bl-sm border border-white/10 bg-white/[0.03]'
              }`}
            >
              {m.txt}
            </div>
          </div>
        ))}
        {pensando && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.03] px-3.5 py-3">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Preguntas sugeridas */}
      <div className="border-t border-white/5 px-4 py-3">
        {restantes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {restantes.map((i) => (
              <button
                key={i}
                onClick={() => preguntar(i)}
                disabled={pensando}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs transition-colors hover:border-signal hover:text-signal disabled:opacity-40"
              >
                {RESPUESTAS[i].q}
              </button>
            ))}
          </div>
        ) : (
          <p className="techlabel text-center">Eso es todo por ahora — así de rápido, sin abrir 3 sistemas.</p>
        )}
      </div>
    </div>
  );
}
