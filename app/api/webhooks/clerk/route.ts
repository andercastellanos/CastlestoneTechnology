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
    const clerkId = data.id as string
    const name    = [data.first_name, data.last_name].filter(Boolean).join(" ") || null
    const email   = (data.email_addresses?.[0]?.email_address as string) ?? null
    const role    = (data.public_metadata?.role as string) ?? "owner"

    const { error } = await supabase.from("users").insert({
      clerk_user_id: clerkId,
      name,
      email,
      role,
      status: "offline",
    })

    if (error) {
      console.error("user.created DB error", error)
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
