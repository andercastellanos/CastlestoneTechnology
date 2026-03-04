import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// GET /api/contacts — list contacts for the authenticated user's business
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

  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("business_id", profile.business_id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("contacts GET error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ contacts })
}

// POST /api/contacts — create a new contact
export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  console.log("contacts POST body", body)

  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  const phone = body.phone?.trim()
  if (!phone) return NextResponse.json({ error: "Phone is required" }, { status: 400 })

  const { data: contact, error } = await supabase
    .from("contacts")
    .insert({
      business_id: profile.business_id,
      name: body.name?.trim() || null,
      phone,
      email: body.email?.trim() || null,
      source: body.source?.trim() || null,
      lead_status: body.lead_status ?? "new",
    })
    .select()
    .single()

  if (error) {
    console.error("contacts POST error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ contact }, { status: 201 })
}
