import { useState, useEffect } from 'react';
import { 
  Plus, TrendingUp, DollarSign, Package, Bell, BarChart3, 
  Home, Moon, Sun, Monitor, ChevronRight, 
  ArrowUp, ArrowDown, Target,
  ShoppingBag, Download, X, Check, Menu, User, HelpCircle, Settings as SettingsIcon, Bot, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AnimatedSidebar, AnimatedSidebarBody, AnimatedSidebarLink } from '@/components/ui/animated-sidebar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Profile from '@/components/Profile';
import Settings from '@/components/Settings';
import ProductsList from '@/components/ProductsList';
import Notifications from '@/components/Notifications';
import Help from '@/components/Help';
import Auth from './Auth';
import Assistant from '@/components/Assistant';
import SalesPage from '@/components/SalesPage';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, isAuthenticated, logout } = useAuth();
  
  // Detectar se é mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Carregar tema do localStorage
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const savedTheme = localStorage.getItem('lucrofacil_theme');
    return (savedTheme as 'light' | 'dark' | 'system') || 'light';
  });
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  
  const handleLogout = () => {
    logout();
    setCurrentPage('auth');
    setShowUserMenu(false);
  };

  const handleDeleteSale = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
  };

  const [products] = useState<Product[]>([
    { id: 1, name: 'Sorvete Chocolate', cost: 2.50, price: 5.00, category: 'Sorvetes', active: true },
    { id: 2, name: 'Sorvete Morango', cost: 2.30, price: 5.00, category: 'Sorvetes', active: true },
    { id: 3, name: 'Picolé Frutas', cost: 1.80, price: 3.50, category: 'Picolés', active: true },
    { id: 4, name: 'Sorvete Baunilha', cost: 2.40, price: 5.00, category: 'Sorvetes', active: true },
    { id: 5, name: 'Picolé Chocolate', cost: 1.90, price: 3.50, category: 'Picolés', active: true },
    { id: 6, name: 'Sorvete Creme', cost: 2.60, price: 5.50, category: 'Sorvetes', active: true },
    { id: 7, name: 'Picolé Morango', cost: 1.70, price: 3.50, category: 'Picolés', active: true },
    { id: 8, name: 'Açaí 300ml', cost: 4.50, price: 10.00, category: 'Açaí', active: true },
    { id: 9, name: 'Açaí 500ml', cost: 7.00, price: 15.00, category: 'Açaí', active: true },
    { id: 10, name: 'Milk-shake Chocolate', cost: 3.50, price: 8.00, category: 'Bebidas', active: true },
  ]);

  // Gerar vendas dos últimos 7 dias
  const generateHistoricalSales = () => {
    const sales: Sale[] = [];
    const today = new Date();
    let saleId = 1;
    
    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
      const date = new Date(today);
      date.setDate(date.getDate() - dayOffset);
      date.setHours(0, 0, 0, 0);
      
      // Vendas aleatórias por dia (entre 10-25 vendas)
      const salesPerDay = Math.floor(Math.random() * 16) + 10;
      
      for (let i = 0; i < salesPerDay; i++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;
        const salePrice = randomProduct.price;
        const profit = quantity * (salePrice - randomProduct.cost);
        
        const saleDate = new Date(date);
        saleDate.setHours(Math.floor(Math.random() * 12) + 8); // Entre 8h e 20h
        saleDate.setMinutes(Math.floor(Math.random() * 60));
        
        sales.push({
          id: saleId++,
          productId: randomProduct.id,
          product: randomProduct.name,
          quantity,
          price: salePrice,
          cost: randomProduct.cost,
          date: saleDate,
          profit
        });
      }
    }
    
    return sales.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const [sales, setSales] = useState<Sale[]>(generateHistoricalSales());

  const [goals] = useState({ daily: 100, monthly: 3000 });
  const [newSale, setNewSale] = useState<NewSale>({ productId: '', quantity: 1, customPrice: '' });

  useEffect(() => {
    // Salvar tema no localStorage
    localStorage.setItem('lucrofacil_theme', theme);
    
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

  const ThemeSelector = () => (
    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-popover border border-border overflow-hidden z-50">
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
          className={`w-full px-4 py-3 flex items-center justify-between hover:bg-accent hover:text-accent-foreground transition-colors ${
            theme === value ? 'bg-accent text-accent-foreground' : ''
          }`}
        >
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-3" />
            <span className="text-sm">{label}</span>
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

  // Preparar dados para gráficos
  const prepareChartData = () => {
    const dailyData: { [key: string]: { date: string, revenue: number, profit: number, sales: number } } = {};
    const today = new Date();
    
    // Inicializar últimos 7 dias
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      dailyData[dateKey] = { date: dateKey, revenue: 0, profit: 0, sales: 0 };
    }
    
    // Agrupar vendas por dia
    sales.forEach(sale => {
      const dateKey = sale.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (dailyData[dateKey]) {
        dailyData[dateKey].revenue += sale.quantity * sale.price;
        dailyData[dateKey].profit += sale.profit;
        dailyData[dateKey].sales += sale.quantity;
      }
    });
    
    return Object.values(dailyData);
  };
  
  const prepareProductsData = () => {
    const productSales: { [key: string]: { name: string, quantity: number, revenue: number } } = {};
    
    sales.forEach(sale => {
      if (!productSales[sale.product]) {
        productSales[sale.product] = { name: sale.product, quantity: 0, revenue: 0 };
      }
      productSales[sale.product].quantity += sale.quantity;
      productSales[sale.product].revenue += sale.quantity * sale.price;
    });
    
    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  const Dashboard = () => (
    <div className="space-y-6 md:space-y-8">
      {/* Cards de métricas modernos */}
      {/* Mobile: Scroll horizontal */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-3 px-3">
        <Card className="relative overflow-hidden border-2 shadow-md min-w-[280px] snap-center">
          <div className="flex h-28 flex-col justify-between p-5">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Faturamento</p>
              <div className="h-4 w-4 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-green-600">+15%</span> vs ontem
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border-2 shadow-md min-w-[280px] snap-center">
          <div className="flex h-28 flex-col justify-between p-5">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Custos</p>
              <div className="h-4 w-4 text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$ {totalCosts.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowDown className="mr-1 h-3 w-3 text-red-600" />
                <span className="text-red-600">-8%</span> vs ontem
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 pointer-events-none" />
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border-2 shadow-md min-w-[280px] snap-center">
          <div className="flex h-28 flex-col justify-between p-5">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Lucro Líquido</p>
              <div className="h-4 w-4 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$ {totalProfit.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Margem de {profitMargin.toFixed(1)}%
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none" />
          </div>
        </Card>
        
        <Card className="relative overflow-hidden border-2 shadow-md min-w-[280px] snap-center">
          <div className="flex h-28 flex-col justify-between p-5">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Meta Diária</p>
              <div className="h-4 w-4 text-muted-foreground">
                <Target className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{dailyProgress.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                R$ {totalProfit.toFixed(2)} de R$ {goals.daily.toFixed(2)}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 pointer-events-none" />
          </div>
        </Card>
      </div>
      
      {/* Desktop: Grid normal */}
      <div className="hidden md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex h-32 flex-col justify-between p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Faturamento</p>
              <div className="h-4 w-4 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-green-600">+15%</span> vs ontem
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex h-32 flex-col justify-between p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Custos</p>
              <div className="h-4 w-4 text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$ {totalCosts.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowDown className="mr-1 h-3 w-3 text-red-600" />
                <span className="text-red-600">-8%</span> vs ontem
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 pointer-events-none" />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex h-32 flex-col justify-between p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Lucro Líquido</p>
              <div className="h-4 w-4 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">R$ {totalProfit.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Margem de {profitMargin.toFixed(1)}%
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none" />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-2 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex h-32 flex-col justify-between p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Meta Diária</p>
              <div className="h-4 w-4 text-muted-foreground">
                <Target className="h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">{dailyProgress.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                R$ {totalProfit.toFixed(2)} de R$ {goals.daily.toFixed(2)}
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 pointer-events-none" />
          </div>
        </Card>
      </div>

      {/* Barra de progresso da meta */}
      <Card className="border-2 shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Progresso da Meta Diária</h3>
            {dailyProgress >= 100 && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                🎉 Meta batida!
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>R$ {totalProfit.toFixed(2)}</span>
              <span>R$ {goals.daily.toFixed(2)}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(dailyProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Grid de ações rápidas */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button 
          onClick={() => setShowNewSaleModal(true)}
          variant="outline"
          className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors border-2 shadow-md hover:shadow-lg"
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm font-medium">Nova Venda</span>
        </Button>

        <Button 
          variant="outline" 
          className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors border-2 shadow-md hover:shadow-lg"
        >
          <Download className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm font-medium">Relatório</span>
        </Button>

        <Button 
          onClick={() => setCurrentPage('products')}
          variant="outline" 
          className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors border-2 shadow-md hover:shadow-lg"
        >
          <Package className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm font-medium">Produtos</span>
        </Button>

        <Button 
          onClick={() => setCurrentPage('sales')}
          variant="outline" 
          className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 hover:bg-primary hover:text-primary-foreground transition-colors border-2 shadow-md hover:shadow-lg"
        >
          <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm font-medium">Ver Vendas</span>
        </Button>
      </div>

      {/* Gráficos */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <Card className="border-2 shadow-md">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold">Faturamento e Lucro (7 dias)</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Evolução diária do seu negócio</p>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={isMobile ? 240 : 300}>
              <LineChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(215 90% 55%)" 
                  strokeWidth={2}
                  name="Faturamento"
                  dot={{ fill: 'hsl(215 90% 55%)', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="hsl(145 70% 50%)" 
                  strokeWidth={2}
                  name="Lucro"
                  dot={{ fill: 'hsl(145 70% 50%)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-2 shadow-md">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-base md:text-lg font-semibold">Top 5 Produtos</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Mais vendidos do período</p>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={isMobile ? 240 : 300}>
              <BarChart data={prepareProductsData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    name === 'quantity' ? `${value} un` : `R$ ${value.toFixed(2)}`,
                    name === 'quantity' ? 'Quantidade' : 'Faturamento'
                  ]}
                />
                <Legend />
                <Bar 
                  dataKey="quantity" 
                  fill="hsl(215 90% 55%)" 
                  name="Quantidade"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Vendas recentes */}
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

  if (currentPage === 'sales') {
    return <SalesPage theme={activeTheme} onClose={() => setCurrentPage('dashboard')} sales={sales} onDeleteSale={handleDeleteSale} />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Header moderno */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-card shadow-sm">
        <div className="flex h-16 items-center px-4 lg:px-6">
          <div className="mr-4 hidden md:flex">
            <div className="bg-gradient-to-r from-primary to-accent w-8 h-8 rounded-lg flex items-center justify-center mr-3 shadow-sm">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="hidden font-bold sm:inline-block">LucroFácil</span>
          </div>
          
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none md:hidden">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <Menu className="h-4 w-4" />
                  <span className="ml-2">Menu</span>
                </button>
              </div>
            </div>
            
            <nav className="flex items-center space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                >
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : theme === 'light' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                </button>
                {showThemeMenu && <ThemeSelector />}
              </div>

              <button 
                onClick={() => setCurrentPage('notifications')}
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-popover border border-border overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium">{user?.name || 'Usuário'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                      <User className="h-4 w-4" />
                      <span className="text-sm">Meu Perfil</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage('settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                      <SettingsIcon className="h-4 w-4" />
                      <span className="text-sm">Configurações</span>
                    </button>
                    <div className="border-t border-border">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-destructive/10 hover:text-destructive transition-colors text-left text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Sair</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar animada */}
        <AnimatedSidebar animate={true}>
          <AnimatedSidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-8">
                <div className="bg-gradient-to-r from-primary to-accent w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-foreground whitespace-nowrap">LucroFácil</span>
              </div>
              
              {/* Links principais */}
              <div className="flex flex-col gap-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5 text-foreground flex-shrink-0" />, action: () => setCurrentPage('dashboard') },
                  { id: 'products', label: 'Produtos', icon: <Package className="h-5 w-5 text-foreground flex-shrink-0" />, action: () => setCurrentPage('products') },
                  { id: 'sales', label: 'Vendas', icon: <TrendingUp className="h-5 w-5 text-foreground flex-shrink-0" />, action: () => setCurrentPage('sales') },
                  { id: 'reports', label: 'Relatórios', icon: <BarChart3 className="h-5 w-5 text-foreground flex-shrink-0" />, action: () => setActiveTab('reports') },
                ].map((item) => (
                  <AnimatedSidebarLink
                    key={item.id}
                    link={{
                      label: item.label,
                      icon: item.icon,
                      onClick: () => {
                        item.action();
                        setShowMobileMenu(false);
                      }
                    }}
                    className={currentPage === item.id || (item.id === 'dashboard' && currentPage === 'dashboard') || activeTab === item.id
                      ? 'bg-accent text-accent-foreground' 
                      : ''}
                  />
                ))}
              </div>
              
              {/* Ferramentas */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ferramentas
                </p>
                <div className="flex flex-col gap-2">
                  <AnimatedSidebarLink
                    link={{
                      label: 'Assistente IA',
                      icon: <Bot className="h-5 w-5 text-foreground flex-shrink-0" />,
                      onClick: () => {
                        setCurrentPage('assistant' as PageType);
                        setShowMobileMenu(false);
                      }
                    }}
                    className={currentPage === 'assistant' ? 'bg-accent text-accent-foreground' : ''}
                  />
                  <AnimatedSidebarLink
                    link={{
                      label: 'Configurações',
                      icon: <SettingsIcon className="h-5 w-5 text-foreground flex-shrink-0" />,
                      onClick: () => {
                        setCurrentPage('settings');
                        setShowMobileMenu(false);
                      }
                    }}
                  />
                  <AnimatedSidebarLink
                    link={{
                      label: 'Ajuda',
                      icon: <HelpCircle className="h-5 w-5 text-foreground flex-shrink-0" />,
                      onClick: () => {
                        setCurrentPage('help');
                        setShowMobileMenu(false);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* User profile at bottom */}
            <div>
              <AnimatedSidebarLink
                link={{
                  label: user?.name || 'Usuário',
                  icon: user?.avatar ? (
                    <img src={user.avatar} className="h-7 w-7 flex-shrink-0 rounded-full" alt="Avatar" />
                  ) : (
                    <User className="h-5 w-5 text-foreground flex-shrink-0" />
                  ),
                  onClick: () => setCurrentPage('profile')
                }}
              />
            </div>
          </AnimatedSidebarBody>
        </AnimatedSidebar>

        {/* Conteúdo principal */}
        <main className="flex flex-1 flex-col bg-muted/30">
          <div className="bg-card border-b-2 border-border px-4 lg:px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Acompanhe suas métricas e performance em tempo real
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowNewSaleModal(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Venda
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-3 md:p-4 lg:p-6 pb-20 md:pb-4">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'sales' && <Dashboard />}
            {activeTab === 'reports' && <Dashboard />}
          </div>
        </main>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border/40 p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary to-accent w-8 h-8 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">LucroFácil</span>
              </div>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-md hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: Home, action: () => setCurrentPage('dashboard') },
                { id: 'products', name: 'Produtos', icon: Package, action: () => setCurrentPage('products') },
                { id: 'sales', name: 'Vendas', icon: TrendingUp, action: () => setCurrentPage('sales') },
                { id: 'reports', name: 'Relatórios', icon: BarChart3, action: () => setActiveTab('reports') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setShowMobileMenu(false);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all hover:bg-accent hover:text-accent-foreground w-full ${
                    currentPage === item.id || (item.id === 'dashboard' && currentPage === 'dashboard') || activeTab === item.id
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
              ))}
              
              <div className="my-4 border-t border-border" />
              
              <button
                onClick={() => {
                  setCurrentPage('assistant' as PageType);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all hover:bg-accent hover:text-accent-foreground w-full ${
                  currentPage === ('assistant' as PageType)
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-muted-foreground'
                }`}
              >
                <Bot className="h-4 w-4" />
                Assistente IA
              </button>
            </nav>
          </div>
        </div>
      )}

      {showNewSaleModal && <NewSaleModal />}

      {/* Bottom Navigation - Mobile Only */}
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
              currentPage === 'products'
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
              currentPage === 'sales'
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
              currentPage === 'assistant'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Bot className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">IA</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
