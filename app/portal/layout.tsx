import { redirect } from "next/navigation"
import { reconcileUser } from "@/lib/auth/reconcile"
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
  // Synchronous link-by-email: resolves (and links, if pending) the user's row.
  // No row to link → signed in but not provisioned yet.
  const profile = await reconcileUser()

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
