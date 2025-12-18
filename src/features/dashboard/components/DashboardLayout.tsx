import CommercialHeader from '@/components/DashboardCommercial/CommercialHeader';
import CommercialSidebar from '@/components/DashboardCommercial/CommercialSidebar';
import RecentSalesList from '@/components/DashboardCommercial/RecentSalesList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <div className="flex h-screen bg-dashboardBg-light dark:bg-dashboardBg-dark overflow-hidden">
      {/* Sidebar */}
      <CommercialSidebar
        activeMenu={activeTab}
        onMenuChange={setActiveTab}
        notificationCount={0}
        onPageChange={(page) => setCurrentPage(page as PageType)}
      />

      {/* Main Content */}
      <div className="flex-1 ml-60 overflow-auto">
        <CommercialHeader onNewSale={() => setShowNewSaleModal(true)} />
          
        <div className="p-3 md:p-4 lg:p-6 pb-20 md:pb-4">
          <div className="space-y-4 md:space-y-5 max-w-7xl mx-auto">
            
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
            <RecentSalesList
              sales={sales.slice(0, 7).map(s => ({
                ...s,
                productName: s.product
              }))}
              onViewAll={() => setCurrentPage('sales')}
            />
          </div>
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
                  value={newSale.productId} 
                  onValueChange={(value) => setNewSale({ ...newSale, productId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
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
                  value={newSale.quantity}
                  onChange={(e) => setNewSale({ ...newSale, quantity: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customPrice">Preço Customizado (opcional)</Label>
                <Input
                  id="customPrice"
                  type="number"
                  step="0.01"
                  placeholder="Deixe vazio para usar preço padrão"
                  value={newSale.customPrice}
                  onChange={(e) => setNewSale({ ...newSale, customPrice: e.target.value })}
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
    </div>
  );
}
