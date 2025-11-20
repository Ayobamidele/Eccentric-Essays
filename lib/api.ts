import { BACKEND_BASE_URL, AUTH_REFRESH_PATH } from "./env"
import { toast } from "sonner"
import { setPostLoginRedirect } from "./post-login"

const TOKEN_KEY = "ee_token"
const REFRESH_TOKEN_KEY = "ee_refresh_token"

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // ignore storage errors
  }
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setRefreshToken(token: string | null) {
  if (typeof window === "undefined") return
  try {
    if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token)
    else localStorage.removeItem(REFRESH_TOKEN_KEY)
  } catch {
    // ignore
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refresh = getRefreshToken()
  if (!refresh) return false

  try {
    const url = `${BACKEND_BASE_URL}/api/v1/auth/refresh/admin`
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        refresh_token: refresh
      })
    })

    if (!res.ok) return false
    const data = await res.json()
    // Accept standard response shape: data.access_token or nested in data
    const newToken = data?.access_token || data?.token || data?.data?.access_token || data?.data?.token
    const newRefresh = data?.refresh_token || data?.data?.refresh_token
    if (newToken) setToken(newToken)
    if (newRefresh) setRefreshToken(newRefresh)
    return !!newToken
  } catch {
    return false
  }
}

// Prevent concurrent refreshes: single-flight promise
let refreshingPromise: Promise<boolean> | null = null
let refreshing = false
const refreshListeners = new Set<(v: boolean) => void>()

export function onRefreshChange(cb: (v: boolean) => void) {
  refreshListeners.add(cb)
  return () => refreshListeners.delete(cb)
}

function ensureRefresh(): Promise<boolean> {
  if (!refreshingPromise) {
    refreshing = true
    refreshListeners.forEach((cb) => cb(true))
    refreshingPromise = (async () => {
      try {
        return await refreshAccessToken()
      } finally {
        // clear after attempt (success or failure)
        refreshingPromise = null
        refreshing = false
        refreshListeners.forEach((cb) => cb(false))
      }
    })()
  }
  return refreshingPromise
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
  opts: { redirectOnAuthFail?: boolean } = {}
): Promise<T> {
  const url = `${BACKEND_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }
  const token = getToken()
  if (token) {
    ;(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
  }

  let res = await fetch(url, {
    credentials: "include",
    mode: "cors",
    ...options,
    headers,
  })

  const contentType = res.headers.get("content-type") || ""
  const isJson = contentType.includes("application/json")
  let body: unknown = isJson ? await res.json() : (await res.text()) as unknown

  // If unauthorized, try to refresh token and retry once
  if (res.status === 401) {
    // Attempt a single refresh and let other callers wait on the same promise
    const refreshed = await ensureRefresh()
    if (refreshed) {
      // retry original request with new token
      const token = getToken()
      if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`

      res = await fetch(url, {
        credentials: "include",
        mode: "cors",
        ...options,
        headers,
      })

      const ct = res.headers.get("content-type") || ""
      const isJson2 = ct.includes("application/json")
      body = isJson2 ? await res.json() : (await res.text()) as unknown
    }
    else {
      // Refresh failed: clear tokens. Redirect only if caller requested it.
      try {
        setToken(null)
        setRefreshToken(null)
      } catch {}
      if (opts.redirectOnAuthFail && typeof window !== 'undefined') {
        try {
          // Save current location so we can return after login
          setPostLoginRedirect(window.location.pathname + window.location.search)
        } catch {}
        // show a short toast then redirect so the user isn't surprised
        try {
          toast.error('Session expired. Redirecting to login...')
        } catch {}
        setTimeout(() => { window.location.href = '/login' }, 1100)
      }
      throw new Error('Session expired')
    }
  }

  if (!res.ok) {
    const message = (body as any)?.message || (typeof body === "string" ? body : res.statusText)
    throw new Error(typeof message === "string" ? message : "Request failed")
  }

  return body as T
}
