"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { AdminData, getAdminMe } from "./admin"
import { toast } from "sonner"

type AdminContextValue = {
  admin: AdminData | null
  loading: boolean
  refreshAdmin: () => Promise<void>
  setAdmin: (data: AdminData | null) => void
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdminState] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshAdmin = async () => {
    setLoading(true)
    try {
      const data = await getAdminMe()
      setAdminState(data)
    } catch (error) {
      console.error("Failed to fetch admin data:", error)
      toast.error("Failed to load admin profile")
      setAdminState(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Only fetch admin data on mount if we don't already have it
    if (!admin) {
      refreshAdmin()
    } else {
      setLoading(false)
    }
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
