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
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Vendas Recentes</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary/80"
            onClick={() => setCurrentPage('sales')}
          >
            Ver todas
          </Button>
        </div>
        
        <div className="space-y-4">
          {sales.slice(0, 5).map((sale) => (
            <div key={sale.id} className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-muted/50 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{sale.product}</p>
                  <p className="text-xs text-muted-foreground">
                    {sale.quantity}x unidades • {sale.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">R$ {(sale.quantity * sale.price).toFixed(2)}</p>
                <p className="text-xs text-green-600">+R$ {sale.profit.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
