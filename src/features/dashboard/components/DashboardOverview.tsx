import MetricsCards from '@/components/dashboard/MetricsCards';
import GoalProgress from '@/components/dashboard/GoalProgress';
import QuickActions from '@/components/dashboard/QuickActions';
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
    <div className="space-y-4 md:space-y-6">
      <MetricsCards
        totalRevenue={totalRevenue}
        totalCosts={totalCosts}
        totalProfit={totalProfit}
        profitMargin={profitMargin}
        dailyProgress={dailyProgress}
        goals={{ daily: dailyGoal, monthly: 0 }}
      />

      <GoalProgress
        dailyProgress={dailyProgress}
        totalProfit={totalProfit}
        dailyGoal={dailyGoal}
      />

      <QuickActions
        setShowNewSaleModal={setShowNewSaleModal}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
