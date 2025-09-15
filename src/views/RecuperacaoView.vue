+<template>
  <div>
    <h1 class="text-3xl font-semibold text-white">Recuperação de Inadimplência</h1>

    <div class="content-grid grid-3-2 mt-8">
      <BaseCard title="Valores Recuperados por Mês (R$)" class="col-span-2">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="input-group" v-for="(_, mes) in store.state.recuperacao.meses" :key="mes">
            <label class="input-label capitalize">{{ mes }}</label>
            <input type="number" class="input-field" v-model.number="store.state.recuperacao.meses[mes]">
          </div>
        </div>
      </BaseCard>
      <BaseCard title="Estatísticas Anuais">
        <div class="space-y-4">
          <div class="stat-card">
            <div class="stat-value text-primary-green">{{ store.eficienciaRecuperacaoAnual }}</div>
            <div class="stat-label">Eficiência Anual</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ formatCurrency(store.totalRecuperado) }}</div>
            <div class="stat-label">Total Recuperado</div>
          </div>
        </div>
      </BaseCard>
    </div>
    
    <div class="content-grid grid-2 mt-8">
        <div class="chart-container">
            <h3 class="chart-title">Recuperação Mensal</h3>
            <v-chart class="h-[400px]" :option="chartRecuperacao" autoresize />
        </div>
        <div class="chart-container">
            <h3 class="chart-title">Valor Acumulado</h3>
            <v-chart class="h-[400px]" :option="chartAcumulado" autoresize />
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import BaseCard from '@/components/ui/BaseCard.vue';
import { formatCurrency } from '@/utils/formatters';
import VChart from 'vue-echarts';
import '@/plugins/echarts';
const store = useDashboardStore();

const mesesLabels = computed(() => [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]);

const chartRecuperacao = computed(() => ({
    tooltip: { trigger: 'axis', formatter: (params: any) => `${params[0].name}<br/>${params[0].marker} ${formatCurrency(params[0].value)}` },
    xAxis: { type: 'category', data: mesesLabels.value },
    yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
    series: [{ name: 'Recuperado', type: 'bar', data: Object.values(store.state.recuperacao.meses), itemStyle: { color: '#00BF63' } }]
}));

const chartAcumulado = computed(() => {
    const dataAcumulada = Object.values(store.state.recuperacao.meses).reduce((acc, val) => {
        acc.push((acc.length > 0 ? acc[acc.length - 1] : 0) + val);
        return acc;
    }, [] as number[]);
    return {
        tooltip: { trigger: 'axis', formatter: (params: any) => `${params[0].name}<br/>${params[0].marker} ${formatCurrency(params[0].value)}` },
        xAxis: { type: 'category', data: mesesLabels.value },
        yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
        series: [{ name: 'Acumulado', type: 'line', data: dataAcumulada, smooth: true, areaStyle: { color: 'rgba(59, 130, 246, 0.2)' }, itemStyle: { color: '#3B82F6' } }]
    };
});

// Remover variável 'valor' não usada
</script>
<style scoped>
.grid-3-2 { display: grid; gap: 24px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1024px) { .grid-3-2 { grid-template-columns: repeat(3, minmax(0, 1fr)); } .col-span-2 { grid-column: span 2 / span 2; } }
.capitalize { text-transform: capitalize; }
</style>