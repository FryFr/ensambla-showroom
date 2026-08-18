import { useEffect, useState } from 'react';
import { demoComponents } from './registry';
import { getVariant } from '../../data/variants';

interface Props {
  slug: string;
}

/**
 * Island único que monta la demo interactiva según el slug.
 * Si viene ?nicho=<key> en la URL y existe variante para (slug, nicho),
 * le pasa la data de ese nicho al componente. Si no, usa su data genérica.
 * Si la demo todavía no está registrada, muestra un placeholder.
 */
export default function DemoHost({ slug }: Props) {
  const Demo = demoComponents[slug];

  // El nicho vive en el querystring (sitio estático → solo se lee en cliente).
  // Se lee tras montar para no romper la hidratación (SSR no tiene window).
  const [nicho, setNicho] = useState<string | null>(null);
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('nicho');
    if (n) setNicho(n);
  }, []);

  if (!Demo) {
    return (
      <div className="card flex min-h-[24rem] flex-col items-center justify-center gap-3 p-10 text-center">
        <span className="text-4xl">🧩</span>
        <p className="font-display text-xl font-semibold">Demo en construcción</p>
        <p className="max-w-sm text-sm text-ink-muted">
          Esta demo se está ensamblando. Vuelve en un rato o escríbenos y te la mostramos.
        </p>
      </div>
    );
  }

  const variant = getVariant(slug, nicho);
  // key por nicho: al resolver la variante, remonta el componente para que su
  // estado inicial se calcule con la data correcta (evita ids que no existen).
  return <Demo key={nicho ?? 'default'} variant={variant} />;
}
