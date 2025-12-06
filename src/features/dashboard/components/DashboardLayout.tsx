import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import MobileMenu from '@/components/dashboard/MobileMenu';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import NewSaleModal from '@/components/dashboard/NewSaleModal';
import RecentSales from '@/components/dashboard/RecentSales';
import DashboardOverview from './DashboardOverview';
import DashboardAnalytics from './DashboardAnalytics';
import { PageType, Product, Sale, NewSale } from '../types';
import { 
  prepareChartData, 
  prepareProductsData, 
  prepareDailyProfitData,
  prepareMonthlyCashFlow,
  preparePeakHoursData
} from '../utils/chartDataHelpers';

interface DashboardLayoutProps {
  // User & Navigation
  user: { email?: string; id?: string } | null;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  
  // Data
  products: Product[];
  sales: Sale[];
  newSale: NewSale;
  setNewSale: (sale: NewSale) => void;
  addSale: () => boolean;
  
  // Metrics
  metrics: {
    totalRevenue: number;
    totalCosts: number;
    totalProfit: number;
    profitMargin: number;
    dailyProgress: number;
  };
  dailyGoal: number;
  
  // UI State
  isMobile: boolean;
  showNewSaleModal: boolean;
  setShowNewSaleModal: (show: boolean) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

/**
 * Layout principal do Dashboard
 * Orquestra todos os componentes e seções
 */
export default function DashboardLayout({
  user,
  currentPage,
  setCurrentPage,
  activeTab,
  setActiveTab,
  handleLogout,
  products,
  sales,
  newSale,
  setNewSale,
  addSale,
  metrics,
  dailyGoal,
  isMobile,
  showNewSaleModal,
  setShowNewSaleModal,
  showMobileMenu,
  setShowMobileMenu
}: DashboardLayoutProps) {
  
  // Prepara dados dos gráficos
  const chartData = prepareChartData(sales);
  const productsData = prepareProductsData(sales);
  const dailyProfitData = prepareDailyProfitData(sales);
  const cashFlowData = prepareMonthlyCashFlow();
  const peakHoursData = preparePeakHoursData();

  const handleAddSale = () => {
    const success = addSale();
    if (success) {
      setShowNewSaleModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="flex flex-1">
        {/* Sidebar Desktop */}
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

        {/* Main Content */}
        <main className="flex flex-1 flex-col bg-muted/30 w-full">
          <DashboardHeader setShowNewSaleModal={setShowNewSaleModal} />
          
          <div className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-6">
            <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
              
              {/* Seção 1: Overview (Métricas + Meta + Ações) */}
              <DashboardOverview
                totalRevenue={metrics.totalRevenue}
                totalCosts={metrics.totalCosts}
                totalProfit={metrics.totalProfit}
                profitMargin={metrics.profitMargin}
                dailyProgress={metrics.dailyProgress}
                dailyGoal={dailyGoal}
                setShowNewSaleModal={setShowNewSaleModal}
                setCurrentPage={setCurrentPage}
              />

              {/* Seção 2: Analytics (Todos os Gráficos) */}
              <DashboardAnalytics
                chartData={chartData}
                productsData={productsData}
                dailyProfitData={dailyProfitData}
                cashFlowData={cashFlowData}
                peakHoursData={peakHoursData}
                isMobile={isMobile}
              />

              {/* Seção 3: Vendas Recentes */}
              <RecentSales
                sales={sales}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Components */}
      <MobileMenu
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      <BottomNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setShowNewSaleModal={setShowNewSaleModal}
      />

      {/* Modals */}
      {showNewSaleModal && (
        <NewSaleModal
          products={products}
          newSale={newSale}
          setNewSale={setNewSale}
          addSale={handleAddSale}
          setShowNewSaleModal={setShowNewSaleModal}
        />
      )}
    </div>
  );
}
