import { Target, Check, AlertCircle } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/utils/formatters';

interface DailyGoalCardProps {
  target: number;
  current: number;
  percentage: number;
}

const DailyGoalCard = ({ target, current, percentage }: DailyGoalCardProps) => {
  const isGoalMet = percentage >= 100;
  const remaining = target - current;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Meta Diária</h3>
        </div>

        {/* Badge de status */}
        {isGoalMet ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Meta batida!</span>
          </div>
        ) : (
          <div className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full">
            <span className="text-sm font-medium">Meta: {formatCurrency(target)}</span>
          </div>
        )}
      </div>

      {/* Valor alcançado */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(current)}</p>
        {!isGoalMet && (
          <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Faltam {formatCurrency(remaining)}
          </p>
        )}
      </div>

      {/* Barra de progresso */}
      <div className="relative">
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isGoalMet ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        {/* Porcentagem sobre a barra */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700 drop-shadow-sm">
            {formatPercent(percentage, 0)} da meta
          </span>
        </div>
      </div>
    </div>
  );
};

export default DailyGoalCard;
