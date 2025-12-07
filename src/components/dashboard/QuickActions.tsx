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
    <div className="grid grid-cols-2 gap-2.5 md:gap-3 lg:grid-cols-4">
      {actions.map((action, index) => (
        <Button 
          key={index}
          onClick={action.onClick}
          variant="outline"
          className="h-18 md:h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-all border-2 shadow-sm hover:shadow-md active:scale-95"
        >
          <action.icon className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-xs md:text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
