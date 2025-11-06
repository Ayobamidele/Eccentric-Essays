import { apiFetch, setToken, getToken, setRefreshToken } from "./api"
import { AUTH_LOGIN_PATH, AUTH_REGISTER_PATH, AUTH_LOGOUT_PATH } from "./env"
import { jwtDecode } from "jwt-decode"

type JWTPayload = {
  sub: string
  exp: number
  iat: number
  role?: string
}

type LoginResponse = {
  token?: string
  access_token?: string
  isAdmin?: boolean
  data?: {
    token?: string
    access_token?: string
    isAdmin?: boolean
  }
}

type RegisterResponse = {
  token?: string
  access_token?: string
  isAdmin?: boolean
  message?: string
  data?: {
    token?: string
    access_token?: string
    isAdmin?: boolean
  }
}

function extractToken(res: any): string | null {
  return (
    res?.token ||
    res?.access_token ||
    res?.data?.token ||
    res?.data?.access_token ||
    null
  )
}

function extractRefreshToken(res: any): string | null {
  return (
    res?.refresh_token ||
    res?.data?.refresh_token ||
    res?.refreshToken ||
    null
  )
}

import { getAdminMe } from "./admin"

export async function login(email: string, password: string) {
  const payload = { email, username: email, password }
  const res = await apiFetch<LoginResponse>(AUTH_LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
  })
  
  const token = extractToken(res)
  if (!token) throw new Error('No token received')
  
  // Since we're using the admin login endpoint, a successful response with a token
  // means the user is an admin. No need to check isAdmin flag in token.
  setToken(token)

  // Store refresh token if provided
  const refresh = extractRefreshToken(res)
  if (refresh) setRefreshToken(refresh)

  // Fetch admin data right after successful login
  const adminData = await getAdminMe()
  
  return { ...res, adminData }
}

export async function register(data: { first_name?: string; last_name?: string; email: string; password: string }) {
  // Backend expects first_name, last_name, email, password for admin creation
  const payload = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
  }
  const res = await apiFetch<RegisterResponse>(AUTH_REGISTER_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
  })

  return res
}

export async function logout() {
  try {
    await apiFetch(AUTH_LOGOUT_PATH, { method: "POST" })
  } catch {
    // ignore
  }
  setToken(null)
  try {
    setRefreshToken(null)
  } catch {
    // ignore
  }
}

export function isAuthenticated() {
  const token = getToken()
  if (!token) return false
  
  try {
    const decoded = jwtDecode<JWTPayload>(token)
    // Since we're using admin-only endpoints, any valid token means it's an admin
    return true
  } catch {
    return false
  }
}

export function isAdmin() {
  const token = getToken()
  if (!token) return false
  
  try {
    const decoded = jwtDecode<JWTPayload>(token)
    // Since we're using admin-only endpoints, any valid token means it's an admin
    return true
  } catch {
    return false
  }
}
