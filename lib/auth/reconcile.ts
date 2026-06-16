import { auth, currentUser } from "@clerk/nextjs/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export interface ReconciledProfile {
  role: string
}

/**
 * SYNCHRONOUS onboarding reconcile — the source of truth for onboarding.
 * Does NOT depend on the Clerk webhook, CLERK_WEBHOOK_SECRET, or ngrok (the
 * webhook remains only for user.updated / user.deleted).
 *
 * Resolution order for the signed-in Clerk user (VERIFIED primary email):
 *   1. Already linked by clerk_user_id → return it.
 *   2. A pending admin-provisioned row matches the email → link & return it.
 *   3. SELF-SERVE: when SELF_SIGNUP_ENABLED === "true", auto-create a new
 *      business + owner row for this user (no admin/approval) → return it.
 *
 * Returns null only when there's nothing to resolve (unverified email, or
 * self-signup disabled with no provisioned row) — caller → /account-pending.
 */
export async function reconcileUser(): Promise<ReconciledProfile | null> {
  const { userId } = await auth()
  if (!userId) return null

  const supabase = createServerSupabaseClient()

  // 1 — Already linked to this Clerk id? (also the idempotent no-op case)
  const { data: existing } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_user_id", userId)
    .maybeSingle()
  if (existing) return existing

  // 2 — Link by VERIFIED primary email against a pending provisioned row.
  const user = await currentUser()
  const primary = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId,
  )
  const email = primary?.emailAddress?.toLowerCase()
  const verified = primary?.verification?.status === "verified"
  if (!email || !verified) return null

  const { data: pending } = await supabase
    .from("users")
    .select("id")
    .ilike("email", email)
    .is("clerk_user_id", null)
    .maybeSingle()

  if (pending) {
    // Idempotent claim: only succeeds while the row is still unclaimed, so two
    // concurrent requests can't clobber each other or steal a claimed row.
    const { data: linked } = await supabase
      .from("users")
      .update({ clerk_user_id: userId })
      .eq("id", pending.id)
      .is("clerk_user_id", null)
      .select("role")
      .maybeSingle()
    if (linked) return linked

    // Lost the race — re-read by our own Clerk id in case we just got linked.
    const { data: after } = await supabase
      .from("users")
      .select("role")
      .eq("clerk_user_id", userId)
      .maybeSingle()
    if (after) return after
  }

  // 3 — SELF-SERVE onboarding. No provisioned row: auto-create a workspace so
  // signup → portal needs no admin/approval. Gated by SELF_SIGNUP_ENABLED as a
  // kill-switch (config, not an approval). Re-check by clerk_user_id first to
  // avoid a double-create if a concurrent request just made one.
  if (process.env.SELF_SIGNUP_ENABLED !== "true") return null

  const { data: raced } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_user_id", userId)
    .maybeSingle()
  if (raced) return raced

  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || null

  const { data: business } = await supabase
    .from("businesses")
    .insert({ name: `${name ?? email}'s Workspace` })
    .select("id")
    .single()
  if (!business) return null

  const { data: created } = await supabase
    .from("users")
    .insert({
      clerk_user_id: userId,
      business_id: business.id,
      role: "owner",
      name,
      email,
      status: "offline",
    })
    .select("role")
    .maybeSingle()
  return created ?? null
}

/**
 * Records signup DEMAND when a verified, signed-in user with no provisioned row
 * reaches /account-pending. Idempotent per email (preserves status on revisit).
 * Does NOT create a business/owner — provisioning stays manual. Safe to call on
 * every /account-pending render; no-ops for unauthenticated/unverified users.
 */
export async function captureSignupRequest(): Promise<void> {
  const { userId } = await auth()
  if (!userId) return

  const user = await currentUser()
  const primary = user?.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId,
  )
  const email = primary?.emailAddress?.toLowerCase()
  if (!email || primary?.verification?.status !== "verified") return

  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || null

  const supabase = createServerSupabaseClient()
  await supabase.rpc("upsert_signup_request", {
    p_email: email,
    p_clerk_user_id: userId,
    p_name: name,
  })
}
