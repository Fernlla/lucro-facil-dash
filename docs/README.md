# LucroFácil - Dashboard de Gestão Financeira

## 📋 Visão Geral

O **LucroFácil** é uma aplicação web moderna e intuitiva desenvolvida para ajudar pequenos empreendedores a gerenciar seus negócios de forma eficiente. A plataforma oferece controle financeiro completo, gestão de produtos, acompanhamento de vendas e insights sobre lucratividade.

### 🎯 Objetivo

Facilitar o controle financeiro de pequenos negócios, permitindo que empreendedores:
- Acompanhem vendas e lucros em tempo real
- Gerenciem produtos e estoque
- Definam e monitorem metas financeiras
- Recebam insights inteligentes via IA

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes modernos
- **Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e consistentes

### Backend & Infraestrutura
- **Supabase** - Backend-as-a-Service (BaaS)
  - Banco de dados PostgreSQL
  - Autenticação
  - Edge Functions para IA
- **Deno** - Runtime para Edge Functions
- **Google Gemini 2.5 Flash** - IA para assistente virtual

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **TanStack Query** - Cache e sincronização de dados
- **Sonner** - Sistema de notificações toast

## 🏗️ Arquitetura do Projeto

```
lucro-facil-dash/
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes base (shadcn/ui)
│   │   ├── Assistant.tsx    # Chat com IA
│   │   ├── Profile.tsx      # Perfil do usuário
│   │   ├── Settings.tsx     # Configurações
│   │   ├── Products.tsx     # Gestão de produtos
│   │   ├── ProductsList.tsx # Lista de produtos
│   │   ├── Notifications.tsx# Notificações
│   │   └── Help.tsx         # Ajuda
│   ├── pages/               # Páginas da aplicação
│   │   ├── Index.tsx        # Dashboard principal
│   │   ├── Auth.tsx         # Autenticação
│   │   └── NotFound.tsx     # Página 404
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilitários
│   ├── integrations/        # Integrações externas
│   │   └── supabase/        # Cliente Supabase
│   └── main.tsx             # Entry point
├── supabase/
│   ├── config.toml          # Configuração do Supabase
│   └── functions/           # Edge Functions
│       └── chat-assistant/  # Função para IA
├── docs/                    # Documentação
├── public/                  # Arquivos estáticos
└── package.json             # Dependências
```

## 🚀 Funcionalidades Principais

### 1. Dashboard Principal
- **Métricas em Tempo Real**
  - Faturamento diário
  - Custos totais
  - Lucro líquido
  - Margem de lucro
  - Progresso de metas

- **Visualizações**
  - Cards com gradientes coloridos
  - Barras de progresso animadas
  - Indicadores de performance
  - Comparações com períodos anteriores

### 2. Gestão de Produtos
- **Cadastro de Produtos**
  - Nome e categoria
  - Custo e preço de venda
  - Cálculo automático de margem
  - Status ativo/inativo

- **Análise de Produtos**
  - Margem de lucro por produto
  - Performance de vendas
  - Categorização inteligente

### 3. Controle de Vendas
- **Registro de Vendas**
  - Seleção de produtos
  - Quantidade vendida
  - Preço customizável
  - Cálculo automático de lucro

- **Histórico de Vendas**
  - Lista de vendas recentes
  - Detalhes por transação
  - Timestamps precisos

### 4. Assistente IA
- **Chat Inteligente**
  - Respostas em tempo real
  - Streaming de texto
  - Contexto de negócio
  - Sugestões personalizadas

- **Capacidades**
  - Dicas de gestão financeira
  - Ajuda com o uso do app
  - Análise de performance
  - Estratégias de crescimento

### 5. Sistema de Temas
- **Modo Claro/Escuro**
  - Toggle automático
  - Persistência de preferência
  - Modo sistema (detecção automática)
  - Transições suaves

### 6. Onboarding
- **Seleção de Tipo de Negócio**
  - Alimentação (sorvetes, doces)
  - Confecção (costura, bordados)
  - Revenda (cosméticos, roupas)
  - Artesanato (bijuterias, decoração)

## 🎨 Design System

### Paleta de Cores
```css
/* Cores Principais */
--primary: 215 90% 55%        /* Azul principal */
--secondary: 215 20% 95%      /* Cinza claro */
--success: 145 70% 50%        /* Verde sucesso */
--warning: 35 90% 55%         /* Amarelo aviso */
--destructive: 0 85% 60%      /* Vermelho erro */

/* Gradientes */
--gradient-primary: linear-gradient(135deg, hsl(215 90% 55%), hsl(220 85% 60%))
--gradient-success: linear-gradient(135deg, hsl(145 70% 50%), hsl(150 65% 55%))
```

### Componentes UI
- **Cards** com sombras suaves e bordas arredondadas
- **Botões** com gradientes e estados hover
- **Inputs** com foco visual e validação
- **Modais** com backdrop blur
- **Navegação** responsiva com sidebar

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase
- Chave API do Lovable (para IA)

### 1. Clone o Repositório
```bash
git clone <repository-url>
cd lucro-facil-dash
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# IA (Edge Function)
LOVABLE_API_KEY=your_lovable_api_key
```

### 4. Configure o Supabase
```bash
# Instale o CLI do Supabase
npm install -g supabase

# Inicie o projeto local
supabase start

# Deploy das Edge Functions
supabase functions deploy chat-assistant
```

### 5. Execute o Projeto
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Adaptações Mobile
- Menu hambúrguer na navbar
- Botão flutuante para nova venda
- Cards empilhados verticalmente
- Sidebar colapsível

## 🔐 Autenticação e Segurança

### Supabase Auth
- Autenticação por email/senha
- Sessões persistentes
- Auto-refresh de tokens
- Armazenamento seguro no localStorage

### Edge Functions
- CORS configurado
- Validação de headers
- Rate limiting
- Error handling robusto

## 🤖 Sistema de IA

### Assistente Virtual
- **Modelo**: Google Gemini 2.5 Flash
- **Streaming**: Respostas em tempo real
- **Contexto**: Especializado em gestão financeira
- **Idioma**: Português brasileiro

### Funcionalidades da IA
- Dicas de gestão financeira
- Ajuda com uso da aplicação
- Análise de performance
- Sugestões de melhorias
- Cálculos de margem e lucro

## 📊 Estrutura de Dados

### Produtos
```typescript
interface Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  category: string;
  active: boolean;
}
```

### Vendas
```typescript
interface Sale {
  id: number;
  productId: number;
  product: string;
  quantity: number;
  price: number;
  cost: number;
  date: Date;
  profit: number;
}
```

### Metas
```typescript
interface Goals {
  daily: number;
  monthly: number;
}
```

## 🚀 Deploy e Produção

### Build de Produção
```bash
npm run build
```

### Deploy no Supabase
```bash
supabase functions deploy
```

### Variáveis de Produção
- Configure as variáveis no painel do Supabase
- Use secrets para chaves sensíveis
- Configure domínios customizados se necessário

## 🧪 Testes e Qualidade

### Linting
```bash
npm run lint
```

### Estrutura de Testes (Recomendada)
- Testes unitários com Jest/Vitest
- Testes de integração com Testing Library
- E2E com Playwright ou Cypress

## 📈 Performance

### Otimizações Implementadas
- **Code Splitting** com Vite
- **Lazy Loading** de componentes
- **Memoização** com React.memo
- **Bundle Analysis** disponível

### Métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔄 Atualizações e Manutenção

### Versionamento
- Seguindo Semantic Versioning
- Changelog detalhado
- Breaking changes documentados

### Monitoramento
- Logs de erro no console
- Métricas de performance
- Feedback de usuários via IA

## 🤝 Contribuição

### Padrões de Código
- TypeScript strict mode
- ESLint + Prettier
- Conventional Commits
- Componentes funcionais com hooks

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração sem mudança funcional
test: adiciona ou corrige testes
```

## 📞 Suporte e Contato

### Documentação Adicional
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Problemas Conhecidos
- Edge Functions podem ter latência inicial
- Alguns navegadores antigos podem ter problemas com CSS Grid
- Streaming de IA pode ser interrompido em conexões lentas

---

## 📝 Changelog

### v1.0.0 (Atual)
- ✅ Dashboard principal com métricas
- ✅ Gestão de produtos
- ✅ Controle de vendas
- ✅ Assistente IA
- ✅ Sistema de temas
- ✅ Onboarding personalizado
- ✅ Design responsivo

### Próximas Versões
- 🔄 Relatórios avançados
- 🔄 Exportação de dados
- 🔄 Notificações push
- 🔄 Multi-usuário
- 🔄 Integração com APIs de pagamento

---

**Desenvolvido com ❤️ para pequenos empreendedores**

