-- Run manually in the Supabase SQL editor before using the updated contact form.
-- No public policies: browser clients cannot read or write submissions.
BEGIN;

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  source_page text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.contact_submissions FROM PUBLIC, anon, authenticated;
GRANT INSERT, SELECT ON TABLE public.contact_submissions TO service_role;

COMMIT;
