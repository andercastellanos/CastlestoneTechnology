import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// PATCH /api/conversations/[id]/assign — assign conversation to a VA
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await context.params
  const body = await request.json()
  console.log("conversations/assign PATCH", { id, body })

  return NextResponse.json({ success: true })
}
