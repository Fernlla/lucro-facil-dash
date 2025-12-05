-- Enhanced Row Level Security for public.users
-- This migration adds stricter RLS policies to protect user data

-- Drop existing policies to recreate with better naming and stricter rules
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Service role has full access" ON public.users;

-- RLS Policy: Users can only SELECT their own record
CREATE POLICY "users_select_own"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- RLS Policy: Users can only UPDATE their own record (limited fields)
CREATE POLICY "users_update_own"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() 
    AND email = (SELECT email FROM public.users WHERE id = auth.uid()) -- Prevent email changes
  );

-- RLS Policy: Block direct INSERTs from client
-- Users are created ONLY via auth trigger, not directly by clients
-- No INSERT policy = no one can insert (except service_role via trigger)

-- RLS Policy: Block direct DELETEs from client
-- Users are deleted ONLY via auth.users CASCADE
-- No DELETE policy = no one can delete directly

-- RLS Policy: Service role has full access for internal operations
CREATE POLICY "service_role_full_access"
  ON public.users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled (should already be enabled from previous migration)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owner (extra security)
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;

-- Revoke unnecessary permissions from authenticated users
REVOKE INSERT, DELETE ON public.users FROM authenticated;

-- Grant only SELECT and UPDATE to authenticated users
GRANT SELECT, UPDATE (full_name, avatar_url) ON public.users TO authenticated;

-- Service role keeps full access
GRANT ALL ON public.users TO service_role;

-- Add helpful comments
COMMENT ON POLICY "users_select_own" ON public.users IS 
  'Authenticated users can only SELECT their own user record (id = auth.uid())';

COMMENT ON POLICY "users_update_own" ON public.users IS 
  'Authenticated users can only UPDATE their own record. Email changes are blocked.';

COMMENT ON POLICY "service_role_full_access" ON public.users IS 
  'Service role has full access for internal operations (triggers, functions)';

-- Create a helper function to safely update user profile
CREATE OR REPLACE FUNCTION public.update_user_profile(
  new_full_name TEXT DEFAULT NULL,
  new_avatar_url TEXT DEFAULT NULL
)
RETURNS public.users
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_user public.users;
BEGIN
  -- Verify user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Update only allowed fields
  UPDATE public.users
  SET 
    full_name = COALESCE(new_full_name, full_name),
    avatar_url = COALESCE(new_avatar_url, avatar_url),
    updated_at = NOW()
  WHERE id = auth.uid()
  RETURNING * INTO updated_user;

  -- Check if user exists
  IF updated_user IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  RETURN updated_user;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_user_profile TO authenticated;

COMMENT ON FUNCTION public.update_user_profile IS 
  'Safe function for authenticated users to update their profile (full_name, avatar_url only)';

-- Verification query (for testing)
-- SELECT policy_name, policy_cmd, policy_roles::text[], policy_qual, policy_with_check
-- FROM pg_policies 
-- WHERE schemaname = 'public' AND tablename = 'users';
