"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface UseBusinessIdResult {
  businessId: string | null
  loading: boolean
}

/**
 * Resolves the Supabase business_id for the currently authenticated Clerk user.
 * Looks up the `users` table where clerk_user_id = user.id.
 */
export function useBusinessId(): UseBusinessIdResult {
  const { user, isLoaded } = useUser()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    const supabase = getSupabaseBrowserClient()
    supabase
      .from("users")
      .select("business_id")
      .eq("clerk_user_id", user.id)
      .single()
      .then(({ data }) => {
        setBusinessId(data?.business_id ?? null)
        setFetching(false)
      })
  }, [isLoaded, user])

  return { businessId, loading: !isLoaded || (user ? fetching : false) }
}
