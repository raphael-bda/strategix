// src/plugins/echarts.ts

// 1. Importa o objeto principal 'echarts' do núcleo da biblioteca
import * as echarts from 'echarts/core';

// Importa os tipos de gráficos que vamos usar
import {
  BarChart,
  LineChart,
  PieChart
} from 'echarts/charts';

// Importa os componentes que os gráficos precisam
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';

// Importa o renderizador
import { CanvasRenderer } from 'echarts/renderers';

// 2. Usa o objeto 'echarts' para registrar todos os módulos
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer
]);

// 3. Exporta o objeto 'echarts' agora configurado como o default
export default echarts;