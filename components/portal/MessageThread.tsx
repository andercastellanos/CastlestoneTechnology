"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Message } from "@/lib/types"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function MessageSkeleton({ side }: { side: "left" | "right" }) {
  return (
    <div className={`flex animate-pulse ${side === "right" ? "justify-end" : ""}`}>
      <div
        className={`h-9 rounded-2xl bg-[#ede9e0] ${
          side === "right" ? "w-44" : "w-64"
        }`}
      />
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

interface Props {
  conversationId: string
}

export default function MessageThread({ conversationId }: Props) {
  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  // ── Fetch messages ────────────────────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    setMessages((data as Message[]) ?? [])
    setLoading(false)
  }, [conversationId])

  // ── Subscribe to realtime inserts ─────────────────────────────────────
  useEffect(() => {
    setLoading(true)
    setMessages([])
    fetchMessages()

    const supabase = getSupabaseBrowserClient()
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => {
            // Deduplicate: optimistic messages use a temp id prefix
            const incoming = payload.new as Message
            const isDuplicate = prev.some(
              (m) => m.id === incoming.id || m.id === `opt-${incoming.id}`,
            )
            if (isDuplicate) return prev
            // Replace any matching optimistic message body → real one
            const withoutOptimistic = prev.filter(
              (m) =>
                !m.id.startsWith("opt-") || m.body !== incoming.body,
            )
            return [...withoutOptimistic, incoming]
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, fetchMessages])

  // ── Auto-scroll to bottom ─────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ── Auto-grow textarea ────────────────────────────────────────────────
  function handleReplyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReply(e.target.value)
    const el = e.target
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }

  // ── Send reply ────────────────────────────────────────────────────────
  async function handleSend() {
    const body = reply.trim()
    if (!body || sending) return
    setSending(true)
    setSendError(null)

    // Optimistic update
    const optimisticId = `opt-${Date.now()}`
    const optimistic: Message = {
      id: optimisticId,
      conversation_id: conversationId,
      direction: "outbound",
      body,
      created_at: new Date().toISOString(),
      sender_name: null,
    }
    setMessages((prev) => [...prev, optimistic])
    setReply("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      const res = await fetch(`/api/conversations/${conversationId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to send")
      }
      // Realtime will deliver the confirmed message and deduplicate
    } catch (err) {
      // Revert optimistic on error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId))
      setReply(body)
      setSendError(err instanceof Error ? err.message : "Failed to send")
    } finally {
      setSending(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      {/* Mobile back button */}
      <div className="flex items-center border-b border-[#e6dbc9] bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => router.push("/portal/inbox")}
          className="flex items-center gap-1.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#222222]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5 md:px-6">
        {loading ? (
          <>
            <MessageSkeleton side="left" />
            <MessageSkeleton side="right" />
            <MessageSkeleton side="left" />
            <MessageSkeleton side="right" />
            <MessageSkeleton side="left" />
          </>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-[#222222]">No messages yet</p>
            <p className="text-xs text-[#999999]">
              Send the first message below
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOutbound = msg.direction === "outbound"
            const isOptimistic = msg.id.startsWith("opt-")
            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${isOutbound ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isOutbound
                      ? `rounded-br-sm bg-[#c8a97e] text-white ${isOptimistic ? "opacity-60" : ""}`
                      : "rounded-bl-sm bg-white text-[#222222] shadow-sm ring-1 ring-[#e6dbc9]"
                  }`}
                >
                  {msg.body}
                </div>
                <span className="px-1 text-[11px] text-[#aaaaaa]">
                  {isOptimistic ? "Sending…" : formatMessageTime(msg.created_at)}
                </span>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply box */}
      <div className="border-t border-[#e6dbc9] bg-white px-4 py-3">
        {sendError && (
          <p className="mb-2 text-xs text-red-500">{sendError}</p>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={reply}
            onChange={handleReplyChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a reply… (⌘↵ to send)"
            rows={1}
            className="flex-1 resize-none rounded-sm border border-[#e6dbc9] bg-[#faf8f5] px-3 py-2.5 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!reply.trim() || sending}
            aria-label="Send reply"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#c8a97e] text-white transition-colors hover:bg-[#b69468] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-[#aaaaaa]">
          Replies send as SMS from your virtual receptionist line
        </p>
      </div>
    </div>
  )
}
