const PROD_BACKEND_BASE_URL = "https://eccentric-essays-backend.onrender.com"
const DEV_BACKEND_BASE_URL = "http://127.0.0.1:8000"

export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "production" ? PROD_BACKEND_BASE_URL : DEV_BACKEND_BASE_URL)

export const AUTH_LOGIN_PATH = process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH || "/api/v1/auth/login/admin"
export const AUTH_REGISTER_PATH = process.env.NEXT_PUBLIC_AUTH_REGISTER_PATH || "/api/v1/auth/register/admin"
export const AUTH_LOGOUT_PATH = process.env.NEXT_PUBLIC_AUTH_LOGOUT_PATH || "/api/v1/auth/logout/admin"

export const ADMIN_USERS_PATH = process.env.NEXT_PUBLIC_ADMIN_USERS_PATH || "/api/v1/admin"
export const ADMIN_OVERVIEW_PATH = process.env.NEXT_PUBLIC_ADMIN_OVERVIEW_PATH || "/api/v1/admin/overview"
export const ADMIN_ME_PATH = process.env.NEXT_PUBLIC_ADMIN_ME_PATH || "/api/v1/admin/me"
export const ADMIN_ORDERS_PATH = process.env.NEXT_PUBLIC_ADMIN_ORDERS_PATH || "/api/v1/admin/orders"

export const AUTH_REFRESH_PATH = process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH || "/api/v1/auth/refresh/admin"
