"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login, isAdmin } from "@/lib/auth"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect to admin if already logged in
    if (isAdmin()) {
      router.replace('/admin')
    }
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)
    try {
      const { adminData } = await login(email, password)
      toast.success(`Welcome back, ${adminData.first_name}!`)
      router.replace("/admin")
    } catch (err: any) {
      const message = err?.message || "Login failed"
      toast.error(message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form ref={formRef} onSubmit={onSubmit} className="w-full max-w-sm bg-white border rounded-lg p-6 space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Login</h1>
          <p className="text-sm text-gray-600">Access your admin dashboard</p>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="space-y-2">
          <label className="text-sm text-gray-700">Email</label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-700">Password</label>
          <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading || !email || !password}
          onClick={() => formRef.current?.requestSubmit()}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}
