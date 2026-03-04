"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useVAUser } from "@/lib/hooks/useVAUser"
import type { ConversationWithContact, ConversationStatus } from "@/lib/types"

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<ConversationStatus, string> = {
  open: "bg-[#fdf5e8] text-[#c8a97e] border border-[#e8d4a8]",
  closed: "bg-[#f5f5f5] text-[#777777] border border-[#dddddd]",
  follow_up: "bg-amber-50 text-amber-700 border border-amber-200",
}

const STATUS_LABELS: Record<ConversationStatus, string> = {
  open: "Open",
  closed: "Closed",
  follow_up: "Follow-up",
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function RowSkeleton() {
  return (
    <div className="animate-pulse border-b border-[#f0ebe1] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-[#ede9e0]" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 rounded bg-[#ede9e0]" />
          <div className="h-2.5 w-40 rounded bg-[#ede9e0]" />
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VAConversationList({ activeId }: { activeId?: string }) {
  const { userId, businessId, loading: userLoading } = useVAUser()

  const [conversations, setConversations] = useState<ConversationWithContact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [claiming, setClaiming] = useState<string | null>(null)

  const fetchConversations = useCallback(async () => {
    if (!businessId || !userId) return
    const supabase = getSupabaseBrowserClient()

    // Show conversations assigned to this VA OR unassigned open conversations
    const { data } = await supabase
      .from("conversations")
      .select("*, contact:contacts(*)")
      .eq("business_id", businessId)
      .or(`assigned_user_id.eq.${userId},and(assigned_user_id.is.null,status.eq.open)`)
      .order("last_message_at", { ascending: false })

    setConversations((data as ConversationWithContact[]) ?? [])
    setLoading(false)
  }, [businessId, userId])

  useEffect(() => {
    if (userLoading) return
    if (!businessId || !userId) { setLoading(false); return }
    setLoading(true)
    fetchConversations()
  }, [businessId, userId, userLoading, fetchConversations])

  // Realtime: re-fetch on any conversation change for this business
  useEffect(() => {
    if (!businessId) return
    const supabase = getSupabaseBrowserClient()
    const channel = supabase
      .channel("va-conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `business_id=eq.${businessId}`,
        },
        () => fetchConversations(),
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [businessId, fetchConversations])

  // Claim: PATCH to assign conversation to this VA
  async function handleClaim(e: React.MouseEvent, convId: string) {
    e.preventDefault()
    e.stopPropagation()
    setClaiming(convId)
    try {
      await fetch(`/api/conversations/${convId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      })
      fetchConversations()
    } catch {
      // fail silently
    } finally {
      setClaiming(null)
    }
  }

  const filtered = conversations.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      (c.contact?.name?.toLowerCase().includes(q) ?? false) ||
      (c.contact?.phone?.toLowerCase().includes(q) ?? false)
    )
  })

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-[#e6dbc9] px-4 py-4">
        <h1 className="mb-3 text-lg font-semibold text-[#222222] [font-family:var(--font-heading)]">
          Inbox
        </h1>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#aaaaaa]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="h-9 w-full rounded-sm border border-[#e6dbc9] bg-[#faf8f5] pl-8 pr-3 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <RowSkeleton key={i} />)
          : filtered.length === 0
            ? (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-[#aaaaaa]">
                  {search ? "No results found" : "No conversations assigned to you yet"}
                </p>
              </div>
            )
            : filtered.map((conv) => {
              const isActive = conv.id === activeId
              const isUnassigned = !("assigned_user_id" in conv && (conv as ConversationWithContact & { assigned_user_id: string | null }).assigned_user_id)
              const contactName = conv.contact?.name ?? conv.contact?.phone ?? "Unknown"
              const initials = contactName
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)

              return (
                <Link
                  key={conv.id}
                  href={`/va/inbox?id=${conv.id}`}
                  className={`block border-b border-[#f0ebe1] px-4 py-3.5 transition-colors hover:bg-[#faf8f5] ${
                    isActive ? "bg-[#fdf5e8]" : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f0ebe1] text-xs font-semibold text-[#c8a97e]">
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-[#222222]">{contactName}</p>
                        <span className="flex-shrink-0 text-[10px] text-[#aaaaaa]">
                          {new Date(conv.last_message_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      {conv.last_message_preview && (
                        <p className="mt-0.5 truncate text-xs text-[#888888]">
                          {conv.last_message_preview}
                        </p>
                      )}

                      <div className="mt-1.5 flex items-center justify-between gap-2">
                        <span
                          className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${STATUS_BADGE[conv.status]}`}
                        >
                          {STATUS_LABELS[conv.status]}
                        </span>

                        {/* Claim button — only on unassigned open conversations */}
                        {conv.status === "open" && isUnassigned && (
                          <button
                            type="button"
                            onClick={(e) => handleClaim(e, conv.id)}
                            disabled={claiming === conv.id}
                            className="rounded-sm border border-[#e6dbc9] px-2 py-0.5 text-[10px] font-medium text-[#555555] transition-colors hover:border-[#c8a97e] hover:text-[#c8a97e] disabled:opacity-50"
                          >
                            {claiming === conv.id ? "Claiming…" : "Claim"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
      </div>
    </div>
  )
}
