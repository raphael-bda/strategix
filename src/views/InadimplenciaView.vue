<template>
  <div>
    <h1 class="text-3xl font-semibold text-white">Inadimplência</h1>

    <div class="content-grid grid-2 mt-8">
      <BaseCard title="Dados de Inadimplência">
        <div class="grid grid-cols-2 gap-4">
          <div class="input-group">
            <label class="input-label">Valor Total (R$)</label>
            <input type="number" class="input-field" v-model.number="store.state.inadimplencia.valor">
          </div>
          <div class="input-group">
            <label class="input-label">Percentual (%)</label>
            <input type="number" class="input-field" v-model.number="store.state.inadimplencia.percentual">
          </div>
        </div>
      </BaseCard>
      <BaseCard title="Status" class="flex flex-col justify-center items-center">
        <div class="stat-card w-full">
          <div class="stat-value text-critical-red">{{ formatCurrency(store.state.inadimplencia.valor) }}</div>
          <div class="stat-label">Valor Inadimplente</div>
        </div>
      </BaseCard>
    </div>
    
    <div class="chart-container mt-8">
      <h3 class="chart-title">Evolução Mensal da Inadimplência (da Visão Geral)</h3>
      <v-chart class="h-[400px]" :option="chartEvolucao" autoresize />
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

const chartEvolucao = computed(() => {
  const meses = Object.keys(store.state.visaoGeral.meses).map(m => m.charAt(0).toUpperCase() + m.slice(1));
  const data = Object.values(store.state.visaoGeral.meses).map(m => m.inadimplencia);
  
  return {
    tooltip: { trigger: 'axis', formatter: (params: any) => `${params[0].name}<br/>${params[0].marker} ${formatCurrency(params[0].value)}` },
    xAxis: { type: 'category', data: meses },
    yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
    series: [{
      name: 'Inadimplência', type: 'bar', data: data,
      itemStyle: { color: '#EF4444' }
    }]
  };
});
</script>