import RevenueChart from '@/components/DashboardCommercial/Charts/RevenueChart';
import TopProductsChart from '@/components/DashboardCommercial/Charts/TopProductsChart';
import DailyProfitChart from '@/components/DashboardCommercial/Charts/DailyProfitChart';
import CashFlowChart from '@/components/DashboardCommercial/Charts/CashFlowChart';
import PeakHoursChart from '@/components/DashboardCommercial/Charts/PeakHoursChart';
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
    <div className="space-y-3 md:space-y-4">
      {/* Gráficos principais: Faturamento/Lucro + Top Produtos */}
      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        <RevenueChart
          // transformar chartData em array de vendas sintéticas
          sales={chartData.map((c, idx) => ({
            id: idx,
            productId: 0,
            product: c.sales ? 'Vários' : 'Produto',
            productName: c.sales ? 'Vários' : 'Produto',
            quantity: c.sales || 0,
            price: c.revenue,
            cost: Math.max(0, c.revenue - c.profit),
            date: new Date(c.date),
            profit: c.profit
          }))}
          isMobile={isMobile}
        />

        <TopProductsChart
          // criar vendas sintéticas a partir de productsData
          sales={productsData.flatMap((p, idx) => ([{
            id: idx,
            productId: idx,
            product: p.name,
            productName: p.name,
            quantity: p.quantity,
            price: p.revenue,
            cost: 0,
            date: new Date(),
            profit: 0
          }]))}
          isMobile={isMobile}
        />
      </div>

      {/* Gráficos de análise: Lucro Diário + Horários de Pico */}
      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        <DailyProfitChart
          // transformar dailyProfitData em vendas sintéticas
          sales={dailyProfitData.map((d, idx) => ({
            id: idx,
            productId: 0,
            product: '',
            productName: '',
            quantity: 0,
            price: 0,
            cost: 0,
            date: new Date(d.date),
            profit: d.profit
          }))}
          isMobile={isMobile}
        />

        <PeakHoursChart isMobile={isMobile} />
      </div>

      {/* Fluxo de Caixa Mensal (width completo) */}
      <CashFlowChart isMobile={isMobile} />
    </div>
  );
}
