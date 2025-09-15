<template>
  <div>
    <h1 class="text-3xl font-semibold text-white">
      Visão Geral {{ store.state.periodo.mes === 'todos' ? '2025' : `- ${capitalizedMonth}` }}
    </h1>
    <div class="content-grid grid-4 mt-8">
      <div class="stat-card"><div class="stat-value">{{ store.dadosDoPeriodo.matriculas }}</div><div class="stat-label">Total Matrículas</div></div>
      <div class="stat-card"><div class="stat-value">{{ store.dadosDoPeriodo.rematriculas }}</div><div class="stat-label">Total Rematrículas</div></div>
      <div class="stat-card"><div class="stat-value">{{ formatCurrency(store.dadosDoPeriodo.faturamento) }}</div><div class="stat-label">Faturamento</div></div>
      <div class="stat-card"><div class="stat-value text-warning-orange">{{ formatPercentage(store.dadosDoPeriodo.inadimplenciaMedia) }}</div><div class="stat-label">Inadimplência Média</div></div>
    </div>
    <BaseCard v-if="store.state.periodo.mes === 'todos'" title="Dados Mensais" class="mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="(dados, mes) in store.state.visaoGeral.meses" :key="mes" class="p-4 bg-gray-900/50 rounded-lg">
          <h4 class="font-bold text-primary-green capitalize text-center mb-4">{{ mes }}</h4>
          <div class="space-y-3">
            <div class="input-group !mb-0"><label class="input-label !text-xs">Matrículas</label><input type="number" class="input-field !p-2" v-model.number="dados.matriculas"></div>
            <div class="input-group !mb-0"><label class="input-label !text-xs">Rematrículas</label><input type="number" class="input-field !p-2" v-model.number="dados.rematriculas"></div>
            <div class="input-group !mb-0"><label class="input-label !text-xs">Faturamento (R$)</label><input type="number" class="input-field !p-2" v-model.number="dados.faturamento"></div>
            <div class="input-group !mb-0"><label class="input-label !text-xs">Inadimplência (R$)</label><input type="number" class="input-field !p-2" v-model.number="dados.inadimplencia"></div>
          </div>
        </div>
      </div>
    </BaseCard>
    <div v-if="store.state.periodo.mes === 'todos'" class="content-grid grid-2 mt-8">
        <BaseCard title="🏆 Destaques do Ano">
            <div class="grid grid-cols-2 gap-4">
                <div class="stat-card"><div class="stat-value text-info-blue capitalize">{{ store.analiseAnual.melhorMesMatriculas.mes }}</div><div class="stat-label">Melhor Mês (Matrículas)</div></div>
                <div class="stat-card"><div class="stat-value text-info-blue capitalize">{{ store.analiseAnual.melhorMesFaturamento.mes }}</div><div class="stat-label">Melhor Mês (Faturamento)</div></div>
            </div>
        </BaseCard>
        <BaseCard title="📊 Médias Mensais">
             <div class="grid grid-cols-2 gap-4">
                <div class="stat-card"><div class="stat-value">{{ store.analiseAnual.mediaMatriculasMensal.toFixed(0) }}</div><div class="stat-label">Média de Matrículas</div></div>
                <div class="stat-card"><div class="stat-value">{{ formatCurrency(store.analiseAnual.mediaFaturamentoMensal) }}</div><div class="stat-label">Média de Faturamento</div></div>
            </div>
        </BaseCard>
    </div>
    <div class="content-grid grid-1 lg:grid-cols-2 mt-8">
      <div class="chart-container lg:col-span-2">
        <h3 class="chart-title">Matrículas vs Rematrículas</h3>
        <v-chart class="h-[400px]" :option="chartMatriculas" autoresize />
      </div>
      <div class="chart-container">
        <h3 class="chart-title">Faturamento Mensal</h3>
        <v-chart class="h-[400px]" :option="chartFaturamento" autoresize />
      </div>
      <div class="chart-container">
        <h3 class="chart-title">Inadimplência Mensal</h3>
        <v-chart class="h-[400px]" :option="chartInadimplencia" autoresize />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import BaseCard from '@/components/ui/BaseCard.vue';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import VChart from 'vue-echarts';
import '@/plugins/echarts';

const store = useDashboardStore();
const capitalizedMonth = computed(() => {
    const mes = store.state.periodo.mes;
    if (mes === 'todos') return '';
    return mes.charAt(0).toUpperCase() + mes.slice(1);
});
const mesesLabels = computed(() => Object.keys(store.state.visaoGeral.meses).map(m => m.charAt(0).toUpperCase() + m.slice(1)));
const chartMatriculas = computed(() => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['Matrículas', 'Rematrículas'], textStyle: { color: '#e2e8f0' }, bottom: 0 },
    grid: { top: '10%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: mesesLabels.value },
    yAxis: { type: 'value', min: 0 },
    series: [
        { name: 'Matrículas', type: 'bar', data: Object.values(store.state.visaoGeral.meses).map(m => m.matriculas), itemStyle: { color: '#00BF63' } },
        { name: 'Rematrículas', type: 'bar', data: Object.values(store.state.visaoGeral.meses).map(m => m.rematriculas), itemStyle: { color: '#3B82F6' } }
    ]
}));
const chartFaturamento = computed(() => ({
    tooltip: { trigger: 'axis', formatter: (params: any) => `${params[0].name}<br/>${params[0].marker} ${formatCurrency(params[0].value)}` },
    grid: { top: '15%', left: '3%', right: '4%', bottom: '5%', containLabel: true },
    xAxis: { type: 'category', data: mesesLabels.value },
    yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
    series: [{ name: 'Faturamento', type: 'line', smooth: true, data: Object.values(store.state.visaoGeral.meses).map(m => m.faturamento), areaStyle: { color: 'rgba(0, 191, 99, 0.2)' }, itemStyle: { color: '#00BF63' } }]
}));
const chartInadimplencia = computed(() => ({
    tooltip: { trigger: 'axis', formatter: (params: any) => `${params[0].name}<br/>${params[0].marker} ${formatCurrency(params[0].value)}` },
    grid: { top: '15%', left: '3%', right: '4%', bottom: '5%', containLabel: true },
    xAxis: { type: 'category', data: mesesLabels.value },
    yAxis: { type: 'value', min: 0, axisLabel: { formatter: (val: number) => formatCurrency(val) } },
    series: [{ name: 'Inadimplência', type: 'line', smooth: true, data: Object.values(store.state.visaoGeral.meses).map(m => m.inadimplencia), areaStyle: { color: 'rgba(239, 68, 68, 0.2)' }, itemStyle: { color: '#EF4444' } }]
}));
</script>
<style scoped>
.capitalize { text-transform: capitalize; }
.input-group.\!mb-0 { margin-bottom: 0 !important; }
.input-label.\!text-xs { font-size: 0.7rem; }
.input-field.\!p-2 { padding: 0.5rem; }
</style>