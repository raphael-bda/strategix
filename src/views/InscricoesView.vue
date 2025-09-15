<template>
  <div>
    <h1 class="text-3xl font-semibold text-white">Resumo de Inscrições</h1>

    <div class="content-grid grid-2 mt-8">
      <BaseCard title="Inscrições por Origem">
        <div class="grid grid-cols-2 gap-4">
          <div class="input-group" v-for="(label, key) in origens" :key="key">
            <label class="input-label">{{ label }}</label>
            <input type="number" class="input-field" v-model.number="store.state.inscricoes.porOrigem[key]">
          </div>
        </div>
      </BaseCard>
      <BaseCard title="Total" class="flex flex-col justify-center items-center">
        <div class="stat-card w-full">
          <div class="stat-value text-primary-green">{{ store.totalInscricoes }}</div>
          <div class="stat-label">Total de Inscrições</div>
        </div>
      </BaseCard>
    </div>

    <div class="chart-container mt-8">
      <h3 class="chart-title">Distribuição por Origem</h3>
      <v-chart class="h-[500px]" :option="chartOrigem" autoresize />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import BaseCard from '@/components/ui/BaseCard.vue';
import VChart from 'vue-echarts';
import '@/plugins/echarts';
import type { DashboardState } from '@/types';

const store = useDashboardStore();

type OrigemKey = keyof DashboardState['inscricoes']['porOrigem'];

const origens: Record<OrigemKey, string> = {
  campanhas: 'Campanhas',
  indicacoes: 'Indicações',
  rematriculas9: 'Remat. 9ª aula',
  rematriculasUltima: 'Remat. última',
  rematriculasFormados: 'Remat. formados',
  desistentes: 'Desistentes'
};

const chartOrigem = computed(() => {
  const data = (Object.keys(origens) as OrigemKey[]).map(key => ({
    name: origens[key],
    value: store.state.inscricoes.porOrigem[key]
  }));

  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { top: 'bottom', textStyle: { color: '#e2e8f0' } },
    series: [{
      name: 'Origem',
      type: 'pie',
      radius: ['40%', '70%'],
      data: data,
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }]
  };
});
</script>
