import { auth } from "@clerk/nextjs/server"
import { createAdminSupabaseClient } from "@/lib/supabase/server"

/**
 * API-route guard mirroring app/admin/layout.tsx's check.
 * Resolves to the Clerk userId for platform admins, or an error status:
 *   401 — not signed in · 403 — signed in but not a castlestone_admin
 */
export async function requireAdmin(): Promise<
  { ok: true; userId: string } | { ok: false; status: 401 | 403 }
> {
  const { userId } = await auth()
  if (!userId) return { ok: false, status: 401 }

  const supabase = createAdminSupabaseClient()
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile || profile.role !== "castlestone_admin") {
    return { ok: false, status: 403 }
  }
  return { ok: true, userId }
}
