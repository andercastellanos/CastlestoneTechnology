import { type NextRequest, NextResponse } from "next/server"
import { Webhook } from "svix"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// POST /api/webhooks/clerk
// No Clerk auth — this IS the auth sync endpoint.
// Secured via svix signature verification using CLERK_WEBHOOK_SECRET.

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET is not set")
    return new NextResponse("Webhook secret not configured", { status: 500 })
  }

  // ── 1. Verify svix signature ─────────────────────────────────────────────
  const payload = await req.text()
  const svixHeaders = {
    "svix-id":        req.headers.get("svix-id")        ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let evt: { type: string; data: any }
  try {
    const wh = new Webhook(secret)
    evt = wh.verify(payload, svixHeaders) as typeof evt
  } catch (err) {
    console.error("Clerk webhook signature verification failed", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  // ── 2. Dispatch on event type ─────────────────────────────────────────────
  const supabase = createServerSupabaseClient()
  const { type, data } = evt

  if (type === "user.created") {
    // LINK-BY-EMAIL RECONCILER (not a blind insert).
    // Invariant: never insert a user without a business_id.
    const clerkId = data.id as string
    const name    = [data.first_name, data.last_name].filter(Boolean).join(" ") || null
    const email   = (data.email_addresses?.[0]?.email_address as string | undefined)
      ?.toLowerCase() ?? null

    if (!email) {
      console.warn("clerk webhook user.created: no email on Clerk user", clerkId)
      return new NextResponse("OK", { status: 200 })
    }

    // 1 — Look for an existing (admin-provisioned) row by email, case-insensitive.
    const { data: existing, error: lookupErr } = await supabase
      .from("users")
      .select("id, clerk_user_id, business_id")
      .ilike("email", email)
      .limit(1)
      .maybeSingle()

    if (lookupErr) {
      console.error("user.created lookup error", lookupErr)
      return new NextResponse("Database error", { status: 500 })
    }

    if (existing) {
      const pending =
        !existing.clerk_user_id || existing.clerk_user_id.startsWith("pending-")

      if (pending) {
        // 2 — Admin/provision path: link the pending row to this Clerk user.
        const { error } = await supabase
          .from("users")
          .update({ clerk_user_id: clerkId, name })
          .eq("id", existing.id)
        if (error) {
          console.error("user.created link error", error)
          return new NextResponse("Database error", { status: 500 })
        }
      } else if (existing.clerk_user_id !== clerkId) {
        // 3 — Conflict: email already linked to a DIFFERENT Clerk user. Don't clobber.
        console.warn(
          `user.created conflict: ${email} is already linked to ${existing.clerk_user_id}; ` +
            `refusing to relink to ${clerkId}`,
        )
      }
      // else: already linked to this same clerkId → idempotent no-op.
      return new NextResponse("OK", { status: 200 })
    }

    // 4 — No provisioned row. Self-signup is gated behind a flag (default OFF).
    if (process.env.SELF_SIGNUP_ENABLED !== "true") {
      console.warn(
        `user.created: unprovisioned signup for ${email}; self-signup is OFF — no row created`,
      )
      return new NextResponse("OK", { status: 200 })
    }

    // Self-signup ON: create a business, then insert this user as its owner.
    const { data: business, error: bizErr } = await supabase
      .from("businesses")
      .insert({ name: `${name ?? email}'s Business` })
      .select("id")
      .single()
    if (bizErr || !business) {
      console.error("user.created self-signup business insert error", bizErr)
      return new NextResponse("Database error", { status: 500 })
    }

    const { error: userErr } = await supabase.from("users").insert({
      clerk_user_id: clerkId,
      business_id:   business.id,
      role:          "owner",
      name,
      email,
      status:        "offline",
    })
    if (userErr) {
      console.error("user.created self-signup user insert error", userErr)
      return new NextResponse("Database error", { status: 500 })
    }

  } else if (type === "user.updated") {
    const clerkId = data.id as string
    const name    = [data.first_name, data.last_name].filter(Boolean).join(" ") || null
    const email   = (data.email_addresses?.[0]?.email_address as string) ?? null

    const { error } = await supabase
      .from("users")
      .update({ name, email })
      .eq("clerk_user_id", clerkId)

    if (error) {
      console.error("user.updated DB error", error)
      return new NextResponse("Database error", { status: 500 })
    }

  } else if (type === "user.deleted") {
    // Clerk may omit `id` on hard-delete edge cases — guard before deleting
    const clerkId = data.id as string | undefined

    if (clerkId) {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("clerk_user_id", clerkId)

      if (error) {
        console.error("user.deleted DB error", error)
        return new NextResponse("Database error", { status: 500 })
      }
    }
  }
  // All other event types are acknowledged and ignored

  return new NextResponse("OK", { status: 200 })
}
