import { DollarSign, Home, Package, TrendingUp, BarChart3, Bot, Bell, Settings as SettingsIcon, HelpCircle, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSidebar, AnimatedSidebarBody, AnimatedSidebarLink } from '@/components/ui/animated-sidebar';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface DashboardSidebarProps {
  user: any;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
  handleLogout: () => void;
  setShowMobileMenu: (show: boolean) => void;
}

export default function DashboardSidebar({
  user,
  currentPage,
  setCurrentPage,
  setActiveTab,
  activeTab,
  handleLogout,
  setShowMobileMenu
}: DashboardSidebarProps) {
  return (
    <AnimatedSidebar animate={true}>
      <AnimatedSidebarBody className="justify-between gap-6">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-primary to-accent w-7 h-7 rounded-lg flex items-center justify-center shadow-sm">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <motion.span 
              className="font-bold text-sm text-foreground whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              LucroFácil
            </motion.span>
          </div>
          
          {/* Menu items principais */}
          <div className="flex flex-col gap-1.5">
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
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex flex-col gap-1.5">
              <AnimatedSidebarLink
                link={{
                  label: 'Assistente IA',
                  icon: <Bot className="h-5 w-5 text-foreground flex-shrink-0" />,
                  onClick: () => {
                    setCurrentPage('assistant');
                    setShowMobileMenu(false);
                  }
                }}
                className={(currentPage as PageType) === 'assistant' ? 'bg-accent text-accent-foreground' : ''}
              />
              <AnimatedSidebarLink
                link={{
                  label: 'Notificações',
                  icon: (
                    <div className="relative">
                      <Bell className="h-5 w-5 text-foreground flex-shrink-0" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
                    </div>
                  ),
                  onClick: () => {
                    setCurrentPage('notifications');
                    setShowMobileMenu(false);
                  }
                }}
                className={(currentPage as PageType) === 'notifications' ? 'bg-accent text-accent-foreground' : ''}
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
                className={(currentPage as PageType) === 'settings' ? 'bg-accent text-accent-foreground' : ''}
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
                className={(currentPage as PageType) === 'help' ? 'bg-accent text-accent-foreground' : ''}
              />
            </div>
          </div>
        </div>
        
        {/* Parte inferior: Perfil e Sair */}
        <div className="border-t border-border pt-2">
          <div className="flex flex-col gap-1.5">
            <AnimatedSidebarLink
              link={{
                label: user?.name || 'Perfil',
                icon: user?.avatar ? (
                  <img src={user.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" alt="Avatar" />
                ) : (
                  <User className="h-5 w-5 text-foreground flex-shrink-0" />
                ),
                onClick: () => {
                  setCurrentPage('profile');
                  setShowMobileMenu(false);
                }
              }}
              className={(currentPage as PageType) === 'profile' ? 'bg-accent text-accent-foreground' : ''}
            />
            <AnimatedSidebarLink
              link={{
                label: 'Sair',
                icon: <LogOut className="h-5 w-5 text-destructive flex-shrink-0" />,
                onClick: handleLogout
              }}
              className="text-destructive hover:bg-destructive/10"
            />
          </div>
        </div>
      </AnimatedSidebarBody>
    </AnimatedSidebar>
  );
}
