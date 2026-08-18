import { useMemo, useReducer, useState } from 'react';
import BrowserFrame from './BrowserFrame';

// ── Datos falsos: vivero & deco "Raíz" ──────────────────────────
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: 'Plantas' | 'Macetas' | 'Deco';
  emoji: string;
  gradiente: string;
  desc: string;
}

const PRODUCTOS: Producto[] = [
  { id: 'p1', nombre: 'Monstera Deliciosa', precio: 8900, categoria: 'Plantas', emoji: '🌿', gradiente: 'linear-gradient(135deg,#1f3d2b,#2f6b45)', desc: 'La favorita de todos. Hojas grandes, fácil de cuidar.' },
  { id: 'p2', nombre: 'Cactus San Pedro', precio: 4200, categoria: 'Plantas', emoji: '🌵', gradiente: 'linear-gradient(135deg,#2c4a2a,#4a7a3e)', desc: 'Resistente y de crecimiento vertical. Poca agua.' },
  { id: 'p3', nombre: 'Pothos Colgante', precio: 5600, categoria: 'Plantas', emoji: '🌱', gradiente: 'linear-gradient(135deg,#24402f,#3a6b4a)', desc: 'Ideal para estantes altos. Purifica el aire.' },
  { id: 'p4', nombre: 'Maceta Cerámica Terracota', precio: 3800, categoria: 'Macetas', emoji: '🪴', gradiente: 'linear-gradient(135deg,#5a3320,#a4593a)', desc: 'Hecha a mano. Diámetro 16 cm con plato.' },
  { id: 'p5', nombre: 'Maceta Colgante Macramé', precio: 4900, categoria: 'Macetas', emoji: '🧶', gradiente: 'linear-gradient(135deg,#4a3d2a,#7a6440)', desc: 'Algodón natural tejido. Para colgar del techo.' },
  { id: 'p6', nombre: 'Regadera Minimal', precio: 6200, categoria: 'Deco', emoji: '🫗', gradiente: 'linear-gradient(135deg,#22303f,#3a5a7a)', desc: 'Acero mate. 1,2 litros. Pico de precisión.' },
  { id: 'p7', nombre: 'Set de Herramientas', precio: 5400, categoria: 'Deco', emoji: '🧰', gradiente: 'linear-gradient(135deg,#3a2f22,#6b563a)', desc: 'Pala, rastrillo y tijera de podar. Mango de madera.' },
  { id: 'p8', nombre: 'Luz de Cultivo LED', precio: 12800, categoria: 'Deco', emoji: '💡', gradiente: 'linear-gradient(135deg,#3d3320,#7a6b3a)', desc: 'Espectro completo. Para plantas de interior.' },
];

const CATEGORIAS = ['Todo', 'Plantas', 'Macetas', 'Deco'] as const;
type Cat = (typeof CATEGORIAS)[number];

const ARS = (n: number) => '$' + n.toLocaleString('es-CO');

// ── Estado del carrito (en memoria) ─────────────────────────────
interface CartItem {
  producto: Producto;
  cantidad: number;
}
type CartState = Record<string, CartItem>;
type Action =
  | { type: 'add'; producto: Producto }
  | { type: 'inc'; id: string }
  | { type: 'dec'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const prev = state[action.producto.id];
      return { ...state, [action.producto.id]: { producto: action.producto, cantidad: (prev?.cantidad ?? 0) + 1 } };
    }
    case 'inc':
      return { ...state, [action.id]: { ...state[action.id], cantidad: state[action.id].cantidad + 1 } };
    case 'dec': {
      const c = state[action.id].cantidad - 1;
      if (c <= 0) {
        const { [action.id]: _, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: { ...state[action.id], cantidad: c } };
    }
    case 'remove': {
      const { [action.id]: _, ...rest } = state;
      return rest;
    }
    case 'clear':
      return {};
  }
}

export default function TiendaDemo() {
  const [cat, setCat] = useState<Cat>('Todo');
  const [cart, dispatch] = useReducer(cartReducer, {});
  const [drawer, setDrawer] = useState(false);
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [checkout, setCheckout] = useState<'cerrado' | 'form' | 'ok'>('cerrado');

  const productos = useMemo(
    () => (cat === 'Todo' ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === cat)),
    [cat],
  );
  const items = Object.values(cart);
  const totalItems = items.reduce((s, i) => s + i.cantidad, 0);
  const totalPrecio = items.reduce((s, i) => s + i.cantidad * i.producto.precio, 0);

  function add(p: Producto) {
    dispatch({ type: 'add', producto: p });
    setDrawer(true);
  }

  return (
    <BrowserFrame url="raiz.tienda" height="42rem">
      <div className="relative min-h-full bg-[#0f1512] text-[#e9efe9]">
        {/* Header tienda */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0f1512]/95 px-5 py-3.5 backdrop-blur">
          <span className="flex items-center gap-2 font-bold">
            <span className="text-xl">🌿</span> Raíz
          </span>
          <button
            onClick={() => setDrawer(true)}
            className="relative rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-[#7CFF6B]"
          >
            Carrito 🛒
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#7CFF6B] px-1 text-xs font-bold text-black">
                {totalItems}
              </span>
            )}
          </button>
        </header>

        {/* Hero mini */}
        <div className="px-5 pt-6">
          <h1 className="text-2xl font-bold">Plantas que alegran tu casa 🌱</h1>
          <p className="mt-1 text-sm text-[#9db09d]">Envío a todo el país. Cuidado garantizado.</p>
        </div>

        {/* Filtro categorías */}
        <div className="flex flex-wrap gap-2 px-5 py-4">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                cat === c ? 'bg-[#7CFF6B] font-semibold text-black' : 'border border-white/15 text-[#9db09d] hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grilla productos */}
        <div className="grid grid-cols-2 gap-4 px-5 pb-24 sm:grid-cols-3">
          {productos.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <button
                onClick={() => setDetalle(p)}
                className="block h-28 w-full text-4xl"
                style={{ background: p.gradiente }}
                aria-label={`Ver ${p.nombre}`}
              >
                <span className="grid h-full place-items-center">{p.emoji}</span>
              </button>
              <div className="p-3">
                <p className="text-xs text-[#7CFF6B]">{p.categoria}</p>
                <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold">{p.nombre}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold">{ARS(p.precio)}</span>
                  <button
                    onClick={() => add(p)}
                    className="rounded-full bg-[#7CFF6B] px-3 py-1 text-xs font-bold text-black transition-transform hover:scale-105"
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detalle producto */}
        {detalle && (
          <Overlay onClose={() => setDetalle(null)}>
            <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#141a16]">
              <div className="grid h-40 place-items-center text-6xl" style={{ background: detalle.gradiente }}>
                {detalle.emoji}
              </div>
              <div className="p-5">
                <p className="text-xs text-[#7CFF6B]">{detalle.categoria}</p>
                <h3 className="mt-1 text-lg font-bold">{detalle.nombre}</h3>
                <p className="mt-2 text-sm text-[#9db09d]">{detalle.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold">{ARS(detalle.precio)}</span>
                  <button
                    onClick={() => {
                      add(detalle);
                      setDetalle(null);
                    }}
                    className="rounded-full bg-[#7CFF6B] px-5 py-2 font-bold text-black"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </Overlay>
        )}

        {/* Drawer carrito */}
        {drawer && (
          <Overlay onClose={() => setDrawer(false)} align="right">
            <aside
              className="ml-auto flex h-full w-full max-w-sm flex-col bg-[#141a16]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h3 className="font-bold">Tu carrito ({totalItems})</h3>
                <button onClick={() => setDrawer(false)} aria-label="Cerrar" className="text-[#9db09d]">✕</button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 text-[#9db09d]">
                  <span className="text-4xl">🛒</span>
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {items.map(({ producto, cantidad }) => (
                      <div key={producto.id} className="flex items-center gap-3 rounded-xl border border-white/10 p-2.5">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg text-2xl" style={{ background: producto.gradiente }}>
                          {producto.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-sm font-semibold">{producto.nombre}</p>
                          <p className="text-xs text-[#9db09d]">{ARS(producto.precio)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Qty onClick={() => dispatch({ type: 'dec', id: producto.id })}>−</Qty>
                          <span className="w-5 text-center text-sm">{cantidad}</span>
                          <Qty onClick={() => dispatch({ type: 'inc', id: producto.id })}>+</Qty>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 p-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{ARS(totalPrecio)}</span>
                    </div>
                    <button
                      onClick={() => setCheckout('form')}
                      className="mt-3 w-full rounded-full bg-[#7CFF6B] py-3 font-bold text-black transition-transform hover:-translate-y-0.5"
                    >
                      Finalizar compra →
                    </button>
                  </div>
                </>
              )}
            </aside>
          </Overlay>
        )}

        {/* Checkout de mentira */}
        {checkout !== 'cerrado' && (
          <Overlay onClose={() => checkout === 'ok' && setCheckout('cerrado')}>
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#141a16] p-6" onClick={(e) => e.stopPropagation()}>
              {checkout === 'form' ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckout('ok');
                    dispatch({ type: 'clear' });
                    setDrawer(false);
                  }}
                  className="space-y-3"
                >
                  <h3 className="text-lg font-bold">Datos de envío</h3>
                  <input required placeholder="Nombre y apellido" className="field" />
                  <input required placeholder="Dirección" className="field" />
                  <input required placeholder="Email" type="email" className="field" />
                  <div className="flex items-center justify-between pt-1 text-sm text-[#9db09d]">
                    <span>Total a pagar</span>
                    <span className="text-base font-bold text-white">{ARS(totalPrecio)}</span>
                  </div>
                  <button className="w-full rounded-full bg-[#7CFF6B] py-3 font-bold text-black">
                    Pagar {ARS(totalPrecio)} (simulado)
                  </button>
                  <p className="text-center text-xs text-[#9db09d]">🧪 Es una demo — no se cobra nada</p>
                </form>
              ) : (
                <div className="success-check py-6 text-center">
                  <div className="text-5xl">✅</div>
                  <h3 className="mt-3 text-xl font-bold">¡Compra confirmada!</h3>
                  <p className="mt-1 text-sm text-[#9db09d]">
                    (De mentira, claro.) Así de simple compra un cliente en tu tienda.
                  </p>
                  <button
                    onClick={() => setCheckout('cerrado')}
                    className="mt-5 rounded-full border border-white/15 px-5 py-2 text-sm font-medium"
                  >
                    Seguir comprando
                  </button>
                </div>
              )}
            </div>
          </Overlay>
        )}
      </div>
    </BrowserFrame>
  );
}

function Qty({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="grid h-6 w-6 place-items-center rounded-full border border-white/15 text-sm hover:border-[#7CFF6B]"
    >
      {children}
    </button>
  );
}

function Overlay({
  children,
  onClose,
  align = 'center',
}: {
  children: React.ReactNode;
  onClose: () => void;
  align?: 'center' | 'right';
}) {
  return (
    <div
      className={`absolute inset-0 z-20 flex bg-black/60 backdrop-blur-sm ${
        align === 'center' ? 'items-center justify-center p-4' : ''
      }`}
      onClick={onClose}
      role="presentation"
    >
      {align === 'center' ? <div onClick={(e) => e.stopPropagation()}>{children}</div> : children}
    </div>
  );
}
