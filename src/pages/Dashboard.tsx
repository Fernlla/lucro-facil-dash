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
import { DashboardLayout, useDashboardData, PageType } from '@/features/dashboard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  // Dashboard data hook (gerencia produtos, vendas, métricas)
  const dashboardData = useDashboardData();
  
  // UI State
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  
  // Theme management
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => 
    (localStorage.getItem('lucrofacil_theme') as 'light' | 'dark' | 'system') || 'light'
  );
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  
  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handlers
  const handleLogout = () => {
    logout();
    setCurrentPage('auth');
  };

  const handleDeleteSale = (id: number) => {
    dashboardData.deleteSale(id);
  };

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

  // Render Dashboard Layout
  return (
    <DashboardLayout
      user={user}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      products={dashboardData.products}
      sales={dashboardData.sales}
      newSale={dashboardData.newSale}
      setNewSale={dashboardData.setNewSale}
      addSale={dashboardData.addSale}
      metrics={dashboardData.metrics}
      dailyGoal={dashboardData.goals.daily}
      isMobile={isMobile}
      showNewSaleModal={showNewSaleModal}
      setShowNewSaleModal={setShowNewSaleModal}
      showMobileMenu={showMobileMenu}
      setShowMobileMenu={setShowMobileMenu}
    />
  );
};

export default Dashboard;
