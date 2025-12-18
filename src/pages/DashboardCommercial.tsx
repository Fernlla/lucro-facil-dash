import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Profile from '@/components/Profile';
import Settings from '@/components/Settings';
import ProductsList from '@/components/ProductsList';
import Notifications from '@/components/Notifications';
import Help from '@/components/Help';
import Assistant from '@/components/Assistant';
import SalesPage from '@/components/SalesPage';
import GoalsPage from '@/components/GoalsPage';
import Auth from './Auth';
import CommercialSidebar from '@/components/DashboardCommercial/CommercialSidebar';
import CommercialHeader from '@/components/DashboardCommercial/CommercialHeader';
import MetricCard from '@/components/DashboardCommercial/MetricCard';
import DailyGoalCard from '@/components/DashboardCommercial/DailyGoalCard';
import TabNavigation from '@/components/DashboardCommercial/TabNavigation';
import RecentSalesList from '@/components/DashboardCommercial/RecentSalesList';
import RevenueChart from '@/components/DashboardCommercial/Charts/RevenueChart';
import TopProductsChart from '@/components/DashboardCommercial/Charts/TopProductsChart';
import DailyProfitChart from '@/components/DashboardCommercial/Charts/DailyProfitChart';
import PeakHoursChart from '@/components/DashboardCommercial/Charts/PeakHoursChart';
import CashFlowChart from '@/components/DashboardCommercial/Charts/CashFlowChart';
import { generateLast7DaysSales, dailyGoal } from '@/data/mockCommercialData';
import { useDashboardData } from '@/features/dashboard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales' | 'goals';

const DashboardCommercial = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Dashboard data hook (gerencia produtos, vendas, métricas)
  const dashboardData = useDashboardData();
  
  // UI State
  const [activeMenu, setActiveMenu] = useState('sales');
  const [activeTab, setActiveTab] = useState('report');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  
  // Theme management
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => 
    (localStorage.getItem('lucrofacil_theme') as 'light' | 'dark' | 'system') || 'light'
  );
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Theme effect
  useEffect(() => {
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

  // Gerar dados mockados para gráficos comerciais
  const commercialSales = generateLast7DaysSales();

  // Calcular métricas usando dados reais
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  
  const todaySales = commercialSales.filter(s => s.date >= yesterday);
  const totalRevenue = todaySales.reduce((sum, s) => sum + s.price, 0);
  const totalProfit = todaySales.reduce((sum, s) => sum + s.profit, 0);
  const totalCosts = totalRevenue - totalProfit;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  // Calcular métricas do dia anterior para comparação
  const twoDaysAgo = new Date(today.getTime() - 48 * 60 * 60 * 1000);
  const yesterdaySales = commercialSales.filter(s => s.date >= twoDaysAgo && s.date < yesterday);
  const yesterdayRevenue = yesterdaySales.reduce((sum, s) => sum + s.price, 0);
  const yesterdayCosts = yesterdaySales.reduce((sum, s) => sum + s.price - s.profit, 0);
  
  const revenueChange = yesterdayRevenue > 0 ? ((totalRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0;
  const costsChange = yesterdayCosts > 0 ? ((totalCosts - yesterdayCosts) / yesterdayCosts) * 100 : 0;

  const handleNewSale = () => {
    setShowNewSaleModal(true);
  };
  
  const handleAddSale = () => {
    const success = dashboardData.addSale();
    if (success) {
      setShowNewSaleModal(false);
      toast({
        title: "Venda registrada!",
        description: "A venda foi adicionada com sucesso.",
      });
    }
  };

  const handleViewAllSales = () => {
    setCurrentPage('sales');
  };
  
  const handleDeleteSale = (id: number) => {
    dashboardData.deleteSale(id);
    toast({
      title: "Venda excluída",
      description: "A venda foi removida com sucesso.",
    });
  };
  
  const handleLogout = () => {
    logout();
    setCurrentPage('auth');
  };
  
  // Renderização condicional de páginas
  if (currentPage === 'profile') {
    return <Profile theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'settings') {
    return <Settings theme={activeTheme} onClose={() => setCurrentPage('dashboard')} onThemeChange={setTheme} currentTheme={theme} />;
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
    return (
      <SalesPage 
        theme={activeTheme} 
        onClose={() => setCurrentPage('dashboard')} 
        sales={dashboardData.sales} 
        onDeleteSale={handleDeleteSale} 
      />
    );
  }

  if (currentPage === 'goals') {
    return <GoalsPage theme={activeTheme} onClose={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="flex h-screen bg-dashboardBg-light dark:bg-dashboardBg-dark overflow-hidden">
      {/* Sidebar */}
      <CommercialSidebar
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        notificationCount={3}
        onPageChange={(page) => setCurrentPage(page as PageType)}
      />

      {/* Main Content */}
      <div className="flex-1 ml-60 overflow-auto">
        <CommercialHeader onNewSale={handleNewSale} />

        <main className="p-6 lg:p-8 space-y-6">
          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Faturamento"
              value={totalRevenue}
              icon="revenue"
              indicator={{ 
                value: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(0)}%`, 
                type: revenueChange >= 0 ? "positive" : "negative", 
                label: "vs ontem" 
              }}
            />
            <MetricCard
              title="Custos"
              value={totalCosts}
              icon="costs"
              indicator={{ 
                value: `${costsChange >= 0 ? '+' : ''}${costsChange.toFixed(0)}%`, 
                type: costsChange <= 0 ? "positive" : "negative", 
                label: "vs ontem" 
              }}
            />
            <MetricCard
              title="Lucro Líquido"
              value={totalProfit}
              icon="profit"
              indicator={{ 
                value: `Margem de ${profitMargin.toFixed(1)}%`, 
                type: "neutral" 
              }}
            />
            <MetricCard
              title="Meta Diária"
              value={`${dailyGoal.percentage.toFixed(0)}%`}
              icon="goal"
              indicator={{ 
                value: `R$ ${dailyGoal.current.toFixed(2)} de R$ ${dailyGoal.target.toFixed(2)}`, 
                type: "neutral" 
              }}
            />
          </div>

          {/* Meta Diária Destaque */}
          <DailyGoalCard
            target={dailyGoal.target}
            current={dailyGoal.current}
            percentage={dailyGoal.percentage}
          />

          {/* Navegação por Abas */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Grid de Gráficos - Primeira Linha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart sales={commercialSales} isMobile={isMobile} />
            <TopProductsChart sales={commercialSales} isMobile={isMobile} />
          </div>

          {/* Grid de Gráficos - Segunda Linha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyProfitChart sales={commercialSales} isMobile={isMobile} />
            <PeakHoursChart isMobile={isMobile} />
          </div>

          {/* Fluxo de Caixa - Largura Total */}
          <CashFlowChart isMobile={isMobile} />

          {/* Vendas Recentes */}
          <RecentSalesList
            sales={commercialSales}
            onViewAll={handleViewAllSales}
          />
        </main>
      </div>
      
      {/* Modal de Nova Venda */}
      <Dialog open={showNewSaleModal} onOpenChange={setShowNewSaleModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova Venda</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product">Produto</Label>
              <Select 
                value={dashboardData.newSale.productId} 
                onValueChange={(value) => dashboardData.setNewSale({ ...dashboardData.newSale, productId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {dashboardData.products.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} - R$ {product.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={dashboardData.newSale.quantity}
                onChange={(e) => dashboardData.setNewSale({ ...dashboardData.newSale, quantity: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customPrice">Preço Customizado (opcional)</Label>
              <Input
                id="customPrice"
                type="number"
                step="0.01"
                placeholder="Deixe vazio para usar preço padrão"
                value={dashboardData.newSale.customPrice}
                onChange={(e) => dashboardData.setNewSale({ ...dashboardData.newSale, customPrice: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewSaleModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddSale}>
              Registrar Venda
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardCommercial;
