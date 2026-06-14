import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { createAdminSupabaseClient } from "@/lib/supabase/server"

// POST /api/admin/businesses — platform admin creates a new business (client).
export async function POST(request: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: gate.status })
  }

  const body = (await request.json()) as { name?: string }
  const name = body.name?.trim()
  if (!name) {
    return NextResponse.json({ error: "Business name is required" }, { status: 400 })
  }

  const supabase = createAdminSupabaseClient()
  const { data: business, error } = await supabase
    .from("businesses")
    .insert({ name })
    .select("id, name")
    .single()

  if (error) {
    console.error("admin/businesses POST error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ business }, { status: 201 })
}
