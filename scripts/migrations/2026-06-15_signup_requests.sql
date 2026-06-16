-- Signup demand capture. When a verified Clerk user with no provisioned users
-- row lands on /account-pending, we record them here (NOT a business/owner row —
-- provisioning stays manual). Applied 2026-06-15. Re-runnable.

CREATE TABLE IF NOT EXISTS signup_requests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL UNIQUE,
  clerk_user_id text,
  name          text,
  status        text NOT NULL DEFAULT 'pending',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Lock it down: service-role (server) bypasses RLS for writes; only platform
-- admins may READ. No public insert/update policy → normal users can't write.
ALTER TABLE signup_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "signup_requests admin read" ON signup_requests;
CREATE POLICY "signup_requests admin read" ON signup_requests
  FOR SELECT USING (is_castlestone_admin());

-- Idempotent capture: one row per email. Revisits refresh clerk id/name/time
-- but PRESERVE status (so an admin's approve/deny isn't reset to 'pending').
CREATE OR REPLACE FUNCTION upsert_signup_request(
  p_email text, p_clerk_user_id text, p_name text
) RETURNS uuid
LANGUAGE sql
AS $$
  INSERT INTO signup_requests (email, clerk_user_id, name)
  VALUES (lower(p_email), p_clerk_user_id, p_name)
  ON CONFLICT (email) DO UPDATE SET
    clerk_user_id = EXCLUDED.clerk_user_id,
    name          = COALESCE(EXCLUDED.name, signup_requests.name),
    updated_at    = now()
  RETURNING id;
$$;
