import { Wallet, ArrowDown, ArrowUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatters';
import { monthlyCashFlow } from '@/data/mockCommercialData';

interface CashFlowChartProps {
  isMobile?: boolean;
}

const CashFlowChart = ({ isMobile = false }: CashFlowChartProps) => {
  // Calcular totais
  const totals = monthlyCashFlow.reduce((acc, item) => ({
    entrada: acc.entrada + item.entrada,
    saida: acc.saida + item.saida,
    saldo: acc.saldo + item.saldo
  }), { entrada: 0, saida: 0, saldo: 0 });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <p className="text-sm text-green-600 font-medium">
            Entrada: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-red-600 font-medium">
            Saída: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-sm text-blue-600 font-medium">
            Saldo: {formatCurrency(payload[2].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Fluxo de Caixa Mensal</h3>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <ArrowDown className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm font-semibold text-green-800">Entrada</p>
          </div>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(totals.entrada)}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <ArrowUp className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-sm font-semibold text-red-800">Saída</p>
          </div>
          <p className="text-2xl font-bold text-red-700">{formatCurrency(totals.saida)}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-blue-800">Saldo</p>
          </div>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(totals.saldo)}</p>
        </div>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={isMobile ? 280 : 350}>
        <AreaChart data={monthlyCashFlow} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="month" 
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
            iconType="square"
          />
          <Area 
            type="monotone" 
            dataKey="entrada" 
            stroke="#10B981" 
            fillOpacity={1}
            fill="url(#colorEntrada)"
            strokeWidth={2}
            name="Entrada"
          />
          <Area 
            type="monotone" 
            dataKey="saida" 
            stroke="#EF4444" 
            fillOpacity={1}
            fill="url(#colorSaida)"
            strokeWidth={2}
            name="Saída"
          />
          <Area 
            type="monotone" 
            dataKey="saldo" 
            stroke="#3B82F6" 
            fillOpacity={1}
            fill="url(#colorSaldo)"
            strokeWidth={2}
            name="Saldo"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
