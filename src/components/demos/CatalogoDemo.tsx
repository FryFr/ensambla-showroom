import { useState } from 'react';
import BrowserFrame from './BrowserFrame';

// Catálogo que vende por WhatsApp (sin comisiones de apps). Fachada.
// El "checkout" arma un mensaje de WhatsApp con el pedido. Marca ficticia: "Índigo".

const NEGOCIO = 'Índigo';
const ARS = (n: number) => '$' + n.toLocaleString('es-CO');

interface Prod {
  id: string;
  nombre: string;
  precio: number;
  emoji: string;
  grad: string;
}
const PRODUCTOS: Prod[] = [
  { id: 'remera', nombre: 'Camiseta oversize', precio: 18900, emoji: '👕', grad: 'linear-gradient(135deg,#22303f,#3a5a7a)' },
  { id: 'buzo', nombre: 'Buzo/sudadera', precio: 34900, emoji: '🧥', grad: 'linear-gradient(135deg,#2a2440,#4a3f7a)' },
  { id: 'jean', nombre: 'Jean mom', precio: 42900, emoji: '👖', grad: 'linear-gradient(135deg,#1f2b3d,#345066)' },
  { id: 'vestido', nombre: 'Vestido lino', precio: 38900, emoji: '👗', grad: 'linear-gradient(135deg,#3d223a,#7a3a63)' },
  { id: 'gorra', nombre: 'Gorra clásica', precio: 12900, emoji: '🧢', grad: 'linear-gradient(135deg,#22402f,#3a6b4a)' },
  { id: 'zapas', nombre: 'Tenis urbanos', precio: 64900, emoji: '👟', grad: 'linear-gradient(135deg,#3a2f22,#6b563a)' },
];

export default function CatalogoDemo() {
  const [order, setOrder] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);

  const items = PRODUCTOS.filter((p) => order[p.id] > 0);
  const total = items.reduce((s, p) => s + p.precio * order[p.id], 0);
  const count = items.reduce((s, p) => s + order[p.id], 0);

  const add = (id: string) => setOrder((o) => ({ ...o, [id]: (o[id] ?? 0) + 1 }));
  const sub = (id: string) => setOrder((o) => ({ ...o, [id]: Math.max(0, (o[id] ?? 0) - 1) }));

  return (
    <BrowserFrame url="indigo.shop" height="42rem">
      <div className="relative min-h-full bg-[#0d1014] text-[#e9edf2]">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0d1014]/95 px-5 py-3.5 backdrop-blur">
          <span className="flex items-center gap-2 font-bold">
            <span className="text-xl">🧵</span> {NEGOCIO}
          </span>
          <span className="techlabel">Catálogo</span>
        </header>

        <div className="px-5 pt-5">
          <h1 className="text-2xl font-bold">Nueva temporada 🌙</h1>
          <p className="mt-1 text-sm text-[#93a1b0]">Toca los productos para armar tu pedido. Te lo tomamos por WhatsApp.</p>
        </div>

        {/* Grilla */}
        <div className="grid grid-cols-2 gap-3 px-5 pb-40 pt-4 sm:grid-cols-3">
          {PRODUCTOS.map((p) => {
            const qty = order[p.id] ?? 0;
            return (
              <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="grid h-24 place-items-center text-4xl" style={{ background: p.grad }}>
                  {p.emoji}
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-1 text-sm font-semibold">{p.nombre}</h3>
                  <p className="mt-0.5 font-bold">{ARS(p.precio)}</p>
                  {qty === 0 ? (
                    <button
                      onClick={() => add(p.id)}
                      className="mt-2 w-full rounded-full bg-[#25D366] py-1.5 text-xs font-bold text-[#07120b] transition-transform hover:scale-[1.03]"
                    >
                      + Agregar
                    </button>
                  ) : (
                    <div className="mt-2 flex items-center justify-between rounded-full border border-white/15 px-1">
                      <button onClick={() => sub(p.id)} className="h-6 w-6 rounded-full text-sm hover:bg-white/10">−</button>
                      <span className="text-sm font-semibold">{qty}</span>
                      <button onClick={() => add(p.id)} className="h-6 w-6 rounded-full text-sm hover:bg-white/10">+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Barra flotante: enviar por WhatsApp */}
        {count > 0 && !sent && (
          <div className="toast-in absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#141a1f] p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-[#93a1b0]">{count} {count === 1 ? 'prenda' : 'prendas'}</span>
              <span className="font-bold">{ARS(total)}</span>
            </div>
            <button
              onClick={() => setSent(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-bold text-[#07120b] transition-transform hover:-translate-y-0.5"
            >
              💬 Enviar pedido por WhatsApp
            </button>
            <p className="mt-2 text-center text-[0.7rem] text-[#93a1b0]">Sin comisiones de apps · le llega directo al negocio</p>
          </div>
        )}

        {/* Éxito: preview de burbuja de WhatsApp */}
        {sent && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
            <div className="success-check w-full max-w-sm">
              <div className="rounded-2xl bg-[#005c4b] p-4 text-white shadow-xl">
                <p className="text-sm font-semibold">Pedido a {NEGOCIO} 🧵</p>
                <ul className="mt-2 space-y-1 text-sm text-white/90">
                  {items.map((p) => (
                    <li key={p.id} className="flex justify-between gap-3">
                      <span>{order[p.id]}× {p.nombre}</span>
                      <span>{ARS(p.precio * order[p.id])}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-white/20 pt-2 text-sm font-bold">
                  <span>Total</span>
                  <span>{ARS(total)}</span>
                </div>
                <p className="mt-2 text-sm text-white/90">¡Hola! Quiero este pedido 🙌 ¿Coordinamos el envío?</p>
              </div>
              <div className="mt-4 text-center">
                <p className="font-display font-bold text-[#e9edf2]">¡Pedido enviado! 🎉</p>
                <p className="mt-1 text-xs text-[#93a1b0]">Así de simple compra un cliente, sin apps de por medio.</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setOrder({});
                  }}
                  className="mt-4 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white"
                >
                  Volver al catálogo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}
