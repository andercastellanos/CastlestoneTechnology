"use client"

import { useEffect, useMemo } from "react"
import { useSession } from "@clerk/nextjs"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Browser Supabase client authenticated with the current Clerk session token
 * (native third-party integration — getToken() with NO template arg).
 *
 * - REST reads: the `accessToken` option supplies a fresh token per request, so
 *   RLS policies keyed on auth.jwt()->>'sub' resolve to the signed-in user.
 * - Realtime: auth is refreshed separately on an interval (setAuth), because the
 *   socket is long-lived and Clerk session tokens are short-lived. Treating
 *   realtime auth as separate from REST is required or subscriptions go stale.
 *
 * This is the preferred client for RLS-protected browser reads. The legacy
 * getSupabaseBrowserClient() singleton remains as a fallback for not-yet-migrated
 * components.
 */
export function useSupabaseBrowserClient(): SupabaseClient {
  const { session } = useSession()

  // Rebuild only when the session identity changes (login/logout), not on every
  // token rotation — getToken() inside the callback always returns a fresh token.
  const client = useMemo(
    () =>
      createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          accessToken: async () => (await session?.getToken()) ?? null,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session?.id],
  )

  // Keep the realtime socket's auth token fresh for long-lived subscriptions.
  useEffect(() => {
    if (!session) return
    let active = true
    const apply = async () => {
      const token = (await session.getToken()) ?? null
      if (active && token) client.realtime.setAuth(token)
    }
    apply()
    const id = setInterval(apply, 50_000) // < Clerk's ~60s token lifetime
    return () => {
      active = false
      clearInterval(id)
    }
  }, [client, session])

  return client
}
