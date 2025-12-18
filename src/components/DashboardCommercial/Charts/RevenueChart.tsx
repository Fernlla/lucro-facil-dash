import { Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDateShort } from '@/utils/formatters';
import type { Sale } from '@/data/mockCommercialData';

interface RevenueChartProps {
  sales: Sale[];
  isMobile?: boolean;
}

const RevenueChart = ({ sales, isMobile = false }: RevenueChartProps) => {
  // Agrupar vendas por data (últimos 7 dias)
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
    
    const revenue = daySales.reduce((sum, s) => sum + s.price, 0);
    const profit = daySales.reduce((sum, s) => sum + s.profit, 0);
    
    chartData.push({
      date: formatDateShort(date),
      faturamento: revenue,
      lucro: profit
    });
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.date}</p>
          <p className="text-sm text-blue-600 font-medium">
            Faturamento: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-green-600 font-medium">
            Lucro: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Faturamento e Lucro (7 dias)</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Evolução diária</p>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
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
            wrapperStyle={{ fontSize: '14px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="faturamento" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Faturamento"
          />
          <Line 
            type="monotone" 
            dataKey="lucro" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Lucro"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
