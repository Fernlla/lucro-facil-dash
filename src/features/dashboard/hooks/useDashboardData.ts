import { useState, useEffect } from 'react';
import { Sale, Product, Goals, NewSale } from '../types';
import { generateHistoricalSales, getMockProducts, getDefaultGoals } from '../utils/mockData';
import { calculateMetrics, calculateDailyProgress } from '../utils/chartDataHelpers';

/**
 * Hook principal para gerenciar o estado do Dashboard
 * Centraliza toda a lógica de dados e computações
 */
export const useDashboardData = () => {
  const [products] = useState<Product[]>(getMockProducts());
  const [sales, setSales] = useState<Sale[]>(() => generateHistoricalSales(getMockProducts()));
  const [goals] = useState<Goals>(getDefaultGoals());
  const [newSale, setNewSale] = useState<NewSale>({ productId: '', quantity: 1, customPrice: '' });

  // Calcula métricas principais
  const metrics = calculateMetrics(sales);
  const dailyProgress = calculateDailyProgress(metrics.totalProfit, goals.daily);

  /**
   * Adiciona uma nova venda
   */
  const addSale = () => {
    if (!newSale.productId || !newSale.quantity) return;
    
    const product = products.find(p => p.id === parseInt(newSale.productId));
    if (!product) return;
    
    const salePrice = newSale.customPrice ? parseFloat(newSale.customPrice) : product.price;
    const quantity = parseInt(newSale.quantity.toString());
    const profit = quantity * (salePrice - product.cost);
    
    const sale: Sale = {
      id: Date.now(),
      productId: product.id,
      product: product.name,
      quantity,
      price: salePrice,
      cost: product.cost,
      date: new Date(),
      profit
    };
    
    setSales([sale, ...sales]);
    setNewSale({ productId: '', quantity: 1, customPrice: '' });
    
    return true;
  };

  /**
   * Deleta uma venda
   */
  const deleteSale = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  return {
    // Data
    products,
    sales,
    goals,
    newSale,
    
    // Metrics
    metrics: {
      ...metrics,
      dailyProgress
    },
    
    // Actions
    setNewSale,
    addSale,
    deleteSale
  };
};
