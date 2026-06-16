import twilio from "twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Business, MessagingChannel, RoutingRule, User } from "@/lib/types"

// ─── Singleton Twilio REST client ─────────────────────────────────────────────

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken  = process.env.TWILIO_AUTH_TOKEN!

export const twilioClient = twilio(accountSid, authToken)

// ─── Signature validation ─────────────────────────────────────────────────────
//
// NOTE: Twilio signature validation requires both the canonical URL *and* the
// POST params. Because a Request body is a one-shot readable stream, the caller
// must read the body first and pass the parsed key-value pairs here.
//
// Usage in a route handler:
//   const params = Object.fromEntries(new URLSearchParams(await req.text()))
//   if (!validateTwilioSignature(req, params)) return new Response('Forbidden', { status: 403 })

export function validateTwilioSignature(
  req: Request,
  params: Record<string, string>,
): boolean {
  const signature = req.headers.get("x-twilio-signature") ?? ""
  const baseUrl   = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/, "")
  const url       = `${baseUrl}${new URL(req.url).pathname}`
  return twilio.validateRequest(authToken, signature, url, params)
}

// ─── Business lookup ──────────────────────────────────────────────────────────

export interface BusinessWithRules {
  business: Business
  rules: RoutingRule
}

/**
 * Look up a business by its Twilio number and eagerly load its routing rules.
 * Returns null if no matching business exists or routing rules haven't been set.
 */
export async function getBusinessByTwilioNumber(
  to: string,
): Promise<BusinessWithRules | null> {
  const supabase = createServerSupabaseClient()

  const { data: business, error: bErr } = await supabase
    .from("businesses")
    .select("*")
    .eq("twilio_number", to)
    .single()

  if (bErr || !business) return null

  const { data: rules, error: rErr } = await supabase
    .from("routing_rules")
    .select("*")
    .eq("business_id", business.id)
    .single()

  if (rErr || !rules) return null

  return { business: business as Business, rules: rules as RoutingRule }
}

/**
 * Look up a business by its bare (no "whatsapp:" prefix) E.164 WhatsApp number.
 * Unlike getBusinessByTwilioNumber, this does NOT require a routing_rules row —
 * WhatsApp routing is independent of the voice/SMS routing config.
 */
export async function getBusinessByWhatsAppNumber(
  bareNumber: string,
): Promise<Business | null> {
  const supabase = createServerSupabaseClient()
  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("whatsapp_number", bareNumber)
    .single()

  if (error || !business) return null
  return business as Business
}

/**
 * Resolve the Twilio { from, to } pair for an outbound message by channel.
 *  - sms      → bare numbers, unchanged from the original behavior.
 *  - whatsapp → both endpoints carry the "whatsapp:" prefix; the sender is the
 *    business's own whatsapp_number, falling back to the shared sandbox sender.
 */
export function buildOutboundAddressing({
  channel,
  business,
  contactPhone,
}: {
  channel: MessagingChannel
  business: Pick<Business, "twilio_number" | "whatsapp_number">
  contactPhone: string
}): { from: string; to: string } {
  if (channel === "whatsapp") {
    const sender =
      business.whatsapp_number ?? process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER
    return { from: `whatsapp:${sender}`, to: `whatsapp:${contactPhone}` }
  }
  // sms (unchanged)
  return { from: business.twilio_number as string, to: contactPhone }
}

// ─── User lookup ──────────────────────────────────────────────────────────────

/**
 * Resolve a Clerk user ID to the Supabase users row.
 * Returns null if no matching row exists.
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkId)
    .single()
  if (error || !data) return null
  return data as User
}

// ─── Shared TwiML helpers ─────────────────────────────────────────────────────

/** Return an empty <Response/> — valid for both voice and messaging webhooks. */
export function emptyTwiML(): Response {
  return new Response('<?xml version="1.0" encoding="UTF-8"?><Response/>', {
    status:  200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  })
}
