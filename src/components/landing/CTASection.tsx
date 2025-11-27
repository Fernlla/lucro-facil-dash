import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
