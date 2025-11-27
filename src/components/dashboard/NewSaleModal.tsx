import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
}

interface NewSale {
  productId: string;
  quantity: number;
  customPrice: string;
}

interface NewSaleModalProps {
  products: Product[];
  newSale: NewSale;
  setNewSale: (sale: NewSale) => void;
  addSale: () => void;
  setShowNewSaleModal: (show: boolean) => void;
}

export default function NewSaleModal({
  products,
  newSale,
  setNewSale,
  addSale,
  setShowNewSaleModal
}: NewSaleModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-foreground">Nova Venda</h3>
          <button onClick={() => setShowNewSaleModal(false)} className="p-2 rounded-xl hover:bg-secondary/50">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Produto</label>
            <select
              className="w-full p-3 bg-background border border-input rounded-2xl focus:ring-2 focus:ring-ring text-foreground"
              value={newSale.productId}
              onChange={(e) => setNewSale({...newSale, productId: e.target.value})}
            >
              <option value="">Selecione o produto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - R$ {product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantidade</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 bg-background border border-input rounded-2xl focus:ring-2 focus:ring-ring text-foreground"
                value={newSale.quantity}
                onChange={(e) => setNewSale({...newSale, quantity: parseInt(e.target.value) || 1})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Preço (opcional)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Usar padrão"
                className="w-full p-3 bg-background border border-input rounded-2xl focus:ring-2 focus:ring-ring text-foreground"
                value={newSale.customPrice}
                onChange={(e) => setNewSale({...newSale, customPrice: e.target.value})}
              />
            </div>
          </div>
          
          {newSale.productId && newSale.quantity && (
            <Card className="p-4 bg-secondary/50 border-border">
              {(() => {
                const product = products.find(p => p.id === parseInt(newSale.productId));
                const price = newSale.customPrice ? parseFloat(newSale.customPrice) : product?.price || 0;
                const quantity = parseInt(newSale.quantity.toString()) || 0;
                const revenue = quantity * price;
                const cost = quantity * (product?.cost || 0);
                const profit = revenue - cost;
                
                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Faturamento:</span>
                      <span className="font-semibold text-foreground">R$ {revenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Custo:</span>
                      <span className="font-semibold text-foreground">R$ {cost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-medium text-muted-foreground">Lucro:</span>
                      <span className="font-bold text-success">R$ {profit.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })()}
            </Card>
          )}
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowNewSaleModal(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={addSale}
            className="flex-1 bg-gradient-to-r from-primary to-accent"
          >
            Registrar
          </Button>
        </div>
      </Card>
    </div>
  );
}
