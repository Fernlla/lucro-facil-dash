import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HourlyData {
  hour: string;
  vendas: number;
  faturamento: number;
}

interface PeakHoursChartProps {
  data: HourlyData[];
  isMobile: boolean;
}

export default function PeakHoursChart({ data, isMobile }: PeakHoursChartProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Atualiza a cada minuto
    return () => clearInterval(timer);
  }, []);

  const maxSales = Math.max(...data.map(item => item.vendas));
  const peakHours = data.filter(item => item.vendas === maxSales);
  const currentHour = currentTime.getHours();
  const totalSales = data.reduce((acc, item) => acc + item.vendas, 0);

  const getBarColor = (vendas: number) => {
    const percentage = (vendas / maxSales) * 100;
    if (percentage >= 80) return 'hsl(145 70% 50%)'; // Verde - Pico
    if (percentage >= 50) return 'hsl(215 90% 55%)'; // Azul - Bom
    if (percentage >= 30) return 'hsl(45 95% 53%)'; // Amarelo - Médio
    return 'hsl(0 70% 50%)'; // Vermelho - Fraco
  };

  return (
    <Card className="border-2 shadow-md overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base md:text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Horários de Pico
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Quando vendem mais? • Atualização em tempo real
            </p>
          </div>
          <div className="bg-primary/10 rounded-lg px-3 py-1.5 border border-primary/20">
            <p className="text-xs font-medium text-primary">
              Agora: {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Melhor Horário</span>
            </div>
            <p className="text-lg md:text-xl font-bold text-green-700 dark:text-green-400">
              {peakHours[0]?.hour || 'N/A'}
            </p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
              {peakHours[0]?.vendas || 0} vendas
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Total Hoje</span>
            </div>
            <p className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-400">
              {totalSales} vendas
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">
              {data.filter(d => parseInt(d.hour.split('h')[0]) <= currentHour).length} horas
            </p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="hour" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'Vendas', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'vendas') return [`${value} vendas`, 'Quantidade'];
                return [`R$ ${value.toFixed(2)}`, 'Faturamento'];
              }}
              labelFormatter={(label) => `Horário: ${label}`}
            />
            <Bar 
              dataKey="vendas" 
              radius={[8, 8, 0, 0]}
            >
              {data.map((entry, index) => {
                const hourNum = parseInt(entry.hour.split('h')[0]);
                const isCurrentHour = hourNum === currentHour;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.vendas)}
                    opacity={isCurrentHour ? 1 : 0.85}
                    stroke={isCurrentHour ? 'hsl(var(--primary))' : 'none'}
                    strokeWidth={isCurrentHour ? 2 : 0}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-green-500"></div>
              <span className="text-muted-foreground">Pico (80%+)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-blue-500"></div>
              <span className="text-muted-foreground">Bom (50-80%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-yellow-500"></div>
              <span className="text-muted-foreground">Médio (30-50%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-red-500"></div>
              <span className="text-muted-foreground">Fraco (&lt;30%)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
