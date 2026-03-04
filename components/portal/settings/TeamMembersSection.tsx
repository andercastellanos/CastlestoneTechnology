"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import type { User } from "@/lib/types"
import type { ToastState } from "@/components/portal/SettingsPage"

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#ede9e0]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-32 rounded bg-[#ede9e0]" />
            <div className="h-2.5 w-24 rounded bg-[#ede9e0]" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Avatar initials ──────────────────────────────────────────────────────────

function Avatar({ name }: { name: string | null }) {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"
  return (
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#f0ebe1] text-xs font-semibold text-[#c8a97e]">
      {initials}
    </div>
  )
}

// ─── Invite modal ─────────────────────────────────────────────────────────────

interface InviteModalProps {
  onClose: () => void
  onInvited: (user: User) => void
  showToast: (message: string, type: ToastState["type"]) => void
}

function InviteModal({ onClose, onInvited, showToast }: InviteModalProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"va" | "admin">("va")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/portal/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      })
      if (!res.ok) throw new Error("Failed to invite")
      const data = (await res.json()) as { user?: User }
      const invited: User = data.user ?? {
        id: `local-${Date.now()}`,
        clerk_user_id: "",
        business_id: "",
        role,
        name: email.split("@")[0],
        email,
        created_at: new Date().toISOString(),
      }
      onInvited(invited)
      showToast(`Invitation sent to ${email}`, "success")
      onClose()
    } catch {
      showToast("Failed to send invitation", "error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/25" onClick={onClose} aria-hidden="true" />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[#e6dbc9] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e6dbc9] px-5 py-4">
          <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
            Invite Team Member
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#555555] hover:text-[#222222]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="team@example.com"
              className="w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "va" | "admin")}
              className="w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
            >
              <option value="va">Virtual Assistant</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-sm border border-[#e6dbc9] px-4 text-sm text-[#555555] hover:text-[#222222]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white hover:bg-[#b69468] disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  va: "Virtual Assistant",
}

interface Props {
  showToast: (message: string, type: ToastState["type"]) => void
}

export default function TeamMembersSection({ showToast }: Props) {
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)
  const [showInvite, setShowInvite] = useState(false)
  const [members, setMembers] = useState<User[]>([])

  useEffect(() => {
    fetch("/api/portal/users")
      .then((r) => r.json())
      .then((data: { users?: User[] }) => {
        setMembers(data.users ?? [])
      })
      .catch(() => {/* stub, ignore */})
      .finally(() => setLoading(false))
  }, [])

  async function handleRemove(userId: string) {
    setRemoving(userId)
    try {
      const res = await fetch(`/api/portal/users/${userId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to remove")
      setMembers((prev) => prev.filter((m) => m.id !== userId))
      showToast("Team member removed", "success")
    } catch {
      showToast("Failed to remove member", "error")
    } finally {
      setRemoving(null)
    }
  }

  function handleInvited(user: User) {
    setMembers((prev) => [...prev, user])
  }

  return (
    <>
      <section className="rounded-sm border border-[#e6dbc9] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6dbc9] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
              Team Members
            </h2>
            <p className="mt-0.5 text-xs text-[#888888]">
              Manage who has access to this portal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowInvite(true)}
            className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
          >
            + Invite
          </button>
        </div>

        <div className="px-5 py-5">
          {loading ? (
            <Skeleton />
          ) : members.length === 0 ? (
            <p className="text-sm text-[#aaaaaa]">No team members yet. Invite someone to get started.</p>
          ) : (
            <ul className="space-y-3">
              {members.map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <Avatar name={m.name} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[#222222]">
                      {m.name ?? m.email ?? "Unknown"}
                    </p>
                    <p className="text-xs text-[#888888]">{ROLE_LABELS[m.role] ?? m.role}</p>
                  </div>
                  {/* Owners cannot be removed (ISC-A2) */}
                  {m.role !== "owner" && (
                    <button
                      type="button"
                      onClick={() => handleRemove(m.id)}
                      disabled={removing === m.id}
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#aaaaaa] transition-colors hover:border-red-200 hover:text-red-500 disabled:opacity-50"
                      aria-label="Remove member"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onInvited={handleInvited}
          showToast={showToast}
        />
      )}
    </>
  )
}
