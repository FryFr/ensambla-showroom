import { demoComponents } from './registry';

interface Props {
  slug: string;
}

/**
 * Island único que monta la demo interactiva según el slug.
 * Si la demo todavía no está registrada, muestra un placeholder.
 */
export default function DemoHost({ slug }: Props) {
  const Demo = demoComponents[slug];

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

  return <Demo />;
}
