import { Bell, Lock, Globe, CreditCard, Shield, Database, Trash2, Download } from 'lucide-react';

interface SettingsProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function Settings({ theme, onClose }: SettingsProps) {
  const isDark = theme === 'dark';

  const sections = [
    {
      title: 'Notificações',
      icon: Bell,
      items: [
        { label: 'Notificações push', enabled: true },
        { label: 'Notificações por e-mail', enabled: true },
        { label: 'Alertas de metas', enabled: true },
        { label: 'Relatórios semanais', enabled: false }
      ]
    },
    {
      title: 'Privacidade e Segurança',
      icon: Shield,
      items: [
        { label: 'Autenticação de dois fatores', enabled: false },
        { label: 'Senha forte obrigatória', enabled: true },
        { label: 'Mostrar perfil publicamente', enabled: false }
      ]
    },
    {
      title: 'Dados e Armazenamento',
      icon: Database,
      items: [
        { label: 'Backup automático', enabled: true },
        { label: 'Sincronização na nuvem', enabled: true }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            Configurações
          </h1>
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

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <section.icon size={20} className="text-blue-600" />
                </div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                  {section.title}
                </h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                    <button
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        item.enabled ? 'bg-blue-600' : isDark ? 'bg-slate-700' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          item.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                <Globe size={20} className="text-blue-600" />
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                Idioma e Região
              </h2>
            </div>
            <select className={`w-full px-4 py-3 rounded-xl border outline-none ${
              isDark 
                ? 'bg-slate-900 border-slate-700 text-slate-100' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}>
              <option>Português (Brasil)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </div>

          <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Ações Avançadas
            </h2>
            <div className="space-y-3">
              <button className={`w-full px-4 py-3 rounded-xl border flex items-center gap-3 transition-colors ${
                isDark 
                  ? 'border-slate-700 hover:bg-slate-700 text-slate-100' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-900'
              }`}>
                <Download size={18} />
                Exportar todos os dados
              </button>
              <button className="w-full px-4 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors">
                <Trash2 size={18} />
                Excluir conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
