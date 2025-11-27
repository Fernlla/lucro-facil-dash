import { Package, DollarSign, BarChart3, Users, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  { name: 'Sorvete Chocolate', margin: 52, price: 5.00, profit: 2.50 },
  { name: 'Açaí 500ml', margin: 48, price: 15.00, profit: 7.20 },
  { name: 'Picolé Frutas', margin: 45, price: 3.50, profit: 1.70 }
];

const managementFeatures = [
  {
    icon: Package,
    title: 'Gestão de Produtos e Estoque',
    description: 'Controle completo do seu catálogo com alertas de estoque baixo',
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    icon: DollarSign,
    title: 'Controle Financeiro Completo',
    description: 'Receitas, despesas, lucros e fluxo de caixa em tempo real',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-600'
  },
  {
    icon: BarChart3,
    title: 'Relatórios e Análises Detalhadas',
    description: 'Insights poderosos para tomar decisões baseadas em dados',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-600'
  },
  {
    icon: Users,
    title: 'Multi-usuários e Permissões',
    description: 'Equipe conectada com controles de acesso personalizados',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-600'
  }
];

const ManagementSection = () => {
  return (
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
                    {products.map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-foreground">{product.name}</div>
                            <div className="text-xs text-muted-foreground">Margem: {product.margin}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">R$ {product.price.toFixed(2)}</div>
                          <div className="text-xs text-green-600">+R$ {product.profit.toFixed(2)}</div>
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
              {managementFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-10 h-10 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
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
  );
};

export default ManagementSection;
