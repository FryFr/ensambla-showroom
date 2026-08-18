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

export const demoComponents: Record<string, ComponentType> = {
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
};
