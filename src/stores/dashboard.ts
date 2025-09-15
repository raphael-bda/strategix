import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { DashboardState, MesesDoAno, Campanha } from '@/types';
import { formatPercentage } from '@/utils/formatters';
import { toast } from 'vue-sonner';

const criarMeses = <T>(defaultValueFactory: () => T): MesesDoAno<T> => ({
  janeiro: defaultValueFactory(), fevereiro: defaultValueFactory(), marco: defaultValueFactory(), abril: defaultValueFactory(),
  maio: defaultValueFactory(), junho: defaultValueFactory(), julho: defaultValueFactory(), agosto: defaultValueFactory(),
  setembro: defaultValueFactory(), outubro: defaultValueFactory(), novembro: defaultValueFactory(), dezembro: defaultValueFactory(),
});

const getInitialState = (): DashboardState => ({
  periodo: { ano: 2025, mes: 'todos' as const },
  visaoGeral: { meses: criarMeses(() => ({ matriculas: 0, rematriculas: 0, faturamento: 0, inadimplencia: 0 })) },
  mesAtual: { mesAnalisado: '', matriculas: 0, rematriculasMeta: 0, rematriculasRealizadas: 0, desistentesMeta: 0, desistentesRealizadas: 0, indicacoes: 0, semanais: { matriculas: [0, 0, 0, 0] } },
  campanhas: [],
  faturamento: { recebido: 0, aReceber: 0, meta: 0, projecao: 0, semanais: [0, 0, 0, 0] },
  inscricoes: { porOrigem: { campanhas: 0, indicacoes: 0, rematriculas9: 0, rematriculasUltima: 0, rematriculasFormados: 0, desistentes: 0 } },
  inadimplencia: { valor: 0, percentual: 0 },
  recuperacao: { meses: criarMeses(() => 0) },
});

export const useDashboardStore = defineStore('dashboard', () => {
  const state = ref<DashboardState>(getInitialState());

  const dadosDoPeriodo = computed(() => {
    const mesSelecionado = state.value.periodo.mes;
    if (mesSelecionado === 'todos') {
      const meses = Object.values(state.value.visaoGeral.meses);
      const faturamentoTotal = meses.reduce((sum, mes) => sum + mes.faturamento, 0);
      const inadimplenciaTotal = meses.reduce((sum, mes) => sum + mes.inadimplencia, 0);
      return {
        matriculas: meses.reduce((sum, mes) => sum + mes.matriculas, 0),
        rematriculas: meses.reduce((sum, mes) => sum + mes.rematriculas, 0),
        faturamento: faturamentoTotal,
        inadimplencia: inadimplenciaTotal,
        inadimplenciaMedia: faturamentoTotal > 0 ? (inadimplenciaTotal / faturamentoTotal) * 100 : 0,
      };
    } else {
      const dadosMes = state.value.visaoGeral.meses[mesSelecionado as keyof MesesDoAno<any>];
      return { ...dadosMes, inadimplenciaMedia: dadosMes.faturamento > 0 ? (dadosMes.inadimplencia / dadosMes.faturamento) * 100 : 0, };
    }
  });

  const analiseAnual = computed(() => {
    const meses = Object.entries(state.value.visaoGeral.meses);
    if (meses.every(m => m[1].faturamento === 0 && m[1].matriculas === 0 && m[1].rematriculas === 0)) {
        return { melhorMesFaturamento: { mes: '-', valor: 0 }, melhorMesMatriculas: { mes: '-', valor: 0 }, mediaFaturamentoMensal: 0, mediaMatriculasMensal: 0 };
    }
    const faturamentoTotal = dadosDoPeriodo.value.faturamento;
    const matriculasTotais = dadosDoPeriodo.value.matriculas + dadosDoPeriodo.value.rematriculas;
    const melhorMesFaturamento = meses.reduce((melhor, [mes, dados]) => (dados.faturamento > melhor.valor ? { mes, valor: dados.faturamento } : melhor), { mes: '-', valor: 0 });
    const melhorMesMatriculas = meses.reduce((melhor, [mes, dados]) => ((dados.matriculas + dados.rematriculas) > melhor.valor ? { mes, valor: (dados.matriculas + dados.rematriculas) } : melhor), { mes: '-', valor: 0 });
    const mesesComFaturamento = meses.filter(m => m[1].faturamento > 0).length;
    const mesesComMatriculas = meses.filter(m => (m[1].matriculas + m[1].rematriculas) > 0).length;
    return {
        melhorMesFaturamento,
        melhorMesMatriculas,
        mediaFaturamentoMensal: mesesComFaturamento > 0 ? faturamentoTotal / mesesComFaturamento : 0,
        mediaMatriculasMensal: mesesComMatriculas > 0 ? matriculasTotais / mesesComMatriculas : 0
    };
  });
  
  const metaRematriculasPercent = computed(() => {
    const { rematriculasMeta, rematriculasRealizadas } = state.value.mesAtual;
    return formatPercentage(rematriculasMeta > 0 ? (rematriculasRealizadas / rematriculasMeta) * 100 : 0);
  });
  const metaDesistentesPercent = computed(() => {
    const { desistentesMeta, desistentesRealizadas } = state.value.mesAtual;
    return formatPercentage(desistentesMeta > 0 ? (desistentesRealizadas / desistentesMeta) * 100 : 0);
  });
  const totalMatriculasMesAtual = computed(() => {
    const { matriculas, rematriculasRealizadas, indicacoes } = state.value.mesAtual;
    return matriculas + rematriculasRealizadas + indicacoes;
  });
  const metaFaturamentoPercent = computed(() => {
    const { recebido, meta } = state.value.faturamento;
    return formatPercentage(meta > 0 ? (recebido / meta) * 100 : 0);
  });
  const totalInscricoes = computed(() => Object.values(state.value.inscricoes.porOrigem).reduce((sum, value) => sum + value, 0));
  const totalRecuperado = computed(() => Object.values(state.value.recuperacao.meses).reduce((sum, value) => sum + value, 0));
  const eficienciaRecuperacaoAnual = computed(() => {
    const inadimplenciaTotal = Object.values(state.value.visaoGeral.meses).reduce((sum, mes) => sum + mes.inadimplencia, 0);
    return formatPercentage(inadimplenciaTotal > 0 ? (totalRecuperado.value / inadimplenciaTotal) * 100 : 0);
  });
  const campanhasAtivas = computed(() => state.value.campanhas.filter(c => c.status === 'ativas'));
  const campanhasConcluidas = computed(() => state.value.campanhas.filter(c => c.status === 'concluidas'));
  const melhoresCampanhas = computed(() => [...state.value.campanhas].sort((a, b) => b.matriculas - a.matriculas).slice(0, 3));
  const pioresCampanhas = computed(() => [...state.value.campanhas].sort((a, b) => a.matriculas - b.matriculas).slice(0, 3));
  function setMes(mes: string) { state.value.periodo.mes = mes; }
  function salvarCampanha(campanha: Campanha) {
    const index = state.value.campanhas.findIndex(c => c.id === campanha.id);
    if (index !== -1) { state.value.campanhas[index] = campanha; } 
    else { state.value.campanhas.push({ ...campanha, id: Date.now() }); }
  }
  function excluirCampanha(id: number) { state.value.campanhas = state.value.campanhas.filter(c => c.id !== id); }
  function downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  function exportarDadosJSON() {
    try {
      const dataStr = JSON.stringify(state.value, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      downloadFile(blob, `strategix-backup-completo-${new Date().toISOString().split('T')[0]}.json`);
      toast.success('Backup JSON exportado com sucesso!');
    } catch (error) { toast.error('Erro ao exportar o backup.'); console.error(error); }
  }
  function exportarDadosCSV() {
    try {
      const meses = state.value.visaoGeral.meses;
      const headers = ['Mes', 'Matriculas', 'Rematriculas', 'Faturamento', 'Inadimplencia'];
      const rows = Object.entries(meses).map(([nomeMes, dados]) => [
          nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1),
          dados.matriculas, dados.rematriculas, dados.faturamento, dados.inadimplencia
        ].join(',')
      );
      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      downloadFile(blob, `strategix-visao-geral-${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('Relatório CSV exportado com sucesso!');
    } catch (error) { toast.error('Erro ao exportar o CSV.'); console.error(error); }
  }
  function importarDadosJSON(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedData = JSON.parse(reader.result as string);
        if (importedData && importedData.visaoGeral && importedData.periodo) {
          state.value = importedData;
          toast.success('Backup importado com sucesso!');
        } else { toast.error('Arquivo de backup inválido.'); }
      } catch (error) { toast.error('Erro ao ler o arquivo JSON.'); console.error(error); }
    };
    reader.readAsText(file);
    input.value = '';
  }
  return { 
    state, dadosDoPeriodo, analiseAnual, metaRematriculasPercent, metaDesistentesPercent, totalMatriculasMesAtual, 
    metaFaturamentoPercent, totalInscricoes, totalRecuperado, eficienciaRecuperacaoAnual, campanhasAtivas, 
    campanhasConcluidas, melhoresCampanhas, pioresCampanhas, setMes, exportarDadosJSON, exportarDadosCSV, 
    importarDadosJSON, salvarCampanha, excluirCampanha,
  };
});