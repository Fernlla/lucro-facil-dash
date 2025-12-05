-- Seed existing auth.users into public.users (if any)
-- This ensures backward compatibility for existing installations

INSERT INTO public.users (id, email, full_name, avatar_url, auth_provider, created_at, updated_at)
SELECT 
  au.id,
  LOWER(au.email),
  COALESCE(au.raw_user_meta_data->>'full_name', au.raw_user_meta_data->>'name'),
  COALESCE(au.raw_user_meta_data->>'avatar_url', au.raw_user_meta_data->>'picture'),
  COALESCE(au.raw_app_meta_data->>'provider', 'email'),
  au.created_at,
  au.updated_at
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
);

-- Verify the migration
DO $$
DECLARE
  auth_count INTEGER;
  public_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO auth_count FROM auth.users;
  SELECT COUNT(*) INTO public_count FROM public.users;
  
  RAISE NOTICE 'Migration complete: % auth.users → % public.users', auth_count, public_count;
  
  IF auth_count != public_count THEN
    RAISE WARNING 'User count mismatch! auth.users: %, public.users: %', auth_count, public_count;
  END IF;
END $$;
