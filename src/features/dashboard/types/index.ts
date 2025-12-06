// Dashboard Types
export interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  category: string;
  active: boolean;
}

export interface Sale {
  id: number;
  productId: number;
  product: string;
  quantity: number;
  price: number;
  cost: number;
  date: Date;
  profit: number;
}

export interface NewSale {
  productId: string;
  quantity: number;
  customPrice: string;
}

export interface Goals {
  daily: number;
  monthly: number;
}

export type PageType = 
  | 'dashboard' 
  | 'profile' 
  | 'settings' 
  | 'products' 
  | 'notifications' 
  | 'help' 
  | 'auth' 
  | 'assistant' 
  | 'sales';

// Chart Data Types
export interface ChartData {
  date: string;
  revenue: number;
  profit: number;
  sales: number;
}

export interface ProductData {
  name: string;
  quantity: number;
  revenue: number;
}

export interface DailyProfitData {
  date: string;
  profit: number;
  day: string;
}

export interface CashFlowData {
  month: string;
  entrada: number;
  saida: number;
  saldo: number;
}

export interface HourlyData {
  hour: string;
  vendas: number;
  faturamento: number;
}
