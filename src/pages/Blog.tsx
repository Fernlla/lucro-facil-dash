import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Clock, TrendingUp, DollarSign, Scissors, 
  IceCream, Coffee, ShoppingBag, ArrowRight, Tag,
  Calendar, User, ChevronRight, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LucroFacilNavbar } from '@/components/ui/lucrofacil-navbar';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  icon: React.ReactNode;
  image: string;
  tags: string[];
}

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const blogPosts: BlogPost[] = [
    {
      id: 'precificacao-sorveteria',
      title: 'Como Precificar Produtos para Sorveteria: Guia Completo',
      excerpt: 'Aprenda a calcular o preço ideal dos seus sorvetes, picolés e açaí considerando custos, margem de lucro e concorrência.',
      category: 'Sorveteria',
      readTime: '8 min',
      date: '20 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <IceCream className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=400&fit=crop',
      tags: ['Precificação', 'Sorveteria', 'Custos']
    },
    {
      id: 'precificacao-costura',
      title: 'Precificação em Confecção e Costura: Não Perca Dinheiro',
      excerpt: 'Descubra como calcular corretamente o valor do seu trabalho manual, incluindo materiais, tempo e expertise.',
      category: 'Costura',
      readTime: '10 min',
      date: '18 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <Scissors className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f5d2b?w=800&h=400&fit=crop',
      tags: ['Precificação', 'Costura', 'Artesanato']
    },
    {
      id: 'precificacao-cafeteria',
      title: 'Como Precificar Bebidas em Cafeterias e Coffee Shops',
      excerpt: 'Estratégias de precificação para cafés, cappuccinos e outras bebidas especiais mantendo lucratividade.',
      category: 'Cafeteria',
      readTime: '7 min',
      date: '15 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <Coffee className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=400&fit=crop',
      tags: ['Precificação', 'Cafeteria', 'Bebidas']
    },
    {
      id: 'precificacao-loja-roupas',
      title: 'Precificação para Lojas de Roupas: Margem e Competitividade',
      excerpt: 'Equilibre preço competitivo e lucratividade no varejo de moda com técnicas profissionais de pricing.',
      category: 'Varejo',
      readTime: '9 min',
      date: '12 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <ShoppingBag className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
      tags: ['Precificação', 'Varejo', 'Moda']
    },
    {
      id: 'margem-lucro-ideal',
      title: 'Qual a Margem de Lucro Ideal para Seu Negócio?',
      excerpt: 'Entenda as diferenças entre markup e margem, e descubra qual a porcentagem ideal para cada tipo de negócio.',
      category: 'Gestão',
      readTime: '6 min',
      date: '10 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <TrendingUp className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
      tags: ['Margem', 'Lucro', 'Gestão']
    },
    {
      id: 'custos-fixos-variaveis',
      title: 'Custos Fixos vs Variáveis: Como Calcular e Precificar',
      excerpt: 'Aprenda a identificar e calcular custos fixos e variáveis para uma precificação mais assertiva.',
      category: 'Gestão',
      readTime: '8 min',
      date: '8 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <DollarSign className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      tags: ['Custos', 'Finanças', 'Gestão']
    },
    {
      id: 'promocoes-descontos',
      title: 'Como Fazer Promoções sem Perder Lucratividade',
      excerpt: 'Estratégias inteligentes para oferecer descontos atrativos mantendo suas margens saudáveis.',
      category: 'Marketing',
      readTime: '7 min',
      date: '5 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <Tag className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
      tags: ['Promoções', 'Descontos', 'Marketing']
    },
    {
      id: 'controle-estoque-pequeno-negocio',
      title: 'Controle de Estoque para Pequenos Negócios',
      excerpt: 'Métodos práticos para controlar estoque sem complicação e evitar perdas financeiras.',
      category: 'Gestão',
      readTime: '9 min',
      date: '3 Nov 2025',
      author: 'Equipe LucroFácil',
      icon: <BookOpen className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
      tags: ['Estoque', 'Gestão', 'Organização']
    }
  ];

  const categories = ['Todos', 'Sorveteria', 'Costura', 'Cafeteria', 'Varejo', 'Gestão', 'Marketing'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      <LucroFacilNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent pt-32 pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge variant="outline" className="mb-4 gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Blog LucroFácil</span>
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Aprenda a <span className="text-green-200">precificar</span> e<br />
              gerenciar seu negócio
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Guias práticos, dicas e estratégias para aumentar a lucratividade do seu negócio
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="pl-12 pr-4 py-6 text-lg bg-white rounded-full shadow-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-background border-b border-border sticky top-0 z-40 backdrop-blur-lg bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-primary to-accent' 
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'Todos' && !searchQuery && (
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="outline" className="mb-6 bg-primary/5 border-primary/20 text-primary">
              Artigo em Destaque
            </Badge>
            
            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-border/50 hover:border-primary/30"
              onClick={() => navigate(`/blog/${featuredPost.id}`)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime} de leitura</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-fit">
                    Ler artigo completo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {searchQuery ? 'Resultados da busca' : selectedCategory === 'Todos' ? 'Todos os artigos' : `Artigos sobre ${selectedCategory}`}
            </h2>
            <span className="text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum artigo encontrado</h3>
              <p className="text-muted-foreground">Tente buscar com outros termos ou escolha outra categoria</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 group"
                    onClick={() => navigate(`/blog/${post.id}`)}
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
                      <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary">
                        {post.icon}
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Ler mais
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-0 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Aplique essas estratégias no seu negócio
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Use o LucroFácil para controlar custos, calcular margens e aumentar seus lucros
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 font-semibold shadow-xl"
            onClick={() => navigate('/auth')}
          >
            Começar gratuitamente
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">LucroFácil</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © 2025 LucroFácil. Todos os direitos reservados.
            </p>
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar para Home
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
