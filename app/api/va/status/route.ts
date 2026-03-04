import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// GET /api/va/status — return current VA presence status and today's stats
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Stub: return offline + zero stats until Supabase table is ready
  return NextResponse.json({
    status: "offline",
    stats: {
      calls_handled: 0,
      conversations_replied: 0,
      avg_response_time: null,
    },
  })
}

// PATCH /api/va/status — update VA presence status
export async function PATCH(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  console.log("va/status PATCH", { userId, body })

  return NextResponse.json({ success: true })
}
