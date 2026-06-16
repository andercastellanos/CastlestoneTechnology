import type { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { reconcileUser, captureSignupRequest } from "@/lib/auth/reconcile"
import PendingAutoRefresh from "./PendingAutoRefresh"

export const metadata: Metadata = { title: "Account Pending" }

export const dynamic = "force-dynamic"

// Shown to a signed-in Clerk user who has no matching `users` row yet
// (not-yet-provisioned, or self-signup is off). Friendly, not a broken portal.
//
// Self-resolving: re-runs the link-by-email reconcile on every load (and the
// client auto-refreshes), so the moment this email is provisioned the user is
// forwarded into the dashboard — no manual re-login.
export default async function AccountPendingPage() {
  const profile = await reconcileUser()
  if (profile) redirect("/dashboard")

  // No provisioned row → capture the signup demand (idempotent per email).
  await captureSignupRequest()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-6 text-center">
      <div className="w-full max-w-md rounded-lg border border-[#e6dbc9] bg-white p-10 shadow-sm">
        <Image
          src="/logo.png"
          alt="Castlestone Technology"
          width={48}
          height={48}
          className="mx-auto mb-6 h-12 w-12 object-contain"
        />
        <h1 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Setting up your account…
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#555555]">
          You&apos;re signed in. This email hasn&apos;t been linked to a
          Castlestone workspace yet — accounts are provisioned by our team. This
          page updates automatically the moment your access is ready; no need to
          sign in again. If it&apos;s been a while, reach out below.
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#c8a97e]">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#c8a97e] border-t-transparent" />
          Please wait a few seconds — directing you to your dashboard…
        </p>
        <PendingAutoRefresh />
        <a
          href="mailto:hello@castlestonetechnology.com"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-5 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
        >
          Contact Castlestone
        </a>
        <div className="mt-4">
          <SignOutButton>
            <button
              type="button"
              className="text-xs text-[#999999] transition-colors hover:text-[#555555]"
            >
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>
    </main>
  )
}
