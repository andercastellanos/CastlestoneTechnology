-- Platform admins (role = castlestone_admin) are not tied to a business, so a
-- users row must be allowed to have business_id = NULL. Owners/VAs still always
-- get one (set by reconcile / provisioning). Applied 2026-06-16.
ALTER TABLE public.users ALTER COLUMN business_id DROP NOT NULL;
