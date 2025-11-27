import { motion } from 'framer-motion';
import { Star as StarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { testimonials } from './landingData';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/20 text-primary">
            Depoimentos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
            Mais de 10.000 empreendedores já transformaram seus negócios com o LucroFácil.
          </p>
        </div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          {/* Column 1 */}
          <div className="flex-1 max-w-xs">
            <motion.div
              animate={{
                translateY: "-50%",
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-col gap-6 pb-6"
            >
              {[...new Array(2)].fill(0).map((_, index) => (
                <div key={index}>
                  {testimonials.slice(0, 2).map((testimonial, i) => (
                    <div key={i} className="p-10 rounded-3xl border border-border/50 bg-background shadow-lg shadow-primary/10 max-w-xs w-full mb-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <StarIcon key={starIndex} className="w-5 h-5 text-warning fill-current" />
                        ))}
                      </div>
                      <div className="text-muted-foreground mb-5">{testimonial.text}</div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md"
                        />
                        <div className="flex flex-col">
                          <div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
                          <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">{testimonial.business}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex-1 max-w-xs hidden md:block">
            <motion.div
              animate={{
                translateY: "-50%",
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-col gap-6 pb-6"
            >
              {[...new Array(2)].fill(0).map((_, index) => (
                <div key={index}>
                  {testimonials.slice(2, 4).map((testimonial, i) => (
                    <div key={i} className="p-10 rounded-3xl border border-border/50 bg-background shadow-lg shadow-primary/10 max-w-xs w-full mb-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <StarIcon key={starIndex} className="w-5 h-5 text-warning fill-current" />
                        ))}
                      </div>
                      <div className="text-muted-foreground mb-5">{testimonial.text}</div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md"
                        />
                        <div className="flex flex-col">
                          <div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
                          <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">{testimonial.business}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex-1 max-w-xs hidden lg:block">
            <motion.div
              animate={{
                translateY: "-50%",
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-col gap-6 pb-6"
            >
              {[...new Array(2)].fill(0).map((_, index) => (
                <div key={index}>
                  {testimonials.slice(4, 6).map((testimonial, i) => (
                    <div key={i} className="p-10 rounded-3xl border border-border/50 bg-background shadow-lg shadow-primary/10 max-w-xs w-full mb-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, starIndex) => (
                          <StarIcon key={starIndex} className="w-5 h-5 text-warning fill-current" />
                        ))}
                      </div>
                      <div className="text-muted-foreground mb-5">{testimonial.text}</div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md"
                        />
                        <div className="flex flex-col">
                          <div className="font-medium tracking-tight leading-5 text-foreground">{testimonial.name}</div>
                          <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">{testimonial.business}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
