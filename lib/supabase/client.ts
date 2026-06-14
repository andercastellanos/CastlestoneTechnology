import { createClient, SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

/**
 * Singleton Supabase browser client, authenticated with the Clerk session token
 * via the `accessToken` option so RLS (auth.jwt()->>'sub') resolves to the
 * signed-in user.
 *
 * NOTE: this uses the `window.Clerk` global as a last-resort token source for
 * components not yet migrated to the preferred `useSupabaseBrowserClient()` hook
 * (which uses Clerk's useSession + handles realtime token refresh). Prefer the
 * hook for new code and RLS-dependent realtime.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (_client) return _client
  _client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      accessToken: async () => {
        if (typeof window === "undefined") return null
        const clerk = (
          window as unknown as {
            Clerk?: { session?: { getToken: () => Promise<string | null> } }
          }
        ).Clerk
        return (await clerk?.session?.getToken?.()) ?? null
      },
    },
  )
  return _client
}
