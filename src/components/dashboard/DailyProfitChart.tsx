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
      <div className="p-4 md:p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base md:text-lg font-semibold"> Lucro Diário</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
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

        <div className="mb-3 flex items-center gap-4 text-xs md:text-sm">
          <div>
            <span className="text-muted-foreground">Média:</span>
            <span className="ml-2 font-semibold">R$ {avgProfit.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total:</span>
            <span className="ml-2 font-semibold text-green-600">
              R$ {data.reduce((acc, item) => acc + item.profit, 0).toFixed(2)}
            </span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
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

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            🟢 Verde = Acima da média • 🟠 Laranja = Abaixo da média
          </p>
        </div>
      </div>
    </Card>
  );
}
