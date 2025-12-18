/**
 * Formatadores de valores e datas para o dashboard
 */

// Formatar valor monetário em Real brasileiro
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Formatar porcentagem
export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Formatar data no formato brasileiro (DD/MM)
export const formatDateShort = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

// Formatar data completa (DD/MM/YYYY)
export const formatDateFull = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Formatar hora (HH:mm)
export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Formatar dia do mês com ordinal (1º, 2º, etc)
export const formatDayOrdinal = (date: Date): string => {
  const day = date.getDate();
  return `${day}º`;
};

// Abreviar dias da semana
export const getDayAbbr = (date: Date): string => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return days[date.getDay()];
};

// Formatar número grande (1.234 → 1,2k)
export const formatNumber = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.', ',')}k`;
  }
  return value.toString();
};

// Calcular diferença percentual entre dois valores
export const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Formatar diferença com sinal (+/-)
export const formatDifference = (value: number, isPercent: boolean = false): string => {
  const sign = value >= 0 ? '+' : '';
  if (isPercent) {
    return `${sign}${formatPercent(value)}`;
  }
  return `${sign}${formatCurrency(value)}`;
};
