import { Home, Package, TrendingUp, BarChart3, Bot, X, DollarSign } from 'lucide-react';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface MobileMenuProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

export default function MobileMenu({
  showMobileMenu,
  setShowMobileMenu,
  currentPage,
  setCurrentPage,
  setActiveTab,
  activeTab
}: MobileMenuProps) {
  if (!showMobileMenu) return null;

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, action: () => setCurrentPage('dashboard') },
    { id: 'products', name: 'Produtos', icon: Package, action: () => setCurrentPage('products') },
    { id: 'sales', name: 'Vendas', icon: TrendingUp, action: () => setCurrentPage('sales') },
    { id: 'reports', name: 'Relatórios', icon: BarChart3, action: () => setActiveTab('reports') },
  ];

  return (
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
          {menuItems.map((item) => (
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
              (currentPage as PageType) === 'assistant'
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
  );
}
