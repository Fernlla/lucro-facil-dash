import { HelpCircle, MessageCircle, Book, Video, Mail, ExternalLink } from 'lucide-react';

interface HelpProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export default function Help({ theme, onClose }: HelpProps) {
  const isDark = theme === 'dark';

  const faqs = [
    { q: 'Como adicionar um novo produto?', a: 'Vá até a seção Produtos e clique no botão "Novo Produto". Preencha as informações e salve.' },
    { q: 'Como calcular minha margem de lucro?', a: 'A margem é calculada automaticamente: (Preço - Custo) / Preço × 100%' },
    { q: 'Posso exportar meus relatórios?', a: 'Sim! Vá em Relatórios e clique em "Exportar" para baixar em PDF ou Excel.' },
    { q: 'Como definir metas diárias?', a: 'Acesse Configurações > Metas e defina seus objetivos de faturamento.' }
  ];

  const resources = [
    { icon: Book, title: 'Central de Ajuda', desc: 'Artigos e guias completos', link: '#' },
    { icon: Video, title: 'Tutoriais em Vídeo', desc: 'Aprenda assistindo', link: '#' },
    { icon: MessageCircle, title: 'Chat ao Vivo', desc: 'Fale com nosso suporte', link: '#' },
    { icon: Mail, title: 'Envie um E-mail', desc: 'contato@lucrofacil.com.br', link: 'mailto:contato@lucrofacil.com.br' }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Central de Ajuda
            </h1>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Estamos aqui para ajudar você
            </p>
          </div>
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

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.link}
              className={`rounded-2xl p-6 transition-all hover:scale-105 ${
                isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <resource.icon size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                    {resource.title}
                    <ExternalLink size={16} className={isDark ? 'text-slate-400' : 'text-gray-400'} />
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    {resource.desc}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className={`rounded-2xl p-6 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              <HelpCircle size={20} className="text-blue-600" />
            </div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className={`group rounded-xl p-4 cursor-pointer ${
                  isDark ? 'bg-slate-900 hover:bg-slate-900/70' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <summary className={`font-medium list-none flex items-center justify-between ${
                  isDark ? 'text-slate-100' : 'text-gray-900'
                }`}>
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className={`mt-3 text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl p-6 mt-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white`}>
          <h3 className="text-lg font-semibold mb-2">Não encontrou o que procura?</h3>
          <p className="text-blue-100 mb-4">
            Nossa equipe está disponível para ajudar você com qualquer dúvida.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
}
