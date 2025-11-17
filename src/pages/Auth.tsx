import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthProps {
  theme: 'light' | 'dark';
  onBack: () => void;
}

export default function Auth({ theme, onBack }: AuthProps) {
  const isDark = theme === 'dark';
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name) {
          throw new Error('Por favor, preencha seu nome');
        }
        await signup(formData.name, formData.email, formData.password);
      }
      // Sucesso - o usuário será redirecionado automaticamente pelo Index
      onBack();
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg mb-4">
            <span className="text-2xl font-bold text-white">L</span>
          </div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'} mb-2`}>
            LucroFácil
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {/* Form Card */}
        <div className={`rounded-2xl p-8 shadow-lg ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            
            {/* Name Field (only for signup) */}
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  Nome completo
                </label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
                } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all`}>
                  <User size={20} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                  <input
                    type="text"
                    placeholder="Maria Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'} placeholder:${isDark ? 'text-slate-500' : 'text-gray-400'}`}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                E-mail
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all`}>
                <Mail size={20} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'} placeholder:${isDark ? 'text-slate-500' : 'text-gray-400'}`}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Senha
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-300'
              } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all`}>
                <Lock size={20} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`flex-1 bg-transparent outline-none ${isDark ? 'text-slate-100' : 'text-gray-900'} placeholder:${isDark ? 'text-slate-500' : 'text-gray-400'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${isDark ? 'text-slate-400 hover:text-slate-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password (only for login) */}
            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isLogin ? 'Entrando...' : 'Criando conta...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Criar conta'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              {' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {isLogin ? 'Cadastre-se' : 'Entre'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={onBack}
              className={`text-sm ${isDark ? 'text-slate-500 hover:text-slate-400' : 'text-gray-500 hover:text-gray-600'} transition-colors`}
            >
              ← Voltar para início
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className={`text-xs text-center mt-6 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
          Ao continuar, você concorda com os{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">Termos de Uso</a>
          {' '}e{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">Política de Privacidade</a>
        </p>
      </div>
    </div>
  );
}
