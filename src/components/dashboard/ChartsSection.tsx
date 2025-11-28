import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartsSectionProps {
  chartData: Array<{ date: string; revenue: number; profit: number; sales: number }>;
  productsData: Array<{ name: string; quantity: number; revenue: number }>;
  isMobile: boolean;
}

export default function ChartsSection({ chartData, productsData, isMobile }: ChartsSectionProps) {
  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
      <Card className="border-2 shadow-md overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="mb-4">
            <h3 className="text-base md:text-lg font-semibold">Faturamento e Lucro (7 dias)</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Evolução diária do seu negócio</p>
          </div>
          
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
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
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(215 90% 55%)" 
                strokeWidth={2}
                name="Faturamento"
                dot={{ fill: 'hsl(215 90% 55%)', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="hsl(145 70% 50%)" 
                strokeWidth={2}
                name="Lucro"
                dot={{ fill: 'hsl(145 70% 50%)', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="border-2 shadow-md overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="mb-4">
            <h3 className="text-base md:text-lg font-semibold">Top 5 Produtos</h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Mais vendidos do período</p>
          </div>
          
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
            <BarChart data={productsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number, name: string) => [
                  name === 'quantity' ? `${value} un` : `R$ ${value.toFixed(2)}`,
                  name === 'quantity' ? 'Quantidade' : 'Faturamento'
                ]}
              />
              <Legend />
              <Bar 
                dataKey="quantity" 
                fill="hsl(215 90% 55%)" 
                name="Quantidade"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
