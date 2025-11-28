import { X, Home, Package, TrendingUp, BarChart3, Bot, Bell, Settings as SettingsIcon, HelpCircle, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type PageType = 'dashboard' | 'profile' | 'settings' | 'products' | 'notifications' | 'help' | 'auth' | 'assistant' | 'sales';

interface MobileDrawerProps {
  user: any;
  isOpen: boolean;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  onClose: () => void;
  handleLogout: () => void;
}

const MobileDrawer = ({ user, isOpen, currentPage, setCurrentPage, onClose, handleLogout }: MobileDrawerProps) => {
  const menuItems = [
    { id: 'dashboard' as PageType, icon: Home, label: 'Dashboard' },
    { id: 'products' as PageType, icon: Package, label: 'Produtos' },
    { id: 'sales' as PageType, icon: TrendingUp, label: 'Vendas' },
    { id: 'reports' as PageType, icon: BarChart3, label: 'Relatórios' },
  ];

  const toolItems = [
    { id: 'assistant' as PageType, icon: Bot, label: 'Assistente IA' },
    { id: 'notifications' as PageType, icon: Bell, label: 'Notificações' },
    { id: 'help' as PageType, icon: HelpCircle, label: 'Ajuda' },
  ];

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-card border-r-2 border-border shadow-2xl z-50 md:hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{user?.email?.split('@')[0] || 'Usuário'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-1">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Menu Principal
                </p>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted active:scale-[0.98]'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-1">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ferramentas
                </p>
                {toolItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted active:scale-[0.98]'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border space-y-2">
              <button
                onClick={() => handleNavigation('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'settings'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted active:scale-[0.98]'
                }`}
              >
                <SettingsIcon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">Configurações</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors active:scale-[0.98]"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
