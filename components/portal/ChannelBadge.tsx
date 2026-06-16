import type { MessagingChannel } from "@/lib/types"

// Small per-conversation channel chip. A contact can now have one thread per
// channel, so SMS and WhatsApp rows must be visually distinguishable.
const STYLES: Record<MessagingChannel, string> = {
  sms: "bg-[#eef1f5] text-[#5b6672] border border-[#dfe4ea]",
  whatsapp: "bg-[#e7f6ee] text-[#1f8a4c] border border-[#bfe6cf]",
}

const LABELS: Record<MessagingChannel, string> = {
  sms: "SMS",
  whatsapp: "WhatsApp",
}

export default function ChannelBadge({
  channel,
  className = "",
}: {
  channel: MessagingChannel
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium leading-none ${STYLES[channel]} ${className}`}
    >
      {LABELS[channel]}
    </span>
  )
}
