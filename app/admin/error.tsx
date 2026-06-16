"use client"

// Error boundary for the /admin segment. Without this, a client-side throw in
// any admin page blanks the screen silently (white page + 200). This surfaces
// the actual error message so failures are visible during dev and beyond.
//
// NOTE: an error boundary catches throws in its segment's PAGE/children, not in
// its own layout. If the admin *layout* (e.g. AdminSidebar) throws, this won't
// catch it — that surfaces at a parent boundary instead.
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf8f5] px-6 text-center">
      <div className="w-full max-w-lg rounded-lg border border-rose-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Admin page error
        </h1>
        <p className="mt-3 break-words rounded-sm bg-rose-50 px-3 py-2 text-left font-mono text-xs text-rose-700">
          {error.message || "Unknown error"}
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-[#999999]">digest: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-5 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
