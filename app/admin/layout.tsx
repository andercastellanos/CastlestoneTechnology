import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createAdminSupabaseClient } from "@/lib/supabase/server"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const supabase = createAdminSupabaseClient()
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_user_id", userId)
    .single()

  // Only platform admins may enter; everyone else goes to their client portal.
  if (!profile || profile.role !== "castlestone_admin") {
    redirect("/portal/inbox")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf8f5]">
      <AdminSidebar />
      <main className="flex flex-1 flex-col overflow-y-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
