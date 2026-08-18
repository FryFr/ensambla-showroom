import { useState } from 'react';
import BrowserFrame from './BrowserFrame';

// Sitio informativo multipágina de un negocio ficticio: estudio contable "Núcleo".
// Router en memoria (no rutas Astro): la navegación pasa por useState.

type Page = 'inicio' | 'servicios' | 'nosotros' | 'contacto';
const NAV: { id: Page; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

const AZUL = '#2f6fed';

export default function InformativoDemo() {
  const [page, setPage] = useState<Page>('inicio');

  return (
    <BrowserFrame url="nucleo.com.co" height="42rem">
      <div className="min-h-full bg-white text-[#1a2233]">
        {/* Nav */}
        <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-3.5 backdrop-blur">
          <button onClick={() => setPage('inicio')} className="flex items-center gap-2 font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-md text-white" style={{ background: AZUL }}>N</span>
            Núcleo <span className="hidden text-xs font-normal text-[#6b7488] sm:inline">Estudio Contable</span>
          </button>
          <div className="flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  page === n.id ? 'font-semibold' : 'text-[#6b7488] hover:text-[#1a2233]'
                }`}
                style={page === n.id ? { color: AZUL, background: '#eef3ff' } : undefined}
                aria-current={page === n.id ? 'page' : undefined}
              >
                {n.label}
              </button>
            ))}
          </div>
        </nav>

        <div key={page} className="page-fade">
          {page === 'inicio' && <Inicio onNav={setPage} />}
          {page === 'servicios' && <Servicios />}
          {page === 'nosotros' && <Nosotros />}
          {page === 'contacto' && <Contacto />}
        </div>

        {/* Footer */}
        <footer className="mt-8 border-t border-black/10 bg-[#f7f9fc] px-6 py-6 text-sm text-[#6b7488]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[#1a2233]">Núcleo · Estudio Contable</span>
            <span>© {new Date().getFullYear()} · Marca ficticia para demo</span>
          </div>
        </footer>
      </div>
    </BrowserFrame>
  );
}

function Hero2({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-12">{children}</div>;
}

function Inicio({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <>
      <div
        className="px-6 py-16 text-white"
        style={{ background: `linear-gradient(135deg, ${AZUL}, #1b3f9e)` }}
      >
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">+15 años de experiencia</span>
        <h1 className="mt-4 max-w-lg text-3xl font-extrabold sm:text-4xl">
          Tu contabilidad, ordenada y sin sorpresas.
        </h1>
        <p className="mt-3 max-w-md text-white/85">
          Acompañamos a pymes y independientes con impuestos, sueldos y balances. Tú haces crecer tu negocio, nosotros los números.
        </p>
        <button
          onClick={() => onNav('contacto')}
          className="mt-6 rounded-full bg-white px-6 py-3 font-semibold"
          style={{ color: AZUL }}
        >
          Pide una reunión
        </button>
      </div>
      <div className="grid gap-4 px-6 py-12 sm:grid-cols-3">
        {[
          { i: '📊', t: 'Impuestos al día', d: 'Presentaciones en fecha, sin multas ni corridas.' },
          { i: '👥', t: 'Sueldos y RRHH', d: 'Liquidación de haberes y altas tempranas.' },
          { i: '📈', t: 'Balances claros', d: 'Estados contables que entiendes y te sirven para decidir.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <div className="text-2xl">{c.i}</div>
            <h3 className="mt-2 font-bold">{c.t}</h3>
            <p className="mt-1 text-sm text-[#6b7488]">{c.d}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Servicios() {
  const servicios = [
    { t: 'Régimen simple', d: 'Inscripción, actualización y control mensual para que cumplas sin sustos.' },
    { t: 'Impuestos', d: 'IVA, Renta, ICA. Cálculo, presentación y planificación.' },
    { t: 'Sueldos', d: 'Liquidación de nómina, seguridad social (PILA) y desprendibles digitales.' },
    { t: 'Sociedades', d: 'Constitución de SAS, libros societarios y estados financieros anuales.' },
    { t: 'Asesoría', d: 'Reuniones periódicas para planificar impuestos y mejorar tu rentabilidad.' },
    { t: 'Facturación', d: 'Puesta a punto de facturación electrónica y punto de venta.' },
  ];
  return (
    <Hero2>
      <h1 className="text-3xl font-extrabold">Servicios</h1>
      <p className="mt-2 text-[#6b7488]">Todo lo que tu negocio necesita para estar en regla y crecer tranquilo.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {servicios.map((s) => (
          <div key={s.t} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <h3 className="font-bold" style={{ color: AZUL }}>{s.t}</h3>
            <p className="mt-1.5 text-sm text-[#6b7488]">{s.d}</p>
          </div>
        ))}
      </div>
    </Hero2>
  );
}

function Nosotros() {
  return (
    <Hero2>
      <h1 className="text-3xl font-extrabold">Nosotros</h1>
      <p className="mt-4 max-w-2xl text-[#3a4256]">
        Somos un estudio contable de tres socios y un equipo de seis profesionales. Desde 2009 acompañamos a más de
        400 pymes y emprendedores de todo el país. Creemos en la cercanía: vas a hablar siempre con la misma persona,
        que conoce tu negocio.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { n: 'Ana Marín', r: 'Socia · Impuestos' },
          { n: 'Pablo Ferreyra', r: 'Socio · Laboral' },
          { n: 'Sofía Duarte', r: 'Socia · Societario' },
        ].map((p) => (
          <div key={p.n} className="rounded-2xl border border-black/8 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-2xl text-white" style={{ background: AZUL }}>
              {p.n[0]}
            </div>
            <h3 className="mt-3 font-bold">{p.n}</h3>
            <p className="text-sm text-[#6b7488]">{p.r}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl p-6 text-center text-white" style={{ background: AZUL }}>
        {[
          ['400+', 'clientes'],
          ['15', 'años'],
          ['9', 'profesionales'],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="text-3xl font-extrabold">{n}</div>
            <div className="text-sm text-white/80">{l}</div>
          </div>
        ))}
      </div>
    </Hero2>
  );
}

function Contacto() {
  const [sent, setSent] = useState(false);
  return (
    <Hero2>
      <h1 className="text-3xl font-extrabold">Contacto</h1>
      <p className="mt-2 text-[#6b7488]">Escríbenos y coordinamos una primera reunión sin cargo.</p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="space-y-3 text-sm">
          <Info icon="📍" label="Oficina" value="Calle 72 #10-34, Oficina 501, Bogotá" />
          <Info icon="📞" label="Teléfono" value="601 745 0100" />
          <Info icon="✉️" label="Email" value="hola@nucleo.com.co" />
          <Info icon="🕘" label="Horario" value="Lun a Vie de 9 a 18 h" />
        </div>
        {sent ? (
          <div className="success-check grid place-items-center rounded-2xl border border-black/8 bg-[#eef7ee] p-8 text-center">
            <div>
              <div className="text-4xl">✅</div>
              <h3 className="mt-2 font-bold">¡Gracias! Te contactamos pronto.</h3>
            </div>
          </div>
        ) : (
          <form
            className="space-y-3 rounded-2xl border border-black/8 bg-white p-5 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="Nombre" className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#2f6fed]" />
            <input required type="email" placeholder="Email" className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#2f6fed]" />
            <textarea required placeholder="¿En qué te ayudamos?" className="min-h-24 w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#2f6fed]" />
            <button className="w-full rounded-full py-2.5 font-semibold text-white" style={{ background: AZUL }}>
              Enviar consulta
            </button>
          </form>
        )}
      </div>
    </Hero2>
  );
}

function Info({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-[#6b7488]">{value}</p>
      </div>
    </div>
  );
}
