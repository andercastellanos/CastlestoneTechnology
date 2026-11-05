"use client"

export default function SpanishError({
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
          Ocurrió un error
        </h1>
        <p className="mt-3 break-words rounded-sm bg-rose-50 px-3 py-2 text-left font-mono text-xs text-rose-700">
          {error.message || "Error desconocido"}
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-[#999999]">Referencia: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-5 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
