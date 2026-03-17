// ─────────────────────────────────────────────
//  Core domain types for Castlestone Portal
// ─────────────────────────────────────────────

export type ConversationStatus = "open" | "closed" | "follow_up"

export type LeadStatus = "new" | "contacted" | "qualified" | "customer"

export type CallStatus = "answered" | "missed" | "voicemail" | "in_progress"

export type CallDirection = "inbound" | "outbound"

export interface Contact {
  id: string
  business_id: string
  name: string | null
  phone: string
  email: string | null
  lead_status: LeadStatus | null
  source: string | null
  created_at: string
}

export interface Call {
  id: string
  business_id: string
  contact_id: string | null
  twilio_call_sid?: string | null
  from_number?: string | null
  direction: CallDirection
  status: CallStatus
  /** Duration in seconds */
  duration: number | null
  voicemail_url: string | null
  recording_url?: string | null
  transcript: string | null
  answered_by?: string | null        // user.id who answered
  created_at: string
  contact?: Contact | null
}

export interface Note {
  id: string
  business_id: string
  ref_type: "call" | "conversation" | "contact"
  ref_id: string
  body: string
  created_at: string
}

export interface Conversation {
  id: string
  business_id: string
  contact_id: string
  status: ConversationStatus
  last_message_at: string
  last_message_preview: string | null
  unread_count: number
  created_at: string
}

/** Conversation with its joined Contact row */
export interface ConversationWithContact extends Conversation {
  contact: Contact | null
}

export interface Message {
  id: string
  conversation_id: string
  /** inbound = customer → VA, outbound = VA/owner → customer */
  direction: "inbound" | "outbound"
  body: string
  created_at: string
  sender_name: string | null
  twilio_message_sid?: string | null
  sent_by?: string | null            // user.id (null for inbound / system messages)
}

export interface SendReplyPayload {
  body: string
}

/** Supabase `users` table — bridges Clerk userId ↔ business_id */
export interface PortalUser {
  id: string
  clerk_user_id: string
  business_id: string
  created_at: string
}

// ─── Settings types ────────────────────────────────────────────────────────

export type RoutingMode = "assistant_first" | "simultaneous" | "owner_only"

export type AfterHoursMode = "voicemail" | "forward" | "message"

export interface BusinessHours {
  /** ISO day 0 = Sunday … 6 = Saturday */
  day: number
  open: boolean
  start: string  // "HH:MM"
  end: string    // "HH:MM"
}

export interface Business {
  id: string
  name: string
  phone: string | null
  twilio_number?: string | null
  timezone: string
  voicemail_enabled: boolean
  business_hours: BusinessHours[]
  created_at: string
}

export interface RoutingRule {
  id: string
  business_id: string
  mode: RoutingMode
  ring_timeout: number        // seconds
  after_hours_mode: AfterHoursMode
  forward_number: string | null
  ivr_enabled: boolean
  updated_at: string
}

export type UserStatus = "online" | "offline" | "on_call"

/** User record in Supabase — extends PortalUser with display fields */
export interface User {
  id: string
  clerk_user_id: string
  business_id: string
  role: "owner" | "va" | "admin" | "assistant" | "castlestone_admin"
  name: string | null
  email: string | null
  phone?: string | null
  status?: UserStatus
  created_at: string
}
