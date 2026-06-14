"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const ROLES = [
  { value: "owner", label: "Owner" },
  { value: "assistant", label: "Assistant (VA)" },
  { value: "va", label: "VA" },
] as const

export default function AddUserForm({ businessId }: { businessId: string }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<(typeof ROLES)[number]["value"]>("owner")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)

  async function handleAdd() {
    const trimmed = email.trim()
    if (!trimmed || saving) return
    setSaving(true)
    setError(null)
    setOk(false)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_id: businessId, email: trimmed, role }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to add user")
      }
      setEmail("")
      setOk(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add user")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-lg border border-[#e6dbc9] bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
        Provision a user
      </h2>
      <p className="mt-0.5 text-xs text-[#888888]">
        Pre-creates a pending account. They&apos;re linked automatically when they
        sign up with this email.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="person@company.com"
            className="h-9 w-full rounded-sm border border-[#e6dbc9] bg-white px-3 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className="h-9 rounded-sm border border-[#e6dbc9] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={saving || !email.trim()}
          className="h-9 rounded-sm bg-[#c8a97e] px-5 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
        >
          {saving ? "Adding…" : "Add user"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      {ok && <p className="mt-2 text-xs text-emerald-600">Pending user created.</p>}
    </div>
  )
}
