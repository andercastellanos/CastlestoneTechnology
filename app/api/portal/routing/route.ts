import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { RoutingRule } from "@/lib/types"

// GET /api/portal/routing — return call routing rules
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

  const { data: routing } = await supabase
    .from("routing_rules")
    .select("*")
    .eq("business_id", profile.business_id)
    .single()

  return NextResponse.json({ routing: routing ?? null })
}

// PATCH /api/portal/routing — upsert call routing rules
export async function PATCH(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await request.json()) as Partial<RoutingRule>
  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  const upsertData: Record<string, unknown> = { business_id: profile.business_id }
  if ("mode" in body) upsertData.mode = body.mode
  if ("ring_timeout" in body) upsertData.ring_timeout = body.ring_timeout
  if ("after_hours_mode" in body) upsertData.after_hours_mode = body.after_hours_mode
  if ("forward_number" in body) upsertData.forward_number = body.forward_number
  if ("ivr_enabled" in body) upsertData.ivr_enabled = body.ivr_enabled

  const { data: routing, error } = await supabase
    .from("routing_rules")
    .upsert(upsertData, { onConflict: "business_id" })
    .select()
    .single()

  if (error) {
    console.error("portal/routing PATCH error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ routing })
}
