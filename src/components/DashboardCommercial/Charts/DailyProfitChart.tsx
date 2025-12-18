import { Coins, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency, getDayAbbr, formatPercent } from '@/utils/formatters';
import type { Sale } from '@/data/mockCommercialData';

interface DailyProfitChartProps {
  sales: Sale[];
  isMobile?: boolean;
}

const DailyProfitChart = ({ sales, isMobile = false }: DailyProfitChartProps) => {
  // Agrupar lucros por dia da semana (últimos 7 dias)
  const chartData = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    const daySales = sales.filter(s => {
      const saleDate = new Date(s.date);
      return saleDate >= date && saleDate < nextDay;
    });
    
    const profit = daySales.reduce((sum, s) => sum + s.profit, 0);
    
    chartData.push({
      dia: getDayAbbr(date),
      lucro: profit
    });
  }
  
  // Calcular média
  const totalProfit = chartData.reduce((sum, d) => sum + d.lucro, 0);
  const avgProfit = totalProfit / chartData.length;
  
  // Adicionar cor baseada na média
  const chartDataWithColor = chartData.map(d => ({
    ...d,
    fill: d.lucro >= avgProfit ? '#10B981' : '#F97316'
  }));
  
  // Calcular performance vs meta
  const meta = 130.63;
  const performance = ((totalProfit / 7 - meta) / meta) * 100;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const isAboveAvg = payload[0].payload.lucro >= avgProfit;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.dia}</p>
          <p className={`text-sm font-medium ${isAboveAvg ? 'text-green-600' : 'text-orange-600'}`}>
            Lucro: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isAboveAvg ? 'Acima da média' : 'Abaixo da média'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Lucro Diário</h3>
        </div>
        {performance > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-bold">+{formatPercent(performance, 1)}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-1">Quanto SOBROU no bolso cada dia</p>
      <p className="text-xs text-gray-500 mb-6">Meta: {formatCurrency(meta)}</p>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <BarChart data={chartDataWithColor} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="dia" 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `R$ ${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '13px' }}
            payload={[
              { value: 'Acima da média', type: 'rect', id: 'above', color: '#10B981' },
              { value: 'Abaixo da média', type: 'rect', id: 'below', color: '#F97316' }
            ]}
          />
          <ReferenceLine 
            y={avgProfit} 
            stroke="#6B7280" 
            strokeDasharray="5 5"
            label={{ value: 'Média', position: 'right', fill: '#6B7280', fontSize: 11 }}
          />
          <Bar 
            dataKey="lucro" 
            radius={[8, 8, 0, 0]}
            name="Lucro"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyProfitChart;
