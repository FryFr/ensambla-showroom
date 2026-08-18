import { useState } from 'react';
import BrowserFrame from './BrowserFrame';

// Marca ficticia "Órbita" — tema claro para demostrar rango y que se lea como otro sitio.
const V = '#6d5cff'; // violeta de marca

export default function LandingDemo() {
  return (
    <BrowserFrame url="orbita.app" height="42rem">
      <div className="bg-[#faf9ff] text-[#1b1630]">
        <Nav />
        <Hero />
        <Logos />
        <Benefits />
        <Feature />
        <Testimonials />
        <LeadCta />
        <FooterMini />
      </div>
    </BrowserFrame>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-[#faf9ff]/90 px-6 py-4 backdrop-blur">
      <span className="flex items-center gap-2 font-bold">
        <span className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ background: V }}>
          ◐
        </span>
        Órbita
      </span>
      <div className="hidden items-center gap-6 text-sm text-[#5b556e] sm:flex">
        <span>Producto</span>
        <span>Clientes</span>
        <span>Precios</span>
      </div>
      <button className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: V }}>
        Empezar gratis
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <header className="px-6 py-16 text-center">
      <span
        className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
        style={{ background: '#efeaff', color: V }}
      >
        Nuevo · Vistas de proyecto con IA
      </span>
      <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Tu equipo, en órbita. Todo el trabajo en un solo lugar.
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-[#5b556e]">
        Órbita reúne tareas, documentos y objetivos para que tu equipo avance sin fricción. Menos reuniones, más resultados.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#lead" className="rounded-full px-6 py-3 font-semibold text-white" style={{ background: V }}>
          Probar 14 días gratis
        </a>
        <button className="rounded-full border border-black/10 bg-white px-6 py-3 font-semibold">
          Ver demo ▶
        </button>
      </div>
      <div
        className="mx-auto mt-12 h-48 max-w-3xl rounded-2xl border border-black/5"
        style={{ background: 'linear-gradient(135deg, #efeaff, #dfe8ff)' }}
      >
        <div className="flex h-full items-center justify-center text-6xl opacity-40">🛰️</div>
      </div>
    </header>
  );
}

function Logos() {
  return (
    <div className="border-y border-black/5 bg-white/60 px-6 py-6">
      <p className="text-center text-xs uppercase tracking-widest text-[#8a849c]">
        Usado por equipos de
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-lg font-bold text-[#b4aec6]">
        <span>Lumen</span> <span>Nord</span> <span>Kairos</span> <span>Vela</span> <span>Ápice</span>
      </div>
    </div>
  );
}

function Benefits() {
  const items = [
    { icon: '⚡', t: 'Rápido de verdad', d: 'Todo carga al instante. Sin esperas ni recargas eternas.' },
    { icon: '🎯', t: 'Foco en lo que importa', d: 'La IA ordena tus tareas por prioridad automáticamente.' },
    { icon: '🔗', t: 'Se conecta con todo', d: 'Slack, Google, GitHub y 40 apps más en dos clics.' },
  ];
  return (
    <section className="px-6 py-16">
      <h2 className="text-center text-3xl font-bold">Por qué los equipos eligen Órbita</h2>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
        {items.map((b) => (
          <div key={b.t} className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
            <div className="text-3xl">{b.icon}</div>
            <h3 className="mt-3 font-bold">{b.t}</h3>
            <p className="mt-1.5 text-sm text-[#5b556e]">{b.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto grid max-w-4xl items-center gap-8 sm:grid-cols-2">
        <div
          className="h-56 rounded-2xl border border-black/5"
          style={{ background: 'linear-gradient(135deg, #dfe8ff, #efeaff)' }}
        >
          <div className="flex h-full items-center justify-center text-6xl opacity-40">📊</div>
        </div>
        <div>
          <span className="text-sm font-semibold" style={{ color: V }}>
            Tableros vivos
          </span>
          <h2 className="mt-2 text-2xl font-bold">Mira el avance sin preguntar</h2>
          <p className="mt-3 text-[#5b556e]">
            Cada proyecto muestra su estado en tiempo real. Nada de planillas desactualizadas ni "¿cómo venimos?".
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {['Vistas Kanban, lista y timeline', 'Reportes automáticos cada semana', 'Alertas cuando algo se traba'].map(
              (f) => (
                <li key={f} className="flex items-center gap-2">
                  <span style={{ color: V }}>✓</span> {f}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: 'Dejamos de perder tiempo en reuniones de estado. Órbita nos ahorró horas cada semana.', a: 'Lucía M.', r: 'Head of Ops, Lumen' },
    { q: 'En una semana todo el equipo lo adoptó. La IA que prioriza tareas es magia.', a: 'Diego R.', r: 'CTO, Kairos' },
  ];
  return (
    <section className="px-6 py-16">
      <h2 className="text-center text-3xl font-bold">Equipos que ya están en órbita</h2>
      <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
        {t.map((x) => (
          <figure key={x.a} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="text-lg" style={{ color: V }}>★★★★★</div>
            <blockquote className="mt-3 text-[#3a3450]">“{x.q}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold">
              {x.a} <span className="font-normal text-[#8a849c]">· {x.r}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function LeadCta() {
  const [sent, setSent] = useState(false);
  return (
    <section id="lead" className="px-6 py-16">
      <div className="mx-auto max-w-xl rounded-3xl p-8 text-center text-white" style={{ background: V }}>
        {sent ? (
          <div className="success-check py-6">
            <div className="text-4xl">✓</div>
            <h2 className="mt-3 text-2xl font-bold">¡Listo! Te escribimos en breve.</h2>
            <p className="mt-1 text-white/80">Revisa tu correo para empezar la prueba.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold">Pon a tu equipo en órbita hoy</h2>
            <p className="mt-2 text-white/80">14 días gratis. Sin tarjeta.</p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                required
                type="email"
                placeholder="tu@empresa.com"
                className="flex-1 rounded-full px-5 py-3 text-[#1b1630] outline-none"
              />
              <button className="rounded-full bg-white px-6 py-3 font-semibold" style={{ color: V }}>
                Empezar gratis
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function FooterMini() {
  return (
    <footer className="border-t border-black/5 bg-white px-6 py-8 text-center text-sm text-[#8a849c]">
      <p className="font-bold text-[#1b1630]">◐ Órbita</p>
      <p className="mt-2">© {new Date().getFullYear()} Órbita Inc. · Marca ficticia para demo.</p>
    </footer>
  );
}
