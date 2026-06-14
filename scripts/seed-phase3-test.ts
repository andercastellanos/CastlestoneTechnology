/**
 * Phase 3 end-to-end test seed.
 *
 * Seeds one test business + routing_rules + two users (VA, owner) so a real
 * inbound Twilio call can be routed and logged.
 *
 * Run:      npx tsx scripts/seed-phase3-test.ts
 * Cleanup:  npx tsx scripts/seed-phase3-test.ts --cleanup
 *
 * Self-contained: reads .env.local directly and uses the service-role key
 * (bypasses RLS). Does NOT import app code, so it runs under tsx without
 * path-alias/Next config.
 *
 * ── PREREQUISITES (verified against live schema 2026-06-13) ──────────────────
 * The live DB is currently MISSING columns this seed + the routing code need.
 * Apply this migration FIRST or the inserts / call routing will fail:
 *
 *   ALTER TABLE users ADD COLUMN IF NOT EXISTS phone           text;
 *   ALTER TABLE calls ADD COLUMN IF NOT EXISTS twilio_call_sid text;
 *   ALTER TABLE calls ADD COLUMN IF NOT EXISTS from_number     text;
 *
 * Also set these in .env.local before the call test:
 *   TWILIO_PHONE_NUMBER, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
 *   (and optionally VA_PHONE / OWNER_PHONE for this seed)
 */

import { readFileSync } from "node:fs"
import { join } from "node:path"
import { createClient } from "@supabase/supabase-js"

// ── Load .env.local manually (no dotenv dependency) ──────────────────────────
function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {}
  try {
    const raw = readFileSync(join(process.cwd(), ".env.local"), "utf8")
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!m) continue
      env[m[1]] = m[2].replace(/^["']/, "").replace(/["']$/, "")
    }
  } catch {
    /* fall back to process.env below */
  }
  return { ...env, ...process.env } as Record<string, string>
}

const env = loadEnv()

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE = env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error("✖ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
})

// ── Test data config (override via env where it matters for the call test) ───
const BUSINESS_NAME = "Andres Test Business"
const TWILIO_NUMBER = env.TWILIO_PHONE_NUMBER ?? "+13055550100"
const VA_PHONE = env.VA_PHONE ?? "+13055550101"
const OWNER_PHONE = env.OWNER_PHONE ?? "+13055550102"

// Always-open hours (every day 00:00–23:59) so the call routes IN-HOURS
// (assistant_first → ring VA) regardless of when the test is run.
const ALWAYS_OPEN = Array.from({ length: 7 }, (_, day) => ({
  day,
  open: true,
  start: "00:00",
  end: "23:59",
}))

async function findTestBusiness(): Promise<{ id: string } | null> {
  const { data } = await supabase
    .from("businesses")
    .select("id")
    .eq("name", BUSINESS_NAME)
    .maybeSingle()
  return data ?? null
}

async function seed() {
  // Idempotency guard — never duplicate.
  const existing = await findTestBusiness()
  if (existing) {
    console.warn(
      `⚠ "${BUSINESS_NAME}" already exists (business_id=${existing.id}). ` +
        `Skipping seed. Run with --cleanup to reset, then re-seed.`,
    )
    return
  }

  // 1 — business
  const { data: business, error: bErr } = await supabase
    .from("businesses")
    .insert({
      name: BUSINESS_NAME,
      twilio_number: TWILIO_NUMBER,
      timezone: "America/New_York",
      plan: "professional",
      voicemail_enabled: true,
      business_hours: ALWAYS_OPEN,
      // NOTE: `owner_user_id` intentionally omitted — column does not exist on
      // the live `businesses` table.
    })
    .select("id")
    .single()
  if (bErr || !business) throw new Error(`business insert failed: ${bErr?.message}`)

  // 2 — routing rules
  const { data: routing, error: rErr } = await supabase
    .from("routing_rules")
    .insert({
      business_id: business.id,
      mode: "assistant_first",
      ring_timeout: 20,
      after_hours_mode: "voicemail",
      forward_number: null,
      ivr_enabled: false,
    })
    .select("id")
    .single()
  if (rErr || !routing) throw new Error(`routing_rules insert failed: ${rErr?.message}`)

  // 3 — VA user  (clerk_user_id, NOT clerk_id)
  const { data: va, error: vErr } = await supabase
    .from("users")
    .insert({
      clerk_user_id: "test-va-clerk-id",
      business_id: business.id,
      role: "assistant",
      name: "Test VA",
      phone: VA_PHONE, // requires users.phone column (see prerequisites)
      status: "online",
    })
    .select("id")
    .single()
  if (vErr || !va) throw new Error(`VA user insert failed: ${vErr?.message}`)

  // 4 — owner user
  const { data: owner, error: oErr } = await supabase
    .from("users")
    .insert({
      clerk_user_id: "test-owner-clerk-id",
      business_id: business.id,
      role: "owner",
      name: "Test Owner",
      phone: OWNER_PHONE,
      status: "online",
    })
    .select("id")
    .single()
  if (oErr || !owner) throw new Error(`owner user insert failed: ${oErr?.message}`)

  console.log("✓ Seed complete:")
  console.table({
    business_id: business.id,
    routing_rules_id: routing.id,
    va_user_id: va.id,
    owner_user_id: owner.id,
    twilio_number: TWILIO_NUMBER,
    va_phone: VA_PHONE,
    owner_phone: OWNER_PHONE,
  })
}

/**
 * Delete every test row for the seeded business (messages → conversations →
 * calls → routing_rules → users → business). Safe to run repeatedly.
 */
export async function cleanup() {
  const business = await findTestBusiness()
  if (!business) {
    console.warn(`⚠ No "${BUSINESS_NAME}" found — nothing to clean up.`)
    return
  }
  const businessId = business.id

  // messages live under conversations (no direct business_id), so resolve first.
  const { data: convos } = await supabase
    .from("conversations")
    .select("id")
    .eq("business_id", businessId)
  const convoIds = (convos ?? []).map((c) => c.id)
  if (convoIds.length) {
    await supabase.from("messages").delete().in("conversation_id", convoIds)
  }

  await supabase.from("conversations").delete().eq("business_id", businessId)
  await supabase.from("calls").delete().eq("business_id", businessId)
  await supabase.from("routing_rules").delete().eq("business_id", businessId)
  await supabase.from("users").delete().eq("business_id", businessId)
  await supabase.from("businesses").delete().eq("id", businessId)

  console.log(`✓ Cleaned up all test rows for business_id=${businessId}`)
}

async function main() {
  if (process.argv.includes("--cleanup")) {
    await cleanup()
  } else {
    await seed()
  }
}

main().catch((err) => {
  console.error("✖", err instanceof Error ? err.message : err)
  process.exit(1)
})
