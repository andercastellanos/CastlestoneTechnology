import { createClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client using the service role key.
 * Bypasses RLS — only use in trusted server contexts (API routes, server components).
 * Never import this in client components.
 */
export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

/**
 * Service-role client for platform/admin queries (bypasses RLS).
 * Identical to {@link createServerSupabaseClient}; named separately so admin
 * call sites read clearly. Server-only — never import in client components.
 */
export function createAdminSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
