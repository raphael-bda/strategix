<template>
  <div ref="chartRef" class="w-full h-full min-h-[300px]"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, type PropType } from 'vue';
import echarts from '@/plugins/echarts';
import type { EChartsOption } from 'echarts';

const props = defineProps({
  option: {
    type: Object as PropType<EChartsOption>,
    required: true
  }
});

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

// Função para inicializar um novo gráfico.
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(props.option, true);
  }
};

// Função para destruir a instância atual do gráfico.
const disposeChart = () => {
    chartInstance?.dispose();
    chartInstance = null;
}

// Observa o container do gráfico e o redimensiona se ele mudar de tamanho
const setupResizeObserver = () => {
    if (chartRef.value) {
        resizeObserver = new ResizeObserver(() => {
            chartInstance?.resize();
        });
        resizeObserver.observe(chartRef.value);
    }
}

// =================================================================
// --- LÓGICA DE ATUALIZAÇÃO CORRIGIDA ---
// =================================================================
// Agora, em vez de apenas atualizar, nós destruímos e recriamos o gráfico.
watch(() => props.option, () => {
  disposeChart(); // 1. Destrói o gráfico antigo
  initChart();    // 2. Cria um novo gráfico com as novas opções
}, { deep: true });

// Monta o gráfico pela primeira vez quando o componente é criado.
onMounted(() => {
  initChart();
  setupResizeObserver();
});

// Garante que o gráfico e o observer sejam destruídos quando o componente some.
onBeforeUnmount(() => {
  if (resizeObserver && chartRef.value) {
      resizeObserver.unobserve(chartRef.value);
  }
  disposeChart();
});
</script>