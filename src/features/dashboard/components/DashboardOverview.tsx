import MetricCard from '@/components/DashboardCommercial/MetricCard';
import DailyGoalCard from '@/components/DashboardCommercial/DailyGoalCard';
import { Button } from '@/components/ui/button';
import { Plus, Package, TrendingUp } from 'lucide-react';
import { PageType } from '../types';

interface DashboardOverviewProps {
  totalRevenue: number;
  totalCosts: number;
  totalProfit: number;
  profitMargin: number;
  dailyProgress: number;
  dailyGoal: number;
  setShowNewSaleModal: (show: boolean) => void;
  setCurrentPage: (page: PageType) => void;
}

/**
 * Seção de Overview: Métricas + Meta + Ações Rápidas
 */
export default function DashboardOverview({
  totalRevenue,
  totalCosts,
  totalProfit,
  profitMargin,
  dailyProgress,
  dailyGoal,
  setShowNewSaleModal,
  setCurrentPage
}: DashboardOverviewProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Faturamento"
          value={totalRevenue}
          icon="revenue"
          indicator={{ 
            value: `${dailyProgress >= 0 ? '+' : ''}${dailyProgress.toFixed(0)}%`, 
            type: dailyProgress >= 0 ? "positive" : "negative", 
            label: "vs ontem" 
          }}
        />
        <MetricCard
          title="Custos"
          value={totalCosts}
          icon="costs"
          indicator={{ 
            value: `${profitMargin.toFixed(1)}%`, 
            type: "neutral",
            label: "margem" 
          }}
        />
        <MetricCard
          title="Lucro Líquido"
          value={totalProfit}
          icon="profit"
          indicator={{ 
            value: `Margem de ${profitMargin.toFixed(1)}%`, 
            type: "neutral" 
          }}
        />
        <MetricCard
          title="Meta Diária"
          value={`${((totalProfit / dailyGoal) * 100).toFixed(0)}%`}
          icon="goal"
          indicator={{ 
            value: `R$ ${totalProfit.toFixed(2)} de R$ ${dailyGoal.toFixed(2)}`, 
            type: "neutral" 
          }}
        />
      </div>

      {/* Meta Diária Destaque */}
      <DailyGoalCard
        target={dailyGoal}
        current={totalProfit}
        percentage={(totalProfit / dailyGoal) * 100}
      />

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          onClick={() => setShowNewSaleModal(true)}
          className="h-20 text-lg gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-6 h-6" />
          Nova Venda
        </Button>
        <Button 
          onClick={() => setCurrentPage('products')}
          variant="outline"
          className="h-20 text-lg gap-2"
        >
          <Package className="w-6 h-6" />
          Gerenciar Produtos
        </Button>
      </div>
    </div>
  );
}
