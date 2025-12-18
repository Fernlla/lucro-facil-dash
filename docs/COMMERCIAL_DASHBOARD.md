# Dashboard Comercial LucroFácil - Guia de Implementação

## 📁 Estrutura Criada

```
src/
├── components/
│   └── DashboardCommercial/
│       ├── MetricCard.tsx ✅ CRIADO
│       ├── DailyGoalCard.tsx ✅ CRIADO
│       ├── CommercialSidebar.tsx (CRIAR)
│       ├── CommercialHeader.tsx (CRIAR)
│       ├── TabNavigation.tsx (CRIAR)
│       ├── RecentSalesList.tsx (CRIAR)
│       └── Charts/
│           ├── RevenueChart.tsx (CRIAR)
│           ├── TopProductsChart.tsx (CRIAR)
│           ├── DailyProfitChart.tsx (CRIAR)
│           ├── PeakHoursChart.tsx (CRIAR)
│           └── CashFlowChart.tsx (CRIAR)
├── data/
│   └── mockCommercialData.ts ✅ CRIADO
├── utils/
│   └── formatters.ts ✅ CRIADO
└── pages/
    └── DashboardCommercial.tsx (CRIAR)
```

## ✅ Componentes Já Criados

### 1. MetricCard.tsx
**Localização:** `src/components/DashboardCommercial/MetricCard.tsx`

**Uso:**
\`\`\`tsx
<MetricCard
  title="Faturamento"
  value={2243.50}
  icon="revenue"
  indicator={{
    value: "+10%",
    type: "positive",
    label: "vs ontem"
  }}
/>
\`\`\`

**Props:**
- `title`: Título do card
- `value`: Valor (number ou string)
- `icon`: 'revenue' | 'costs' | 'profit' | 'goal'
- `indicator`: Objeto opcional com value, type e label

---

### 2. DailyGoalCard.tsx
**Localização:** `src/components/DashboardCommercial/DailyGoalCard.tsx`

**Uso:**
\`\`\`tsx
<DailyGoalCard
  target={1200.00}
  current={1198.50}
  percentage={99.9}
/>
\`\`\`

**Features:**
- ✅ Badge automático "Meta batida!" quando ≥100%
- ✅ Mostra valor faltante quando <100%
- ✅ Barra de progresso colorida dinamicamente
- ✅ Porcentagem sobreposta na barra

---

### 3. mockCommercialData.ts
**Localização:** `src/data/mockCommercialData.ts`

**Dados disponíveis:**
- `products`: 14 produtos com margens realistas
- `generateLast7DaysSales()`: Gera vendas dos últimos 7 dias
- `monthlyCashFlow`: 12 meses de fluxo de caixa
- `todayHourlySales`: Vendas por hora (0-23h)
- `dailyGoal`: Meta diária

**Exemplo de uso:**
\`\`\`tsx
import { products, generateLast7DaysSales, monthlyCashFlow } from '@/data/mockCommercialData';

const sales = generateLast7DaysSales();
const topProducts = // processar vendas
\`\`\`

---

### 4. formatters.ts
**Localização:** `src/utils/formatters.ts`

**Funções disponíveis:**
- `formatCurrency(1234.56)` → "R$ 1.234,56"
- `formatPercent(45.5)` → "45.5%"
- `formatDateShort(date)` → "15/12"
- `formatDateFull(date)` → "15/12/2025"
- `formatTime(date)` → "18:30"
- `formatDayOrdinal(date)` → "15º"
- `getDayAbbr(date)` → "Sex"
- `calculatePercentChange(100, 90)` → 11.11
- `formatDifference(-50, true)` → "-50.0%"

---

## 📊 COMPONENTES A CRIAR

### 5. CommercialSidebar.tsx

\`\`\`tsx
import { 
  Package, TrendingUp, BarChart3, Bot, Bell, 
  Settings, HelpCircle, DollarSign 
} from 'lucide-react';

interface CommercialSidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  notificationCount?: number;
}

const CommercialSidebar = ({ activeMenu, onMenuChange, notificationCount = 0 }: CommercialSidebarProps) => {
  const mainMenuItems = [
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'sales', label: 'Vendas', icon: TrendingUp },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  const assistantItems = [
    { id: 'ai', label: 'Assistente IA', icon: Bot },
    { id: 'notifications', label: 'Notificações', icon: Bell, badge: notificationCount },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-blue-600 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">LucroFácil</span>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {mainMenuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors \${
              activeMenu === item.id
                ? 'bg-blue-700 border-l-4 border-blue-300'
                : 'hover:bg-blue-500'
            }\`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Assistente IA */}
      <div className="px-3 py-4 border-t border-blue-500 space-y-1">
        <p className="px-4 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
          Assistente IA
        </p>
        {assistantItems.map(item => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative \${
              activeMenu === item.id
                ? 'bg-blue-700 border-l-4 border-blue-300'
                : 'hover:bg-blue-500'
            }\`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="absolute right-3 top-2.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CommercialSidebar;
\`\`\`

---

### 6. CommercialHeader.tsx

\`\`\`tsx
import { Plus } from 'lucide-react';

interface CommercialHeaderProps {
  onNewSale: () => void;
}

const CommercialHeader = ({ onNewSale }: CommercialHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Acompanhe suas métricas e performance em tempo real
          </p>
        </div>
        
        <button
          onClick={onNewSale}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nova Venda
        </button>
      </div>
    </header>
  );
};

export default CommercialHeader;
\`\`\`

---

### 7. TabNavigation.tsx

\`\`\`tsx
import { ShoppingCart, FileText, Package, Eye } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'new-sale', label: 'Nova Venda', icon: ShoppingCart },
    { id: 'report', label: 'Relatório', icon: FileText },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'view-sales', label: 'Ver Vendas', icon: Eye },
  ];

  return (
    <div className="flex gap-2 border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={\`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative \${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }\`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
\`\`\`

---

### 8. RecentSalesList.tsx

\`\`\`tsx
import { FileText, File } from 'lucide-react';
import { formatCurrency, formatDayOrdinal, formatTime } from '@/utils/formatters';
import type { Sale } from '@/data/mockCommercialData';

interface RecentSalesListProps {
  sales: Sale[];
  onViewAll: () => void;
}

const RecentSalesList = ({ sales, onViewAll }: RecentSalesListProps) => {
  // Pegar últimas 7 vendas
  const recentSales = sales.slice(0, 7);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Vendas Recentes</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Ver todas
        </button>
      </div>

      {/* Lista de vendas */}
      <div className="space-y-3">
        {recentSales.map((sale, index) => (
          <div
            key={sale.id}
            className={\`flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors \${
              index >= 5 ? 'opacity-60' : ''
            }\`}
          >
            {/* Ícone e info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <File className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{sale.productName}</p>
                <p className="text-sm text-gray-500">
                  {formatDayOrdinal(sale.date)} - {formatTime(sale.date)}
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{formatCurrency(sale.price)}</p>
              <p className="text-sm text-green-600 font-medium">+{formatCurrency(sale.profit)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSalesList;
\`\`\`

---

## 📊 COMPONENTES DE GRÁFICOS

Devido à complexidade e tamanho, os componentes de gráficos estão documentados em **COMMERCIAL_CHARTS.md**

Ver: \`docs/COMMERCIAL_CHARTS.md\` para:
- RevenueChart.tsx (Faturamento e Lucro 7 dias)
- TopProductsChart.tsx (Top 5 Produtos)
- DailyProfitChart.tsx (Lucro Diário com cores condicionais)
- PeakHoursChart.tsx (Horários de Pico)
- CashFlowChart.tsx (Fluxo de Caixa Mensal)

---

## 🎨 PÁGINA PRINCIPAL

### DashboardCommercial.tsx

\`\`\`tsx
import { useState } from 'react';
import CommercialSidebar from '@/components/DashboardCommercial/CommercialSidebar';
import CommercialHeader from '@/components/DashboardCommercial/CommercialHeader';
import MetricCard from '@/components/DashboardCommercial/MetricCard';
import DailyGoalCard from '@/components/DashboardCommercial/DailyGoalCard';
import TabNavigation from '@/components/DashboardCommercial/TabNavigation';
import RecentSalesList from '@/components/DashboardCommercial/RecentSalesList';
// Importar gráficos quando criados
import { generateLast7DaysSales, dailyGoal } from '@/data/mockCommercialData';

const DashboardCommercial = () => {
  const [activeMenu, setActiveMenu] = useState('sales');
  const [activeTab, setActiveTab] = useState('report');

  // Gerar dados mockados
  const sales = generateLast7DaysSales();

  // Calcular métricas (últimas 24h)
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  const todaySales = sales.filter(s => s.date >= yesterday);
  const totalRevenue = todaySales.reduce((sum, s) => sum + s.price, 0);
  const totalProfit = todaySales.reduce((sum, s) => sum + s.profit, 0);
  const totalCosts = totalRevenue - totalProfit;
  const profitMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CommercialSidebar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        notificationCount={3}
      />

      {/* Main Content */}
      <div className="flex-1 ml-60 overflow-auto">
        <CommercialHeader onNewSale={() => console.log('Nova venda')} />

        <main className="p-8 space-y-6">
          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Faturamento"
              value={totalRevenue}
              icon="revenue"
              indicator={{ value: "+10%", type: "positive", label: "vs ontem" }}
            />
            <MetricCard
              title="Custos"
              value={totalCosts}
              icon="costs"
              indicator={{ value: "-18%", type: "negative", label: "vs ontem" }}
            />
            <MetricCard
              title="Lucro Líquido"
              value={totalProfit}
              icon="profit"
              indicator={{ value: \`Margem de \${profitMargin.toFixed(1)}%\`, type: "neutral" }}
            />
            <MetricCard
              title="Meta Diária"
              value="100%"
              icon="goal"
              indicator={{ value: \`R$ \${dailyGoal.current.toFixed(2)} de R$ \${dailyGoal.target.toFixed(2)}\`, type: "neutral" }}
            />
          </div>

          {/* Meta Diária Destaque */}
          <DailyGoalCard
            target={dailyGoal.target}
            current={dailyGoal.current}
            percentage={dailyGoal.percentage}
          />

          {/* Navegação por Abas */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Grid de Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Adicionar gráficos aqui quando criados */}
          </div>

          {/* Vendas Recentes */}
          <RecentSalesList
            sales={sales}
            onViewAll={() => console.log('Ver todas')}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardCommercial;
\`\`\`

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ **Criar componentes de gráficos** (ver COMMERCIAL_CHARTS.md)
2. ⏳ **Integrar gráficos na página principal**
3. ⏳ **Adicionar responsividade mobile**
4. ⏳ **Implementar modais (Nova Venda, etc)**
5. ⏳ **Adicionar animações de entrada**
6. ⏳ **Testes e otimizações**

---

## 📱 RESPONSIVIDADE

### Breakpoints Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile (<768px):
- Sidebar vira drawer lateral (hamburguer)
- Cards empilhados (1 coluna)
- Gráficos full width
- Bottom navigation opcional

### Tablet (768-1023px):
- Sidebar colapsável
- Grid 2 colunas para gráficos
- 2 cards de métricas por linha

---

## 🎯 CHECKLIST DE QUALIDADE

- [x] Dados mockados realistas
- [x] Formatação monetária brasileira
- [x] Componentes tipados (TypeScript)
- [x] Comentários em português
- [x] Código limpo e organizado
- [ ] Gráficos interativos (Recharts)
- [ ] Animações suaves
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Responsivo mobile-first
- [ ] Acessibilidade (ARIA)
- [ ] Performance otimizada

---

**Última atualização:** 15/12/2025
