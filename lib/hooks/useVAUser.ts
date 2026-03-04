"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@/lib/types"

interface UseVAUserResult {
  userId: string | null       // internal Supabase users.id
  businessId: string | null
  role: User["role"] | null
  loading: boolean
}

/**
 * Fetches the current VA's Supabase profile (id, business_id, role).
 * Needed by VA components that must filter by assigned_user_id.
 */
export function useVAUser(): UseVAUserResult {
  const { user, isLoaded } = useUser()
  const [userId, setUserId] = useState<string | null>(null)
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [role, setRole] = useState<User["role"] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    if (!user) {
      setLoading(false)
      return
    }

    const supabase = getSupabaseBrowserClient()
    supabase
      .from("users")
      .select("id, business_id, role")
      .eq("clerk_user_id", user.id)
      .single()
      .then(({ data }) => {
        setUserId(data?.id ?? null)
        setBusinessId(data?.business_id ?? null)
        setRole(data?.role ?? null)
        setLoading(false)
      })
  }, [isLoaded, user])

  return { userId, businessId, role, loading: !isLoaded || loading }
}
