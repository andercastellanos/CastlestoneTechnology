"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import type { MessagingChannel } from "@/lib/types"

// Outbound conversation starter. Reused by both the portal and VA inboxes —
// inboxBasePath controls where we navigate on success ("/portal/inbox" | "/va/inbox").
export default function NewConversationModal({
  isOpen,
  onClose,
  inboxBasePath,
}: {
  isOpen: boolean
  onClose: () => void
  inboxBasePath: string
}) {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [channel, setChannel] = useState<MessagingChannel>("sms")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryId, setRetryId] = useState<string | null>(null)
  const [messageSent, setMessageSent] = useState(false)

  if (!isOpen) return null

  function close() {
    if (submitting) return
    if (!messageSent) setError(null)
    onClose()
  }

  function goToThread(id: string) {
    setPhone("")
    setMessage("")
    setChannel("sms")
    setRetryId(null)
    setMessageSent(false)
    setError(null)
    onClose()
    router.push(`${inboxBasePath}?id=${id}`)
  }

  // Lenient client check; the server does the authoritative E.164 normalization.
  const phoneValid = /^[+\d().\-\s]{7,}$/.test(phone.trim())
  const canSubmit =
    Boolean(phone.trim()) &&
    Boolean(message.trim()) &&
    phoneValid &&
    !submitting &&
    !messageSent

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)
    try {
      // Retry the first message in the thread already created by the server.
      // Calling /create again would only find that thread and skip sending.
      const url = retryId
        ? `/api/conversations/${retryId}/reply`
        : "/api/conversations/create"
      const payload = retryId
        ? { body: message.trim() }
        : { phone: phone.trim(), message: message.trim(), channel }
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as {
        id?: string
        error?: string
        message_sent?: boolean
      }

      if (data.message_sent) setMessageSent(true)

      // Duplicate open thread → navigate to it instead of erroring.
      if (res.status === 409 && data.id) {
        goToThread(data.id)
        return
      }
      if (!res.ok) {
        if (data.id) setRetryId(data.id)
        // Server appends the 63016 tip to the message when present.
        throw new Error(data.error ?? "Failed to create conversation")
      }
      const id = data.id ?? retryId
      if (id) goToThread(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create conversation")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New conversation"
        className="relative z-10 w-full max-w-md rounded-lg border border-[#e6dbc9] bg-white p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
            New conversation
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-[#999999] transition-colors hover:text-[#222222]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Phone
            </label>
            <input
              type="tel"
              disabled={submitting || Boolean(retryId)}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="h-9 w-full rounded-sm border border-[#e6dbc9] bg-white px-3 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Message
            </label>
            <textarea
              disabled={submitting || messageSent}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Type the first message…"
              className="w-full resize-none rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
            />
          </div>

          <fieldset>
            <legend className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Channel
            </legend>
            <div className="flex gap-4">
              {(["sms", "whatsapp"] as const).map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-1.5 text-sm text-[#222222]"
                >
                  <input
                    type="radio"
                    disabled={submitting || Boolean(retryId)}
                    name="channel"
                    value={c}
                    checked={channel === c}
                    onChange={() => setChannel(c)}
                    className="accent-[#c8a97e]"
                  />
                  {c === "sms" ? "SMS" : "WhatsApp"}
                </label>
              ))}
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="text-xs text-red-500">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={close}
              disabled={submitting}
              className="h-9 rounded-sm border border-[#e6dbc9] px-4 text-sm text-[#555555] transition-colors hover:bg-[#faf8f5] disabled:opacity-50"
            >
              Cancel
            </button>
            {messageSent && retryId ? (
              <button
                type="button"
                onClick={() => goToThread(retryId)}
                className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
              >
                Open conversation
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit}
                className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
              >
                {submitting ? "Sending…" : retryId ? "Retry send" : "Create & Send"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
