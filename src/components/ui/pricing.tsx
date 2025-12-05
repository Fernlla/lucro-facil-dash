import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigate } from "react-router-dom";

type PricingTier = {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: {
      monthly: 39.9,
      yearly: 191.04,
    },
    description: "Ideal para começar",
    features: [
      "Até 10 produtos",
      "Dashboard básico",
      "Suporte por email",
      "1 usuário",
      "Relatórios mensais",
    ],
    cta: "Começar",
  },
  {
    name: "Profissional",
    price: {
      monthly: 57.9,
      yearly: 382.08,
    },
    description: "Para negócios em crescimento",
    features: [
      "Produtos ilimitados",
      "Dashboard completo",
      "Suporte prioritário",
      "5 usuários",
      "Relatórios personalizados",
      "Assistente IA",
      "Metas e objetivos",
    ],
    cta: "Escolher Profissional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: {
      monthly: 69.9,
      yearly: 862.08,
    },
    description: "Para grandes empresas",
    features: [
      "Tudo do Profissional",
      "Usuários ilimitados",
      "API completa",
      "Suporte dedicado 24/7",
      "Treinamento personalizado",
      "SLA garantido",
      "Integrações customizadas",
    ],
    cta: "Falar com vendas",
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isYearly) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isYearly]);

  const handleCTA = (tierName: string) => {
    if (tierName === "Enterprise") {
      // Scroll to contact section or open contact modal
      const contactSection = document.getElementById("help");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to signup
      navigate("/auth");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Preços Simples e Transparentes
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Escolha o plano perfeito para o seu negócio
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Label
              htmlFor="billing-toggle"
              className={`text-base cursor-pointer transition-colors ${
                !isYearly ? "text-white" : "text-slate-400"
              }`}
            >
              Mensal
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-[#10B981]"
            />
            <Label
              htmlFor="billing-toggle"
              className={`text-base cursor-pointer transition-colors ${
                isYearly ? "text-white" : "text-slate-400"
              }`}
            >
              Anual
              <span className="ml-2 inline-block px-2 py-0.5 bg-[#10B981] text-white text-xs rounded-full">
                Economize 20%
              </span>
            </Label>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              style={
                isDesktop && tier.popular
                  ? {
                      transformStyle: "preserve-3d",
                      transform: "perspective(1000px)",
                    }
                  : {}
              }
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={
                  isDesktop && tier.popular
                    ? {
                        rotateX: -5,
                        rotateY: 5,
                        scale: 1.05,
                        z: 50,
                      }
                    : { scale: 1.02 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-full rounded-2xl p-8 ${
                  tier.popular
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-[#10B981] shadow-xl shadow-[#10B981]/20"
                    : "bg-slate-800/50 border border-slate-700"
                }`}
              >
                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-400 mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-xl">R$</span>
                    <NumberFlow
                      value={isYearly ? tier.price.yearly : tier.price.monthly}
                      format={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                      className="text-5xl font-bold text-white"
                    />
                    <span className="text-slate-400 text-lg">
                      /{isYearly ? "ano" : "mês"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2">
                    {isYearly ? "cobrado anualmente" : "cobrado mensalmente"}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleCTA(tier.name)}
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white shadow-lg shadow-[#10B981]/30"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-slate-400">
            Todos os planos incluem 14 dias de teste grátis. Cancele quando
            quiser.
          </p>
        </div>
      </div>
    </section>
  );
}
