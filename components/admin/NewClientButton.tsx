"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewClientButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCreate() {
    const trimmed = name.trim()
    if (!trimmed || saving) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to create business")
      }
      setName("")
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create business")
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
      >
        New Client
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        placeholder="Business name"
        className="h-9 w-56 rounded-sm border border-[#e6dbc9] bg-white px-3 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
      />
      <button
        type="button"
        onClick={handleCreate}
        disabled={saving || !name.trim()}
        className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
      >
        {saving ? "Creating…" : "Create"}
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(false)
          setName("")
          setError(null)
        }}
        className="h-9 rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#555555] transition-colors hover:bg-[#faf8f5]"
      >
        Cancel
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
