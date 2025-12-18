import { TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Sale } from '@/data/mockCommercialData';

interface TopProductsChartProps {
  sales: Sale[];
  isMobile?: boolean;
}

const TopProductsChart = ({ sales, isMobile = false }: TopProductsChartProps) => {
  // Contar vendas por produto
  const productSales: { [key: string]: number } = {};
  
  sales.forEach(sale => {
    productSales[sale.productName] = (productSales[sale.productName] || 0) + sale.quantity;
  });
  
  // Pegar top 5 produtos
  const chartData = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, quantity]) => ({
      produto: name.length > 20 ? name.substring(0, 20) + '...' : name,
      quantidade: quantity
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.produto}</p>
          <p className="text-sm text-blue-600 font-medium">
            Quantidade: {payload[0].value}
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
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Top 5 Produtos</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">Mais vendidos do período</p>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="produto" 
            stroke="#6B7280"
            style={{ fontSize: '11px' }}
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            payload={[{ value: 'Quantidade', type: 'rect', id: 'quantidade', color: '#3B82F6' }]}
            iconType="rect"
          />
          <Bar 
            dataKey="quantidade" 
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
            name="Quantidade"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsChart;
