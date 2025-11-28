import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardData {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: typeof DollarSign;
  gradient: string;
}

interface MobileMetricsProps {
  totalRevenue: number;
  totalCosts: number;
  totalProfit: number;
  profitMargin: number;
  dailyProgress: number;
  dailyGoal: number;
}

const MobileMetrics = ({ 
  totalRevenue, 
  totalCosts, 
  totalProfit, 
  profitMargin,
  dailyProgress,
  dailyGoal 
}: MobileMetricsProps) => {
  const metrics: MetricCardData[] = [
    {
      label: 'Faturamento',
      value: `R$ ${totalRevenue.toFixed(2)}`,
      change: '+12%',
      isPositive: true,
      icon: DollarSign,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Lucro',
      value: `R$ ${totalProfit.toFixed(2)}`,
      change: '+8%',
      isPositive: true,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Custos',
      value: `R$ ${totalCosts.toFixed(2)}`,
      icon: TrendingDown,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      label: 'Margem',
      value: `${profitMargin.toFixed(1)}%`,
      icon: Target,
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="md:hidden">
      {/* Horizontal scroll cards */}
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-[160px] snap-start border-2 shadow-md"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
                  metric.gradient
                )}>
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                <p className="text-lg font-bold tracking-tight">{metric.value}</p>
                {metric.change && (
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    metric.isPositive ? "text-green-600" : "text-red-600"
                  )}>
                    {metric.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Goal Progress */}
      <Card className="border-2 shadow-md mt-4">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Meta Diária</h3>
            {dailyProgress >= 100 && (
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">
                🎉 Bateu!
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="font-medium">R$ {totalProfit.toFixed(2)}</span>
              <span>Meta: R$ {dailyGoal.toFixed(2)}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(dailyProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {dailyProgress.toFixed(0)}% concluído
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MobileMetrics;
