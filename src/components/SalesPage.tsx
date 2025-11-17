import { useState, useMemo } from 'react';
import { 
  ArrowLeft, Calendar, Filter, Search, Download, TrendingUp, 
  ShoppingBag, DollarSign, Package, Clock, ChevronDown, X,
  Edit, Trash2, MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Sale {
  id: number;
  productId: number;
  product: string;
  quantity: number;
  price: number;
  cost: number;
  date: Date;
  profit: number;
  category?: string;
  paymentMethod?: string;
}

interface SalesPageProps {
  theme: 'light' | 'dark';
  onClose: () => void;
  sales: Sale[];
  onDeleteSale?: (id: number) => void;
}

export default function SalesPage({ theme, onClose, sales, onDeleteSale }: SalesPageProps) {
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedSale, setSelectedSale] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar vendas por período
  const filterSalesByPeriod = (sales: Sale[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filterPeriod) {
      case 'today':
        return sales.filter(sale => sale.date >= today);
      case 'week':
        return sales.filter(sale => sale.date >= weekAgo);
      case 'month':
        return sales.filter(sale => sale.date >= monthAgo);
      default:
        return sales;
    }
  };

  // Filtrar vendas por busca
  const filteredSales = filterSalesByPeriod(sales).filter(sale =>
    sale.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estatísticas
  const totalRevenue = filteredSales.reduce((acc, sale) => acc + (sale.quantity * sale.price), 0);
  const totalProfit = filteredSales.reduce((acc, sale) => acc + sale.profit, 0);
  const totalItems = filteredSales.reduce((acc, sale) => acc + sale.quantity, 0);
  const averageTicket = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0;

  const periodLabels = {
    today: 'Hoje',
    week: 'Última semana',
    month: 'Último mês',
    all: 'Todas'
  };

  const handleDeleteSale = (id: number) => {
    if (onDeleteSale && confirm('Tem certeza que deseja excluir esta venda?')) {
      onDeleteSale(id);
      setSelectedSale(null);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDark 
                  ? 'hover:bg-slate-800 text-slate-100' 
                  : 'hover:bg-gray-200 text-gray-900'
              }`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                Vendas
              </h1>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Gerencie e acompanhe todas as suas vendas
              </p>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Download size={18} className="mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className={`p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Total de Vendas
              </p>
              <ShoppingBag className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
            </div>
            <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              {filteredSales.length}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              {filterPeriod === 'today' ? 'Hoje' : periodLabels[filterPeriod]}
            </p>
          </Card>

          <Card className={`p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Faturamento
              </p>
              <DollarSign className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
            </div>
            <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              R$ {totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ticket médio: R$ {averageTicket.toFixed(2)}
            </p>
          </Card>

          <Card className={`p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Lucro Total
              </p>
              <TrendingUp className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
            </div>
            <div className={`text-2xl font-bold text-green-600`}>
              R$ {totalProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Margem: {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0}%
            </p>
          </Card>

          <Card className={`p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Itens Vendidos
              </p>
              <Package className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
            </div>
            <div className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              {totalItems}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Média: {filteredSales.length > 0 ? (totalItems / filteredSales.length).toFixed(1) : 0} por venda
            </p>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className={`p-4 mb-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDark ? 'text-slate-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl border ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
              />
            </div>

            {/* Filtro de Período */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-100 hover:bg-slate-700' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Calendar size={18} />
                <span>{periodLabels[filterPeriod]}</span>
                <ChevronDown size={16} />
              </button>

              {showFilterMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border z-10 ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}>
                  {(['today', 'week', 'month', 'all'] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => {
                        setFilterPeriod(period);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        filterPeriod === period
                          ? 'bg-blue-600 text-white'
                          : isDark
                          ? 'text-slate-100 hover:bg-slate-700'
                          : 'text-gray-900 hover:bg-gray-100'
                      } ${period === 'today' ? 'rounded-t-xl' : ''} ${period === 'all' ? 'rounded-b-xl' : ''}`}
                    >
                      {periodLabels[period]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Lista de Vendas */}
        <Card className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
          <div className="p-6">
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Histórico de Vendas ({filteredSales.length})
            </h2>

            {filteredSales.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className={`mx-auto h-12 w-12 mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
                <p className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  Nenhuma venda encontrada
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                  {searchTerm ? 'Tente buscar por outro produto' : 'Registre sua primeira venda!'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSales.map((sale) => (
                  <div
                    key={sale.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isDark 
                        ? 'border-slate-700 hover:bg-slate-700/50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        isDark ? 'bg-blue-600/20' : 'bg-blue-100'
                      }`}>
                        <ShoppingBag className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                            {sale.product}
                          </p>
                          {sale.category && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {sale.category}
                            </span>
                          )}
                        </div>
                        <div className={`flex items-center gap-4 mt-1 text-sm ${
                          isDark ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                          <span className="flex items-center gap-1">
                            <Package size={14} />
                            {sale.quantity}x unidades
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {sale.date.toLocaleDateString('pt-BR')} às{' '}
                            {sale.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                          Faturamento
                        </p>
                        <p className={`font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                          R$ {(sale.quantity * sale.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                          Lucro
                        </p>
                        <p className="font-semibold text-green-600">
                          R$ {sale.profit.toFixed(2)}
                        </p>
                      </div>

                      {onDeleteSale && (
                        <div className="relative">
                          <button
                            onClick={() => setSelectedSale(selectedSale === sale.id ? null : sale.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isDark 
                                ? 'hover:bg-slate-600 text-slate-400' 
                                : 'hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <MoreVertical size={18} />
                          </button>

                          {selectedSale === sale.id && (
                            <div className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border z-10 ${
                              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                            }`}>
                              <button
                                onClick={() => handleDeleteSale(sale.id)}
                                className={`w-full px-4 py-2 text-left flex items-center gap-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 ${
                                  isDark ? 'hover:bg-red-900/20' : ''
                                }`}
                              >
                                <Trash2 size={16} />
                                Excluir
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
