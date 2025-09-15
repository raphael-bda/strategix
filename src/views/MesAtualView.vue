<template>
  <div>
    <h1 class="text-3xl font-semibold text-white">Análise do Mês Atual</h1>
    <div class="mes-analisado-card my-8">
        <input type="text" class="input-field max-w-sm mx-auto text-center text-primary-green font-bold" placeholder="Ex: Setembro" v-model="store.state.mesAtual.mesAnalisado">
    </div>
    <div class="content-grid grid-3">
        <BaseCard title="Matrículas"><div class="input-group"><label class="input-label">Quantidade</label><input type="number" class="input-field" placeholder="0" v-model.number="store.state.mesAtual.matriculas"></div></BaseCard>
        <BaseCard title="Rematrículas"><div class="grid grid-cols-2 gap-4"><div class="input-group"><label class="input-label">Meta</label><input type="number" class="input-field" placeholder="0" v-model.number="store.state.mesAtual.rematriculasMeta"></div><div class="input-group"><label class="input-label">Realizadas</label><input type="number" class="input-field" placeholder="0" v-model.number="store.state.mesAtual.rematriculasRealizadas"></div></div></BaseCard>
        <BaseCard title="Desistentes"><div class="grid grid-cols-2 gap-4"><div class="input-group"><label class="input-label">Meta</label><input type="number" class="input-field" placeholder="0" v-model.number="store.state.mesAtual.desistentesMeta"></div><div class="input-group"><label class="input-label">Realizadas</label><input type="number" class="input-field" placeholder="0" v-model.number="store.state.mesAtual.desistentesRealizadas"></div></div></BaseCard>
    </div>
    <div class="content-grid grid-4 my-8">
        <div class="stat-card"><div class="stat-value text-info-blue">{{ store.metaRematriculasPercent }}</div><div class="stat-label">Meta Rematrículas</div></div>
        <div class="stat-card"><div class="stat-value text-warning-orange">{{ store.metaDesistentesPercent }}</div><div class="stat-label">Meta Desistentes</div></div>
        <div class="stat-card"><div class="stat-value">{{ store.totalMatriculasMesAtual }}</div><div class="stat-label">Total Geral</div></div>
        <BaseCard><div class="input-group !mb-0"><label class="input-label text-center">Indicações</label><input type="number" class="input-field text-center font-bold text-2xl" placeholder="0" v-model.number="store.state.mesAtual.indicacoes"></div></BaseCard>
    </div>
    <BaseCard title="Dados Semanais (Matrículas)" class="my-8">
        <div class="content-grid grid-4">
            <div class="input-group" v-for="i in 4" :key="i">
                <label class="input-label">Semana {{ i }}</label>
                <input type="number" class="input-field" placeholder="0" v-model.number="store.state.mesAtual.semanais.matriculas[i-1]">
            </div>
        </div>
    </BaseCard>
    <div class="chart-container">
      <h3 class="chart-title">Evolução Semanal de Matrículas</h3>
      <v-chart class="h-[400px]" :option="chartOption" autoresize />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import BaseCard from '@/components/ui/BaseCard.vue';
import VChart from 'vue-echarts';
import '@/plugins/echarts';

// A lógica do store e dos getters foi movida para o dashboard.ts. Aqui só consumimos.
const store = useDashboardStore();
const chartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] },
  yAxis: { type: 'value', min: 0 },
  series: [{ name: 'Matrículas', type: 'line', data: store.state.mesAtual.semanais.matriculas, smooth: true, itemStyle: { color: '#00BF63' }, areaStyle: { color: 'rgba(0, 191, 99, 0.2)' } }]
}));
</script>
<style scoped>
.input-group.\!mb-0 { margin-bottom: 0 !important; }
</style>