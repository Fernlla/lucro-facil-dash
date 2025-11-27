import { Play, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VideoDemo = () => {
  return (
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
  );
};

export default VideoDemo;
