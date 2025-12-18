import { Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { todayHourlySales } from '@/data/mockCommercialData';

interface PeakHoursChartProps {
  isMobile?: boolean;
}

const PeakHoursChart = ({ isMobile = false }: PeakHoursChartProps) => {
  // Preparar dados com cores por faixa horária
  const chartData = todayHourlySales.map(item => {
    let color = '#EF4444'; // Vermelho padrão (fraco)
    
    if (item.hour >= 9 && item.hour <= 17) color = '#10B981'; // Verde (pico)
    else if (item.hour >= 18 && item.hour <= 21) color = '#3B82F6'; // Azul (noturno)
    else if (item.hour >= 6 && item.hour <= 8) color = '#FBBF24'; // Amarelo (manhã)
    
    return {
      hora: `${item.hour}h`,
      vendas: item.sales,
      color
    };
  });
  
  // Encontrar horário de pico
  const peakHour = todayHourlySales.reduce((max, item) => 
    item.sales > max.sales ? item : max
  );
  
  // Total de vendas hoje
  const totalSales = todayHourlySales.reduce((sum, item) => sum + item.sales, 0);
  const hoursOpen = 13; // 9h às 22h
  
  // Horário atual
  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.hora}</p>
          <p className="text-sm text-blue-600 font-medium">
            {payload[0].value} vendas
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
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Horários de Pico</h3>
        </div>
        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-bold">{currentTime}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">Quando vendeu mais? (Hoje 16/12)</p>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-xs font-semibold text-green-800">Melhor Horário</p>
          </div>
          <p className="text-2xl font-bold text-green-700">{peakHour.hour}h</p>
          <p className="text-sm text-green-600">{peakHour.sales} vendas</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-blue-800">Total Hoje</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">{totalSales}</p>
          <p className="text-sm text-blue-600">{hoursOpen} horas</p>
        </div>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={isMobile ? 220 : 280}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="hora" 
            stroke="#6B7280"
            style={{ fontSize: '10px' }}
            interval={1}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '11px' }}
            payload={[
              { value: 'Pico (9h-17h)', type: 'rect', id: 'peak', color: '#10B981' },
              { value: 'Noturno (18h-21h)', type: 'rect', id: 'night', color: '#3B82F6' },
              { value: 'Manhã (6h-8h)', type: 'rect', id: 'morning', color: '#FBBF24' },
              { value: 'Fraco (≤5h,≥22h)', type: 'rect', id: 'low', color: '#EF4444' }
            ]}
          />
          <Bar 
            dataKey="vendas" 
            radius={[6, 6, 0, 0]}
            name="Vendas"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PeakHoursChart;
