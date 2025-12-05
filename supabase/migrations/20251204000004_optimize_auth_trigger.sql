-- Optimize Auth Sync Trigger (TASK-3)
-- Change trigger to fire ONLY on INSERT (not UPDATE) to avoid unnecessary executions

-- Drop the existing trigger that fires on INSERT OR UPDATE
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the trigger to fire ONLY on INSERT
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update function documentation
COMMENT ON TRIGGER on_auth_user_created ON auth.users IS 
  'Automatically creates public.users record when auth.users INSERT occurs. Does NOT fire on UPDATE to avoid unnecessary processing.';

COMMENT ON FUNCTION public.handle_new_user() IS 
  'Syncs auth.users → public.users on new user creation. Extracts metadata (name, avatar, provider) and ensures email is lowercase. Uses ON CONFLICT for idempotency.';

-- Add a separate function for manual profile sync if needed
CREATE OR REPLACE FUNCTION public.sync_auth_metadata()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  auth_user RECORD;
BEGIN
  -- Only allow authenticated users to sync their own metadata
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Get auth user data
  SELECT 
    id,
    email,
    raw_user_meta_data->>'full_name' as full_name,
    raw_user_meta_data->>'name' as name,
    raw_user_meta_data->>'avatar_url' as avatar_url,
    raw_user_meta_data->>'picture' as picture
  INTO auth_user
  FROM auth.users
  WHERE id = auth.uid();

  -- Update public.users with latest auth metadata
  UPDATE public.users
  SET 
    email = LOWER(auth_user.email),
    full_name = COALESCE(auth_user.full_name, auth_user.name, full_name),
    avatar_url = COALESCE(auth_user.avatar_url, auth_user.picture, avatar_url),
    updated_at = NOW()
  WHERE id = auth.uid();

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.sync_auth_metadata TO authenticated;

COMMENT ON FUNCTION public.sync_auth_metadata IS 
  'Allows authenticated users to manually sync their profile with latest auth metadata (e.g., after OAuth re-auth). Called by user, not automatically.';

-- Verification: Check trigger configuration
DO $$
DECLARE
  trigger_count INTEGER;
  trigger_event TEXT;
BEGIN
  SELECT COUNT(*), STRING_AGG(event_manipulation, ', ')
  INTO trigger_count, trigger_event
  FROM information_schema.triggers
  WHERE trigger_name = 'on_auth_user_created'
    AND event_object_schema = 'auth'
    AND event_object_table = 'users';
  
  IF trigger_count = 0 THEN
    RAISE WARNING 'Trigger on_auth_user_created not found!';
  ELSIF trigger_event LIKE '%UPDATE%' THEN
    RAISE WARNING 'Trigger still fires on UPDATE! Expected INSERT only.';
  ELSE
    RAISE NOTICE 'Trigger correctly configured: AFTER % on auth.users', trigger_event;
  END IF;
END $$;
