import Image from "next/image"

// Suspense fallback shown while the /dashboard server dispatcher runs its
// reconcile (auth + Clerk currentUser + DB) and decides where to redirect.
// Without this the browser paints nothing during that ~1s — a blank "weird"
// screen. The redirect is still server-side; this just fills the wait.
export default function DashboardLoading() {
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
          One moment while we get things ready.
        </p>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#c8a97e]">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#c8a97e] border-t-transparent" />
          Loading…
        </p>
      </div>
    </main>
  )
}
