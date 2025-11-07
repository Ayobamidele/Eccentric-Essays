import { apiFetch } from "./api"
import { ADMIN_USERS_PATH, ADMIN_OVERVIEW_PATH, ADMIN_ME_PATH, ADMIN_ORDERS_PATH } from "./env"

export type AdminUser = {
  id: string | number
  name: string
  email: string
  role?: string
  status?: string
  joinedAt?: string
}

export type AdminData = {
  first_name: string
  last_name: string
  email: string
  role: string | null
  is_super_admin: boolean
  is_active: boolean
  id: string
  created_at: string
  updated_at: string
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  // Use ADMIN_ME_PATH as the admin listing endpoint as requested (/api/v1/admin)
  const res = await apiFetch<any>(ADMIN_ME_PATH, { method: "GET" }, { redirectOnAuthFail: true })
  // Accept common shapes
  if (Array.isArray(res)) return res as AdminUser[]
  if (res?.data && Array.isArray(res.data)) return res.data as AdminUser[]
  if (res?.users && Array.isArray(res.users)) return res.users as AdminUser[]
  return []
}

export async function getAdminOverview(): Promise<any> {
  return await apiFetch<any>(ADMIN_OVERVIEW_PATH, { method: "GET" }, { redirectOnAuthFail: true })
}

export async function getAdminMe(): Promise<AdminData> {
  const res = await apiFetch<{data: AdminData}>(ADMIN_ME_PATH, { method: "GET" }, { redirectOnAuthFail: true })
  return res.data
}

export async function getAdminById(adminId: string): Promise<AdminData> {
  const path = `${ADMIN_ME_PATH}/${adminId}`
  const res = await apiFetch<{data: AdminData}>(path, { method: "GET" }, { redirectOnAuthFail: true })
  return res.data
}

export async function getAdminOrders(status = "in_progress", skip = 0, limit = 50): Promise<any> {
  const params = new URLSearchParams()
  if (status) params.set("status", status)
  params.set("skip", String(skip))
  params.set("limit", String(limit))

  const path = `${ADMIN_ORDERS_PATH}?${params.toString()}`
  const res = await apiFetch<any>(path, { method: "GET" }, { redirectOnAuthFail: true })
  // Accept standard response shapes
  if (res?.data) return res.data
  if (Array.isArray(res)) return res
  return res
}

export function getGreeting(firstName?: string): string {
  const hour = new Date().getHours()
  let greeting = ''
  
  if (hour < 12) {
    greeting = 'Good morning'
  } else if (hour < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good evening'
  }

  return firstName ? `${greeting}, ${firstName}` : greeting
}
