import { redirect } from "next/navigation"
import { reconcileUser } from "@/lib/auth/reconcile"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Synchronous link-by-email, then gate to platform admins only.
  const profile = await reconcileUser()

  // No provisioned row → pending screen (don't bounce into a portal loop).
  if (!profile) {
    redirect("/account-pending")
  }

  // Everyone else with a row but the wrong role goes to their client portal.
  if (profile.role !== "castlestone_admin") {
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
