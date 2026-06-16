-- WhatsApp Part 2 — Chunk 2: channel discriminator on the messaging layer.
-- One thread per channel; dedup becomes (business_id, contact_id, channel).
--
-- BACKWARD-COMPATIBLE: the new column and the new RPC param both DEFAULT to
-- 'sms', so existing rows backfill to 'sms' and the current inbound route (which
-- omits the channel arg) keeps upserting SMS threads unchanged.
--
-- Applied 2026-06-16. One transaction. Safe to re-run (guards + IF EXISTS).

BEGIN;

-- a) Channel enum.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'messaging_channel') THEN
    CREATE TYPE public.messaging_channel AS ENUM ('sms', 'whatsapp');
  END IF;
END $$;

-- b) conversations.channel — existing rows backfill to 'sms' via the default.
ALTER TABLE conversations
  ADD COLUMN IF NOT EXISTS channel public.messaging_channel NOT NULL DEFAULT 'sms';

-- c) businesses.whatsapp_number — nullable, unique; the production WhatsApp-sender
--    hook. NULL for every business until a number is wired.
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS whatsapp_number text UNIQUE;

-- d) Swap the dedup arbiter: contact-keyed → (business_id, contact_id, channel).
--    Safe: all existing open rows are channel='sms', so no collisions.
DROP INDEX IF EXISTS uniq_open_conversation_per_contact;
CREATE UNIQUE INDEX uniq_open_conversation_per_contact
  ON conversations (business_id, contact_id, channel)
  WHERE status = 'open';

-- e) Rebuild upsert_open_conversation preserving ALL current behavior, with one
--    addition: p_channel (DEFAULT 'sms'), written into the INSERT and added to
--    the ON CONFLICT arbiter. Because it's defaulted, the current inbound route
--    (4 original args) still resolves and still upserts as 'sms'.
--    Drop by the exact existing signature first.
DROP FUNCTION IF EXISTS upsert_open_conversation(uuid, uuid, text, timestamptz);
CREATE FUNCTION upsert_open_conversation(
  p_business_id uuid,
  p_contact_id  uuid,
  p_preview     text,
  p_at          timestamptz,
  p_channel     public.messaging_channel DEFAULT 'sms'
) RETURNS uuid
LANGUAGE sql
AS $$
  INSERT INTO conversations
    (business_id, contact_id, channel, status, last_message_at, last_message_preview, unread_count)
  VALUES
    (p_business_id, p_contact_id, p_channel, 'open', p_at, p_preview, 1)
  ON CONFLICT (business_id, contact_id, channel) WHERE status = 'open'
  DO UPDATE SET
    last_message_at      = EXCLUDED.last_message_at,
    last_message_preview = EXCLUDED.last_message_preview,
    unread_count         = conversations.unread_count + 1
  RETURNING id;
$$;

COMMIT;
