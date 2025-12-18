/**
 * Dados mockados realistas para Dashboard Comercial
 * Representa uma sorveteria/lanchonete com operação de 9h às 22h
 */

export interface Product {
  id: number;
  name: string;
  category: 'sorvete' | 'milkshake' | 'acai' | 'premium';
  cost: number;
  price: number;
  profit: number;
  marginPercent: number;
}

export interface Sale {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  profit: number;
  date: Date;
  hour: number;
}

// Produtos com margens realistas
export const products: Product[] = [
  // Sorvetes Simples (R$ 6-10)
  { id: 1, name: 'Sorvete Chocolate', category: 'sorvete', cost: 3.20, price: 8.00, profit: 4.80, marginPercent: 60.0 },
  { id: 2, name: 'Sorvete Baunilha', category: 'sorvete', cost: 3.20, price: 8.00, profit: 4.80, marginPercent: 60.0 },
  { id: 3, name: 'Sorvete Creme', category: 'sorvete', cost: 3.50, price: 8.50, profit: 5.00, marginPercent: 58.8 },
  { id: 4, name: 'Sorvete Morango', category: 'sorvete', cost: 3.80, price: 9.00, profit: 5.20, marginPercent: 57.8 },
  { id: 5, name: 'Sorvete Napolitano', category: 'sorvete', cost: 4.00, price: 10.00, profit: 6.00, marginPercent: 60.0 },
  
  // Milk-shakes (R$ 18-28)
  { id: 6, name: 'Milk-shake Chocolate', category: 'milkshake', cost: 10.80, price: 24.00, profit: 13.20, marginPercent: 55.0 },
  { id: 7, name: 'Milk-shake Morango', category: 'milkshake', cost: 11.20, price: 25.00, profit: 13.80, marginPercent: 55.2 },
  { id: 8, name: 'Milk-shake Baunilha', category: 'milkshake', cost: 10.50, price: 23.00, profit: 12.50, marginPercent: 54.3 },
  { id: 9, name: 'Milk-shake Oreo', category: 'milkshake', cost: 12.60, price: 28.00, profit: 15.40, marginPercent: 55.0 },
  
  // Açaí (R$ 12-25)
  { id: 10, name: 'Açaí Pequeno', category: 'acai', cost: 5.40, price: 12.00, profit: 6.60, marginPercent: 55.0 },
  { id: 11, name: 'Açaí Médio', category: 'acai', cost: 8.10, price: 18.00, profit: 9.90, marginPercent: 55.0 },
  { id: 12, name: 'Açaí Grande', category: 'acai', cost: 11.25, price: 25.00, profit: 13.75, marginPercent: 55.0 },
  
  // Sorvetes Premium (R$ 15-30)
  { id: 13, name: 'Sorvete Premium Pistache', category: 'premium', cost: 9.00, price: 22.00, profit: 13.00, marginPercent: 59.1 },
  { id: 14, name: 'Sorvete Gourmet Doce de Leite', category: 'premium', cost: 12.00, price: 30.00, profit: 18.00, marginPercent: 60.0 },
];

// Gerar vendas dos últimos 7 dias com padrões realistas
export const generateLast7DaysSales = (): Sale[] => {
  const sales: Sale[] = [];
  let saleId = 1;
  const today = new Date();
  
  // Últimos 7 dias
  for (let day = 6; day >= 0; day--) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - day);
    currentDate.setHours(0, 0, 0, 0);
    
    // Determinar intensidade do dia (Seg-Dom)
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isFriday = dayOfWeek === 5;
    
    let totalSales = 0;
    if (isWeekend) totalSales = Math.floor(Math.random() * 50) + 250; // 250-300
    else if (isFriday) totalSales = Math.floor(Math.random() * 50) + 200; // 200-250
    else totalSales = Math.floor(Math.random() * 50) + 150; // 150-200
    
    // Distribuir vendas ao longo do dia (9h às 22h)
    for (let i = 0; i < totalSales; i++) {
      // Horários com distribuição realista
      let hour: number;
      const rand = Math.random();
      
      if (rand < 0.05) hour = Math.floor(Math.random() * 3) + 9; // 9-11h (5%)
      else if (rand < 0.35) hour = Math.floor(Math.random() * 2) + 12; // 12-13h (30%)
      else if (rand < 0.60) hour = Math.floor(Math.random() * 4) + 14; // 14-17h (25%)
      else if (rand < 0.90) hour = Math.floor(Math.random() * 3) + 18; // 18-20h (30%)
      else hour = 21; // 21-22h (10%)
      
      const minute = Math.floor(Math.random() * 60);
      
      const saleDate = new Date(currentDate);
      saleDate.setHours(hour, minute, 0, 0);
      
      // Selecionar produto com pesos (sorvetes mais vendidos)
      const productWeights = [
        { product: products[0], weight: 20 }, // Chocolate
        { product: products[1], weight: 18 }, // Baunilha
        { product: products[2], weight: 15 }, // Creme
        { product: products[3], weight: 12 }, // Morango
        { product: products[4], weight: 10 }, // Napolitano
        { product: products[5], weight: 8 },  // Milk Chocolate
        { product: products[6], weight: 7 },  // Milk Morango
        { product: products[7], weight: 5 },  // Milk Baunilha
        { product: products[8], weight: 3 },  // Milk Oreo
        { product: products[9], weight: 1 },  // Açaí P
        { product: products[10], weight: 0.5 }, // Açaí M
        { product: products[11], weight: 0.3 }, // Açaí G
        { product: products[12], weight: 0.1 }, // Premium
        { product: products[13], weight: 0.1 }, // Gourmet
      ];
      
      const totalWeight = productWeights.reduce((sum, pw) => sum + pw.weight, 0);
      let random = Math.random() * totalWeight;
      let selectedProduct = products[0];
      
      for (const pw of productWeights) {
        random -= pw.weight;
        if (random <= 0) {
          selectedProduct = pw.product;
          break;
        }
      }
      
      const quantity = Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3;
      
      sales.push({
        id: saleId++,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity,
        price: selectedProduct.price * quantity,
        profit: selectedProduct.profit * quantity,
        date: saleDate,
        hour
      });
    }
  }
  
  return sales.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Dados para gráfico de fluxo de caixa mensal (12 meses)
export const monthlyCashFlow = [
  { month: 'Jan', entrada: 2100, saida: 1200, saldo: 900 },
  { month: 'Fev', entrada: 1950, saida: 1100, saldo: 850 },
  { month: 'Mar', entrada: 2300, saida: 1350, saldo: 950 },
  { month: 'Abr', entrada: 2200, saida: 1250, saldo: 950 },
  { month: 'Mai', entrada: 2150, saida: 1180, saldo: 970 },
  { month: 'Jun', entrada: 1800, saida: 980, saldo: 820 }, // Inverno
  { month: 'Jul', entrada: 1700, saida: 920, saldo: 780 }, // Inverno
  { month: 'Ago', entrada: 1850, saida: 1000, saldo: 850 }, // Inverno
  { month: 'Set', entrada: 2100, saida: 1150, saldo: 950 },
  { month: 'Out', entrada: 2250, saida: 1230, saldo: 1020 },
  { month: 'Nov', entrada: 2400, saida: 1320, saldo: 1080 },
  { month: 'Dez', entrada: 2800, saida: 1550, saldo: 1250 }, // Verão
];

// Vendas de hoje por hora (para gráfico de horários de pico)
export const todayHourlySales = [
  { hour: 0, sales: 0 },
  { hour: 1, sales: 0 },
  { hour: 2, sales: 0 },
  { hour: 3, sales: 0 },
  { hour: 4, sales: 0 },
  { hour: 5, sales: 0 },
  { hour: 6, sales: 2 },
  { hour: 7, sales: 5 },
  { hour: 8, sales: 8 },
  { hour: 9, sales: 12 },
  { hour: 10, sales: 18 },
  { hour: 11, sales: 22 },
  { hour: 12, sales: 28 },
  { hour: 13, sales: 32 },
  { hour: 14, sales: 38 }, // Pico
  { hour: 15, sales: 35 },
  { hour: 16, sales: 30 },
  { hour: 17, sales: 25 },
  { hour: 18, sales: 20 },
  { hour: 19, sales: 22 },
  { hour: 20, sales: 18 },
  { hour: 21, sales: 12 },
  { hour: 22, sales: 5 },
  { hour: 23, sales: 2 },
];

// Meta diária
export const dailyGoal = {
  target: 1200.00,
  current: 1198.50,
  percentage: 99.9
};
