import { useState, useEffect } from 'react';
import { 
  Plus, TrendingUp, DollarSign, Package, Bell, BarChart3, 
  Home, Moon, Sun, Monitor, ChevronRight, 
  ArrowUp, ArrowDown, Target,
  ShoppingBag, Download, X, Check, Menu, User, HelpCircle, Settings as SettingsIcon, Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Profile from '@/components/Profile';
import Settings from '@/components/Settings';
import ProductsList from '@/components/ProductsList';
import Notifications from '@/components/Notifications';
import Help from '@/components/Help';
import Auth from './Auth';
import Assistant from '@/components/Assistant';

interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  category: string;
  active: boolean;
}

interface Sale {
  id: number;
  productId: number;
  product: string;
  quantity: number;
  price: number;
  cost: number;
  date: Date;
  profit: number;
}

interface NewSale {
  productId: string;
  quantity: number;
  customPrice: string;
}

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [businessType, setBusinessType] = useState('');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant';
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const [products] = useState<Product[]>([
    { id: 1, name: 'Sorvete Chocolate', cost: 2.50, price: 5.00, category: 'Sorvetes', active: true },
    { id: 2, name: 'Sorvete Morango', cost: 2.30, price: 5.00, category: 'Sorvetes', active: true },
    { id: 3, name: 'Picolé Frutas', cost: 1.80, price: 3.50, category: 'Picolés', active: true },
  ]);

  const [sales, setSales] = useState<Sale[]>([
    { id: 1, productId: 1, product: 'Sorvete Chocolate', quantity: 15, price: 5.00, cost: 2.50, date: new Date(), profit: 37.50 },
    { id: 2, productId: 2, product: 'Sorvete Morango', quantity: 12, price: 5.00, cost: 2.30, date: new Date(), profit: 32.40 },
    { id: 3, productId: 3, product: 'Picolé Frutas', quantity: 20, price: 3.50, cost: 1.80, date: new Date(), profit: 34.00 },
  ]);

  const [goals] = useState({ daily: 100, monthly: 3000 });
  const [newSale, setNewSale] = useState<NewSale>({ productId: '', quantity: 1, customPrice: '' });

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setActiveTheme(systemTheme);
    } else {
      setActiveTheme(theme);
    }
    
    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, activeTheme]);

  const totalRevenue = sales.reduce((acc, sale) => acc + (sale.quantity * sale.price), 0);
  const totalCosts = sales.reduce((acc, sale) => acc + (sale.quantity * sale.cost), 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const dailyProgress = Math.min((totalProfit / goals.daily) * 100, 100);

  const businessTypes = [
    { id: 'food', name: 'Alimentação', icon: '🍦', desc: 'Sorvetes, doces, salgados' },
    { id: 'fashion', name: 'Confecção', icon: '👗', desc: 'Costura, bordados' },
    { id: 'retail', name: 'Revenda', icon: '🛍️', desc: 'Cosméticos, roupas' },
    { id: 'crafts', name: 'Artesanato', icon: '🎨', desc: 'Bijuterias, decoração' }
  ];

  const handleBusinessSelect = (type: string) => {
    setBusinessType(type);
    setIsOnboarded(true);
  };

  const addSale = () => {
    if (!newSale.productId || !newSale.quantity) return;
    
    const product = products.find(p => p.id === parseInt(newSale.productId));
    if (!product) return;
    
    const salePrice = newSale.customPrice ? parseFloat(newSale.customPrice) : product.price;
    const quantity = parseInt(newSale.quantity.toString());
    const profit = quantity * (salePrice - product.cost);
    
    const sale: Sale = {
      id: Date.now(),
      productId: product.id,
      product: product.name,
      quantity,
      price: salePrice,
      cost: product.cost,
      date: new Date(),
      profit
    };
    
    setSales([sale, ...sales]);
    setNewSale({ productId: '', quantity: 1, customPrice: '' });
    setShowNewSaleModal(false);
  };

  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-accent p-4">
      <div className="max-w-md mx-auto pt-20">
        <div className="text-center mb-8">
          <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <DollarSign className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">LucroFácil</h1>
          <p className="text-white/90 text-lg">Descubra quanto você realmente lucra</p>
        </div>

        <Card className="p-6 mb-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-center text-foreground">Qual é o seu negócio?</h2>
          <div className="space-y-4">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleBusinessSelect(type.id)}
                className="w-full p-5 border-2 border-border rounded-2xl hover:border-primary hover:bg-secondary/50 transition-all text-left group"
              >
                <div className="flex items-center">
                  <div className="text-4xl mr-4 group-hover:scale-110 transition-transform">{type.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-lg">{type.name}</div>
                    <div className="text-sm text-muted-foreground">{type.desc}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="text-center text-sm text-white/80">
          <p>🎯 Vamos personalizar sua experiência</p>
        </div>
      </div>
    </div>
  );

  const ThemeSelector = () => (
    <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-lg bg-card border border-border overflow-hidden z-50">
      {[
        { value: 'light' as const, icon: Sun, label: 'Claro' },
        { value: 'dark' as const, icon: Moon, label: 'Escuro' },
        { value: 'system' as const, icon: Monitor, label: 'Sistema' }
      ].map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => {
            setTheme(value);
            setShowThemeMenu(false);
          }}
          className={`w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors ${
            theme === value ? 'bg-secondary' : ''
          }`}
        >
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-3 text-muted-foreground" />
            <span className="text-sm text-foreground">{label}</span>
          </div>
          {theme === value && <Check className="w-4 h-4 text-primary" />}
        </button>
      ))}
    </div>
  );

  const NewSaleModal = () => (
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

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary to-accent text-white p-6 shadow-lg border-0">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-xl">Hoje</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-sm font-medium">Faturamento</p>
            <p className="text-3xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
            <div className="flex items-center text-xs text-white/80">
              <ArrowUp className="w-3 h-3 mr-1" />
              <span>15% vs ontem</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 shadow-lg border-0">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-xl">Hoje</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-sm font-medium">Custos</p>
            <p className="text-3xl font-bold">R$ {totalCosts.toFixed(2)}</p>
            <div className="flex items-center text-xs text-white/80">
              <ArrowDown className="w-3 h-3 mr-1" />
              <span>8% vs ontem</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-success to-emerald-500 text-white p-6 shadow-lg border-0">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-xl">Lucro</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-sm font-medium">Lucro Líquido</p>
            <p className="text-3xl font-bold">R$ {totalProfit.toFixed(2)}</p>
            <div className="flex items-center text-xs text-white/80">
              <span>Margem {profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-amber-500 text-white p-6 shadow-lg border-0">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-xl">Meta</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/80 text-sm font-medium">Progresso</p>
            <p className="text-3xl font-bold">{dailyProgress.toFixed(0)}%</p>
            <div className="flex items-center text-xs text-white/80">
              <span>R$ {goals.daily.toFixed(2)}/dia</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Meta Diária</h3>
          <span className="text-sm text-muted-foreground">
            R$ {totalProfit.toFixed(2)} de R$ {goals.daily.toFixed(2)}
          </span>
        </div>
        
        <div className="relative">
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success to-emerald-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${Math.min(dailyProgress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          
          {dailyProgress >= 100 && (
            <div className="absolute -top-1 right-0 transform translate-x-1/2">
              <span className="bg-success text-white text-xs px-2 py-1 rounded-xl shadow-lg">🎉 Meta batida!</span>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => setShowNewSaleModal(true)}
          className="h-24 flex-col bg-gradient-to-br from-primary to-accent text-white hover:opacity-90"
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-semibold">Nova Venda</span>
        </Button>

        <Button variant="outline" className="h-24 flex-col">
          <Download className="w-8 h-8 mb-2" />
          <span className="font-semibold">Relatório</span>
        </Button>

        <Button variant="outline" className="h-24 flex-col">
          <Package className="w-8 h-8 mb-2" />
          <span className="font-semibold">Produtos</span>
        </Button>

        <Button variant="outline" className="h-24 flex-col">
          <BarChart3 className="w-8 h-8 mb-2" />
          <span className="font-semibold">Análises</span>
        </Button>
      </div>

      <Card className="p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Vendas Recentes</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">Ver todas</button>
        </div>
        
        <div className="space-y-3">
          {sales.slice(0, 5).map((sale) => (
            <div key={sale.id} className="p-4 rounded-2xl border border-border hover:bg-secondary/50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center flex-1">
                  <div className="p-3 bg-secondary rounded-2xl mr-4">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{sale.product}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{sale.quantity}x unidades</span>
                      <span className="mx-2">•</span>
                      <span>{sale.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-foreground">R$ {(sale.quantity * sale.price).toFixed(2)}</p>
                  <p className="text-sm text-success">+R$ {sale.profit.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const Products = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Meus Produtos</h2>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => {
          const margin = ((product.price - product.cost) / product.price) * 100;
          return (
            <Card key={product.id} className="p-6 shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                  <span className="inline-block px-3 py-1 rounded-xl text-xs font-medium bg-secondary text-foreground">
                    {product.category}
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Custo</p>
                      <p className="font-semibold text-foreground">R$ {product.cost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Preço</p>
                      <p className="font-semibold text-foreground">R$ {product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Lucro/un</p>
                      <p className="font-semibold text-success">R$ {(product.price - product.cost).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Margem</p>
                      <p className={`font-semibold ${margin >= 50 ? 'text-success' : margin >= 30 ? 'text-warning' : 'text-destructive'}`}>
                        {margin.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  if (!isOnboarded) {
    return <OnboardingScreen />;
  }

  if (currentPage === 'profile') {
    return <Profile theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'settings') {
    return <Settings theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'products') {
    return <ProductsList theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'notifications') {
    return <Notifications theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'help') {
    return <Help theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'auth') {
    return <Auth theme={activeTheme} onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'assistant') {
    return <Assistant theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="bg-card shadow-sm border-b border-border sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden mr-3 p-2 rounded-2xl hover:bg-secondary/50"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LucroFácil</h1>
                <p className="text-xs text-muted-foreground">Olá! 👋</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-2xl hover:bg-secondary/50 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-muted-foreground" />
                  ) : theme === 'light' ? (
                    <Sun className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Monitor className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {showThemeMenu && <ThemeSelector />}
              </div>

              <button 
                onClick={() => setCurrentPage('notifications')}
                className="p-2 rounded-2xl hover:bg-secondary/50 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>

              <button
                onClick={() => setCurrentPage('auth')}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                Entrar
              </button>

              <button
                onClick={() => setCurrentPage('profile')}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors"
              >
                <User className="w-full h-full p-2 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`${showMobileMenu ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
            <Card className="shadow-lg p-4">
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: Home, action: () => setCurrentPage('dashboard') },
                  { id: 'products', name: 'Produtos', icon: Package, action: () => setCurrentPage('products') },
                  { id: 'sales', name: 'Vendas', icon: TrendingUp, action: () => setActiveTab('sales') },
                  { id: 'reports', name: 'Relatórios', icon: BarChart3, action: () => setActiveTab('reports') },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all ${
                      (item.id === 'dashboard' && currentPage === 'dashboard') || activeTab === item.id
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                        : 'text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                ))}
                <div className="my-4 border-t border-border" />
                <button
                  onClick={() => {
                    setCurrentPage('assistant' as PageType);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all ${
                    currentPage === ('assistant' as PageType)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <Bot className="w-5 h-5 mr-3" />
                  Assistente IA
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('settings');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all text-foreground hover:bg-secondary/50"
                >
                  <SettingsIcon className="w-5 h-5 mr-3" />
                  Configurações
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('help');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all text-foreground hover:bg-secondary/50"
                >
                  <HelpCircle className="w-5 h-5 mr-3" />
                  Ajuda
                </button>
              </nav>
            </Card>
          </div>

          <div className="flex-1 min-w-0">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'sales' && <Dashboard />}
            {activeTab === 'reports' && <Dashboard />}
          </div>
        </div>
      </div>

      {showNewSaleModal && <NewSaleModal />}

      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowNewSaleModal(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
