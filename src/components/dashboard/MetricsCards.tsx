import { TrendingUp, DollarSign, BarChart3, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricsCardsProps {
  totalRevenue: number;
  totalCosts: number;
  totalProfit: number;
  profitMargin: number;
  dailyProgress: number;
  goals: { daily: number };
}

export default function MetricsCards({
  totalRevenue,
  totalCosts,
  totalProfit,
  profitMargin,
  dailyProgress,
  goals
}: MetricsCardsProps) {
  const metrics = [
    {
      label: 'Faturamento',
      value: `R$ ${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      trend: '+15% vs ontem',
      trendIcon: ArrowUp,
      trendColor: 'text-green-600',
      gradient: 'from-primary/5 to-accent/5'
    },
    {
      label: 'Custos',
      value: `R$ ${totalCosts.toFixed(2)}`,
      icon: BarChart3,
      trend: '-8% vs ontem',
      trendIcon: ArrowDown,
      trendColor: 'text-red-600',
      gradient: 'from-purple-500/5 to-purple-600/5'
    },
    {
      label: 'Lucro Líquido',
      value: `R$ ${totalProfit.toFixed(2)}`,
      icon: DollarSign,
      subtext: `Margem de ${profitMargin.toFixed(1)}%`,
      gradient: 'from-green-500/5 to-emerald-500/5'
    },
    {
      label: 'Meta Diária',
      value: `${dailyProgress.toFixed(0)}%`,
      icon: Target,
      subtext: `R$ ${totalProfit.toFixed(2)} de R$ ${goals.daily.toFixed(2)}`,
      gradient: 'from-yellow-500/5 to-amber-500/5'
    }
  ];

  return (
    <>
      {/* Mobile: Scroll horizontal */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-3 px-3">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden border-2 shadow-md min-w-[280px] snap-center">
            <div className="flex h-28 flex-col justify-between p-5">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                <div className="h-4 w-4 text-muted-foreground">
                  <metric.icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.trend && metric.trendIcon && (
                  <p className="text-xs text-muted-foreground flex items-center">
                    <metric.trendIcon className={`mr-1 h-3 w-3 ${metric.trendColor}`} />
                    <span className={metric.trendColor}>{metric.trend.split(' ')[0]}</span> {metric.trend.split(' ').slice(1).join(' ')}
                  </p>
                )}
                {metric.subtext && (
                  <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                )}
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} pointer-events-none`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop: Grid normal */}
      <div className="hidden md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex h-32 flex-col justify-between p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                <div className="h-4 w-4 text-muted-foreground">
                  <metric.icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.trend && metric.trendIcon && (
                  <p className="text-xs text-muted-foreground flex items-center">
                    <metric.trendIcon className={`mr-1 h-3 w-3 ${metric.trendColor}`} />
                    <span className={metric.trendColor}>{metric.trend.split(' ')[0]}</span> {metric.trend.split(' ').slice(1).join(' ')}
                  </p>
                )}
                {metric.subtext && (
                  <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                )}
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} pointer-events-none`} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
