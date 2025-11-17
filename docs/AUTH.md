# Sistema de Autenticação - LucroFácil

## 📋 Visão Geral

Sistema de autenticação completo implementado com **Context API** e **localStorage** para persistência de dados.

## 🔐 Funcionalidades

### ✅ Cadastro de Usuário
- Validação de e-mail único
- Senha mínima de 6 caracteres
- Avatar gerado automaticamente (DiceBear)
- Armazenamento seguro no localStorage

### ✅ Login
- Autenticação por e-mail e senha
- Validação de credenciais
- Sessão persistente após reload
- Mensagens de erro amigáveis

### ✅ Logout
- Limpeza de dados da sessão
- Redirecionamento automático
- Remoção de tokens do localStorage

### ✅ Perfil do Usuário
- Edição de informações pessoais
- Atualização em tempo real
- Sincronização com localStorage
- Feedback visual de salvamento

### ✅ Proteção de Rotas
- Componente `ProtectedRoute`
- Redirecionamento automático para login
- Loading state durante verificação

## 📂 Estrutura de Arquivos

```
src/
├── contexts/
│   └── AuthContext.tsx          # Context API com hooks
├── components/
│   ├── ProtectedRoute.tsx       # HOC para rotas protegidas
│   └── Profile.tsx              # Página de perfil
├── pages/
│   ├── Auth.tsx                 # Componente de autenticação interno
│   ├── AuthPage.tsx             # Página de autenticação standalone
│   └── Index.tsx                # Dashboard principal
└── App.tsx                      # Configuração de rotas
```

## 💾 Estrutura de Dados no localStorage

### Usuário Autenticado
```javascript
// Key: "lucrofacil_user"
{
  "id": "user_1731801600000",
  "name": "Maria Silva",
  "email": "maria@exemplo.com",
  "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria Silva",
  "phone": "(11) 98765-4321",
  "dateOfBirth": "1990-05-15",
  "address": "Rua das Flores, 123 - São Paulo, SP",
  "businessType": "food",
  "createdAt": "2025-11-17T10:30:00.000Z"
}
```

### Lista de Usuários
```javascript
// Key: "lucrofacil_users"
[
  {
    "id": "user_1731801600000",
    "name": "Maria Silva",
    "email": "maria@exemplo.com",
    "password": "senha123",  // ⚠️ Apenas para demo - use hash em produção
    "avatar": "https://...",
    "createdAt": "2025-11-17T10:30:00.000Z"
  }
]
```

### Flag de Autenticação
```javascript
// Key: "lucrofacil_auth"
"true"  // String boolean
```

## 🔧 Como Usar

### 1. Envolver a aplicação com AuthProvider

```tsx
// App.tsx
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Seus componentes */}
    </AuthProvider>
  );
}
```

### 2. Usar o hook useAuth

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Verificar se está autenticado
  if (!isAuthenticated) {
    return <div>Faça login</div>;
  }
  
  // Acessar dados do usuário
  return <div>Olá, {user?.name}</div>;
}
```

### 3. Proteger rotas

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

<Route path="/app" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 4. Fazer login

```tsx
const { login } = useAuth();

const handleLogin = async () => {
  try {
    await login('email@exemplo.com', 'senha123');
    // Sucesso - usuário está logado
  } catch (error) {
    console.error('Erro:', error.message);
  }
};
```

### 5. Fazer cadastro

```tsx
const { signup } = useAuth();

const handleSignup = async () => {
  try {
    await signup('Nome', 'email@exemplo.com', 'senha123');
    // Sucesso - usuário criado e logado automaticamente
  } catch (error) {
    console.error('Erro:', error.message);
  }
};
```

### 6. Atualizar perfil

```tsx
const { updateProfile } = useAuth();

const handleUpdate = () => {
  updateProfile({
    phone: '(11) 98765-4321',
    address: 'Novo endereço'
  });
};
```

### 7. Fazer logout

```tsx
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  // Usuário desconectado e dados removidos
};
```

## 🎯 Fluxos de Autenticação

### Cadastro
1. Usuário preenche formulário
2. Sistema valida e-mail único
3. Cria novo usuário com ID único
4. Salva na lista de usuários
5. Faz login automático
6. Redireciona para dashboard

### Login
1. Usuário insere credenciais
2. Sistema busca usuário na lista
3. Valida senha
4. Salva sessão no localStorage
5. Atualiza estado global
6. Redireciona para dashboard

### Logout
1. Usuário clica em sair
2. Remove dados do localStorage
3. Limpa estado global
4. Redireciona para página de login

### Persistência
1. App inicia
2. Verifica localStorage
3. Se tem sessão válida, restaura usuário
4. Caso contrário, mantém deslogado

## ⚠️ Considerações de Segurança

### Para Produção
- **NÃO** armazene senhas em plain text
- Use bcrypt ou similar para hash de senhas
- Implemente tokens JWT
- Use HTTPS sempre
- Adicione rate limiting
- Implemente 2FA (autenticação de dois fatores)
- Use Supabase Auth para produção real

### Limitações Atuais (Demo)
- Senhas não são hasheadas
- Dados no localStorage são acessíveis
- Sem expiração de sessão
- Sem refresh tokens
- Sem verificação de e-mail

## 🔄 Migração para Supabase

Para usar autenticação real do Supabase, substitua:

```tsx
// AuthContext.tsx
import { supabase } from '@/integrations/supabase/client';

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

const signup = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};
```

## 📝 Exemplos de Teste

### Usuário de Teste
```
E-mail: teste@lucrofacil.com
Senha: 123456
```

### Criar novo usuário
1. Acesse `/auth`
2. Clique em "Cadastre-se"
3. Preencha nome, e-mail e senha
4. Clique em "Criar conta"

### Testar login
1. Use credenciais de um usuário cadastrado
2. Clique em "Entrar"
3. Verifique redirecionamento para `/app`

## 🐛 Troubleshooting

### Erro: "E-mail ou senha inválidos"
- Verifique se o usuário existe
- Confirme a senha
- Limpe o localStorage e tente novamente

### Erro: "Este e-mail já está cadastrado"
- Use outro e-mail
- Ou faça login com o e-mail existente

### Sessão não persiste
- Verifique se localStorage está habilitado
- Confirme que não há extensões bloqueando

### Avatar não carrega
- Verifique conexão com internet
- DiceBear API pode estar offline
- Avatar padrão será exibido

## 📚 Recursos Adicionais

- [Context API](https://react.dev/reference/react/useContext)
- [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [React Router](https://reactrouter.com/en/main/start/tutorial)

---

**Status**: ✅ Implementado e funcional
**Última atualização**: 17/11/2025
