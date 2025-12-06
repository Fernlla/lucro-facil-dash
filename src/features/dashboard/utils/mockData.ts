import { Product, Sale } from '../types';

/**
 * Gera vendas históricas fictícias para os últimos 7 dias
 * TODO: Substituir por dados reais do Supabase
 */
export const generateHistoricalSales = (products: Product[]): Sale[] => {
  const sales: Sale[] = [];
  let saleId = 1;
  
  for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    date.setHours(0, 0, 0, 0);
    
    const salesPerDay = Math.floor(Math.random() * 16) + 10;
    
    for (let i = 0; i < salesPerDay; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const profit = quantity * (product.price - product.cost);
      
      const saleDate = new Date(date);
      saleDate.setHours(Math.floor(Math.random() * 12) + 8);
      saleDate.setMinutes(Math.floor(Math.random() * 60));
      
      sales.push({
        id: saleId++,
        productId: product.id,
        product: product.name,
        quantity,
        price: product.price,
        cost: product.cost,
        date: saleDate,
        profit
      });
    }
  }
  
  return sales.sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Produtos fictícios de exemplo
 * TODO: Carregar do Supabase
 */
export const getMockProducts = (): Product[] => [
  { id: 1, name: 'Sorvete Chocolate', cost: 2.50, price: 5.00, category: 'Sorvetes', active: true },
  { id: 2, name: 'Sorvete Morango', cost: 2.30, price: 5.00, category: 'Sorvetes', active: true },
  { id: 3, name: 'Picolé Frutas', cost: 1.80, price: 3.50, category: 'Picolés', active: true },
  { id: 4, name: 'Sorvete Baunilha', cost: 2.40, price: 5.00, category: 'Sorvetes', active: true },
  { id: 5, name: 'Picolé Chocolate', cost: 1.90, price: 3.50, category: 'Picolés', active: true },
  { id: 6, name: 'Sorvete Creme', cost: 2.60, price: 5.50, category: 'Sorvetes', active: true },
  { id: 7, name: 'Picolé Morango', cost: 1.70, price: 3.50, category: 'Picolés', active: true },
  { id: 8, name: 'Açaí 300ml', cost: 4.50, price: 10.00, category: 'Açaí', active: true },
  { id: 9, name: 'Açaí 500ml', cost: 7.00, price: 15.00, category: 'Açaí', active: true },
  { id: 10, name: 'Milk-shake Chocolate', cost: 3.50, price: 8.00, category: 'Bebidas', active: true },
];

/**
 * Metas padrão
 * TODO: Carregar das configurações do usuário
 */
export const getDefaultGoals = () => ({
  daily: 100,
  monthly: 3000
});
