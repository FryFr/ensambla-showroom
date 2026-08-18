import type { ReactNode } from 'react';

interface Props {
  url?: string;
  children: ReactNode;
  /** Alto del viewport interno (con scroll propio). Por defecto 40rem. */
  height?: string;
}

/**
 * Marco tipo navegador para las demos web (landing, tienda, informativo).
 * El contenido scrollea DENTRO del marco: refuerza que es una vista de sitio.
 */
export default function BrowserFrame({ url = 'tu-marca.com', children, height = '40rem' }: Props) {
  return (
    <div className="card overflow-hidden p-0">
      {/* Barra del navegador */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-md bg-black/30 px-3 py-1">
          <span className="text-xs text-ink-muted">🔒</span>
          <span className="techlabel truncate normal-case tracking-normal">{url}</span>
        </div>
      </div>
      {/* Viewport con scroll interno */}
      <div className="overflow-y-auto bg-base" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
