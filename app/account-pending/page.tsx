import type { Metadata } from "next"
import Image from "next/image"
import { SignOutButton } from "@clerk/nextjs"

export const metadata: Metadata = { title: "Account Pending" }

// Shown to a signed-in Clerk user who has no matching `users` row yet
// (not-yet-provisioned, or self-signup is off). Friendly, not a broken portal.
export default function AccountPendingPage() {
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
          Your account isn&apos;t set up yet
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#555555]">
          You&apos;re signed in, but this email hasn&apos;t been linked to a
          Castlestone workspace yet. Our team provisions accounts manually —
          please contact Castlestone to get set up, then sign in again.
        </p>
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
