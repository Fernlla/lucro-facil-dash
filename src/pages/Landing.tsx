import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, TrendingUp, BarChart3, Target, Check, Star, 
  ArrowRight, Play, Users, Award, Shield, Zap, 
  Smartphone, Monitor, Globe, Heart, Sparkles,
  Menu, X, ChevronDown, ArrowUpRight, UserPlus, TrendingDown,
  CreditCard, Brain, PieChart, Smartphone as Phone, Lock,
  Headphones, Rocket, CheckCircle, Star as StarIcon
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
      rating: 5,
      text: 'O LucroFácil transformou meu negócio! Agora sei exatamente quanto lucro cada produto me dá.'
    },
    {
      name: 'João Santos',
      business: 'Confecção Artesanal',
      avatar: 'JS',
      rating: 5,
      text: 'A interface é incrível e o assistente IA me ajuda com dicas valiosas todos os dias.'
    },
    {
      name: 'Ana Costa',
      business: 'Loja de Cosméticos',
      avatar: 'AC',
      rating: 5,
      text: 'Minhas vendas aumentaram 40% depois que comecei a usar as análises do LucroFácil.'
    },
    {
      name: 'Pedro Oliveira',
      business: 'Padaria São José',
      avatar: 'PO',
      rating: 5,
      text: 'Descobri que alguns produtos não eram lucrativos. Depois de ajustar os preços, meu lucro dobrou!'
    },
    {
      name: 'Carla Mendes',
      business: 'Boutique Fashion',
      avatar: 'CM',
      rating: 5,
      text: 'O assistente IA me ajudou a identificar tendências e aumentar minhas vendas em 60%.'
    },
    {
      name: 'Rafael Torres',
      business: 'Lanchonete Express',
      avatar: 'RT',
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

      {/* Hero Section - Modern Design */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(var(--primary)/.1)_0%,_transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <Badge 
              variant="outline" 
              className="mb-8 gap-2 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Descubra o segredo dos empreendedores de sucesso</span>
              <ArrowRight className="w-3 h-3" />
            </Badge>
            
            {/* Main Title */}
            <h1 className="relative z-10 inline-block mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
              Transforme seu{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                pequeno negócio
              </span>
              {' '}em uma máquina de lucros
            </h1>
            
            {/* Description */}
            <p className="relative z-10 max-w-[550px] mx-auto mb-8 text-lg font-medium text-muted-foreground sm:text-xl">
              O LucroFácil revela exatamente quanto você está lucrando com cada produto. 
              Pare de adivinhar e comece a crescer com dados reais.
            </p>

            {/* Action Buttons */}
            <div className="relative z-10 flex justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                Começar Grátis por 14 dias
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Demonstração
              </Button>
            </div>

            {/* Social Proof */}
            <div className="relative z-10 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="ml-3">+10.000 empreendedores já lucram mais</span>
              </div>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="relative mt-16">
              <div className="bg-accent/5 flex relative z-10 overflow-hidden rounded-2xl border border-border/20 backdrop-blur-sm">
                <div className="p-4 w-full">
                  <div className="bg-background rounded-xl overflow-hidden border border-border/20 shadow-xl">
                    {/* Mock Dashboard Content */}
                    <div className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Dashboard</h3>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-primary/10 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">R$ 12.450</div>
                          <div className="text-sm text-muted-foreground">Faturamento</div>
                        </div>
                        <div className="bg-success/10 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-success">R$ 3.680</div>
                          <div className="text-sm text-muted-foreground">Lucro</div>
                        </div>
                        <div className="bg-warning/10 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-warning">29.6%</div>
                          <div className="text-sm text-muted-foreground">Margem</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute top-0 left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--primary)/.15)_10%,_transparent_60%)] sm:h-[512px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Cards */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 group">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section - Modern Design */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-destructive/5 border-destructive/20 text-destructive">
              Problema
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Você está perdendo dinheiro sem saber?
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
              A maioria dos pequenos negócios não sabe exatamente quanto lucra com cada produto. 
              Isso pode estar custando milhares de reais por mês.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-destructive/20">
              <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Vendendo no Prejuízo
              </h3>
              <p className="text-muted-foreground">
                73% dos pequenos negócios vendem produtos sem saber se estão lucrando ou perdendo dinheiro.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-warning/20">
              <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Planilhas Confusas
              </h3>
              <p className="text-muted-foreground">
                Planilhas complexas e dados espalhados fazem você perder tempo e tomar decisões erradas.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Falta de Visão
              </h3>
              <p className="text-muted-foreground">
                Sem dados claros, você não sabe quais produtos focar ou como aumentar seus lucros.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Design */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/20 text-primary">
              Recursos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              A solução que você estava procurando
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
              O LucroFácil é a única ferramenta que você precisa para transformar seu negócio em uma máquina de lucros.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Controle Total de Lucros
                </h3>
                <p className="text-muted-foreground">
                  Veja exatamente quanto lucra com cada produto, em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-success to-success/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Assistente IA Inteligente
                </h3>
                <p className="text-muted-foreground">
                  Receba dicas personalizadas para aumentar seus lucros.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-warning to-warning/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Relatórios Avançados
                </h3>
                <p className="text-muted-foreground">
                  Análises detalhadas que mostram onde focar seus esforços.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/80 to-accent/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Acesso em Qualquer Lugar
                </h3>
                <p className="text-muted-foreground">
                  Gerencie seu negócio de qualquer dispositivo, a qualquer hora.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-success/80 to-success/60 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  100% Seguro
                </h3>
                <p className="text-muted-foreground">
                  Seus dados protegidos com criptografia de nível bancário.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/60 to-accent/60 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Suporte Especializado
                </h3>
                <p className="text-muted-foreground">
                  Equipe dedicada a ajudar você a maximizar seus resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section - Modern Design */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/20 text-primary">
              Preços
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Escolha o plano ideal para seu negócio
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
              Comece grátis e escale conforme seu negócio cresce. Todos os planos incluem suporte e atualizações.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-primary shadow-xl scale-105 bg-gradient-to-br from-primary/5 to-accent/5' : 'hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-foreground">
                      R$ {plan.price.toFixed(2)}
                    </span>
                    <span className="text-lg ml-2 text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl' 
                      : 'hover:bg-primary/5 hover:border-primary/20'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => window.location.href = '/auth'}
                >
                  {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Todos os planos incluem teste gratuito de 14 dias • Cancele quando quiser
            </p>
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
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.avatar}
                          </div>
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
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.avatar}
                          </div>
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
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.avatar}
                          </div>
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

      {/* CTA Section - Modern Design */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background rounded-3xl p-12 shadow-xl border border-border/20">
            <Badge variant="outline" className="mb-6 bg-primary/5 border-primary/20 text-primary">
              <Rocket className="w-4 h-4 mr-2" />
              Comece Agora
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Junte-se a milhares de empreendedores que já descobriram o segredo dos lucros reais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                Começar Grátis Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-2 hover:bg-primary/5 transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                <Headphones className="mr-2 w-5 h-5" />
                Falar com Especialista
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Teste gratuito de 14 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Suporte completo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern Design */}
      <footer id="contact" className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">LucroFácil</span>
              </div>
              <p className="text-muted-foreground">
                Transformando pequenos negócios em máquinas de lucros.
              </p>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Comunidade</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 LucroFácil. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
