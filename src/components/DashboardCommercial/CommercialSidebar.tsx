import { 
  Package, TrendingUp, BarChart3, Bot, Bell, 
  Settings, HelpCircle, DollarSign, Target 
} from 'lucide-react';

interface CommercialSidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  notificationCount?: number;
  onPageChange?: (page: string) => void;
}

const CommercialSidebar = ({ 
  activeMenu, 
  onMenuChange, 
  notificationCount = 0,
  onPageChange
}: CommercialSidebarProps) => {
  const mainMenuItems = [
    { id: 'products', label: 'Produtos', icon: Package, page: 'products' },
    { id: 'sales', label: 'Vendas', icon: TrendingUp, page: 'sales' },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, page: 'dashboard' },
    { id: 'goals', label: 'Metas', icon: Target, page: 'goals' },
  ];

  const assistantItems = [
    { id: 'ai', label: 'Assistente IA', icon: Bot, page: 'assistant' },
    { id: 'notifications', label: 'Notificações', icon: Bell, badge: notificationCount, page: 'notifications' },
    { id: 'settings', label: 'Configurações', icon: Settings, page: 'settings' },
    { id: 'help', label: 'Ajuda', icon: HelpCircle, page: 'help' },
  ];
  
  const handleItemClick = (itemId: string, page: string) => {
    onMenuChange(itemId);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-blue-600 text-white flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">LucroFácil</span>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {mainMenuItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id, item.page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeMenu === item.id
                ? 'bg-blue-700 border-l-4 border-blue-300 shadow-lg'
                : 'hover:bg-blue-500 border-l-4 border-transparent'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Assistente IA */}
      <div className="px-3 py-4 border-t border-blue-500 space-y-1">
        <p className="px-4 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
          Assistente IA
        </p>
        {assistantItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id, item.page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
              activeMenu === item.id
                ? 'bg-blue-700 border-l-4 border-blue-300 shadow-lg'
                : 'hover:bg-blue-500 border-l-4 border-transparent'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="absolute right-3 top-2.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CommercialSidebar;
