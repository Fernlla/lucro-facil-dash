import { User, Mail, Phone, Calendar, MapPin, Camera, Save } from 'lucide-react';

interface ProfileProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function Profile({ theme, onClose }: ProfileProps) {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            Seu Perfil
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

        <div className={`rounded-2xl p-8 mb-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Camera size={20} />
              </button>
            </div>
            <h2 className={`mt-4 text-xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Maria Silva
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              @mariasorvetes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Nome completo
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <User size={18} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type="text"
                  defaultValue="Maria Silva"
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                E-mail
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <Mail size={18} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type="email"
                  defaultValue="maria@exemplo.com"
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Telefone
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <Phone size={18} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type="tel"
                  defaultValue="(11) 98765-4321"
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Data de nascimento
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <Calendar size={18} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type="date"
                  defaultValue="1990-05-15"
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Endereço
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <MapPin size={18} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type="text"
                  defaultValue="Rua das Flores, 123 - São Paulo, SP"
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                />
              </div>
            </div>
          </div>

          <button className="w-full mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Save size={20} />
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
