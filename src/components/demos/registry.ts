// Mapa slug → componente React de la demo (island).
// Se completa a medida que se construye cada demo (Fase 4).
// Si un slug no está aquí, /demos/[slug] muestra un placeholder "en construcción".
import type { ComponentType } from 'react';
import ChatbotDemo from './ChatbotDemo';
import LandingDemo from './LandingDemo';
import TiendaDemo from './TiendaDemo';
import InformativoDemo from './InformativoDemo';
import PedidosDemo from './PedidosDemo';
import CrmDemo from './CrmDemo';
import FlujoDemo from './FlujoDemo';
import TurnosDemo from './TurnosDemo';
import CotizadorDemo from './CotizadorDemo';
import CatalogoDemo from './CatalogoDemo';
import PanelDemo from './PanelDemo';
import CursoDemo from './CursoDemo';
import PortalDemo from './PortalDemo';
import BotInternoDemo from './BotInternoDemo';
import SyncDemo from './SyncDemo';
import RecuperadorDemo from './RecuperadorDemo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const demoComponents: Record<string, ComponentType<any>> = {
  chatbot: ChatbotDemo,
  landing: LandingDemo,
  tienda: TiendaDemo,
  informativo: InformativoDemo,
  pedidos: PedidosDemo,
  crm: CrmDemo,
  flujo: FlujoDemo,
  turnos: TurnosDemo,
  cotizador: CotizadorDemo,
  catalogo: CatalogoDemo,
  panel: PanelDemo,
  curso: CursoDemo,
  portal: PortalDemo,
  'bot-interno': BotInternoDemo,
  sync: SyncDemo,
  recuperador: RecuperadorDemo,
};
