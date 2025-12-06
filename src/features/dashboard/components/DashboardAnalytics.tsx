import ChartsSection from '@/components/dashboard/ChartsSection';
import DailyProfitChart from '@/components/dashboard/DailyProfitChart';
import MonthlyCashFlow from '@/components/dashboard/MonthlyCashFlow';
import PeakHoursChart from '@/components/dashboard/PeakHoursChart';
import { 
  ChartData, 
  ProductData, 
  DailyProfitData, 
  CashFlowData, 
  HourlyData 
} from '../types';

interface DashboardAnalyticsProps {
  chartData: ChartData[];
  productsData: ProductData[];
  dailyProfitData: DailyProfitData[];
  cashFlowData: CashFlowData[];
  peakHoursData: HourlyData[];
  isMobile: boolean;
}

/**
 * Seção de Analytics: Todos os gráficos organizados
 */
export default function DashboardAnalytics({
  chartData,
  productsData,
  dailyProfitData,
  cashFlowData,
  peakHoursData,
  isMobile
}: DashboardAnalyticsProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Gráficos principais: Faturamento/Lucro + Top Produtos */}
      <ChartsSection
        chartData={chartData}
        productsData={productsData}
        isMobile={isMobile}
      />

      {/* Gráficos de análise: Lucro Diário + Horários de Pico */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <DailyProfitChart
          data={dailyProfitData}
          isMobile={isMobile}
        />
        
        <PeakHoursChart
          data={peakHoursData}
          isMobile={isMobile}
        />
      </div>

      {/* Fluxo de Caixa Mensal (width completo) */}
      <MonthlyCashFlow
        data={cashFlowData}
        isMobile={isMobile}
      />
    </div>
  );
}
