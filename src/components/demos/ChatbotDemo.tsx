import { useEffect, useRef, useState } from 'react';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const NEGOCIO = 'Café Latitud';

const SUGERENCIAS = [
  '¿Qué horarios tienen?',
  '¿Se puede ir a trabajar con el portátil?',
  '¿Tienen opciones veganas?',
  '¿Hacen delivery?',
  '¿Cuánto vale el brunch?',
];

const SALUDO: Msg = {
  role: 'assistant',
  content: `¡Hola! 👋 Soy el asistente de ${NEGOCIO}. Puedo contarte sobre horarios, menú, delivery, cómo llegar y más. ¿En qué te ayudo?`,
};

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Msg[]>([SALUDO]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const nextMessages: Msg[] = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Enviamos el historial (sin el saludo inicial) para dar contexto.
        body: JSON.stringify({ messages: nextMessages.slice(1) }),
      });
      const data = (await res.json()) as { answer?: string };
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.answer ?? 'No pude responder ahora mismo.' },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Se cortó la conexión. Prueba de nuevo en un momento.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card mx-auto flex h-[34rem] w-full max-w-2xl flex-col overflow-hidden p-0">
      {/* Header del widget */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-5 py-3.5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-lime/15 text-xl">☕</span>
        <div className="min-w-0">
          <p className="font-display font-semibold leading-tight">{NEGOCIO}</p>
          <p className="techlabel flex items-center gap-1.5">
            <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-accent-lime" />
            En línea · responde con IA
          </p>
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {loading && <TypingBubble />}
      </div>

      {/* Sugerencias */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-5 pb-2">
          {SUGERENCIAS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-white/5 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Escríbele a ${NEGOCIO}…`}
          aria-label="Escribe tu mensaje"
          className="field flex-1"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-lg font-bold text-base transition-transform hover:-translate-y-0.5 disabled:opacity-40"
          aria-label="Enviar"
        >
          ↑
        </button>
      </form>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-accent/15 text-ink'
            : 'rounded-bl-sm bg-white/[0.04] text-ink'
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/[0.04] px-4 py-3">
        <Dot delay="0ms" />
        <Dot delay="150ms" />
        <Dot delay="300ms" />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-ink-muted"
      style={{ animationDelay: delay }}
    />
  );
}
