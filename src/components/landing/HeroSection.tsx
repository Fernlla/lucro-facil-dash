import { Sparkles, Check, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { customerPhotos } from './landingData';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent pt-32 pb-20 lg:pt-40 lg:pb-32">
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
                {customerPhotos.map((photo, i) => (
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
  );
};

export default HeroSection;
