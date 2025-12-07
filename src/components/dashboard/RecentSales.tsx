import { ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface Sale {
  id: number;
  product: string;
  quantity: number;
  price: number;
  date: Date;
  profit: number;
}

interface RecentSalesProps {
  sales: Sale[];
  setCurrentPage: (page: PageType) => void;
}

export default function RecentSales({ sales, setCurrentPage }: RecentSalesProps) {
  return (
    <Card className="border-2 shadow-md">
      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm md:text-base font-semibold flex items-center gap-1.5">🛍️ Vendas Recentes</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80 h-8 px-2 md:px-3"
            onClick={() => setCurrentPage('sales')}
          >
            Ver todas
          </Button>
        </div>
        
        <div className="space-y-2">
          {sales.slice(0, 5).map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-2.5 md:p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all shadow-sm active:scale-[0.98]">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none truncate">{sale.product}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {sale.quantity}x • {sale.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-sm font-medium whitespace-nowrap">R$ {(sale.quantity * sale.price).toFixed(2)}</p>
                <p className="text-xs text-green-600 whitespace-nowrap">+R$ {sale.profit.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
