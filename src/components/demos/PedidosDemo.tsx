import { useEffect, useRef, useState } from 'react';
import type { PedidosVariant } from '../../data/variants';

// Bot de pedidos estilo WhatsApp. Máquina de estados guionizada, SIN backend.
// Flujo: menú → armar pedido → dirección → confirmar → tracker del domicilio.

interface MenuItem {
  id: string;
  nombre: string;
  precio: number;
  emoji: string;
}
const MENU: MenuItem[] = [
  { id: 'clasica', nombre: 'Hamburguesa Clásica', precio: 6500, emoji: '🍔' },
  { id: 'doble', nombre: 'Doble Cheddar', precio: 8200, emoji: '🧀' },
  { id: 'veggie', nombre: 'Veggie', precio: 6900, emoji: '🥬' },
  { id: 'papas', nombre: 'Papas con cheddar', precio: 4200, emoji: '🍟' },
  { id: 'gaseosa', nombre: 'Gaseosa 500ml', precio: 2000, emoji: '🥤' },
];
const DIRECCIONES = ['Calle 85 #12-30', 'Carrera 15 #93-45', 'Otra dirección…'];

const DEFAULT_PEDIDOS: PedidosVariant = {
  negocio: 'La Brasa Burger',
  emoji: '🍔',
  menu: MENU,
  direcciones: DIRECCIONES,
};

const ARS = (n: number) => '$' + n.toLocaleString('es-CO');

type Step = 'menu' | 'direccion' | 'confirmar' | 'tracking';
interface Bubble {
  from: 'bot' | 'user';
  text: string;
}
type OrderLine = { item: MenuItem; qty: number };

const TRACK_STAGES = [
  { label: 'Preparando', emoji: '👨‍🍳', hint: 'Tu pedido está en la cocina' },
  { label: 'En camino', emoji: '🛵', hint: 'El repartidor salió hacia ti' },
  { label: 'Entregado', emoji: '✅', hint: '¡Que lo disfrutes!' },
];

export default function PedidosDemo({ variant }: { variant?: PedidosVariant }) {
  const cfg = variant ?? DEFAULT_PEDIDOS;
  const NEGOCIO = cfg.negocio;
  const MENU = cfg.menu;
  const DIRECCIONES = cfg.direcciones ?? DEFAULT_PEDIDOS.direcciones!;
  const headerEmoji = cfg.emoji;
  const [msgs, setMsgs] = useState<Bubble[]>([
    { from: 'bot', text: `¡Hola! 👋 Bienvenido a ${NEGOCIO}. ¿Qué se te antoja hoy? Toca para agregar 👇` },
  ]);
  const [step, setStep] = useState<Step>('menu');
  const [order, setOrder] = useState<Record<string, OrderLine>>({});
  const [stage, setStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lines = Object.values(order);
  const total = lines.reduce((s, l) => s + l.qty * l.item.precio, 0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, step]);

  // Avance automático del tracker.
  useEffect(() => {
    if (step !== 'tracking') return;
    if (stage >= TRACK_STAGES.length - 1) return;
    const t = setTimeout(() => {
      const next = stage + 1;
      setStage(next);
      setMsgs((m) => [...m, { from: 'bot', text: `${TRACK_STAGES[next].emoji} ${TRACK_STAGES[next].hint}` }]);
    }, 2600);
    return () => clearTimeout(t);
  }, [step, stage]);

  function say(from: 'bot' | 'user', text: string) {
    setMsgs((m) => [...m, { from, text }]);
  }

  function addItem(item: MenuItem) {
    setOrder((o) => {
      const prev = o[item.id];
      return { ...o, [item.id]: { item, qty: (prev?.qty ?? 0) + 1 } };
    });
    say('user', `${item.emoji} ${item.nombre}`);
    say('bot', '¡Agregado! ¿Algo más o cerramos el pedido?');
  }

  function goDireccion() {
    if (lines.length === 0) {
      say('bot', 'Todavía no agregaste nada 🙂 Elige algo del menú.');
      return;
    }
    say('user', 'Listo, cerrar pedido');
    say('bot', '¡Genial! ¿A qué dirección lo enviamos?');
    setStep('direccion');
  }

  function chooseDireccion(dir: string) {
    const real = dir === 'Otra dirección…' ? 'Mi casa 🏠' : dir;
    say('user', real);
    const resumen = lines.map((l) => `${l.qty}× ${l.item.nombre}`).join('\n');
    say('bot', `Perfecto. Confirma tu pedido:\n\n${resumen}\n\nEnvío a: ${real}\nTotal: ${ARS(total + 1500)} (incluye $1.500 de envío)`);
    setStep('confirmar');
  }

  function confirmar() {
    say('user', '✅ Confirmar pedido');
    say('bot', '¡Pedido confirmado! 🎉 Te muestro el seguimiento en vivo:');
    setStep('tracking');
    setStage(0);
  }

  function reset() {
    setMsgs([{ from: 'bot', text: `¡Hola de nuevo! 👋 ¿Otro pedido en ${NEGOCIO}? Toca para agregar 👇` }]);
    setOrder({});
    setStep('menu');
    setStage(0);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        {/* Header estilo WhatsApp */}
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-xl">{headerEmoji}</span>
          <div>
            <p className="font-semibold leading-tight">{NEGOCIO}</p>
            <p className="flex items-center gap-1.5 text-xs text-white/80">
              <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-[#7CFF6B]" /> en línea
            </p>
          </div>
        </div>

        {/* Chat */}
        <div
          ref={scrollRef}
          className="h-[26rem] space-y-2 overflow-y-auto px-3 py-4"
          style={{ background: '#0b141a' }}
        >
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  m.from === 'user' ? 'rounded-br-none bg-[#005c4b] text-white' : 'rounded-bl-none bg-[#202c33] text-[#e9edef]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {step === 'tracking' && <Tracker stage={stage} />}
        </div>

        {/* Zona de acciones (quick replies) */}
        <div className="border-t border-white/5 bg-[#202c33] p-3">
          {step === 'menu' && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {MENU.map((it) => (
                  <QR key={it.id} onClick={() => addItem(it)}>
                    {it.emoji} {it.nombre} · {ARS(it.precio)}
                  </QR>
                ))}
              </div>
              <button
                onClick={goDireccion}
                className="w-full rounded-full bg-[#7CFF6B] py-2.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
              >
                Cerrar pedido {lines.length > 0 && `· ${ARS(total)}`} →
              </button>
            </div>
          )}
          {step === 'direccion' && (
            <div className="flex flex-wrap gap-2">
              {DIRECCIONES.map((d) => (
                <QR key={d} onClick={() => chooseDireccion(d)}>📍 {d}</QR>
              ))}
            </div>
          )}
          {step === 'confirmar' && (
            <button
              onClick={confirmar}
              className="w-full rounded-full bg-[#7CFF6B] py-2.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
            >
              ✅ Confirmar pedido
            </button>
          )}
          {step === 'tracking' && (
            <button
              onClick={reset}
              disabled={stage < TRACK_STAGES.length - 1}
              className="w-full rounded-full border border-white/15 py-2.5 text-sm font-medium text-white disabled:opacity-40"
            >
              {stage < TRACK_STAGES.length - 1 ? 'Sigue tu pedido en el mapa…' : 'Hacer otro pedido'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function QR({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-[#7CFF6B]/40 bg-[#7CFF6B]/10 px-3 py-1.5 text-xs font-medium text-[#e9edef] transition-colors hover:bg-[#7CFF6B]/20"
    >
      {children}
    </button>
  );
}

function Tracker({ stage }: { stage: number }) {
  return (
    <div className="mt-2 rounded-xl bg-[#202c33] p-4">
      <div className="relative flex justify-between">
        {/* línea de fondo */}
        <div className="absolute left-5 right-5 top-5 h-0.5 bg-white/10" />
        <div
          className="absolute left-5 top-5 h-0.5 bg-[#7CFF6B] transition-all duration-700"
          style={{ width: `calc(${(stage / (TRACK_STAGES.length - 1)) * 100}% - ${stage === 0 ? 0 : 0}px)`, maxWidth: 'calc(100% - 2.5rem)' }}
        />
        {TRACK_STAGES.map((s, i) => {
          const done = i <= stage;
          return (
            <div key={s.label} className="relative z-10 flex flex-1 flex-col items-center gap-1.5">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full text-lg transition-all ${
                  done ? 'bg-[#7CFF6B] text-black' : 'bg-[#0b141a] text-white/40'
                } ${i === stage ? 'scale-110 ring-4 ring-[#7CFF6B]/25' : ''}`}
              >
                {s.emoji}
              </span>
              <span className={`text-[0.65rem] ${done ? 'text-[#e9edef]' : 'text-white/40'}`}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-white/70">{TRACK_STAGES[stage].hint}</p>
    </div>
  );
}
