import twilio from "twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Business, RoutingRule, User } from "@/lib/types"

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
