import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, TrendingUp, BarChart3, Target, Check, Star, 
  ArrowRight, Play, Users, Award, Shield, Zap, 
  Smartphone, Monitor, Globe, Heart, Sparkles,
  Menu, X, ChevronDown, ArrowUpRight, UserPlus, TrendingDown,
  CreditCard, Brain, PieChart, Smartphone as Phone, Lock,
  Headphones, Rocket, CheckCircle, Star as StarIcon, Package, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Landing = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPricingDetails, setShowPricingDetails] = useState<string | null>(null);
  
  // Identificador único da landing page
  const landingId = 'lucrofacil-landing-v1.0';

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
    
    if (systemTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const isDark = theme === 'dark';

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 19.90,
      period: 'mês',
      description: 'Perfeito para começar',
      features: [
        'Até 50 produtos',
        'Controle de vendas básico',
        'Relatórios mensais',
        'Suporte por email',
        'Assistente IA básico'
      ],
      popular: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 39.90,
      period: 'mês',
      description: 'Para negócios em crescimento',
      features: [
        'Produtos ilimitados',
        'Controle avançado de vendas',
        'Relatórios em tempo real',
        'Suporte prioritário',
        'Assistente IA completo',
        'Integração com APIs',
        'Backup automático'
      ],
      popular: true,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 89.90,
      period: 'mês',
      description: 'Para grandes operações',
      features: [
        'Tudo do Professional',
        'Multi-usuários',
        'Relatórios personalizados',
        'Suporte 24/7',
        'API completa',
        'White-label',
        'Consultoria especializada',
        'SLA garantido'
      ],
      popular: false,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      business: 'Sorveteria Doce Vida',
      avatar: 'MS',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      rating: 5,
      text: 'O LucroFácil transformou meu negócio! Agora sei exatamente quanto lucro cada produto me dá.'
    },
    {
      name: 'João Santos',
      business: 'Confecção Artesanal',
      avatar: 'JS',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      rating: 5,
      text: 'A interface é incrível e o assistente IA me ajuda com dicas valiosas todos os dias.'
    },
    {
      name: 'Ana Costa',
      business: 'Loja de Cosméticos',
      avatar: 'AC',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      rating: 5,
      text: 'Minhas vendas aumentaram 40% depois que comecei a usar as análises do LucroFácil.'
    },
    {
      name: 'Pedro Oliveira',
      business: 'Padaria São José',
      avatar: 'PO',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      rating: 5,
      text: 'Descobri que alguns produtos não eram lucrativos. Depois de ajustar os preços, meu lucro dobrou!'
    },
    {
      name: 'Carla Mendes',
      business: 'Boutique Fashion',
      avatar: 'CM',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
      rating: 5,
      text: 'O assistente IA me ajudou a identificar tendências e aumentar minhas vendas em 60%.'
    },
    {
      name: 'Rafael Torres',
      business: 'Lanchonete Express',
      avatar: 'RT',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
      rating: 5,
      text: 'Controle de estoque e lucros em tempo real. Não consigo mais trabalhar sem o LucroFácil.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Usuários ativos' },
    { number: 'R$ 2M+', label: 'Em vendas gerenciadas' },
    { number: '98%', label: 'Satisfação dos clientes' },
    { number: '24/7', label: 'Suporte disponível' }
  ];

  return (
    <div id={landingId} className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'} transition-colors duration-200`}>
      {/* Navigation */}
      <nav className={`${isDark ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-lg border-b ${isDark ? 'border-slate-700' : 'border-gray-200'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                LucroFácil
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Recursos
              </a>
              <a href="#pricing" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Preços
              </a>
              <a href="#testimonials" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Depoimentos
              </a>
              <a href="#contact" className={`${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                Contato
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => window.location.href = '/auth'}
              >
                Entrar / Cadastrar
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.location.href = '/auth'}
              >
                Começar Grátis
              </Button>
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={`md:hidden ${isDark ? 'bg-slate-800' : 'bg-white'} border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="px-4 py-4 space-y-2">
              <a href="#features" className={`block px-3 py-2 ${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Recursos
              </a>
              <a href="#pricing" className={`block px-3 py-2 ${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Preços
              </a>
              <a href="#testimonials" className={`block px-3 py-2 ${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Depoimentos
              </a>
              <a href="#contact" className={`block px-3 py-2 ${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Contato
              </a>
              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full" onClick={() => window.location.href = '/auth'}>
                  Entrar / Cadastrar
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => window.location.href = '/auth'}>
                  Começar Grátis
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Inspirado no Bling */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent py-20 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left space-y-8 z-10">
              <Badge 
                variant="outline" 
                className="mb-4 gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors w-fit"
              >
                <Sparkles className="w-4 h-4" />
                <span>Descubra o segredo dos empreendedores de sucesso</span>
              </Badge>

              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Gestão inteligente para vender mais e se preocupar menos,{' '}
                <span className="text-green-200">tem no LucroFácil!</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-xl">
                Controle suas vendas, estoque e finanças em um só lugar. 
                Automatize processos e foque no crescimento do seu negócio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-xl h-auto font-semibold"
                  onClick={() => window.location.href = '/auth'}
                >
                  Começar gratuitamente
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-semibold"
                >
                  Falar com vendas
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Teste gratuito de 14 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Cancele quando quiser</span>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative lg:block hidden">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-primary to-accent p-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                  </div>
                  <div className="flex-1 bg-white/20 rounded px-3 py-1 text-xs text-white font-medium">
                    app.lucrofacil.com.br
                  </div>
                </div>
                <div className="bg-background p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 space-y-2 border border-primary/10 hover:shadow-lg transition-shadow">
                      <div className="text-xs text-muted-foreground font-medium">Faturamento</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">R$ 12.450</div>
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +23%
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-4 space-y-2 border border-green-500/10 hover:shadow-lg transition-shadow">
                      <div className="text-xs text-muted-foreground font-medium">Lucro</div>
                      <div className="text-2xl font-bold text-green-600">R$ 4.280</div>
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +18%
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 space-y-2 border border-accent/10 hover:shadow-lg transition-shadow">
                      <div className="text-xs text-muted-foreground font-medium">Vendas</div>
                      <div className="text-2xl font-bold text-accent">234</div>
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12%
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 h-40 flex items-end justify-around gap-2">
                    {[65, 80, 70, 90, 85, 95, 88].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t transition-all hover:opacity-80 cursor-pointer" 
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-40" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-30" />
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="mt-20 pt-12 border-t border-white/20">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    '/testimonials/Foto do clientes/Screenshot_34.png',
                    '/testimonials/Foto do clientes/Screenshot_35.png',
                    '/testimonials/Foto do clientes/Screenshot_36.png',
                    '/testimonials/Foto do clientes/Screenshot_37.png',
                    '/testimonials/Foto do clientes/Screenshot_38.png'
                  ].map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt={`Cliente ${i + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
                <span className="text-white font-medium text-lg">+10.000 empreendedores confiam no LucroFácil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - Inspirado no Bling */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              O LucroFácil tem os <span className="text-primary">recursos essenciais</span> que<br className="hidden md:block" />
              melhoram a performance do seu negócio
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-primary/5">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Controle de Lucros em Tempo Real
              </h3>
              <p className="text-muted-foreground text-sm">
                Veja exatamente quanto você está lucrando com cada produto, venda e período.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-accent/5">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Relatórios Inteligentes
              </h3>
              <p className="text-muted-foreground text-sm">
                Dashboards completos com métricas que realmente importam para o seu negócio.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-green-500/5">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Gestão de Produtos
              </h3>
              <p className="text-muted-foreground text-sm">
                Cadastre produtos, defina custos e preços, acompanhe margem de lucro.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-blue-500/5">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Análise de Vendas
              </h3>
              <p className="text-muted-foreground text-sm">
                Identifique seus produtos mais rentáveis e otimize sua estratégia.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-purple-500/5">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Assistente IA
              </h3>
              <p className="text-muted-foreground text-sm">
                Inteligência artificial para responder dúvidas e dar insights sobre seu negócio.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-orange-500/5">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                Metas e Objetivos
              </h3>
              <p className="text-muted-foreground text-sm">
                Defina metas diárias e mensais, acompanhe seu progresso em tempo real.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Video/Demo Section - Inspirado no Bling */}
      <section id="demo" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                <Play className="w-4 h-4 mr-2" />
                Veja como funciona
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Automatize processos e<br />economize tempo para focar no<br />crescimento do seu negócio
              </h2>
              <p className="text-lg text-muted-foreground">
                O LucroFácil automatiza tarefas repetitivas e te dá insights em tempo real para decisões mais inteligentes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Registro de vendas em segundos</h4>
                    <p className="text-sm text-muted-foreground">Interface intuitiva para adicionar vendas rapidamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Cálculo automático de margens e lucros</h4>
                    <p className="text-sm text-muted-foreground">Veja instantaneamente quanto você lucrou em cada transação</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Relatórios gerados automaticamente</h4>
                    <p className="text-sm text-muted-foreground">Dados organizados sem precisar criar planilhas complexas</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => window.location.href = '/auth'}
              >
                Começar agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="bg-muted/50 rounded-2xl p-8 border-2 border-border/50 shadow-2xl">
                <div className="bg-background rounded-xl overflow-hidden border border-border/50">
                  <div className="bg-gradient-to-r from-primary to-accent p-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <div className="text-xs text-muted-foreground mb-1">Faturamento</div>
                        <div className="text-xl font-bold text-primary">R$ 45.2K</div>
                      </div>
                      <div className="bg-green-500/5 rounded-lg p-3 border border-green-500/10">
                        <div className="text-xs text-muted-foreground mb-1">Lucro</div>
                        <div className="text-xl font-bold text-green-600">R$ 18.8K</div>
                      </div>
                      <div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/10">
                        <div className="text-xs text-muted-foreground mb-1">Margem</div>
                        <div className="text-xl font-bold text-blue-600">41.6%</div>
                      </div>
                    </div>
                    <div className="h-32 bg-muted/50 rounded-lg flex items-end justify-around p-3 gap-1">
                      {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Management Section - Inspirado no Bling */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border-2 border-border/50 shadow-xl">
                <div className="bg-background rounded-xl overflow-hidden border border-border/50">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <h4 className="font-semibold text-foreground">Produtos</h4>
                      <Button size="sm" className="bg-primary">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {['Sorvete Chocolate', 'Açaí 500ml', 'Picolé Frutas'].map((product, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-foreground">{product}</div>
                              <div className="text-xs text-muted-foreground">Margem: {[52, 48, 45][i]}%</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-foreground">R$ {[5.00, 15.00, 3.50][i].toFixed(2)}</div>
                            <div className="text-xs text-green-600">+R$ {[2.50, 7.20, 1.70][i].toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-3/4 h-3/4 bg-primary/10 rounded-2xl blur-3xl" />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary w-fit">
                Gestão Completa
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Conte com o LucroFácil para fazer a gestão<br className="hidden md:block" />
                completa do seu e-commerce, loja física,<br className="hidden md:block" />
                empresa de serviços ou indústria
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Gestão de Produtos e Estoque</h4>
                    <p className="text-sm text-muted-foreground">Controle completo do seu catálogo com alertas de estoque baixo</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Controle Financeiro Completo</h4>
                    <p className="text-sm text-muted-foreground">Receitas, despesas, lucros e fluxo de caixa em tempo real</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Relatórios e Análises Detalhadas</h4>
                    <p className="text-sm text-muted-foreground">Insights poderosos para tomar decisões baseadas em dados</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Multi-usuários e Permissões</h4>
                    <p className="text-sm text-muted-foreground">Equipe conectada com controles de acesso personalizados</p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => window.location.href = '/auth'}
              >
                Experimentar grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Simplified */}
      <section id="pricing" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Potencialize seu negócio com o<br className="hidden md:block" />
              <span className="text-primary">Centro de Extensões</span> do LucroFácil
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
              Comece grátis por 14 dias e tenha acesso a todos os recursos. Sem cartão de crédito.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="relative p-8 md:p-12 shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 text-base font-semibold shadow-lg">
                  Plano Recomendado
                </Badge>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3 text-foreground">
                  Professional
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    R$ 39,90
                  </span>
                  <span className="text-2xl ml-2 text-muted-foreground">
                    /mês
                  </span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Tudo que você precisa para crescer seu negócio
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'Produtos ilimitados',
                  'Controle avançado de vendas',
                  'Relatórios em tempo real',
                  'Assistente IA completo',
                  'Suporte prioritário',
                  'Integração com APIs',
                  'Backup automático',
                  'Multi-usuários'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg py-6 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = '/auth'}
                >
                  Começar teste grátis de 14 dias
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Sem compromisso • Cancele quando quiser • Sem cartão de crédito
                </p>
              </div>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Precisa de um plano personalizado para sua empresa?
              </p>
              <Button 
                size="lg"
                variant="outline"
                className="border-2"
                onClick={() => window.location.href = '/auth'}
              >
                <Headphones className="mr-2 w-5 h-5" />
                Falar com vendas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Animated Infinite Scroll */}
      <section id="testimonials" className="py-20 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/20 text-primary">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
              Mais de 10.000 empreendedores já transformaram seus negócios com o LucroFácil.
            </p>
          </div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
            {/* Column 1 */}
            <div className="flex-1 max-w-xs">
              <motion.div
                animate={{
                  translateY: "-50%",
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
              >
                {[...new Array(2)].fill(0).map((_, index) => (
                  <div key={index}>
                    {testimonials.slice(0, 2).map((testimonial, i) => (
                      <div key={i} className="p-10 rounded-3xl border border-border/50 bg-background shadow-lg shadow-primary/10 max-w-xs w-full mb-6">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, starIndex) => (
                            <StarIcon key={starIndex} className="w-5 h-5 text-warning fill-current" />
                          ))}
                        </div>
                        <div className="text-muted-foreground mb-5">{testimonial.text}</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md"
                          />
                          <div className="flex flex-col">
                            <div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
                            <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">{testimonial.business}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="flex-1 max-w-xs hidden md:block">
              <motion.div
                animate={{
                  translateY: "-50%",
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
              >
                {[...new Array(2)].fill(0).map((_, index) => (
                  <div key={index}>
                    {testimonials.slice(2, 4).map((testimonial, i) => (
                      <div key={i} className="p-10 rounded-3xl border border-border/50 bg-background shadow-lg shadow-primary/10 max-w-xs w-full mb-6">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, starIndex) => (
                            <StarIcon key={starIndex} className="w-5 h-5 text-warning fill-current" />
                          ))}
                        </div>
                        <div className="text-muted-foreground mb-5">{testimonial.text}</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md"
                          />
                          <div className="flex flex-col">
                            <div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
                            <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">{testimonial.business}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 3 */}
            <div className="flex-1 max-w-xs hidden lg:block">
              <motion.div
                animate={{
                  translateY: "-50%",
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
              >
                {[...new Array(2)].fill(0).map((_, index) => (
                  <div key={index}>
                    {testimonials.slice(4, 6).map((testimonial, i) => (
                      <div key={i} className="p-10 rounded-3xl border border-border/50 bg-background shadow-lg shadow-primary/10 max-w-xs w-full mb-6">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, starIndex) => (
                            <StarIcon key={starIndex} className="w-5 h-5 text-warning fill-current" />
                          ))}
                        </div>
                        <div className="text-muted-foreground mb-5">{testimonial.text}</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md"
                          />
                          <div className="flex flex-col">
                            <div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
                            <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">{testimonial.business}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section - Recursos para Empreendedores */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ajudamos <span className="text-primary">milhares de empreendedores</span><br className="hidden md:block" />
              a simplificar seus negócios
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Suporte Especializado
              </h3>
              <p className="text-muted-foreground mb-4">
                Nossa equipe está pronta para ajudar você a extrair o máximo do LucroFácil.
              </p>
              <Button variant="link" className="p-0 h-auto text-primary">
                Falar com suporte
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Dados 100% Seguros
              </h3>
              <p className="text-muted-foreground mb-4">
                Criptografia de ponta e backups automáticos para proteger suas informações.
              </p>
              <Button variant="link" className="p-0 h-auto text-primary">
                Saiba mais sobre segurança
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Atualizações Constantes
              </h3>
              <p className="text-muted-foreground mb-4">
                Novos recursos e melhorias toda semana para você crescer sempre.
              </p>
              <Button variant="link" className="p-0 h-auto text-primary">
                Ver novidades
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final - Inspirado no Bling */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Gestão inteligente para vender mais e<br className="hidden md:block" />
            se preocupar menos, <span className="text-green-200">tem no LucroFácil!</span>
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Mais de 10.000 empreendedores já transformaram seus negócios. Junte-se a eles!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 font-semibold shadow-xl"
              onClick={() => window.location.href = '/auth'}
            >
              Começar agora grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-2 border-white hover:bg-white/10 text-lg px-10 py-6 font-semibold"
              onClick={() => window.location.href = '/auth'}
            >
              Falar com vendas
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Sem cartão</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Suporte incluído</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Simplificado */}
      <footer id="contact" className="py-16 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-foreground">LucroFácil</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                A solução completa para gestão de pequenos negócios. Controle vendas, estoque e finanças em um só lugar.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="outline" className="rounded-full">
                  <Globe className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Users className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Produto</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors">Demonstração</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Suporte</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 LucroFácil. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Português (BR)</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">R$ BRL</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
