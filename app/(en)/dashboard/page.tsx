import { redirect } from "next/navigation"
import { reconcileUser } from "@/lib/auth/reconcile"

// POST-AUTH DISPATCHER — the single landing route after sign-in / sign-up.
// Clerk's SIGN_IN/SIGN_UP fallback redirect env vars point here. reconcileUser()
// resolves (and synchronously links-by-email, if needed) the user's row, then we
// route by role — so an admin or VA never gets dumped into the owner portal.
//
// No provisioned row to link → /account-pending.
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const profile = await reconcileUser()
  if (!profile) redirect("/account-pending")

  switch (profile.role) {
    case "castlestone_admin":
      redirect("/admin")
    case "owner":
      redirect("/portal")
    case "va":
    case "assistant":
      redirect("/va")
    default:
      // Unknown/legacy role with no home → don't strand them in a portal loop.
      redirect("/account-pending")
  }
}
