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
