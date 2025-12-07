import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DailyProfitData {
  date: string;
  profit: number;
  day: string;
}

interface DailyProfitChartProps {
  data: DailyProfitData[];
  isMobile: boolean;
}

export default function DailyProfitChart({ data, isMobile }: DailyProfitChartProps) {
  const avgProfit = data.reduce((acc, item) => acc + item.profit, 0) / data.length;
  const trend = data[data.length - 1].profit > data[0].profit ? 'up' : 'down';
  const trendPercent = ((data[data.length - 1].profit - data[0].profit) / data[0].profit * 100).toFixed(1);

  return (
    <Card className="border-2 shadow-md overflow-hidden">
      <div className="p-3 md:p-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-sm md:text-base font-semibold flex items-center gap-1.5">
              💰 Lucro Diário
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Quanto sobrou no bolso cada dia
            </p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{trendPercent}%</span>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-3 text-xs">
          <div>
            <span className="text-muted-foreground">Média:</span>
            <span className="ml-1.5 font-semibold">R$ {avgProfit.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total:</span>
            <span className="ml-1.5 font-semibold text-green-600">
              R$ {data.reduce((acc, item) => acc + item.profit, 0).toFixed(2)}
            </span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Lucro']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar 
              dataKey="profit" 
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.profit >= avgProfit ? 'hsl(145 70% 50%)' : 'hsl(25 95% 53%)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            🟢 Acima da média • 🟠 Abaixo da média
          </p>
        </div>
      </div>
    </Card>
  );
}
