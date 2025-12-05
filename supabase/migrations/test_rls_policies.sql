-- Test RLS Policies for public.users
-- Run these tests after applying the RLS migration

-- Setup: Create test users (as service_role or via auth.users trigger)
-- These tests assume you're running them with appropriate role context

-- ============================================
-- TEST 1: SELECT - User can read own data
-- ============================================
-- Should succeed (reading own record)
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid-here"}';

SELECT * FROM public.users WHERE id = 'user-uuid-here';
-- Expected: Returns 1 row (the user's own record)

-- Should fail (reading other user's record)
SELECT * FROM public.users WHERE id = 'different-user-uuid';
-- Expected: Returns 0 rows (RLS blocks access)

RESET ROLE;

-- ============================================
-- TEST 2: UPDATE - User can update own profile
-- ============================================
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid-here"}';

-- Should succeed (updating own full_name)
UPDATE public.users 
SET full_name = 'New Name'
WHERE id = 'user-uuid-here';
-- Expected: UPDATE 1

-- Should fail (updating email is blocked)
UPDATE public.users 
SET email = 'newemail@example.com'
WHERE id = 'user-uuid-here';
-- Expected: ERROR - permission denied OR no rows updated

-- Should fail (updating other user's record)
UPDATE public.users 
SET full_name = 'Hacker'
WHERE id = 'different-user-uuid';
-- Expected: UPDATE 0 (RLS blocks access)

RESET ROLE;

-- ============================================
-- TEST 3: INSERT - Client cannot insert directly
-- ============================================
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid-here"}';

-- Should fail (no INSERT permission)
INSERT INTO public.users (id, email, full_name)
VALUES (gen_random_uuid(), 'test@example.com', 'Test User');
-- Expected: ERROR - permission denied for table users

RESET ROLE;

-- ============================================
-- TEST 4: DELETE - Client cannot delete directly
-- ============================================
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid-here"}';

-- Should fail (no DELETE permission)
DELETE FROM public.users WHERE id = 'user-uuid-here';
-- Expected: ERROR - permission denied for table users

RESET ROLE;

-- ============================================
-- TEST 5: Service role has full access
-- ============================================
SET LOCAL ROLE service_role;

-- Should succeed (service role can do anything)
INSERT INTO public.users (id, email, full_name)
VALUES (gen_random_uuid(), 'service@example.com', 'Service User');
-- Expected: INSERT 1

SELECT * FROM public.users;
-- Expected: Returns all users

UPDATE public.users SET full_name = 'Updated' WHERE email = 'service@example.com';
-- Expected: UPDATE 1

DELETE FROM public.users WHERE email = 'service@example.com';
-- Expected: DELETE 1

RESET ROLE;

-- ============================================
-- TEST 6: Helper function works correctly
-- ============================================
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO '{"sub": "user-uuid-here"}';

-- Should succeed (safe profile update)
SELECT public.update_user_profile(
  new_full_name := 'Updated Name',
  new_avatar_url := 'https://example.com/avatar.jpg'
);
-- Expected: Returns updated user record

-- Verify the update
SELECT full_name, avatar_url FROM public.users WHERE id = 'user-uuid-here';
-- Expected: Shows new values

RESET ROLE;

-- ============================================
-- TEST 7: Auth trigger still works
-- ============================================
-- Create a new auth user (should auto-create public.users record)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'trigger-test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"full_name": "Trigger Test User"}',
  NOW(),
  NOW()
);

-- Verify public.users was created automatically
SELECT * FROM public.users WHERE email = 'trigger-test@example.com';
-- Expected: Returns 1 row (auto-created by trigger)

-- ============================================
-- TEST 8: Cascade delete works
-- ============================================
-- Delete from auth.users should cascade to public.users
DELETE FROM auth.users WHERE email = 'trigger-test@example.com';

-- Verify cascade
SELECT * FROM public.users WHERE email = 'trigger-test@example.com';
-- Expected: Returns 0 rows (cascaded delete)

-- ============================================
-- SUMMARY
-- ============================================
-- If all tests pass, RLS is correctly configured:
-- ✅ Users can SELECT only their own record
-- ✅ Users can UPDATE only their own record (limited fields)
-- ✅ Users CANNOT INSERT directly
-- ✅ Users CANNOT DELETE directly
-- ✅ Service role has full access
-- ✅ Helper function works safely
-- ✅ Auth trigger still creates users
-- ✅ Cascade delete works
