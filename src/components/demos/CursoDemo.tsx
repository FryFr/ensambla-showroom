import { useState } from 'react';
import BrowserFrame from './BrowserFrame';

// Micrositio de curso / membresía. Fachada. Curso ficticio "Fotografía con el celular".
// Módulos que se desbloquean al "inscribirse". Tema oscuro cálido para dar variedad.

const CORAL = '#ff8a5b';

interface Modulo {
  n: number;
  titulo: string;
  duracion: string;
  libre: boolean;
}
const MODULOS: Modulo[] = [
  { n: 1, titulo: 'Fundamentos: tu cel es una gran cámara', duracion: '12 min', libre: true },
  { n: 2, titulo: 'Luz natural que enamora', duracion: '18 min', libre: true },
  { n: 3, titulo: 'Composición: la regla que lo cambia todo', duracion: '15 min', libre: false },
  { n: 4, titulo: 'Retratos con desenfoque', duracion: '22 min', libre: false },
  { n: 5, titulo: 'Edición pro desde el celular', duracion: '25 min', libre: false },
  { n: 6, titulo: 'Vende tus fotos y tu servicio', duracion: '20 min', libre: false },
];

export default function CursoDemo() {
  const [inscripto, setInscrito] = useState(false);
  const [aviso, setAviso] = useState(false);

  const libres = MODULOS.filter((m) => m.libre).length;
  const progreso = inscripto ? 100 : Math.round((libres / MODULOS.length) * 100);

  function intentarBloqueado() {
    if (inscripto) return;
    setAviso(true);
    setTimeout(() => setAviso(false), 2200);
  }

  return (
    <BrowserFrame url="fotoconelcel.com" height="42rem">
      <div className="min-h-full bg-[#120f1a] text-[#efe9f5]">
        {/* Nav */}
        <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#120f1a]/95 px-5 py-3.5 backdrop-blur">
          <span className="flex items-center gap-2 font-bold">📷 FotoConElCel</span>
          <button
            onClick={() => setInscrito(true)}
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-[#1a1020]"
            style={{ background: CORAL }}
          >
            {inscripto ? '✓ Inscrito' : 'Inscribirme'}
          </button>
        </nav>

        {/* Hero */}
        <header
          className="px-6 py-12"
          style={{ background: 'radial-gradient(120% 80% at 20% 0%, rgba(255,138,91,0.25), transparent 60%)' }}
        >
          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(255,138,91,0.15)', color: CORAL }}>
            Curso online · a tu ritmo
          </span>
          <h1 className="mt-4 max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">
            Saca fotos increíbles con el celular que ya tienes.
          </h1>
          <p className="mt-3 max-w-md text-[#b7aec6]">
            6 módulos para pasar de fotos comunes a imágenes que enamoran. Sin equipo caro, sin vueltas.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-[#b7aec6]">
            <span>🎬 6 módulos</span>
            <span>⏱️ 1 h 52 min</span>
            <span>📱 Solo tu cel</span>
            <span>♾️ Acceso de por vida</span>
          </div>
        </header>

        {/* Progreso */}
        <div className="px-6 pt-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold">Tu progreso</span>
            <span className="text-[#b7aec6]">{inscripto ? 'Todo desbloqueado 🎉' : `${libres} de ${MODULOS.length} módulos gratis`}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progreso}%`, background: CORAL }} />
          </div>
        </div>

        {/* Temario */}
        <section className="px-6 py-6">
          <h2 className="mb-3 text-lg font-bold">Temario</h2>
          <ul className="space-y-2">
            {MODULOS.map((m) => {
              const abierto = m.libre || inscripto;
              return (
                <li
                  key={m.n}
                  onClick={() => !abierto && intentarBloqueado()}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    abierto ? 'border-white/10 bg-white/[0.03]' : 'cursor-pointer border-white/5 bg-white/[0.01] opacity-70 hover:opacity-100'
                  }`}
                >
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold"
                    style={abierto ? { background: 'rgba(255,138,91,0.15)', color: CORAL } : { background: 'rgba(255,255,255,0.06)' }}
                  >
                    {abierto ? '▶' : '🔒'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.titulo}</p>
                    <p className="text-xs text-[#b7aec6]">Módulo {m.n} · {m.duracion}</p>
                  </div>
                  {m.libre && !inscripto && (
                    <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold">GRATIS</span>
                  )}
                </li>
              );
            })}
          </ul>
          {aviso && (
            <p className="page-fade mt-3 rounded-lg bg-white/5 p-2.5 text-center text-sm" style={{ color: CORAL }}>
              🔒 Inscríbete para desbloquear todos los módulos
            </p>
          )}
        </section>

        {/* Testimonio */}
        <section className="px-6 pb-4">
          <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm" style={{ color: CORAL }}>★★★★★</div>
            <blockquote className="mt-2 text-sm text-[#d8d0e6]">
              "Empecé sin saber nada y ahora me pagan por sacar fotos de productos. El módulo de luz es oro."
            </blockquote>
            <figcaption className="mt-3 text-xs text-[#b7aec6]">— Caro P., emprendedora</figcaption>
          </figure>
        </section>

        {/* CTA final */}
        <section className="px-6 pb-10">
          {inscripto ? (
            <div className="success-check rounded-2xl border p-6 text-center" style={{ borderColor: 'rgba(255,138,91,0.4)', background: 'rgba(255,138,91,0.08)' }}>
              <div className="text-3xl">🎉</div>
              <p className="mt-2 font-bold">¡Bienvenido al curso!</p>
              <p className="mt-1 text-sm text-[#b7aec6]">Ya tienes acceso a los 6 módulos. Así de simple vende un curso online.</p>
              <button
                onClick={() => setInscrito(false)}
                className="mt-4 rounded-full border border-white/20 px-4 py-2 text-sm font-medium"
              >
                Ver de nuevo
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${CORAL}, #ff5b8a)` }}>
              <h2 className="text-xl font-extrabold text-[#1a1020]">Empieza hoy mismo</h2>
              <p className="mt-1 text-sm text-[#1a1020]/80">Acceso de por vida. Garantía de 7 días.</p>
              <button
                onClick={() => setInscrito(true)}
                className="mt-4 rounded-full bg-[#120f1a] px-6 py-3 font-semibold text-white"
              >
                Inscribirme al curso
              </button>
            </div>
          )}
        </section>
      </div>
    </BrowserFrame>
  );
}
