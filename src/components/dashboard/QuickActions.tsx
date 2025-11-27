import { Plus, Download, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface QuickActionsProps {
  setShowNewSaleModal: (show: boolean) => void;
  setCurrentPage: (page: PageType) => void;
}

export default function QuickActions({ setShowNewSaleModal, setCurrentPage }: QuickActionsProps) {
  const actions = [
    {
      label: 'Nova Venda',
      icon: Plus,
      onClick: () => setShowNewSaleModal(true)
    },
    {
      label: 'Relatório',
      icon: Download,
      onClick: () => {}
    },
    {
      label: 'Produtos',
      icon: Package,
      onClick: () => setCurrentPage('products')
    },
    {
      label: 'Ver Vendas',
      icon: TrendingUp,
      onClick: () => setCurrentPage('sales')
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <Button 
          key={index}
          onClick={action.onClick}
          variant="outline"
          className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors border-2 shadow-md hover:shadow-lg"
        >
          <action.icon className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
