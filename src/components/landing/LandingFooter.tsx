import { DollarSign, Globe, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingFooter = () => {
  return (
    <footer id="contact" className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-4 w-fit cursor-pointer hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">LucroFácil</span>
            </a>
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
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
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
  );
};

export default LandingFooter;
