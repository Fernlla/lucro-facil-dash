import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface Sale {
  id: number;
  product: string;
  quantity: number;
  price: number;
  date: Date;
  profit: number;
}

interface MobileSalesListProps {
  sales: Sale[];
  setCurrentPage: (page: PageType) => void;
}

const MobileSalesList = ({ sales, setCurrentPage }: MobileSalesListProps) => {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Vendas Recentes</h3>
        <button
          onClick={() => setCurrentPage('sales')}
          className="flex items-center gap-1 text-sm text-primary font-medium active:scale-95 transition-transform"
        >
          Ver todas
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-2">
        {sales.slice(0, 5).map((sale) => (
          <Card
            key={sale.id}
            className="p-3 border shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{sale.product}</p>
                <p className="text-xs text-muted-foreground">
                  {sale.quantity}x • {sale.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold whitespace-nowrap">
                  R$ {(sale.quantity * sale.price).toFixed(2)}
                </p>
                <p className="text-xs text-green-600 whitespace-nowrap">
                  +R$ {sale.profit.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MobileSalesList;
