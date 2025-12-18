import { FileText, File } from 'lucide-react';
import { formatCurrency, formatDayOrdinal, formatTime } from '@/utils/formatters';
import type { Sale } from '@/data/mockCommercialData';

interface RecentSalesListProps {
  sales: Sale[];
  onViewAll: () => void;
}

const RecentSalesList = ({ sales, onViewAll }: RecentSalesListProps) => {
  // Pegar últimas 7 vendas
  const recentSales = sales.slice(0, 7);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Vendas Recentes</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Ver todas
        </button>
      </div>

      {/* Lista de vendas */}
      <div className="space-y-3">
        {recentSales.map((sale, index) => (
          <div
            key={sale.id}
            className={`flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
              index >= 5 ? 'opacity-60' : ''
            }`}
          >
            {/* Ícone e info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <File className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{sale.productName}</p>
                <p className="text-sm text-gray-500">
                  {formatDayOrdinal(sale.date)} - {formatTime(sale.date)}
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{formatCurrency(sale.price)}</p>
              <p className="text-sm text-green-600 font-medium">+{formatCurrency(sale.profit)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSalesList;
