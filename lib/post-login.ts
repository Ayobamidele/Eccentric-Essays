const REDIRECT_KEY = 'ee_post_login_redirect'

export function setPostLoginRedirect(path: string) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(REDIRECT_KEY, path) } catch {}
}

export function getPostLoginRedirect(): string | null {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(REDIRECT_KEY) } catch { return null }
}

export function clearPostLoginRedirect() {
  if (typeof window === 'undefined') return
  try { localStorage.removeItem(REDIRECT_KEY) } catch {}
}
