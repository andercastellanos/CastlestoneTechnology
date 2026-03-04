import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// GET /api/calls/[id]/notes — list notes for a call
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

  // Verify call ownership
  const { data: call } = await supabase
    .from("calls")
    .select("id")
    .eq("id", id)
    .eq("business_id", profile.business_id)
    .single()

  if (!call) return NextResponse.json({ error: "Call not found" }, { status: 404 })

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("ref_type", "call")
    .eq("ref_id", id)
    .order("created_at", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ notes })
}

// POST /api/calls/[id]/notes — add a note to a call
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await context.params
  const body = (await request.json()) as { body?: string }

  if (!body.body?.trim()) {
    return NextResponse.json({ error: "Note body is required" }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  // Verify call ownership
  const { data: call } = await supabase
    .from("calls")
    .select("id")
    .eq("id", id)
    .eq("business_id", profile.business_id)
    .single()

  if (!call) return NextResponse.json({ error: "Call not found" }, { status: 404 })

  const { data: note, error } = await supabase
    .from("notes")
    .insert({
      business_id: profile.business_id,
      ref_type: "call",
      ref_id: id,
      body: body.body.trim(),
    })
    .select()
    .single()

  if (error) {
    console.error("calls/notes POST error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ note }, { status: 201 })
}
