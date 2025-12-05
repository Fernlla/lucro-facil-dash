# Database Migrations

## Overview
This directory contains SQL migrations for the LucroFácil database schema.

## Migration Naming Convention
`YYYYMMDDHHMMSS_description.sql`

Example: `20251204000001_create_users_table.sql`

## Current Migrations

### 20251204000001_create_users_table.sql
**Purpose**: Create public.users table synchronized with Supabase Auth

**Features**:
- Creates `public.users` table with foreign key to `auth.users`
- Email stored in lowercase for consistency
- Automatic timestamp management (created_at, updated_at)
- Row Level Security (RLS) policies
- Idempotent trigger for auth sync
- CASCADE delete from auth.users

**Fields**:
- `id` (UUID, PK) - References auth.users(id)
- `email` (TEXT, UNIQUE) - Lowercase email
- `full_name` (TEXT, nullable)
- `avatar_url` (TEXT, nullable)
- `auth_provider` (TEXT) - email, google, github, apple
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Triggers**:
- `on_auth_user_created` - Syncs auth.users → public.users (INSERT/UPDATE)
- `set_updated_at` - Auto-updates updated_at on changes

### 20251204000002_seed_existing_users.sql
**Purpose**: Backfill existing auth.users into public.users

**Features**:
- Idempotent seeding (uses NOT EXISTS)
- Preserves original timestamps
- Verification logging

### 20251204000003_set_rls_policies.sql
**Purpose**: Enhanced Row Level Security policies for user data protection

**Features**:
- Stricter RLS policies (SELECT/UPDATE only for own records)
- Blocks direct INSERT/DELETE from clients
- Service role maintains full access
- Email changes blocked via WITH CHECK
- FORCE ROW LEVEL SECURITY enabled
- Safe helper function: `update_user_profile()`

**Policies**:
- `users_select_own` - Users can SELECT only `id = auth.uid()`
- `users_update_own` - Users can UPDATE only their own record (email blocked)
- `service_role_full_access` - Service role has ALL permissions
- No INSERT policy - Users created only via auth trigger
- No DELETE policy - Users deleted only via CASCADE from auth.users

**Helper Function**:
```sql
update_user_profile(new_full_name TEXT, new_avatar_url TEXT)
```
Safe way for users to update their profile (full_name, avatar_url only).

### 20251204000004_optimize_auth_trigger.sql
**Purpose**: Optimize auth sync trigger to fire ONLY on INSERT (not UPDATE)

**Features**:
- Trigger changed from `AFTER INSERT OR UPDATE` → `AFTER INSERT`
- Prevents unnecessary executions on auth.users UPDATE
- Adds `sync_auth_metadata()` function for manual profile sync
- Email normalization (LOWER)
- OAuth metadata extraction (name/picture fallbacks)

**Why INSERT only?**
- User creation happens once (INSERT)
- Profile updates should use `update_user_profile()` or `sync_auth_metadata()`
- Avoids infinite loops and unnecessary processing

**Manual Sync Function**:
```sql
sync_auth_metadata() -- Syncs auth metadata to public.users on-demand
```
Called by users after OAuth re-authentication to refresh profile data.

## Running Migrations

### Local Development
```bash
# Start Supabase locally
supabase start

# Apply all migrations
supabase db reset

# Or apply specific migration
supabase migration up
```

### Production
```bash
# Link to remote project
supabase link --project-ref your-project-ref

# Push migrations to production
supabase db push
```

## Testing Migrations

### Test User Creation
```sql
-- This should automatically create a public.users record
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('test@example.com', crypt('password', gen_salt('bf')), NOW());

-- Verify sync
SELECT * FROM public.users WHERE email = 'test@example.com';
```

### Test Cascade Delete
```sql
-- Delete from auth.users should cascade to public.users
DELETE FROM auth.users WHERE email = 'test@example.com';

-- Verify cascade
SELECT * FROM public.users WHERE email = 'test@example.com'; -- Should be empty
```

### Test Idempotency
```sql
-- Run the same migration twice - should not error
\i 20251204000001_create_users_table.sql
\i 20251204000001_create_users_table.sql
```

### Test RLS Policies
```bash
# Run comprehensive RLS tests
psql -f supabase/migrations/test_rls_policies.sql
```

Or test manually:
```sql
-- Verify policies exist
SELECT policy_name, policy_cmd, policy_roles::text[]
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'users';

-- Test as authenticated user
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "your-user-uuid"}';
SELECT * FROM public.users; -- Should only return your record
RESET ROLE;
```

### Test Auth Trigger
```bash
# Run auth sync trigger tests
psql -f supabase/migrations/test_auth_trigger.sql
```

Key tests:
```sql
-- Verify trigger fires ONLY on INSERT
SELECT event_manipulation 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
-- Expected: 'INSERT' (NOT 'INSERT, UPDATE')

-- Test email normalization
INSERT INTO auth.users (email, ...) VALUES ('TEST@EXAMPLE.COM', ...);
SELECT email FROM public.users WHERE id = ...; 
-- Expected: 'test@example.com'

-- Test manual sync
SELECT public.sync_auth_metadata(); -- Updates profile from auth metadata
```

## Future Migrations
When adding dependent tables (products, sales, goals), use:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ...
);
```

This ensures cascade deletion from users → dependent tables.

## Rollback Strategy
To rollback a migration:

```bash
# Create a down migration
supabase migration new rollback_users_table

# In the rollback file:
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_updated_at ON public.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_at();
DROP TABLE IF EXISTS public.users CASCADE;
```

## Notes
- All migrations must be idempotent (can run multiple times safely)
- Use `IF NOT EXISTS` and `IF EXISTS` clauses
- Test locally before pushing to production
- Keep migrations atomic (one logical change per file)
- Email is ALWAYS lowercase (enforced by trigger)
