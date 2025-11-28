import { Home, Package, TrendingUp, User, Menu } from 'lucide-react';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface MobileBottomNavProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  setShowMobileMenu: (show: boolean) => void;
}

const MobileBottomNav = ({ currentPage, setCurrentPage, setShowMobileMenu }: MobileBottomNavProps) => {
  const navItems = [
    { id: 'dashboard' as PageType, icon: Home, label: 'Início' },
    { id: 'products' as PageType, icon: Package, label: 'Produtos' },
    { id: 'sales' as PageType, icon: TrendingUp, label: 'Vendas' },
    { id: 'profile' as PageType, icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-lg z-40 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 ${
              currentPage === item.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => setShowMobileMenu(true)}
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs font-medium">Menu</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
