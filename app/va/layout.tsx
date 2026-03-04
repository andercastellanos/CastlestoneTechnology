import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import VASidebar from "@/components/va/VASidebar"

const VA_ROLES = ["assistant", "castlestone_admin"] as const

export default async function VALayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const supabase = createServerSupabaseClient()
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_user_id", userId)
    .single()

  // Owners go to their portal, everyone else needs a VA role
  if (!profile || profile.role === "owner") {
    redirect("/portal/inbox")
  }

  if (!VA_ROLES.includes(profile.role as (typeof VA_ROLES)[number])) {
    redirect("/portal/inbox")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf8f5]">
      <VASidebar />
      <main className="flex flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
