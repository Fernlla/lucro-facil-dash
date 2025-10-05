import { Bell, CheckCheck, Trash2, TrendingUp, AlertCircle, Info, Star } from 'lucide-react';

interface NotificationsProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function Notifications({ theme, onClose }: NotificationsProps) {
  const isDark = theme === 'dark';

  const notifications = [
    { id: 1, type: 'success', icon: TrendingUp, title: 'Meta diária atingida!', message: 'Você alcançou sua meta de R$ 200,00 hoje', time: '10 min atrás', read: false },
    { id: 2, type: 'warning', icon: AlertCircle, title: 'Margem baixa detectada', message: 'O produto "Sorvete Baunilha" está com margem de apenas 15%', time: '1 hora atrás', read: false },
    { id: 3, type: 'info', icon: Info, title: 'Relatório semanal disponível', message: 'Seu relatório de vendas da semana está pronto', time: '2 horas atrás', read: true },
    { id: 4, type: 'success', icon: Star, title: 'Novo recorde de vendas!', message: 'Você bateu seu recorde de vendas em um único dia', time: 'Ontem', read: true },
    { id: 5, type: 'info', icon: Bell, title: 'Atualização disponível', message: 'Uma nova versão do LucroFácil está disponível', time: '2 dias atrás', read: true },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      success: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      warning: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      info: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
    };
    return colors[type as keyof typeof colors] || colors.info;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Notificações
            </h1>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              {notifications.filter(n => !n.read).length} não lidas
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                isDark 
                  ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <CheckCheck size={18} />
              Marcar todas como lidas
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                isDark 
                  ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              Voltar
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-2xl p-5 transition-all ${
                isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
              } ${!notification.read ? (isDark ? 'border-blue-500/50' : 'border-blue-300') : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(notification.type)}`}>
                  <notification.icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block" />
                      )}
                    </h3>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      {notification.time}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'} mb-3`}>
                    {notification.message}
                  </p>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                        isDark 
                          ? 'text-blue-400 hover:bg-slate-700' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}>
                        Marcar como lida
                      </button>
                    )}
                    <button className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                      isDark 
                        ? 'text-red-400 hover:bg-slate-700' 
                        : 'text-red-600 hover:bg-red-50'
                    }`}>
                      <Trash2 size={14} className="inline mr-1" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
