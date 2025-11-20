import { useState } from 'react';
import { Navbar } from "@/components/ui/mini-navbar";
import { LucroFacilNavbar } from "@/components/ui/lucrofacil-navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MiniNavbarDemo = () => {
  const [version, setVersion] = useState<'original' | 'lucrofacil'>('lucrofacil');

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover grayscale opacity-40" 
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop" 
          alt="Background Stars"
        />
      </div>

      {version === 'original' ? <Navbar /> : <LucroFacilNavbar />}

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-32 pb-20">
        <Badge className="mb-6 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white border-0 text-sm px-4 py-1">
          Componente Mini Navbar
        </Badge>
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
          MINI NAVBAR
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Navbar minimalista com animações suaves e design responsivo. Integrado ao LucroFácil com identidade visual personalizada.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Button
            onClick={() => setVersion('lucrofacil')}
            variant={version === 'lucrofacil' ? 'default' : 'outline'}
            className={version === 'lucrofacil' 
              ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white border-0' 
              : 'border-white/30 text-white hover:bg-white/10'}
          >
            Versão LucroFácil
          </Button>
          <Button
            onClick={() => setVersion('original')}
            variant={version === 'original' ? 'default' : 'outline'}
            className={version === 'original' 
              ? 'bg-gradient-to-r from-gray-100 to-gray-300 text-black border-0' 
              : 'border-white/30 text-white hover:bg-white/10'}
          >
            Versão Original
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full mt-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Animações Suaves</h3>
            <p className="text-sm text-gray-400">Transições fluidas nos links e mudança de forma no mobile</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-semibold text-white mb-2">100% Responsivo</h3>
            <p className="text-sm text-gray-400">Menu hamburguer no mobile com animação de altura</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Customizável</h3>
            <p className="text-sm text-gray-400">Adaptado com identidade visual do LucroFácil</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Recursos implementados:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Backdrop Blur', 'Forma Dinâmica', 'TypeScript', 'Tailwind CSS', 'React Hooks', 'Lucide Icons'].map((feature) => (
              <span key={feature} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MiniNavbarDemo;
