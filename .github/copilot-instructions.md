# Copilot Instructions for LucroFácil Dashboard

## Project Overview
LucroFácil is a modern financial management dashboard for small businesses, built with React, TypeScript, Vite, Tailwind CSS, shadcn/ui, and Supabase. It features real-time metrics, product and sales management, goal tracking, and an AI-powered assistant (Google Gemini 2.5 Flash via Supabase Edge Functions).

## Architecture & Key Directories
- `src/components/` — Main React components (UI, Assistant, Products, Profile, etc.)
- `src/components/ui/` — Base UI components (shadcn/ui)
- `src/pages/` — Application pages (Dashboard, Auth, Landing, NotFound)
- `src/hooks/` — Custom React hooks
- `src/integrations/supabase/` — Supabase client and types
- `src/lib/` — Utility functions
- `supabase/functions/chat-assistant/` — Edge Function for AI assistant
- `public/` — Static assets

## Developer Workflows
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview build:** `npm run preview`
- **Lint code:** `npm run lint`
- **Deploy Edge Functions:** `supabase functions deploy chat-assistant`
- **Start Supabase locally:** `supabase start`

## Environment & Configuration
- Store secrets and API keys in `.env` (see `README.md` for required variables)
- Supabase config in `supabase/config.toml`
- Edge Functions use Deno runtime

## Patterns & Conventions
- **TypeScript strict mode** and ESLint enforced
- **Functional React components** with hooks
- **UI:** Use shadcn/ui and Tailwind CSS for styling; follow color palette in docs
- **Data models:** See `docs/README.md` for `Product`, `Sale`, and `Goals` interfaces
- **Notifications:** Use Sonner for toast messages
- **Routing:** React Router DOM
- **Forms:** React Hook Form + Zod for validation
- **State/data:** TanStack Query for caching and sync
- **Commit messages:** Follow Conventional Commits (`feat:`, `fix:`, etc.)

## Integration Points
- **Supabase:** Auth, database, Edge Functions
- **AI Assistant:** `src/components/Assistant.tsx` (frontend) ↔ `supabase/functions/chat-assistant/index.ts` (backend)
- **External APIs:** Configure via environment variables

## Project-Specific Tips
- **Mobile:** Use `src/hooks/use-mobile.tsx` for responsive logic
- **Theme:** Toggle dark/light mode with smooth transitions
- **Error handling:** Robust in Edge Functions (CORS, headers, rate limiting)
- **Performance:** Code splitting, lazy loading, memoization

## Example: Adding a Product
- Update `src/components/Products.tsx` and `ProductsList.tsx` for UI
- Use Supabase client in `src/integrations/supabase/client.ts` for DB actions
- Validate with Zod, show notifications with Sonner

## References
- See `README.md` and `docs/README.md` for more details
- Key files: `src/components/Assistant.tsx`, `supabase/functions/chat-assistant/index.ts`, `src/integrations/supabase/client.ts`

---
For unclear or missing patterns, ask for clarification or review recent commits for examples.
