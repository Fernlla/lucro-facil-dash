# 📂 Nova Estrutura Feature-Based do Dashboard

## 🎯 Visão Geral

Reestruturação completa do Dashboard seguindo **Feature-Based Architecture** para máxima organização, escalabilidade e produtividade.

---

## 📁 Estrutura de Diretórios

```
src/features/dashboard/
├── types/
│   └── index.ts                    # Tipos centralizados (Product, Sale, PageType, etc.)
├── hooks/
│   └── useDashboardData.ts         # Hook principal para estado e lógica
├── utils/
│   ├── chartDataHelpers.ts         # Preparação de dados dos gráficos
│   └── mockData.ts                 # Dados fictícios (produtos, vendas)
├── components/
│   ├── DashboardLayout.tsx         # Layout orquestrador principal
│   ├── DashboardOverview.tsx       # Seção: Métricas + Meta + Ações
│   └── DashboardAnalytics.tsx      # Seção: Todos os gráficos
└── index.ts                        # Barrel export
```

---

## 🧩 Componentes e Responsabilidades

### **1. DashboardLayout.tsx** (Orquestrador)
**Responsabilidade**: Layout principal que orquestra todas as seções.

**Props**:
- User & Navigation
- Data (products, sales)
- Metrics
- UI State (modals, mobile menu)

**Estrutura**:
```tsx
<div className="dashboard">
  <DashboardSidebar />      {/* Desktop only */}
  <main>
    <DashboardHeader />
    
    <DashboardOverview />    {/* Seção 1: Métricas */}
    <DashboardAnalytics />   {/* Seção 2: Gráficos */}
    <RecentSales />          {/* Seção 3: Vendas */}
  </main>
  
  <MobileMenu />            {/* Mobile only */}
  <BottomNavigation />      {/* Mobile only */}
  <NewSaleModal />
</div>
```

---

### **2. DashboardOverview.tsx** (Seção de Métricas)
**Responsabilidade**: Agrupa métricas principais, meta e ações rápidas.

**Componentes**:
- `MetricsCards` - Faturamento, Lucro, Custos, Margem
- `GoalProgress` - Barra de progresso da meta diária
- `QuickActions` - Botões de ações (Nova Venda, Relatório, etc.)

**Benefícios**:
- ✅ Contextualização: Métricas relacionadas juntas
- ✅ Reutilizável: Pode ser usado em outras views
- ✅ Testável: Seção isolada

---

### **3. DashboardAnalytics.tsx** (Seção de Gráficos)
**Responsabilidade**: Agrupa TODOS os gráficos de forma organizada.

**Layout**:
```tsx
<div className="analytics">
  {/* Grid 2 colunas: Faturamento/Lucro + Top Produtos */}
  <ChartsSection />
  
  {/* Grid 2 colunas: Lucro Diário + Horários de Pico */}
  <DailyProfitChart />
  <PeakHoursChart />
  
  {/* Full width: Fluxo de Caixa Mensal */}
  <MonthlyCashFlow />
</div>
```

**Benefícios**:
- ✅ Visual hierárquico: Gráficos principais → Análise → Fluxo
- ✅ Responsivo: Grid adapta automaticamente (lg:grid-cols-2)
- ✅ Escalável: Adicionar novos gráficos é trivial

---

## 🪝 Hooks

### **useDashboardData.ts**
**Responsabilidade**: Hook central que gerencia TODA lógica de dados.

**Retorna**:
```typescript
{
  // Data
  products: Product[];
  sales: Sale[];
  goals: Goals;
  newSale: NewSale;
  
  // Metrics (computadas)
  metrics: {
    totalRevenue: number;
    totalCosts: number;
    totalProfit: number;
    profitMargin: number;
    dailyProgress: number;
  };
  
  // Actions
  setNewSale: (sale: NewSale) => void;
  addSale: () => boolean;
  deleteSale: (id: number) => void;
}
```

**Benefícios**:
- ✅ Single Source of Truth
- ✅ Lógica isolada e testável
- ✅ Dashboard.tsx limpo (apenas UI logic)

---

## 🛠️ Utils

### **chartDataHelpers.ts**
Funções puras para preparar dados dos gráficos:

```typescript
prepareChartData(sales)          // Faturamento/Lucro 7 dias
prepareProductsData(sales)       // Top 5 produtos
prepareDailyProfitData(sales)    // Lucro por dia da semana
prepareMonthlyCashFlow()         // Fluxo de caixa 6 meses (mock)
preparePeakHoursData()           // Horários de pico (mock)
calculateMetrics(sales)          // Métricas totais
calculateDailyProgress(...)      // % da meta diária
```

**Benefícios**:
- ✅ Reutilizáveis em outros contextos
- ✅ Fácil de testar (funções puras)
- ✅ DRY: Zero duplicação

---

### **mockData.ts**
Dados fictícios centralizados:

```typescript
generateHistoricalSales(products) // Gera 7 dias de vendas
getMockProducts()                  // 10 produtos de sorvete/açaí
getDefaultGoals()                  // Meta diária/mensal
```

**TODO**: Substituir por queries do Supabase.

---

## 📐 Types

### **types/index.ts**
Todos os tipos centralizados:

```typescript
Product, Sale, NewSale, Goals, PageType
ChartData, ProductData, DailyProfitData, CashFlowData, HourlyData
```

**Benefícios**:
- ✅ Single Source of Truth para tipos
- ✅ Importação consistente: `import { Sale } from '@/features/dashboard'`
- ✅ TypeScript strict mode garantido

---

## 🔄 Fluxo de Dados

```
Dashboard.tsx (Orquestrador)
    ↓
useDashboardData() (Hook)
    ↓
{products, sales, metrics, actions}
    ↓
DashboardLayout (Layout)
    ↓
┌─────────────────────────────────┐
│ DashboardOverview               │
│ ├── MetricsCards (metrics)      │
│ ├── GoalProgress (metrics)      │
│ └── QuickActions (actions)      │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ DashboardAnalytics              │
│ ├── ChartsSection               │
│ ├── DailyProfitChart            │
│ ├── PeakHoursChart              │
│ └── MonthlyCashFlow             │
└─────────────────────────────────┘
    ↓
RecentSales (sales)
```

---

## ✅ Princípios Aplicados

### **DRY (Don't Repeat Yourself)**
- ✅ Lógica de preparação de dados centralizada em `chartDataHelpers.ts`
- ✅ Tipos compartilhados em `types/index.ts`
- ✅ Mock data em `mockData.ts` (não espalhado)

### **KISS (Keep It Simple, Stupid)**
- ✅ Componentes pequenos: `DashboardOverview` (40 linhas), `DashboardAnalytics` (50 linhas)
- ✅ Uma responsabilidade por arquivo
- ✅ Props explícitas e tipadas

### **YAGNI (You Aren't Gonna Need It)**
- ✅ Apenas funcionalidades necessárias agora
- ✅ Sem abstrações prematuras
- ✅ Gráficos fictícios marcados com TODO para substituição futura

### **Feature-Based Organization**
- ✅ Tudo relacionado a Dashboard em `features/dashboard/`
- ✅ Fácil localizar: "Onde está a lógica de gráficos?" → `utils/chartDataHelpers.ts`
- ✅ Contexto reduzido: Trabalhar em Dashboard não exige conhecer Landing

### **Separation of Concerns**
- ✅ UI (`components/`) separado de lógica (`hooks/`, `utils/`)
- ✅ Dados (`types/`) separados de computação
- ✅ Mock (`mockData.ts`) isolado para fácil substituição

---

## 📊 Comparação: Antes vs Depois

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Linhas Dashboard.tsx** | 451 | ~120 | -73% |
| **Responsabilidades** | Tudo em 1 arquivo | 8 arquivos focados | +800% |
| **Testabilidade** | Difícil (lógica misturada) | Fácil (funções puras) | ✅ |
| **Escalabilidade** | Baixa (monolítico) | Alta (modular) | ✅ |
| **Onboarding** | Difícil (arquivo gigante) | Fácil (estrutura clara) | ✅ |
| **Reutilização** | 0% (tudo acoplado) | 100% (componentes isolados) | ✅ |

---

## 🚀 Benefícios da Nova Estrutura

### **Para Desenvolvedores**
1. **Contexto Reduzido**: Trabalhar em um gráfico não exige entender todo Dashboard
2. **Localização Rápida**: "Onde está X?" → Estrutura clara responde
3. **Testes Isolados**: Testar `prepareChartData()` sem montar componente
4. **Refatoração Segura**: Mudar `DashboardOverview` não afeta `DashboardAnalytics`

### **Para IAs (GitHub Copilot, etc.)**
1. **Contexto Focado**: Copilot vê apenas arquivos relevantes
2. **Autocompletar Melhor**: Tipos explícitos guiam sugestões
3. **Menos Tokens**: Arquivos menores = respostas mais precisas

### **Para Performance**
1. **Code Splitting**: Gráficos podem ser lazy-loaded
2. **Memoização**: Componentes isolados facilitam `React.memo()`
3. **Tree Shaking**: Imports específicos eliminam código não usado

### **Para Escalabilidade**
1. **Adicionar Gráfico**: Criar arquivo em `components/`, adicionar em `DashboardAnalytics`
2. **Adicionar Métrica**: Computar em `useDashboardData`, passar para `DashboardOverview`
3. **Adicionar Feature**: Criar `features/relatorios/` com mesma estrutura

---

## 🔮 Próximos Passos

### **Curto Prazo**
- [ ] Substituir mock data por queries Supabase
- [ ] Adicionar React.lazy() para gráficos
- [ ] Implementar testes unitários para `chartDataHelpers.ts`

### **Médio Prazo**
- [ ] Criar `features/products/` com mesma estrutura
- [ ] Criar `features/sales/` com mesma estrutura
- [ ] Adicionar cache com TanStack Query

### **Longo Prazo**
- [ ] Extrair gráficos para biblioteca compartilhada
- [ ] Adicionar Storybook para components isolados
- [ ] Implementar E2E tests com Playwright

---

## 📝 Guia de Uso

### **Adicionar Novo Gráfico**

1. Criar componente em `src/components/dashboard/NovoGrafico.tsx`
2. Criar helper em `utils/chartDataHelpers.ts`:
   ```typescript
   export const prepareNovoGraficoData = (sales: Sale[]) => { ... }
   ```
3. Adicionar tipo em `types/index.ts`:
   ```typescript
   export interface NovoGraficoData { ... }
   ```
4. Adicionar em `DashboardAnalytics.tsx`:
   ```tsx
   const novoGraficoData = prepareNovoGraficoData(sales);
   <NovoGrafico data={novoGraficoData} isMobile={isMobile} />
   ```

### **Adicionar Nova Métrica**

1. Adicionar cálculo em `utils/chartDataHelpers.ts`:
   ```typescript
   export const calculateNovMetric = (sales: Sale[]) => { ... }
   ```
2. Adicionar em `useDashboardData.ts`:
   ```typescript
   const metrics = {
     ...calculateMetrics(sales),
     novaMetrica: calculateNovaMetrica(sales)
   };
   ```
3. Passar para componente via props

---

## 🎓 Lições Aprendidas

1. **Feature-Based > Type-Based**: Organizar por feature (dashboard, products) é melhor que por tipo (components, hooks)
2. **Composition > Monolith**: Componentes pequenos compostos são melhores que um arquivo gigante
3. **Hooks Centralizados**: Um hook principal (`useDashboardData`) simplifica estado
4. **Funções Puras**: Utils com funções puras facilitam testes e reuso

---

**Estrutura implementada seguindo**: DRY, KISS, YAGNI, Feature-Based, Separation of Concerns ✅
