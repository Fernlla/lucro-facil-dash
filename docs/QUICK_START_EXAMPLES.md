# 🚀 Quick Start - Nova Estrutura Dashboard

## 📦 Como Importar

### Antes (Antigo)
```typescript
import MetricsCards from '@/components/dashboard/MetricsCards';
import ChartsSection from '@/components/dashboard/ChartsSection';
import { Product, Sale } from './Dashboard'; // ❌ Tipos locais
```

### Depois (Novo)
```typescript
import { 
  DashboardLayout,
  useDashboardData,
  PageType,
  Product,
  Sale
} from '@/features/dashboard'; // ✅ Um único import
```

---

## 🎯 Exemplo: Dashboard.tsx Simplificado

```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout, useDashboardData, PageType } from '@/features/dashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  // ✅ Hook único com TODA a lógica de dados
  const dashboardData = useDashboardData();
  
  // UI State
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // ✅ Layout orquestra tudo automaticamente
  return (
    <DashboardLayout
      user={user}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      products={dashboardData.products}
      sales={dashboardData.sales}
      metrics={dashboardData.metrics}
      addSale={dashboardData.addSale}
      isMobile={isMobile}
      showNewSaleModal={showNewSaleModal}
      setShowNewSaleModal={setShowNewSaleModal}
      {...otherProps}
    />
  );
};
```

**De 451 linhas → ~120 linhas! (-73%)**

---

## 🧩 Exemplo: Adicionar Novo Gráfico

### 1. Criar Componente
```typescript
// src/components/dashboard/VendasPorCategoriaChart.tsx
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell } from 'recharts';

interface CategoryData {
  category: string;
  value: number;
}

interface VendasPorCategoriaProps {
  data: CategoryData[];
  isMobile: boolean;
}

export default function VendasPorCategoriaChart({ data, isMobile }: VendasPorCategoriaProps) {
  return (
    <Card>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="category" />
      </PieChart>
    </Card>
  );
}
```

### 2. Criar Helper de Dados
```typescript
// src/features/dashboard/utils/chartDataHelpers.ts
export const prepareCategoryData = (sales: Sale[]): CategoryData[] => {
  const categoryMap: { [key: string]: number } = {};
  
  sales.forEach(sale => {
    const product = products.find(p => p.id === sale.productId);
    if (product) {
      categoryMap[product.category] = (categoryMap[product.category] || 0) + sale.quantity;
    }
  });
  
  return Object.entries(categoryMap).map(([category, value]) => ({
    category,
    value
  }));
};
```

### 3. Adicionar Tipo
```typescript
// src/features/dashboard/types/index.ts
export interface CategoryData {
  category: string;
  value: number;
}
```

### 4. Adicionar no Analytics
```typescript
// src/features/dashboard/components/DashboardAnalytics.tsx
import VendasPorCategoriaChart from '@/components/dashboard/VendasPorCategoriaChart';
import { prepareCategoryData } from '../utils/chartDataHelpers';

export default function DashboardAnalytics({ sales, isMobile, ... }) {
  const categoryData = prepareCategoryData(sales);
  
  return (
    <div>
      {/* Gráficos existentes */}
      
      {/* Novo gráfico */}
      <VendasPorCategoriaChart data={categoryData} isMobile={isMobile} />
    </div>
  );
}
```

**Pronto! 4 arquivos tocados, zero quebra de código existente.**

---

## 🧪 Exemplo: Testar Função de Dados

```typescript
// src/features/dashboard/utils/chartDataHelpers.test.ts
import { describe, it, expect } from 'vitest';
import { prepareChartData } from './chartDataHelpers';
import { Sale } from '../types';

describe('prepareChartData', () => {
  it('should aggregate sales by date', () => {
    const mockSales: Sale[] = [
      { id: 1, date: new Date('2025-12-01'), quantity: 2, price: 5, profit: 5, ... },
      { id: 2, date: new Date('2025-12-01'), quantity: 3, price: 5, profit: 7.5, ... },
      { id: 3, date: new Date('2025-12-02'), quantity: 1, price: 5, profit: 2.5, ... },
    ];
    
    const result = prepareChartData(mockSales);
    
    expect(result[0]).toEqual({
      date: '01/12',
      revenue: 25, // (2+3) * 5
      profit: 12.5, // 5 + 7.5
      sales: 5 // 2 + 3
    });
  });
});
```

**Função pura = Fácil de testar!**

---

## 🎨 Exemplo: Customizar Seção

### Criar Seção Personalizada
```typescript
// src/features/dashboard/components/DashboardInsights.tsx
import { Card } from '@/components/ui/card';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface DashboardInsightsProps {
  metrics: {
    totalProfit: number;
    profitMargin: number;
  };
}

export default function DashboardInsights({ metrics }: DashboardInsightsProps) {
  const insights = [];
  
  if (metrics.profitMargin < 20) {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      message: 'Margem de lucro abaixo de 20%. Revisar custos.'
    });
  }
  
  if (metrics.totalProfit > 500) {
    insights.push({
      type: 'success',
      icon: TrendingUp,
      message: 'Parabéns! Meta de R$ 500 alcançada!'
    });
  }
  
  return (
    <Card>
      <h3>💡 Insights</h3>
      {insights.map((insight, i) => (
        <div key={i} className={insight.type}>
          <insight.icon />
          <p>{insight.message}</p>
        </div>
      ))}
    </Card>
  );
}
```

### Adicionar no Layout
```typescript
// src/features/dashboard/components/DashboardLayout.tsx
import DashboardInsights from './DashboardInsights';

export default function DashboardLayout({ metrics, ... }) {
  return (
    <div>
      <DashboardOverview {...props} />
      
      {/* Nova seção de insights */}
      <DashboardInsights metrics={metrics} />
      
      <DashboardAnalytics {...props} />
    </div>
  );
}
```

---

## 🔄 Exemplo: Migrar Dados Mock → Supabase

### Antes (Mock)
```typescript
// src/features/dashboard/utils/mockData.ts
export const getMockProducts = (): Product[] => [
  { id: 1, name: 'Sorvete', cost: 2.5, price: 5, ... }
];
```

### Depois (Supabase)
```typescript
// src/features/dashboard/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      return data as Product[];
    }
  });
};
```

### Atualizar Hook Principal
```typescript
// src/features/dashboard/hooks/useDashboardData.ts
import { useProducts } from './useProducts';

export const useDashboardData = () => {
  const { data: products, isLoading } = useProducts(); // ✅ Real data
  
  // Resto do código igual
  
  return { products, isLoading, ... };
};
```

**Zero mudanças nos componentes! Apenas no hook.**

---

## 📊 Exemplo: Lazy Load de Gráficos

```typescript
// src/features/dashboard/components/DashboardAnalytics.tsx
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// ✅ Lazy load gráficos pesados
const DailyProfitChart = lazy(() => import('@/components/dashboard/DailyProfitChart'));
const MonthlyCashFlow = lazy(() => import('@/components/dashboard/MonthlyCashFlow'));
const PeakHoursChart = lazy(() => import('@/components/dashboard/PeakHoursChart'));

export default function DashboardAnalytics({ ... }) {
  return (
    <div>
      <ChartsSection /> {/* Carrega imediatamente */}
      
      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <DailyProfitChart data={dailyProfitData} isMobile={isMobile} />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <PeakHoursChart data={peakHoursData} isMobile={isMobile} />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <MonthlyCashFlow data={cashFlowData} isMobile={isMobile} />
      </Suspense>
    </div>
  );
}
```

**Bundle menor, carregamento mais rápido!**

---

## 🎓 Boas Práticas

### ✅ DO (Faça)
```typescript
// ✅ Importar do barrel export
import { Sale, Product } from '@/features/dashboard';

// ✅ Funções puras para transformar dados
export const prepareData = (sales: Sale[]) => { ... };

// ✅ Props explícitas e tipadas
interface MyChartProps {
  data: ChartData[];
  isMobile: boolean;
}

// ✅ Componentes pequenos e focados
export default function MyChart({ data, isMobile }: MyChartProps) { ... }
```

### ❌ DON'T (Evite)
```typescript
// ❌ Importar diretamente de arquivos internos
import { Sale } from '@/features/dashboard/types/index';

// ❌ Lógica de dados dentro do componente
export default function MyChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Processamento pesado aqui ❌
  }, []);
}

// ❌ Props genéricas (any)
interface MyChartProps {
  data: any; // ❌
}

// ❌ Componentes gigantes (>200 linhas)
export default function GiantComponent() {
  // 500 linhas de código ❌
}
```

---

## 🏁 Checklist de Qualidade

Antes de fazer commit:

- [ ] Componente < 200 linhas
- [ ] Props explicitamente tipadas (sem `any`)
- [ ] Lógica em `utils/` ou `hooks/`, não em componente
- [ ] Imports via barrel export (`@/features/dashboard`)
- [ ] Tipos exportados de `types/index.ts`
- [ ] Componente testável (recebe props, sem side effects)
- [ ] Mobile-first (breakpoints `md:`, `lg:`)
- [ ] Sem duplicação (DRY)
- [ ] Sem código especulativo (YAGNI)

---

## 📚 Recursos Adicionais

- **Documentação Completa**: `docs/FEATURE_BASED_STRUCTURE.md`
- **Gráficos**: `docs/GRAFICOS_ANALYTICS.md`
- **Instruções Gerais**: `docs/Instruções.md`

---

**Happy Coding! 🚀**
