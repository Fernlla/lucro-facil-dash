-- Test Auth Sync Trigger (TASK-3)
-- Verify trigger fires ONLY on INSERT, not on UPDATE

-- ============================================
-- TEST 1: Trigger fires on INSERT
-- ============================================

-- Create a new auth user
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
  'TriggerTest@Example.com', -- Mixed case to test lowercase conversion
  crypt('password123', gen_salt('bf')),
  NOW(),
  jsonb_build_object(
    'full_name', 'Test User',
    'name', 'Test', -- Fallback if full_name missing
    'avatar_url', 'https://example.com/avatar.jpg',
    'picture', 'https://example.com/pic.jpg' -- Fallback if avatar_url missing
  ),
  NOW(),
  NOW()
)
RETURNING id;

-- Expected: public.users record created automatically
-- Verify:
SELECT 
  id,
  email, -- Should be 'triggertest@example.com' (lowercase)
  full_name, -- Should be 'Test User'
  avatar_url, -- Should be 'https://example.com/avatar.jpg'
  created_at
FROM public.users 
WHERE email = 'triggertest@example.com';

-- Expected Result:
-- ✅ 1 row returned
-- ✅ email is lowercase
-- ✅ full_name populated from metadata
-- ✅ avatar_url populated from metadata

-- ============================================
-- TEST 2: Trigger does NOT fire on UPDATE
-- ============================================

-- Update auth.users (should NOT trigger public.users update)
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'full_name', 'Updated Name Should Not Sync',
  'avatar_url', 'https://example.com/new-avatar.jpg'
)
WHERE email = 'triggertest@example.com';

-- Verify public.users was NOT updated automatically
SELECT 
  full_name, -- Should still be 'Test User' (NOT 'Updated Name Should Not Sync')
  avatar_url, -- Should still be 'https://example.com/avatar.jpg'
  updated_at
FROM public.users 
WHERE email = 'triggertest@example.com';

-- Expected Result:
-- ✅ full_name = 'Test User' (unchanged)
-- ✅ avatar_url = 'https://example.com/avatar.jpg' (unchanged)
-- ✅ Confirms trigger does NOT fire on UPDATE

-- ============================================
-- TEST 3: Manual sync function works
-- ============================================

-- Simulate authenticated user calling manual sync
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claims" TO jsonb_build_object(
  'sub', (SELECT id::text FROM public.users WHERE email = 'triggertest@example.com')
);

-- Call manual sync function
SELECT public.sync_auth_metadata();

-- Verify public.users was updated with latest auth metadata
SELECT 
  full_name, -- Should now be 'Updated Name Should Not Sync'
  avatar_url, -- Should now be 'https://example.com/new-avatar.jpg'
  updated_at -- Should be recent timestamp
FROM public.users 
WHERE email = 'triggertest@example.com';

-- Expected Result:
-- ✅ full_name = 'Updated Name Should Not Sync' (synced)
-- ✅ avatar_url = 'https://example.com/new-avatar.jpg' (synced)
-- ✅ updated_at is recent

RESET ROLE;

-- ============================================
-- TEST 4: Email normalization works
-- ============================================

-- Test various email formats
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at
) VALUES 
  ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'UPPERCASE@EXAMPLE.COM', crypt('pass', gen_salt('bf')), NOW(), NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'MiXeDCaSe@Example.Com', crypt('pass', gen_salt('bf')), NOW(), NOW(), NOW());

-- Verify all emails are lowercase in public.users
SELECT email FROM public.users WHERE email LIKE '%example.com' ORDER BY email;

-- Expected Result:
-- ✅ 'mixedcase@example.com'
-- ✅ 'uppercase@example.com'
-- ✅ All lowercase

-- ============================================
-- TEST 5: OAuth provider metadata extraction
-- ============================================

-- Simulate Google OAuth user (uses 'name' and 'picture' instead of 'full_name' and 'avatar_url')
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  raw_app_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'google-user@gmail.com',
  crypt('google-oauth', gen_salt('bf')),
  NOW(),
  jsonb_build_object(
    'name', 'Google User', -- OAuth uses 'name' not 'full_name'
    'picture', 'https://lh3.googleusercontent.com/avatar.jpg' -- OAuth uses 'picture' not 'avatar_url'
  ),
  jsonb_build_object('provider', 'google'),
  NOW(),
  NOW()
);

-- Verify fallback to 'name' and 'picture'
SELECT 
  email,
  full_name, -- Should be 'Google User' (from 'name')
  avatar_url, -- Should be Google photo URL (from 'picture')
  auth_provider -- Should be 'google'
FROM public.users 
WHERE email = 'google-user@gmail.com';

-- Expected Result:
-- ✅ full_name = 'Google User'
-- ✅ avatar_url = Google picture URL
-- ✅ auth_provider = 'google'

-- ============================================
-- TEST 6: Idempotency check
-- ============================================

-- Try to insert duplicate (should use ON CONFLICT DO UPDATE)
INSERT INTO public.users (id, email, full_name)
VALUES (
  (SELECT id FROM public.users WHERE email = 'triggertest@example.com'),
  'triggertest@example.com',
  'Manually Inserted Name'
)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

-- Verify update worked (idempotency)
SELECT full_name FROM public.users WHERE email = 'triggertest@example.com';
-- Expected: 'Manually Inserted Name'

-- ============================================
-- CLEANUP
-- ============================================
DELETE FROM auth.users WHERE email IN (
  'triggertest@example.com',
  'uppercase@example.com',
  'mixedcase@example.com',
  'google-user@gmail.com'
);

-- Verify cascade delete worked
SELECT COUNT(*) as remaining_test_users FROM public.users 
WHERE email LIKE '%example.com' OR email LIKE '%gmail.com';
-- Expected: 0

-- ============================================
-- SUMMARY
-- ============================================
-- ✅ Trigger fires ONLY on INSERT (not UPDATE)
-- ✅ Email normalized to lowercase
-- ✅ Metadata extracted correctly (full_name, avatar_url)
-- ✅ OAuth fallbacks work (name → full_name, picture → avatar_url)
-- ✅ Manual sync function available for updates
-- ✅ Idempotent (ON CONFLICT DO UPDATE)
-- ✅ Cascade delete works
