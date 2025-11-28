import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Profile from '@/components/Profile';
import Settings from '@/components/Settings';
import ProductsList from '@/components/ProductsList';
import Notifications from '@/components/Notifications';
import Help from '@/components/Help';
import Auth from './Auth';
import Assistant from '@/components/Assistant';
import SalesPage from '@/components/SalesPage';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricsCards from '@/components/dashboard/MetricsCards';
import GoalProgress from '@/components/dashboard/GoalProgress';
import QuickActions from '@/components/dashboard/QuickActions';
import ChartsSection from '@/components/dashboard/ChartsSection';
import RecentSales from '@/components/dashboard/RecentSales';
import NewSaleModal from '@/components/dashboard/NewSaleModal';
import MobileMenu from '@/components/dashboard/MobileMenu';
import BottomNavigation from '@/components/dashboard/BottomNavigation';

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

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => 
    (localStorage.getItem('lucrofacil_theme') as 'light' | 'dark' | 'system') || 'light'
  );
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  
  const handleLogout = () => {
    logout();
    setCurrentPage('auth');
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

  const generateHistoricalSales = () => {
    const sales: Sale[] = [];
    let saleId = 1;
    
    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
      const date = new Date();
      date.setDate(date.getDate() - dayOffset);
      date.setHours(0, 0, 0, 0);
      
      const salesPerDay = Math.floor(Math.random() * 16) + 10;
      
      for (let i = 0; i < salesPerDay; i++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;
        const profit = quantity * (product.price - product.cost);
        
        const saleDate = new Date(date);
        saleDate.setHours(Math.floor(Math.random() * 12) + 8);
        saleDate.setMinutes(Math.floor(Math.random() * 60));
        
        sales.push({
          id: saleId++,
          productId: product.id,
          product: product.name,
          quantity,
          price: product.price,
          cost: product.cost,
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

  const prepareChartData = () => {
    const dailyData: { [key: string]: { date: string, revenue: number, profit: number, sales: number } } = {};
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      dailyData[dateKey] = { date: dateKey, revenue: 0, profit: 0, sales: 0 };
    }
    
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
    return <SalesPage theme={activeTheme} onClose={() => setCurrentPage('dashboard')} sales={sales} onDeleteSale={handleDeleteSale} />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="flex flex-1">
        {/* Sidebar visível apenas em desktop (md+) */}
        <div className="hidden md:block">
          <DashboardSidebar
            user={user}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            handleLogout={handleLogout}
            setShowMobileMenu={setShowMobileMenu}
          />
        </div>

        <main className="flex flex-1 flex-col bg-muted/30 w-full">
          <DashboardHeader setShowNewSaleModal={setShowNewSaleModal} />
          
          <div className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-6">
            <div className="space-y-4 md:space-y-6 lg:space-y-8 max-w-7xl mx-auto">
              <MetricsCards
                totalRevenue={totalRevenue}
                totalCosts={totalCosts}
                totalProfit={totalProfit}
                profitMargin={profitMargin}
                dailyProgress={dailyProgress}
                goals={goals}
              />

              <GoalProgress
                dailyProgress={dailyProgress}
                totalProfit={totalProfit}
                dailyGoal={goals.daily}
              />

              <QuickActions
                setShowNewSaleModal={setShowNewSaleModal}
                setCurrentPage={setCurrentPage}
              />

              <ChartsSection
                chartData={prepareChartData()}
                productsData={prepareProductsData()}
                isMobile={isMobile}
              />

              <RecentSales
                sales={sales}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>

      <MobileMenu
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      {showNewSaleModal && (
        <NewSaleModal
          products={products}
          newSale={newSale}
          setNewSale={setNewSale}
          addSale={addSale}
          setShowNewSaleModal={setShowNewSaleModal}
        />
      )}

      <BottomNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setShowNewSaleModal={setShowNewSaleModal}
      />
    </div>
  );
};

export default Dashboard;
