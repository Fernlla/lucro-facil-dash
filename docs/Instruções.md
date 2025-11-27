...existing code...

# Instruções de Desenvolvimento — LucroFácil

Breve: orientações práticas para manter código limpo, simples e escalável no projeto LucroFácil (React + TypeScript + Vite + Tailwind + shadcn/ui).

---

## 1. DRY — Don't Repeat Yourself
- Objetivo: evitar duplicação de código e inconsistências.
- Como aplicar:
  - Extrair strings, estilos e dados repetidos para constantes ou arquivos de dados.
  - Criar componentes reutilizáveis para elementos UI repetidos (botões, cards, lists).
- Exemplo: defina uma cor em uma constante e reutilize em vários botões.
- Benefícios: manutenção mais simples, menos bugs, mudanças globais fáceis.

---

## 2. KISS — Keep It Simple, Stupid
- Objetivo: preferir soluções simples e diretas.
- Como aplicar:
  - Use a solução mínima que resolva o problema.
  - Evite abstrações prematuras e arquiteturas complexas sem necessidade.
- Exemplo: prefira um componente de 150 linhas ao invés de uma solução de 1500 que entrega o mesmo.
- Benefícios: menos código, menos bugs, desenvolvimento mais rápido.

---

## 3. YAGNI — You Aren't Gonna Need It
- Objetivo: implementar apenas o que é necessário agora.
- Como aplicar:
  - Não adicione funcionalidades futuras sem necessidade real.
  - Evite camadas extras ou modos que não serão usados no curto prazo.
- Exemplo: não construir edição colaborativa em tempo real antes do editor básico.
- Benefícios: menos complexidade e retrabalho.

---

## 4. Estrutura por Feature (recomendada)
- Objetivo: organizar o código por domínio/feature para facilitar foco e contexto.
- Estrutura sugerida:
  - features/auth/
    - components/
    - hooks/
    - services/
    - schemas/
  - features/dashboard/
  - features/landing/
- Como aplicar:
  - Cada feature contém seus componentes, hooks, tipos e testes.
  - Evite agrupar tudo em pastas genéricas (components/, hooks/).
- Benefícios: alterações localizadas, contexto reduzido, produtividade da equipe e da IA.

---

## 5. Separation of Concerns
- Objetivo: manter responsabilidades bem definidas.
- Como aplicar:
  - UI vs lógica: componentes apresentam, hooks/processos executam.
  - Mantenha prompts, configs, integrações e helpers em arquivos separados.
  - Use TanStack Query, React Hook Form e Zod nos lugares adequados.
- Benefícios: testes mais fáceis, refatorações seguras, menor chance de regressões.

---

## 6. Boas práticas e ferramentas
- TypeScript: use strict mode e tipos bem definidos.
- Estilo: Tailwind + shadcn/ui para consistência visual.
- Formulários: React Hook Form + Zod.
- Estado/Sync: TanStack Query.
- Notificações: Sonner.
- Commits: siga Conventional Commits (feat:, fix:, chore:).
- Dev: npm run dev / npm run build / npm run lint.
- Supabase: mantenha segredos em `.env`; use `supabase/functions` para Edge Functions.

---

## Checklist rápido antes de PR
- [ ] Não há duplicação importante (DRY).
- [ ] Componentes pequenos e com responsabilidade única.
- [ ] Tipos TypeScript cobrindo props e dados.
- [ ] Imports atualizados e caminhos relativos/alias corretos.
- [ ] Nenhum comportamento desnecessário implementado (YAGNI).
- [ ] Testes/estados cobertos onde fizer sentido.
- [ ] Lint ok e build local funcionando.

---

Se quiser, aplico automaticamente esta reorganização em uma feature específica (ex.: refatorar `Landing.tsx` para `features/landing/`) e gero o diff das mudanças.  