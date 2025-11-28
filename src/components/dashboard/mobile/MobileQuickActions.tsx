import { Plus, Download, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface MobileQuickActionsProps {
  setShowNewSaleModal: (show: boolean) => void;
  setCurrentPage: (page: PageType) => void;
}

const MobileQuickActions = ({ setShowNewSaleModal, setCurrentPage }: MobileQuickActionsProps) => {
  const actions = [
    {
      label: 'Nova Venda',
      icon: Plus,
      onClick: () => setShowNewSaleModal(true),
      primary: true
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
    <div className="md:hidden grid grid-cols-2 gap-3">
      {actions.map((action, index) => (
        <Button 
          key={index}
          onClick={action.onClick}
          variant={action.primary ? "default" : "outline"}
          className={`h-20 flex flex-col items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
            action.primary 
              ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white' 
              : 'border-2 hover:border-primary/50'
          }`}
        >
          <action.icon className="h-5 w-5" />
          <span className="text-xs font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MobileQuickActions;
