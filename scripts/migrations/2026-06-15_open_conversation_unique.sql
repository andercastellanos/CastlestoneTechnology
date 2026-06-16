-- Race fix: at most one OPEN conversation per (business, contact), plus an
-- atomic get-or-create used by /api/twilio/messaging/incoming.
-- Applied 2026-06-15. Safe to re-run (IF NOT EXISTS / OR REPLACE).

-- 1) Partial unique index — the arbiter for the upsert below.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_open_conversation_per_contact
  ON conversations (business_id, contact_id)
  WHERE status = 'open';

-- 2) Atomic get-or-create. On conflict returns the EXISTING open thread id and
--    bumps activity, so concurrent inbound texts land in one thread.
CREATE OR REPLACE FUNCTION upsert_open_conversation(
  p_business_id uuid,
  p_contact_id  uuid,
  p_preview     text,
  p_at          timestamptz
) RETURNS uuid
LANGUAGE sql
AS $$
  INSERT INTO conversations
    (business_id, contact_id, status, last_message_at, last_message_preview, unread_count)
  VALUES
    (p_business_id, p_contact_id, 'open', p_at, p_preview, 1)
  ON CONFLICT (business_id, contact_id) WHERE status = 'open'
  DO UPDATE SET
    last_message_at      = EXCLUDED.last_message_at,
    last_message_preview = EXCLUDED.last_message_preview,
    unread_count         = conversations.unread_count + 1
  RETURNING id;
$$;
