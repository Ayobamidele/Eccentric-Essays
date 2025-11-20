"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { AdminData, getAdminMe } from "./admin"
import { toast } from "sonner"

type AdminContextValue = {
  admin: AdminData | null
  loading: boolean
  refreshAdmin: (silent?: boolean) => Promise<void>
  setAdmin: (data: AdminData | null) => void
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // Start with no admin on both server and client to keep server-rendered HTML
  // consistent with the initial client render. We'll hydrate from localStorage
  // after mount to avoid hydration mismatches.
  const [admin, setAdminState] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  /**
   * Refresh admin profile from server.
   * If `silent` is true we won't flip the `loading` flag so the UI can
   * continue showing a cached name while we refresh in background.
   */
  const refreshAdmin = async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const data = await getAdminMe()
      setAdminState(data)
      try {
        if (typeof window !== 'undefined' && data) {
          localStorage.setItem('ee_admin', JSON.stringify(data))
        }
      } catch {}
    } catch (error) {
      console.error("Failed to fetch admin data:", error)
      if (!silent) toast.error("Failed to load admin profile")
      setAdminState(null)
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true

    // Hydrate from cache (client-only). This runs after mount so server and
    // initial client markup match.
    ;(async () => {
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('ee_admin')
          if (raw && mounted) {
            setAdminState(JSON.parse(raw) as AdminData)
            // refresh silently in background
            await refreshAdmin(true)
            return
          }
        } catch {}
      }

      // No cache found: fetch normally (shows loading until complete)
      if (mounted) await refreshAdmin(false)
    })()

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AdminContext.Provider value={{ admin, loading, refreshAdmin, setAdmin: setAdminState }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider")
  return ctx
}
