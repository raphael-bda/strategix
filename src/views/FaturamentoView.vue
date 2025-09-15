<template>
  <div>
    <h1 class="text-3xl font-semibold text-white">Faturamento</h1>

    <div class="content-grid grid-2 mt-8">
      <BaseCard title="Valores do Mês">
        <div class="grid grid-cols-2 gap-4">
          <div class="input-group">
            <label class="input-label">Recebido (R$)</label>
            <input type="number" class="input-field" v-model.number="store.state.faturamento.recebido">
          </div>
          <div class="input-group">
            <label class="input-label">A Receber (R$)</label>
            <input type="number" class="input-field" v-model.number="store.state.faturamento.aReceber">
          </div>
          <div class="input-group">
            <label class="input-label">Meta (R$)</label>
            <input type="number" class="input-field" v-model.number="store.state.faturamento.meta">
          </div>
          <div class="input-group">
            <label class="input-label">Projeção (R$)</label>
            <input type="number" class="input-field" v-model.number="store.state.faturamento.projecao">
          </div>
        </div>
      </BaseCard>
      <BaseCard title="Performance" class="flex flex-col justify-center items-center">
        <div class="stat-card w-full">
          <div class="stat-value text-primary-green">{{ store.metaFaturamentoPercent }}</div>
          <div class="stat-label">Meta Atingida</div>
        </div>
      </BaseCard>
    </div>

    <BaseCard title="Valores Semanais (R$)" class="my-8">
      <div class="content-grid grid-4">
        <div class="input-group" v-for="i in 4" :key="i">
          <label class="input-label">Semana {{ i }}</label>
          <input type="number" class="input-field" placeholder="0" v-model.number="store.state.faturamento.semanais[i-1]">
        </div>
      </div>
    </BaseCard>

    <div class="content-grid grid-2">
      <div class="chart-container">
        <h3 class="chart-title">Evolução Semanal</h3>
        <v-chart class="h-[400px]" :option="chartSemanas" autoresize />
      </div>
      <div class="chart-container">
        <h3 class="chart-title">Comparativo Mensal</h3>
        <v-chart class="h-[400px]" :option="chartComparativo" autoresize />
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

const chartSemanas = computed(() => ({
  tooltip: { trigger: 'axis', formatter: (params: any) => `${params[0].name}<br/>${params[0].marker} ${formatCurrency(params[0].value)}` },
  xAxis: { type: 'category', data: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] },
  yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
  series: [{
    name: 'Faturamento', type: 'line', data: store.state.faturamento.semanais,
    smooth: true, itemStyle: { color: '#00BF63' }, areaStyle: { color: 'rgba(0, 191, 99, 0.2)' }
  }]
}));

const chartComparativo = computed(() => {
  const { recebido, aReceber, meta, projecao } = store.state.faturamento;
  return {
    tooltip: { trigger: 'item', formatter: (params: any) => `${params.name}: ${formatCurrency(params.value)}` },
    xAxis: { type: 'category', data: ['Recebido', 'A Receber', 'Meta', 'Projeção'] },
    yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
    series: [{
      type: 'bar', data: [recebido, aReceber, meta, projecao],
      itemStyle: {
        color: (params: any) => ['#00BF63', '#3B82F6', '#F97316', '#8B5CF6'][params.dataIndex]
      }
    }]
  };
});
</script>