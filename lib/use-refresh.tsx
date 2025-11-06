"use client"

import { useEffect, useState } from "react"
import { onRefreshChange } from "./api"

export function useRefreshing() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const unsub = onRefreshChange((v) => setIsRefreshing(v))
    return () => {
      try {
        unsub()
      } catch {
        // ignore
      }
    }
  }, [])

  return { isRefreshing }
}
