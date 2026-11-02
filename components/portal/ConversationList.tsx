"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Search, Plus } from "lucide-react"
import { useSupabaseBrowserClient } from "@/lib/hooks/useSupabaseBrowserClient"
import type { ConversationWithContact, ConversationStatus } from "@/lib/types"
import ChannelBadge from "@/components/portal/ChannelBadge"
import NewConversationModal from "@/components/portal/NewConversationModal"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const mins = Math.floor(diffMs / 60_000)
  const hours = Math.floor(diffMs / 3_600_000)
  const days = Math.floor(diffMs / 86_400_000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

const STATUS_STYLES: Record<ConversationStatus, string> = {
  open: "bg-[#fdf5e8] text-[#c8a97e] border border-[#e8d4a8]",
  closed: "bg-[#f5f5f5] text-[#777777] border border-[#dddddd]",
  follow_up: "bg-amber-50 text-amber-600 border border-amber-200",
}

const STATUS_LABELS: Record<ConversationStatus, string> = {
  open: "Open",
  closed: "Closed",
  follow_up: "Follow up",
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function ConversationRowSkeleton() {
  return (
    <div className="flex animate-pulse items-start gap-3 px-4 py-3.5">
      <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-[#ede9e0]" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3.5 w-28 rounded bg-[#ede9e0]" />
        <div className="h-3 w-full rounded bg-[#f2efe9]" />
      </div>
      <div className="mt-0.5 h-3 w-7 shrink-0 rounded bg-[#ede9e0]" />
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

interface Props {
  selectedId: string | undefined
}

export default function ConversationList({ selectedId }: Props) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const supabase = useSupabaseBrowserClient()

  const [businessId, setBusinessId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<ConversationWithContact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isNewOpen, setIsNewOpen] = useState(false)

  // ── Fetch business_id for this Clerk user ──────────────────────────────
  useEffect(() => {
    if (!isLoaded || !user) return

    supabase
      .from("users")
      .select("business_id")
      .eq("clerk_user_id", user.id)
      .single()
      .then(({ data }) => {
        setBusinessId(data?.business_id ?? null)
      })
  }, [isLoaded, user, supabase])

  // ── Fetch conversations + realtime subscription ────────────────────────
  const fetchConversations = useCallback(async () => {
    if (!businessId) return
    const { data } = await supabase
      .from("conversations")
      .select("*, contact:contacts(*)")
      .eq("business_id", businessId)
      .order("last_message_at", { ascending: false })

    setConversations((data as ConversationWithContact[]) ?? [])
    setLoading(false)
  }, [businessId, supabase])

  useEffect(() => {
    if (!businessId) {
      if (isLoaded) setLoading(false)
      return
    }

    setLoading(true)
    fetchConversations()

    const channel = supabase
      .channel("conversations-list")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
          filter: `business_id=eq.${businessId}`,
        },
        (payload) => {
          // UPDATE (new message preview, unread_count, read, status) → patch the
          // affected row in place so the list doesn't reorder/jump while the user
          // is looking at it. The realtime payload has no joined contact, so we
          // keep the contact already loaded on the existing row.
          if (payload.eventType === "UPDATE") {
            const updated = payload.new as Partial<ConversationWithContact> & {
              id: string
            }
            setConversations((prev) =>
              prev.map((c) =>
                c.id === updated.id
                  ? { ...c, ...updated, contact: c.contact }
                  : c,
              ),
            )
            return
          }
          // INSERT / DELETE → refetch so new conversations appear and ordering
          // resets (these are infrequent and expected to change the list).
          fetchConversations()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [businessId, fetchConversations, isLoaded, supabase])

  // ── React to navigation (open/create a conversation) ───────────────────
  // The list mounts once and otherwise relies on realtime; this guarantees a
  // freshly created or opened thread surfaces — and its unread badge clears —
  // without depending on realtime delivery for the conversations table.
  const didMountRef = useRef(false)
  useEffect(() => {
    // Instantly clear the opened conversation's unread badge (the /read route
    // persists this server-side; this is just the optimistic UI).
    if (selectedId) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedId && c.unread_count > 0
            ? { ...c, unread_count: 0 }
            : c,
        ),
      )
    }
    // Skip the initial mount — the subscribe effect above already fetches once.
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    if (!businessId) return
    // Refetch so a just-created conversation appears, then re-clear the opened
    // thread's badge in case the /read write hasn't committed server-side yet.
    fetchConversations().then(() => {
      if (selectedId) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedId ? { ...c, unread_count: 0 } : c,
          ),
        )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  // ── Filtered list ──────────────────────────────────────────────────────
  const filtered = conversations.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    const name = c.contact?.name?.toLowerCase() ?? ""
    const phone = c.contact?.phone?.toLowerCase() ?? ""
    return name.includes(q) || phone.includes(q)
  })

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      {/* Header + search */}
      <div className="border-b border-[#e6dbc9] px-4 pb-3 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
            Inbox
          </h1>
          <button
            type="button"
            onClick={() => setIsNewOpen(true)}
            aria-label="New conversation"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-[#c8a97e] px-2.5 text-xs font-medium text-white transition-colors hover:bg-[#b69468]"
          >
            <Plus className="h-3.5 w-3.5" />
            New
          </button>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#999999]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone…"
            className="h-9 w-full rounded-sm border border-[#e6dbc9] bg-white pl-8 pr-3 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ConversationRowSkeleton key={i} />
          ))
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <p className="text-sm font-medium text-[#222222]">
              {search ? "No results found" : "No conversations yet"}
            </p>
            <p className="text-xs text-[#999999]">
              {search
                ? "Try a different name or phone number"
                : "New conversations will appear here"}
            </p>
          </div>
        ) : (
          filtered.map((c) => {
            const isSelected = c.id === selectedId
            const displayName =
              c.contact?.name ?? c.contact?.phone ?? "Unknown"
            const initial = displayName.charAt(0).toUpperCase()

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => router.push(`/portal/inbox?id=${c.id}`)}
                className={`flex w-full items-start gap-3 border-b border-[#f0ebe1] px-4 py-3.5 text-left transition-colors hover:bg-[#faf8f5] ${
                  isSelected ? "bg-[#f8f5ef]" : "bg-white"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isSelected
                      ? "bg-[#c8a97e] text-white"
                      : "bg-[#ede9e0] text-[#777777]"
                  }`}
                >
                  {initial}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-[#222222]">
                      {displayName}
                    </span>
                    <span className="shrink-0 text-[11px] text-[#aaaaaa]">
                      {formatTime(c.last_message_at)}
                    </span>
                  </div>

                  {/* Show the phone number when the row title is a name, so the
                      user can always see who they're messaging. */}
                  {c.contact?.name && c.contact?.phone && (
                    <span className="block truncate text-[11px] text-[#999999]">
                      {c.contact.phone}
                    </span>
                  )}

                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-[#777777]">
                      {c.last_message_preview ?? "No messages yet"}
                    </p>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {c.unread_count > 0 && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e2562b] px-1 text-[10px] font-semibold text-white">
                          {c.unread_count > 99 ? "99+" : c.unread_count}
                        </span>
                      )}
                      <ChannelBadge channel={c.channel} />
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium leading-none ${STATUS_STYLES[c.status]}`}
                      >
                        {STATUS_LABELS[c.status]}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>

      <NewConversationModal
        isOpen={isNewOpen}
        onClose={() => setIsNewOpen(false)}
        inboxBasePath="/portal/inbox"
      />
    </div>
  )
}
