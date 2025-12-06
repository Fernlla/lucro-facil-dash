import { Sale, Product, ChartData, ProductData, DailyProfitData, CashFlowData, HourlyData } from '../types';

/**
 * Prepara dados de faturamento e lucro para gráfico de linha (7 dias)
 */
export const prepareChartData = (sales: Sale[]): ChartData[] => {
  const dailyData: { [key: string]: ChartData } = {};
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    dailyData[dateKey] = { date: dateKey, revenue: 0, profit: 0, sales: 0 };
  }
  
  sales.forEach(sale => {
    const dateKey = sale.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    if (dailyData[dateKey]) {
      dailyData[dateKey].revenue += sale.quantity * sale.price;
      dailyData[dateKey].profit += sale.profit;
      dailyData[dateKey].sales += sale.quantity;
    }
  });
  
  return Object.values(dailyData);
};

/**
 * Prepara dados dos top 5 produtos mais vendidos
 */
export const prepareProductsData = (sales: Sale[]): ProductData[] => {
  const productSales: { [key: string]: ProductData } = {};
  
  sales.forEach(sale => {
    if (!productSales[sale.product]) {
      productSales[sale.product] = { name: sale.product, quantity: 0, revenue: 0 };
    }
    productSales[sale.product].quantity += sale.quantity;
    productSales[sale.product].revenue += sale.quantity * sale.price;
  });
  
  return Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
};

/**
 * Prepara dados de lucro diário com nome do dia da semana
 */
export const prepareDailyProfitData = (sales: Sale[]): DailyProfitData[] => {
  const dailyData: { [key: string]: DailyProfitData } = {};
  const today = new Date();
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const dayName = daysOfWeek[date.getDay()];
    dailyData[dateKey] = { date: dateKey, profit: 0, day: dayName };
  }
  
  sales.forEach(sale => {
    const dateKey = sale.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    if (dailyData[dateKey]) {
      dailyData[dateKey].profit += sale.profit;
    }
  });
  
  return Object.values(dailyData);
};

/**
 * Gera dados fictícios de fluxo de caixa mensal (6 meses)
 * TODO: Substituir por dados reais do Supabase
 */
export const prepareMonthlyCashFlow = (): CashFlowData[] => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const today = new Date();
  const cashFlow: CashFlowData[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = months[date.getMonth()];
    
    // Simulando dados realistas de fluxo de caixa
    const baseEntrada = 2500 + (Math.random() * 1500);
    const baseSaida = 1200 + (Math.random() * 800);
    const entrada = Math.round(baseEntrada * (1 + (5 - i) * 0.1)); // Crescimento gradual
    const saida = Math.round(baseSaida * (1 + (5 - i) * 0.08));
    
    cashFlow.push({
      month: monthName,
      entrada: entrada,
      saida: saida,
      saldo: entrada - saida
    });
  }
  
  return cashFlow;
};

/**
 * Gera dados de horários de pico com padrão realista
 * TODO: Substituir por dados reais do Supabase
 */
export const preparePeakHoursData = (): HourlyData[] => {
  const hours: HourlyData[] = [];
  const currentHour = new Date().getHours();
  
  // Horários de operação (8h às 20h)
  for (let h = 8; h <= 20; h++) {
    let vendas = 0;
    let faturamento = 0;
    
    // Simular padrão realista: picos no almoço (12-14h) e tarde (17-19h)
    if (h >= 12 && h <= 14) {
      vendas = Math.floor(Math.random() * 15) + 20; // Pico almoço: 20-35 vendas
    } else if (h >= 17 && h <= 19) {
      vendas = Math.floor(Math.random() * 12) + 18; // Pico tarde: 18-30 vendas
    } else if (h >= 10 && h <= 11) {
      vendas = Math.floor(Math.random() * 8) + 10; // Meio da manhã: 10-18 vendas
    } else if (h >= 15 && h <= 16) {
      vendas = Math.floor(Math.random() * 8) + 12; // Meio da tarde: 12-20 vendas
    } else {
      vendas = Math.floor(Math.random() * 5) + 3; // Outros: 3-8 vendas
    }
    
    // Apenas horários passados têm dados reais
    if (h > currentHour) {
      vendas = 0;
    }
    
    faturamento = vendas * 8.5; // Ticket médio R$ 8,50
    
    hours.push({
      hour: `${h}h`,
      vendas,
      faturamento: parseFloat(faturamento.toFixed(2))
    });
  }
  
  return hours;
};

/**
 * Calcula métricas totais do dashboard
 */
export const calculateMetrics = (sales: Sale[]) => {
  const totalRevenue = sales.reduce((acc, sale) => acc + (sale.quantity * sale.price), 0);
  const totalCosts = sales.reduce((acc, sale) => acc + (sale.quantity * sale.cost), 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  
  return {
    totalRevenue,
    totalCosts,
    totalProfit,
    profitMargin
  };
};

/**
 * Calcula progresso da meta diária
 */
export const calculateDailyProgress = (totalProfit: number, dailyGoal: number): number => {
  return Math.min((totalProfit / dailyGoal) * 100, 100);
};
