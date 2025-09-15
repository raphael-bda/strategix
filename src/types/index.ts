export interface Kpi {
  id: string;
  title: string;
  value: number;
  trend: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
}
export interface DadosMensais {
  matriculas: number;
  rematriculas: number;
  faturamento: number;
  inadimplencia: number;
}
export interface MesesDoAno<T> {
  janeiro: T; fevereiro: T; marco: T; abril: T; maio: T; junho: T;
  julho: T; agosto: T; setembro: T; outubro: T; novembro: T; dezembro: T;
  [key: string]: T;
}
export interface Campanha {
  id: number;
  nome: string;
  dataInicio: string;
  dataTermino: string;
  matriculas: number;
  status: 'ativas' | 'concluidas';
}
export interface DashboardState {
  periodo: { ano: number; mes: string; };
  visaoGeral: { meses: MesesDoAno<DadosMensais>; };
  mesAtual: {
    mesAnalisado: string; matriculas: number; rematriculasMeta: number;
    rematriculasRealizadas: number; desistentesMeta: number; desistentesRealizadas: number;
    indicacoes: number; semanais: { matriculas: [number, number, number, number]; };
  };
  campanhas: Campanha[];
  faturamento: {
    recebido: number; aReceber: number; meta: number;
    projecao: number; semanais: [number, number, number, number];
  };
  inscricoes: {
    porOrigem: {
      campanhas: number; indicacoes: number; rematriculas9: number;
      rematriculasUltima: number; rematriculasFormados: number; desistentes: number;
      [key: string]: number;
    };
  };
  inadimplencia: { valor: number; percentual: number; };
  recuperacao: { meses: MesesDoAno<number>; };
}