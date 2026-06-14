import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import PortalSidebar from "@/components/portal/PortalSidebar"

export const metadata = {
  title: {
    default: "Portal",
    template: "%s | Castlestone Portal",
  },
}

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // No matching users row → signed in but not provisioned yet.
  const supabase = createServerSupabaseClient()
  const { data: profile } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_user_id", userId)
    .maybeSingle()

  if (!profile) {
    redirect("/account-pending")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#faf8f5]">
      <PortalSidebar />
      {/* pt-14 offsets the fixed mobile top bar; lg:pt-0 resets on desktop */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
