# 📊 Novos Gráficos Analíticos - Dashboard

## Visão Geral
Três novos gráficos foram implementados para melhorar a análise de negócio do LucroFácil, seguindo os princípios **DRY**, **KISS** e **YAGNI**.

---

## 1. 💰 Gráfico de Lucro Diário (Barras)

### Objetivo
Mostrar quanto **sobrou no bolso** cada dia da semana.

### Características
- **Visual simples**: Cada barra = um dia
- **Cores inteligentes**:
  - 🟢 Verde = Acima da média
  - 🟠 Laranja = Abaixo da média
- **Métricas exibidas**:
  - Média de lucro dos 7 dias
  - Total acumulado
  - Tendência (subindo/descendo) com %

### Para quem é útil?
✅ Ver se "essa semana foi boa ou ruim"  
✅ Identificar dias fracos rapidamente  
✅ Planejar ações para melhorar dias ruins

### Componente
`src/components/dashboard/DailyProfitChart.tsx`

### Props
```typescript
interface DailyProfitChartProps {
  data: Array<{
    date: string;    // '04/12'
    profit: number;  // 125.50
    day: string;     // 'Seg'
  }>;
  isMobile: boolean;
}
```

### Dados Fictícios
Gerados em `Dashboard.tsx` via `prepareDailyProfitData()`:
- 7 dias de histórico
- Lucro calculado automaticamente das vendas reais

---

## 2. 📊 Fluxo de Caixa Mensal (Área)

### Objetivo
Mostrar se o negócio está **crescendo ou afundando**.

### Características
- **3 linhas empilhadas**:
  - 🟢 Entrada (receitas)
  - 🔴 Saída (custos)
  - 🔵 Saldo (entrada - saída)
- **Cards de resumo**:
  - Total de entradas
  - Total de saídas
  - Saldo final (verde se positivo, laranja se negativo)
- **Status visual**: "📈 Negócio crescendo!" ou "⚠️ Atenção ao caixa"

### Para quem é útil?
✅ Ver tendência de crescimento (6 meses)  
✅ Identificar se gastos estão controlados  
✅ Projetar se haverá lucro ou prejuízo

### Componente
`src/components/dashboard/MonthlyCashFlow.tsx`

### Props
```typescript
interface MonthlyCashFlowProps {
  data: Array<{
    month: string;   // 'Jan', 'Fev', ...
    entrada: number; // 3200.00
    saida: number;   // 1800.00
    saldo: number;   // 1400.00
  }>;
  isMobile: boolean;
}
```

### Dados Fictícios
Gerados em `Dashboard.tsx` via `prepareMonthlyCashFlow()`:
- 6 meses de histórico
- Simulação realista com crescimento gradual (~10% entrada, ~8% saída)
- Base: R$ 2.500-4.000 entrada, R$ 1.200-2.000 saída

---

## 3. ⏰ Horário de Pico (Barras com Real-time)

### Objetivo
Mostrar **quando vendem mais** durante o dia.

### Características
- **Horários de operação**: 8h às 20h
- **Cores por performance**:
  - 🟢 Verde = Pico (80%+ do máximo)
  - 🔵 Azul = Bom (50-80%)
  - 🟡 Amarelo = Médio (30-50%)
  - 🔴 Vermelho = Fraco (<30%)
- **Real-time**:
  - Relógio atualiza a cada minuto
  - Horário atual destacado com borda
  - Horários futuros zerados
- **Insights**:
  - Melhor horário do dia
  - Total de vendas até agora

### Para quem é útil?
✅ Vendedores de rua (sorvete, lanche, revenda)  
✅ Planejar estoque por horário  
✅ Saber quando ter mais funcionários

### Componente
`src/components/dashboard/PeakHoursChart.tsx`

### Props
```typescript
interface PeakHoursChartProps {
  data: Array<{
    hour: string;      // '10h', '14h', '18h'
    vendas: number;    // 25
    faturamento: number; // 212.50
  }>;
  isMobile: boolean;
}
```

### Dados Fictícios
Gerados em `Dashboard.tsx` via `preparePeakHoursData()`:
- **Padrão realista**:
  - Pico 12h-14h (almoço): 20-35 vendas
  - Pico 17h-19h (tarde): 18-30 vendas
  - Meio da manhã (10h-11h): 10-18 vendas
  - Meio da tarde (15h-16h): 12-20 vendas
  - Outros horários: 3-8 vendas
- **Ticket médio**: R$ 8,50
- **Apenas horários passados têm dados** (real-time)

---

## 📱 Responsividade

Todos os gráficos são **mobile-first**:

| Breakpoint | Altura do gráfico | Layout |
|------------|------------------|--------|
| Mobile (<768px) | 220px | 1 coluna |
| Desktop (≥768px) | 300px | 2 colunas (onde aplicável) |

---

## 🎨 Design System

### Cores
- **Verde** (`hsl(145 70% 50%)`): Positivo, lucro, pico
- **Azul** (`hsl(215 90% 55%)`): Neutro, informação, bom
- **Amarelo** (`hsl(45 95% 53%)`): Atenção, médio
- **Vermelho** (`hsl(0 70% 50%)`): Negativo, fraco, alerta
- **Gradientes**: LinearGradient para áreas

### Componentes UI
- `Card` (shadcn/ui)
- `Recharts` (ResponsiveContainer, BarChart, AreaChart)
- Lucide Icons (TrendingUp, Clock, ArrowUpCircle, etc.)

---

## 🚀 Como Usar

### 1. Importar no Dashboard
```typescript
import DailyProfitChart from '@/components/dashboard/DailyProfitChart';
import MonthlyCashFlow from '@/components/dashboard/MonthlyCashFlow';
import PeakHoursChart from '@/components/dashboard/PeakHoursChart';
```

### 2. Preparar dados
```typescript
const dailyProfitData = prepareDailyProfitData();
const cashFlowData = prepareMonthlyCashFlow();
const peakHoursData = preparePeakHoursData();
```

### 3. Renderizar
```tsx
<DailyProfitChart data={dailyProfitData} isMobile={isMobile} />
<MonthlyCashFlow data={cashFlowData} isMobile={isMobile} />
<PeakHoursChart data={peakHoursData} isMobile={isMobile} />
```

---

## 🔄 Próximos Passos (Futuro)

### Integração com Supabase
Substituir dados fictícios por queries reais:

```sql
-- Lucro diário (últimos 7 dias)
SELECT 
  DATE(created_at) as date,
  SUM(profit) as profit
FROM sales
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date;

-- Fluxo de caixa mensal
SELECT 
  TO_CHAR(created_at, 'Mon') as month,
  SUM(quantity * price) as entrada,
  SUM(quantity * cost) as saida
FROM sales
WHERE created_at >= NOW() - INTERVAL '6 months'
GROUP BY TO_CHAR(created_at, 'Mon')
ORDER BY MIN(created_at);

-- Horários de pico
SELECT 
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as vendas,
  SUM(quantity * price) as faturamento
FROM sales
WHERE DATE(created_at) = CURRENT_DATE
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour;
```

### Funcionalidades Avançadas
- [ ] Filtro de período (últimos 7/15/30 dias)
- [ ] Comparação com período anterior
- [ ] Download de relatório PDF
- [ ] Alertas automáticos (meta não batida, horário fraco)
- [ ] Previsão de vendas (ML básico)

---

## ✅ Checklist de Qualidade

- [x] Componentes reutilizáveis (DRY)
- [x] Lógica simples e direta (KISS)
- [x] Apenas funcionalidades necessárias (YAGNI)
- [x] TypeScript strict mode
- [x] Responsivo (mobile-first)
- [x] Dados fictícios realistas
- [x] Cores acessíveis (contraste)
- [x] Performance otimizada (Recharts + ResponsiveContainer)
- [x] Documentação completa
- [x] Zero erros de compilação

---

## 📦 Arquivos Criados

```
src/components/dashboard/
├── DailyProfitChart.tsx      (106 linhas)
├── MonthlyCashFlow.tsx       (149 linhas)
├── PeakHoursChart.tsx        (173 linhas)
└── charts/
    └── index.ts              (4 linhas)
```

**Total**: 3 componentes, 432 linhas de código otimizado.

---

## 🎯 Impacto no Usuário

| Gráfico | Pergunta Respondida | Ação Possível |
|---------|---------------------|---------------|
| Lucro Diário | "Essa semana foi boa?" | Focar em dias fracos |
| Fluxo de Caixa | "Estou crescendo?" | Controlar gastos |
| Horários de Pico | "Quando vender mais?" | Ajustar horários |

---

**Desenvolvido seguindo**: DRY, KISS, YAGNI, Mobile-First, TypeScript Strict Mode ✅
