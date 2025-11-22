import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Calendar, User, Share2, Bookmark,
  TrendingUp, DollarSign, CheckCircle, AlertCircle,
  Calculator, PieChart, Target, ChevronRight, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucroFacilNavbar } from '@/components/ui/lucrofacil-navbar';
import { Separator } from '@/components/ui/separator';

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      tips?: string[];
      formula?: string;
      example?: {
        title: string;
        description: string;
        calculation: string;
        result: string;
      };
    }[];
    conclusion: string;
  };
}

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  // Database de artigos completos
  const blogPosts: { [key: string]: BlogPostData } = {
    'precificacao-sorveteria': {
      id: 'precificacao-sorveteria',
      title: 'Como Precificar Produtos para Sorveteria: Guia Completo',
      excerpt: 'Aprenda a calcular o preço ideal dos seus sorvetes, picolés e açaí considerando custos, margem de lucro e concorrência.',
      category: 'Sorveteria',
      readTime: '8 min',
      date: '20 Nov 2025',
      author: 'Equipe LucroFácil',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=600&fit=crop',
      tags: ['Precificação', 'Sorveteria', 'Custos'],
      content: {
        introduction: 'Precificar produtos em uma sorveteria vai muito além de simplesmente adicionar uma margem sobre os custos. É preciso considerar diversos fatores como qualidade dos ingredientes, concorrência, localização e público-alvo. Neste guia completo, você vai aprender o passo a passo para calcular o preço ideal dos seus produtos.',
        sections: [
          {
            title: '1. Calcule Todos os Custos do Produto',
            content: 'O primeiro passo é identificar TODOS os custos envolvidos na produção de cada produto. Isso inclui custos diretos e indiretos.',
            tips: [
              'Ingredientes: leite, açúcar, frutas, chocolate, etc.',
              'Embalagens: copinhos, colheres, guardanapos',
              'Energia elétrica para freezers e máquinas',
              'Mão de obra (seu tempo ou funcionários)',
              'Aluguel proporcional ao espaço usado',
              'Perdas e desperdícios (considere 5-10%)'
            ]
          },
          {
            title: '2. Use a Fórmula de Precificação',
            content: 'Depois de calcular todos os custos, aplique a fórmula básica de precificação:',
            formula: 'Preço de Venda = (Custo Total / (1 - Margem de Lucro Desejada %))',
            example: {
              title: 'Exemplo: Sorvete de Chocolate 500ml',
              description: 'Vamos calcular o preço de um pote de sorvete de 500ml:',
              calculation: `
• Ingredientes: R$ 3,50
• Embalagem: R$ 0,80
• Custos indiretos (energia, aluguel): R$ 1,20
• Total de custos: R$ 5,50
• Margem desejada: 60% (0,60)

Cálculo: R$ 5,50 / (1 - 0,60) = R$ 5,50 / 0,40 = R$ 13,75
              `,
              result: 'Preço de venda recomendado: R$ 13,75 a R$ 15,00'
            }
          },
          {
            title: '3. Analise a Concorrência',
            content: 'Pesquise os preços praticados por sorveterias na sua região. Isso não significa copiar os preços, mas entender o que o mercado está disposto a pagar.',
            tips: [
              'Visite pelo menos 5 concorrentes na região',
              'Compare produtos similares em qualidade',
              'Observe os diferenciais de cada estabelecimento',
              'Considere a localização e público-alvo',
              'Identifique oportunidades de posicionamento'
            ]
          },
          {
            title: '4. Defina sua Estratégia de Preço',
            content: 'Com base nos custos e na análise de concorrência, escolha sua estratégia:',
            tips: [
              'Preço Premium: produtos artesanais, ingredientes especiais',
              'Preço Competitivo: qualidade boa com preço justo',
              'Preço Penetração: preços baixos para ganhar mercado',
              'Preço Psicológico: R$ 9,90 em vez de R$ 10,00'
            ]
          },
          {
            title: '5. Considere Produtos Âncora',
            content: 'Tenha produtos com diferentes margens de lucro para atrair e manter clientes.',
            tips: [
              'Produtos chamariz: margens menores para atrair',
              'Produtos principais: margem média, alto volume',
              'Produtos premium: margens altas, menor volume',
              'Combos e promoções estratégicas'
            ]
          }
        ],
        conclusion: 'Uma precificação bem feita é fundamental para a saúde financeira da sua sorveteria. Revise seus preços regularmente (a cada 3-6 meses), acompanhe seus custos e esteja sempre atento ao mercado. Use o LucroFácil para controlar custos, calcular margens automaticamente e tomar decisões baseadas em dados reais do seu negócio.'
      }
    },
    'precificacao-costura': {
      id: 'precificacao-costura',
      title: 'Precificação em Confecção e Costura: Não Perca Dinheiro',
      excerpt: 'Descubra como calcular corretamente o valor do seu trabalho manual, incluindo materiais, tempo e expertise.',
      category: 'Costura',
      readTime: '10 min',
      date: '18 Nov 2025',
      author: 'Equipe LucroFácil',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f5d2b?w=1200&h=600&fit=crop',
      tags: ['Precificação', 'Costura', 'Artesanato'],
      content: {
        introduction: 'Um dos maiores erros de quem trabalha com costura é não valorizar adequadamente o próprio trabalho. Muitos costureiros cobram apenas o material e esquecem do tempo, expertise e custos operacionais. Aprenda a precificar corretamente e garanta a lucratividade do seu negócio.',
        sections: [
          {
            title: '1. Calcule o Valor da Sua Hora de Trabalho',
            content: 'Antes de precificar qualquer peça, você precisa saber quanto vale sua hora de trabalho.',
            formula: 'Valor/Hora = (Salário desejado mensal + Custos fixos) / Horas trabalhadas no mês',
            example: {
              title: 'Exemplo de Cálculo da Hora',
              description: 'Considere que você quer ganhar R$ 3.000/mês:',
              calculation: `
• Salário desejado: R$ 3.000
• Custos fixos mensais: R$ 800 (aluguel, luz, internet)
• Horas trabalhadas: 160h/mês (8h/dia, 20 dias)

Cálculo: (R$ 3.000 + R$ 800) / 160h = R$ 23,75/hora
              `,
              result: 'Sua hora de trabalho deve custar pelo menos R$ 23,75'
            }
          },
          {
            title: '2. Liste Todos os Materiais Utilizados',
            content: 'Registre cada material usado na confecção da peça com valores reais de mercado.',
            tips: [
              'Tecidos (considere a metragem exata)',
              'Linhas, botões, zíperes, elásticos',
              'Entretelas, vieses, fitas',
              'Etiquetas personalizadas',
              'Embalagem final',
              'Adicione 10% para cobrir desperdícios'
            ]
          },
          {
            title: '3. Calcule o Tempo de Confecção',
            content: 'Cronometre quanto tempo você leva para fazer cada peça, incluindo todas as etapas.',
            tips: [
              'Corte e preparo do tecido',
              'Costura e montagem',
              'Acabamentos e detalhes',
              'Passadoria final',
              'Embalagem',
              'Seja realista com o tempo!'
            ]
          },
          {
            title: '4. Aplique a Fórmula Completa',
            content: 'Junte todos os elementos para chegar ao preço final:',
            formula: 'Preço = Materiais + (Horas × Valor/Hora) + Margem de Lucro (30-50%)',
            example: {
              title: 'Exemplo: Vestido sob Medida',
              description: 'Vamos calcular o preço de um vestido:',
              calculation: `
• Materiais: R$ 85,00
• Tempo: 6 horas × R$ 23,75 = R$ 142,50
• Subtotal: R$ 227,50
• Margem de lucro (40%): R$ 91,00

Total: R$ 227,50 + R$ 91,00 = R$ 318,50
              `,
              result: 'Preço sugerido: R$ 320,00 a R$ 350,00'
            }
          },
          {
            title: '5. Valorize sua Expertise',
            content: 'Se você tem especialização ou anos de experiência, isso deve ser refletido no preço.',
            tips: [
              'Técnicas especiais (bordado, aplicações)',
              'Peças complexas ou modelagem avançada',
              'Atendimento personalizado',
              'Exclusividade e originalidade',
              'Prazo de entrega diferenciado'
            ]
          }
        ],
        conclusion: 'Lembre-se: seu trabalho tem valor! Não tenha medo de cobrar um preço justo que remunere adequadamente seu tempo, habilidade e investimento. Clientes que buscam qualidade estão dispostos a pagar por isso. Use o LucroFácil para controlar cada projeto, calcular custos precisos e garantir que você está lucrando em cada peça confeccionada.'
      }
    },
    'precificacao-cafeteria': {
      id: 'precificacao-cafeteria',
      title: 'Como Precificar Bebidas em Cafeterias e Coffee Shops',
      excerpt: 'Estratégias de precificação para cafés, cappuccinos e outras bebidas especiais mantendo lucratividade.',
      category: 'Cafeteria',
      readTime: '7 min',
      date: '15 Nov 2025',
      author: 'Equipe LucroFácil',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=600&fit=crop',
      tags: ['Precificação', 'Cafeteria', 'Bebidas'],
      content: {
        introduction: 'O mercado de cafeterias é altamente competitivo, mas também oferece excelentes margens de lucro quando bem gerenciado. A precificação correta das bebidas é essencial para equilibrar qualidade, valor percebido e lucratividade.',
        sections: [
          {
            title: '1. Calcule o Custo Exato de Cada Bebida',
            content: 'Meça com precisão cada ingrediente usado em suas receitas padrão.',
            tips: [
              'Café em grãos (considere dose de espresso)',
              'Leite e leites especiais (integral, desnatado, vegetais)',
              'Açúcar, xaropes, caldas',
              'Chantilly, chocolate, canela',
              'Copo, tampa, canudo',
              'Guardanapo e sleeve (protetor térmico)'
            ]
          },
          {
            title: '2. Entenda a Regra dos Terços',
            content: 'Uma regra prática muito usada no setor é dividir o preço em três partes iguais:',
            tips: [
              '1/3 para cobrir custos dos ingredientes',
              '1/3 para cobrir custos operacionais (aluguel, salários, etc)',
              '1/3 de lucro líquido'
            ],
            formula: 'Preço de Venda = Custo dos Ingredientes × 3'
          },
          {
            title: '3. Exemplo Prático: Cappuccino Médio',
            content: 'Vamos calcular o preço de um cappuccino de 300ml:',
            example: {
              title: 'Cappuccino Médio (300ml)',
              description: 'Breakdown completo dos custos:',
              calculation: `
• Café espresso (30ml): R$ 0,80
• Leite vaporizado (200ml): R$ 1,20
• Chocolate em pó: R$ 0,30
• Copo + tampa: R$ 0,50
• Total de ingredientes: R$ 2,80

Aplicando a regra dos terços:
Preço = R$ 2,80 × 3 = R$ 8,40
              `,
              result: 'Preço sugerido: R$ 8,00 a R$ 9,00'
            }
          },
          {
            title: '4. Estratégias de Precificação Psicológica',
            content: 'Use técnicas que influenciam a percepção de valor do cliente:',
            tips: [
              'Tamanhos: P, M, G com diferenças de R$ 2-3',
              'Crie um "tamanho âncora" (muito caro) para tornar o médio atrativo',
              'Use preços terminados em 0 ou 9 (R$ 9,90)',
              'Destaque o "mais vendido" no cardápio',
              'Ofereça upgrades (leite especial, shot extra)'
            ]
          },
          {
            title: '5. Margens por Tipo de Produto',
            content: 'Diferentes produtos podem ter diferentes margens de lucro:',
            tips: [
              'Café expresso simples: 70-80% de margem',
              'Bebidas com leite: 60-70% de margem',
              'Bebidas especiais/frapês: 65-75% de margem',
              'Alimentos (doces, salgados): 50-60% de margem',
              'Produtos âncora (pão de queijo): 40-50% de margem'
            ]
          }
        ],
        conclusion: 'A precificação em cafeterias exige equilíbrio entre valor percebido, qualidade dos produtos e rentabilidade. Revise seus custos mensalmente, teste diferentes estratégias de preço e sempre acompanhe a satisfação dos clientes. O LucroFácil ajuda você a controlar custos de cada bebida, calcular margens em tempo real e identificar seus produtos mais lucrativos.'
      }
    }
  };

  const post = postId ? blogPosts[postId] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LucroFacilNavbar />

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <Card className="p-8 md:p-12 shadow-2xl border-2 border-border/50">
          {/* Breadcrumb */}
          <Button 
            variant="ghost" 
            className="mb-6 -ml-4"
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o blog
          </Button>

          {/* Category Badge */}
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-sm">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} de leitura</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8 pb-8 border-b border-border">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.content.introduction}
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="bg-muted/30 border-2 border-border/50 p-6 mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <Calculator className="w-5 h-5 text-primary" />
              Neste artigo você vai aprender:
            </h3>
            <ul className="space-y-2">
              {post.content.sections.map((section, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{section.title}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Content Sections */}
          {post.content.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                {section.title}
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {section.content}
              </p>

              {section.tips && (
                <Card className="bg-primary/5 border-primary/20 p-6 mb-6">
                  <ul className="space-y-3">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {section.formula && (
                <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30 p-6 mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Calculator className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Fórmula:</h4>
                      <p className="font-mono text-lg text-foreground font-semibold">
                        {section.formula}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {section.example && (
                <Card className="bg-muted/50 border-2 border-border/50 p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <PieChart className="w-6 h-6 text-primary flex-shrink-0" />
                    <h4 className="font-bold text-xl text-foreground">
                      {section.example.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {section.example.description}
                  </p>
                  <div className="bg-background rounded-lg p-4 mb-4 border border-border">
                    <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                      {section.example.calculation}
                    </pre>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                    <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        {section.example.result}
                      </span>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ))}

          <Separator className="my-12" />

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Conclusão
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>

          {/* CTA Box */}
          <Card className="bg-gradient-to-br from-primary via-primary/95 to-accent p-8 text-center border-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Pronto para aplicar essas estratégias?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Use o LucroFácil para calcular custos, definir preços e acompanhar a lucratividade de cada produto em tempo real.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Começar gratuitamente
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </Card>

        {/* Related Articles */}
        <div className="mt-16 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Continue aprendendo
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(blogPosts)
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Card 
                  key={relatedPost.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-gradient-to-r from-primary to-accent text-white text-xs">
                      {relatedPost.category}
                    </Badge>
                    <h4 className="font-bold text-foreground line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {relatedPost.readTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
