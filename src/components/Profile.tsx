import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Camera, Save, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function Profile({ theme, onClose }: ProfileProps) {
  const isDark = theme === 'dark';
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || ''
  });
  
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    updateProfile(formData);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

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
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                <Camera size={20} />
              </button>
            </div>
            <h2 className={`mt-4 text-xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              {user?.name || 'Usuário'}
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              {user?.email || ''}
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                  disabled
                  title="E-mail não pode ser alterado"
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
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
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
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
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
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Seu endereço completo"
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'}`}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full mt-8 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${
              showSuccess 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            ) : showSuccess ? (
              <>
                <Check size={20} />
                Salvo com sucesso!
              </>
            ) : (
              <>
                <Save size={20} />
                Salvar alterações
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
