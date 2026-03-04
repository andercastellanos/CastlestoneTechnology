import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// GET /api/contacts/[id]
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await context.params
  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  const { data: contact, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .eq("business_id", profile.business_id)
    .single()

  if (error || !contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 })
  }

  return NextResponse.json({ contact })
}

// PATCH /api/contacts/[id]
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await context.params
  const body = await request.json()
  console.log("contacts PATCH body", { id, body })

  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  // Verify ownership before updating
  const { data: existing } = await supabase
    .from("contacts")
    .select("id")
    .eq("id", id)
    .eq("business_id", profile.business_id)
    .single()

  if (!existing) return NextResponse.json({ error: "Contact not found" }, { status: 404 })

  const updates: Record<string, unknown> = {}
  if ("name" in body) updates.name = body.name
  if ("phone" in body) updates.phone = body.phone
  if ("email" in body) updates.email = body.email
  if ("source" in body) updates.source = body.source
  if ("lead_status" in body) updates.lead_status = body.lead_status

  const { data: contact, error } = await supabase
    .from("contacts")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("contacts PATCH error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ contact })
}
