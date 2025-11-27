import { BookOpen, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from './landingData';

const BlogPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-primary/5 border-primary/20 text-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog LucroFácil
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Aprenda a <span className="text-primary">precificar</span> e gerenciar seu negócio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Guias práticos sobre precificação, custos e gestão para diversos tipos de negócios
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 group"
              onClick={() => window.location.href = post.url}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center text-primary font-medium text-sm">
                  Ler artigo
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2"
            onClick={() => window.location.href = '/blog'}
          >
            Ver todos os artigos
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
