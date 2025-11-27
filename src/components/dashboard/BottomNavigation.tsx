import { Home, Package, Plus, TrendingUp, Bot } from 'lucide-react';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface BottomNavigationProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  setShowNewSaleModal: (show: boolean) => void;
}

export default function BottomNavigation({
  currentPage,
  setCurrentPage,
  setShowNewSaleModal
}: BottomNavigationProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-lg z-40">
      <div className="grid grid-cols-5 gap-1 p-2">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
            currentPage === 'dashboard'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <Home className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Início</span>
        </button>
        
        <button
          onClick={() => setCurrentPage('products')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
            (currentPage as PageType) === 'products'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <Package className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Produtos</span>
        </button>
        
        <button
          onClick={() => setShowNewSaleModal(true)}
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-1">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">Vender</span>
        </button>
        
        <button
          onClick={() => setCurrentPage('sales')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
            (currentPage as PageType) === 'sales'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <TrendingUp className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Vendas</span>
        </button>
        
        <button
          onClick={() => setCurrentPage('assistant')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
            (currentPage as PageType) === 'assistant'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          <Bot className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">IA</span>
        </button>
      </div>
    </nav>
  );
}
