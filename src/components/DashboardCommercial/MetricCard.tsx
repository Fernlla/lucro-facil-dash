import { TrendingUp, TrendingDown, DollarSign, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: 'revenue' | 'costs' | 'profit' | 'goal';
  indicator?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
    label?: string;
  };
}

const MetricCard = ({ title, value, icon, indicator }: MetricCardProps) => {
  const icons = {
    revenue: TrendingUp,
    costs: TrendingDown,
    profit: DollarSign,
    goal: Target
  };

  const IconComponent = icons[icon];

  // Formatar valor se for número
  const displayValue = typeof value === 'number' ? formatCurrency(value) : value;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header com título e ícone */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="p-2 bg-gray-50 rounded-lg">
          <IconComponent className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Valor principal */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-900">{displayValue}</p>
      </div>

      {/* Indicador (variação, meta, etc) */}
      {indicator && (
        <div className="flex items-center gap-1.5">
          {indicator.type === 'positive' && (
            <>
              <ArrowUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">{indicator.value}</span>
            </>
          )}
          {indicator.type === 'negative' && (
            <>
              <ArrowDown className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">{indicator.value}</span>
            </>
          )}
          {indicator.type === 'neutral' && (
            <span className="text-sm font-medium text-gray-600">{indicator.value}</span>
          )}
          {indicator.label && (
            <span className="text-sm text-gray-500 ml-1">{indicator.label}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
