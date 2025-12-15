import { DollarSign, BarChart3, Package, TrendingUp, Brain, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

const iconMap = {
  DollarSign,
  BarChart3,
  Package,
  TrendingUp,
  Brain,
  Target
};

interface Feature {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  bgColor: string;
  image?: string;
  imageAlt?: string;
}

const features: Feature[] = [
  {
    icon: 'DollarSign',
    title: 'Controle de Lucros em Tempo Real',
    description: 'Veja exatamente quanto você está lucrando com cada produto, venda e período.',
    gradient: 'from-background to-primary/5',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
    imageAlt: 'Dashboard com métricas financeiras em tempo real'
  },
  {
    icon: 'BarChart3',
    title: 'Relatórios Inteligentes',
    description: 'Dashboards completos com métricas que realmente importam para o seu negócio.',
    gradient: 'from-background to-accent/5',
    iconColor: 'text-accent',
    bgColor: 'bg-accent/10',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    imageAlt: 'Gráficos e relatórios de análise de negócio'
  },
  {
    icon: 'Package',
    title: 'Gestão de Produtos',
    description: 'Cadastre produtos, defina custos e preços, acompanhe margem de lucro.',
    gradient: 'from-background to-green-500/5',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-500/10',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    imageAlt: 'Organização de produtos e estoque'
  },
  {
    icon: 'TrendingUp',
    title: 'Análise de Vendas',
    description: 'Identifique seus produtos mais rentáveis e otimize sua estratégia.',
    gradient: 'from-background to-blue-500/5',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    imageAlt: 'Análise de crescimento de vendas'
  },
  {
    icon: 'Brain',
    title: 'Assistente IA',
    description: 'Inteligência artificial para responder dúvidas e dar insights sobre seu negócio.',
    gradient: 'from-background to-purple-500/5',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    imageAlt: 'Inteligência artificial e assistente virtual'
  },
  {
    icon: 'Target',
    title: 'Metas e Objetivos',
    description: 'Defina metas diárias e mensais, acompanhe seu progresso em tempo real.',
    gradient: 'from-background to-orange-500/5',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-500/10',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    imageAlt: 'Planejamento e acompanhamento de metas'
  }
];

const ResourcesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            O LucroFácil tem os <span className="text-primary">recursos essenciais</span> que<br className="hidden md:block" />
            melhoram a performance do seu negócio
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card 
                key={index}
                className={`overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br ${feature.gradient}`}
              >
                {/* Imagem ilustrativa */}
                {feature.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.imageAlt || feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className={`absolute bottom-4 left-4 w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                  </div>
                )}
                
                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
