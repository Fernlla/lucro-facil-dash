import { Award, Shield, Rocket, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const helpFeatures = [
  {
    icon: Award,
    title: 'Suporte Especializado',
    description: 'Nossa equipe está pronta para ajudar você a extrair o máximo do LucroFácil.',
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Dados 100% Seguros',
    description: 'Criptografia de ponta e backups automáticos para proteger suas informações.',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-600'
  },
  {
    icon: Rocket,
    title: 'Atualizações Constantes',
    description: 'Novos recursos e melhorias toda semana para você crescer sempre.',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-600'
  }
];

const HelpSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ajudamos <span className="text-primary">milhares de empreendedores</span><br className="hidden md:block" />
            a simplificar seus negócios
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {helpFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border/50">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  {index === 0 ? 'Falar com suporte' : index === 1 ? 'Saiba mais sobre segurança' : 'Ver novidades'}
                  <ArrowUpRight className="ml-1 w-4 h-4" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
