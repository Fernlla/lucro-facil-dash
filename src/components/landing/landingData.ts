// Dados estáticos da Landing Page (DRY Principle)

export interface Testimonial {
  name: string;
  business: string;
  avatar: string;
  image: string;
  rating: number;
  text: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

export interface BlogPost {
  title: string;
  description: string;
  category: string;
  image: string;
  url: string;
}

export const testimonials: Testimonial[] = [
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

export const stats: Stat[] = [
  { number: '10K+', label: 'Usuários ativos' },
  { number: 'R$ 2M+', label: 'Em vendas gerenciadas' },
  { number: '98%', label: 'Satisfação dos clientes' },
  { number: '24/7', label: 'Suporte disponível' }
];

export const features: Feature[] = [
  {
    icon: 'DollarSign',
    title: 'Controle de Lucros em Tempo Real',
    description: 'Veja exatamente quanto você está lucrando com cada produto, venda e período.',
    gradient: 'from-background to-primary/5',
    iconColor: 'text-primary'
  },
  {
    icon: 'BarChart3',
    title: 'Relatórios Inteligentes',
    description: 'Dashboards completos com métricas que realmente importam para o seu negócio.',
    gradient: 'from-background to-accent/5',
    iconColor: 'text-accent'
  },
  {
    icon: 'Package',
    title: 'Gestão de Produtos',
    description: 'Cadastre produtos, defina custos e preços, acompanhe margem de lucro.',
    gradient: 'from-background to-green-500/5',
    iconColor: 'text-green-600'
  },
  {
    icon: 'TrendingUp',
    title: 'Análise de Vendas',
    description: 'Identifique seus produtos mais rentáveis e otimize sua estratégia.',
    gradient: 'from-background to-blue-500/5',
    iconColor: 'text-blue-600'
  },
  {
    icon: 'Brain',
    title: 'Assistente IA',
    description: 'Inteligência artificial para responder dúvidas e dar insights sobre seu negócio.',
    gradient: 'from-background to-purple-500/5',
    iconColor: 'text-purple-600'
  },
  {
    icon: 'Target',
    title: 'Metas e Objetivos',
    description: 'Defina metas diárias e mensais, acompanhe seu progresso em tempo real.',
    gradient: 'from-background to-orange-500/5',
    iconColor: 'text-orange-600'
  }
];

export const blogPosts: BlogPost[] = [
  {
    title: 'Como Precificar Produtos para Sorveteria',
    description: 'Aprenda a calcular o preço ideal dos seus sorvetes, picolés e açaí considerando custos e margem.',
    category: 'Sorveteria',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=400&fit=crop',
    url: '/blog/precificacao-sorveteria'
  },
  {
    title: 'Precificação em Confecção e Costura',
    description: 'Descubra como calcular corretamente o valor do seu trabalho manual, incluindo materiais e tempo.',
    category: 'Costura',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f5d2b?w=800&h=400&fit=crop',
    url: '/blog/precificacao-costura'
  },
  {
    title: 'Como Precificar Bebidas em Cafeterias',
    description: 'Estratégias de precificação para cafés e bebidas especiais mantendo lucratividade.',
    category: 'Cafeteria',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=400&fit=crop',
    url: '/blog/precificacao-cafeteria'
  }
];

export const customerPhotos = [
  '/testimonials/Foto do clientes/Screenshot_34.png',
  '/testimonials/Foto do clientes/Screenshot_35.png',
  '/testimonials/Foto do clientes/Screenshot_36.png',
  '/testimonials/Foto do clientes/Screenshot_37.png',
  '/testimonials/Foto do clientes/Screenshot_38.png'
];
