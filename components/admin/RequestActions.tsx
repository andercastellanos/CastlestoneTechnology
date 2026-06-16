"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RequestActions({
  requestId,
  hasClerkId,
}: {
  requestId: string
  hasClerkId: boolean
}) {
  const router = useRouter()
  const [mode, setMode] = useState<"idle" | "approving">("idle")
  const [businessName, setBusinessName] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function approve() {
    const name = businessName.trim()
    if (!name || busy) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/requests/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, businessName: name }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to approve")
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to approve")
      setBusy(false)
    }
  }

  async function decline() {
    if (busy) return
    if (!window.confirm("Decline this signup? No account will be created.")) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/requests/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to decline")
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decline")
      setBusy(false)
    }
  }

  if (mode === "approving") {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && approve()}
            placeholder="Business name"
            disabled={busy}
            className="h-8 w-48 rounded-sm border border-[#e6dbc9] bg-white px-2.5 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={approve}
            disabled={busy || !businessName.trim()}
            className="h-8 rounded-sm bg-[#c8a97e] px-3 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
          >
            {busy ? "Creating…" : "Confirm"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("idle")
              setBusinessName("")
              setError(null)
            }}
            disabled={busy}
            className="h-8 rounded-sm border border-[#e6dbc9] px-2.5 text-sm text-[#555555] transition-colors hover:bg-[#faf8f5] disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
        {!error && (
          <span className="text-[11px] text-[#999999]">
            {hasClerkId
              ? "Linked instantly — they land in /portal on next load."
              : "No Clerk id captured — links by email when they sign in."}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMode("approving")}
          disabled={busy}
          className="h-8 rounded-sm bg-[#c8a97e] px-3 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={decline}
          disabled={busy}
          className="h-8 rounded-sm border border-[#e6dbc9] px-3 text-sm font-medium text-[#a13b3b] transition-colors hover:bg-rose-50 disabled:opacity-50"
        >
          {busy ? "…" : "Decline"}
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
