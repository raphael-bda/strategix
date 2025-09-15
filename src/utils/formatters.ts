// src/utils/formatters.ts

/**
 * Formata um número para o padrão de moeda BRL (Ex: 1234.5 -> "R$ 1.234,50")
 * @param value O número a ser formatado
 * @returns A string formatada como moeda
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
}

/**
 * Formata um número como porcentagem com uma casa decimal (Ex: 85.2 -> "85,2%")
 * @param value O número a ser formatado
 * @returns A string formatada como porcentagem
 */
export function formatPercentage(value: number): string {
  const formatted = (value || 0).toLocaleString('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${formatted}%`;
}