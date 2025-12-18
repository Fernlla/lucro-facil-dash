import { Plus } from 'lucide-react';

interface CommercialHeaderProps {
  onNewSale: () => void;
}

const CommercialHeader = ({ onNewSale }: CommercialHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Acompanhe suas métricas e performance em tempo real
          </p>
        </div>
        
        <button
          onClick={onNewSale}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Nova Venda
        </button>
      </div>
    </header>
  );
};

export default CommercialHeader;
