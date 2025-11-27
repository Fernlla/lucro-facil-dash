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
}

const features: Feature[] = [
  {
    icon: 'DollarSign',
    title: 'Controle de Lucros em Tempo Real',
    description: 'Veja exatamente quanto você está lucrando com cada produto, venda e período.',
    gradient: 'from-background to-primary/5',
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: 'BarChart3',
    title: 'Relatórios Inteligentes',
    description: 'Dashboards completos com métricas que realmente importam para o seu negócio.',
    gradient: 'from-background to-accent/5',
    iconColor: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    icon: 'Package',
    title: 'Gestão de Produtos',
    description: 'Cadastre produtos, defina custos e preços, acompanhe margem de lucro.',
    gradient: 'from-background to-green-500/5',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: 'TrendingUp',
    title: 'Análise de Vendas',
    description: 'Identifique seus produtos mais rentáveis e otimize sua estratégia.',
    gradient: 'from-background to-blue-500/5',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: 'Brain',
    title: 'Assistente IA',
    description: 'Inteligência artificial para responder dúvidas e dar insights sobre seu negócio.',
    gradient: 'from-background to-purple-500/5',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: 'Target',
    title: 'Metas e Objetivos',
    description: 'Defina metas diárias e mensais, acompanhe seu progresso em tempo real.',
    gradient: 'from-background to-orange-500/5',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-500/10'
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
                className={`p-8 text-center group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br ${feature.gradient}`}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
