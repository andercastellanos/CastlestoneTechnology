import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Business } from "@/lib/types"

// GET /api/portal/settings — return business info for the authenticated user
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", profile.business_id)
    .single()

  return NextResponse.json({ business: business ?? null })
}

// PATCH /api/portal/settings — update business info
export async function PATCH(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await request.json()) as Partial<Business>
  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  const updates: Record<string, unknown> = {}
  if ("name" in body) updates.name = body.name
  if ("phone" in body) updates.phone = body.phone
  if ("timezone" in body) updates.timezone = body.timezone
  if ("voicemail_enabled" in body) updates.voicemail_enabled = body.voicemail_enabled
  if ("business_hours" in body) updates.business_hours = body.business_hours

  const { data: business, error } = await supabase
    .from("businesses")
    .update(updates)
    .eq("id", profile.business_id)
    .select()
    .single()

  if (error) {
    console.error("portal/settings PATCH error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ business })
}
