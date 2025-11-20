"use client"

import { useMemo, useState, useEffect } from "react"
import { register as registerAdmin } from "@/lib/auth"
import { getAdminUsers, type AdminUser } from "@/lib/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const statuses = ["Active", "Suspended", "Pending Verification"]

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<string>("")

  // Add user modal state and form
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Users listing (GET /api/v1/admin)
  const [users, setUsers] = useState<AdminUser[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getAdminUsers()
        if (mounted) setUsers(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to load users')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const name = (u as any).name || ((u as any).first_name && `${(u as any).first_name} ${(u as any).last_name}`) || ''
      const matchesQuery = query
        ? [name, u.email].filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase())
        : true
      const matchesStatus = status ? (u.status || '').toLowerCase() === status.toLowerCase() : true
      return matchesQuery && matchesStatus
    })
  }, [users, query, status])

  const today = new Date()
  const dateStr = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">{dateStr}</div>
          <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">+ Add Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new admin</DialogTitle>
              <DialogDescription>Provide the admin's details and click Create.</DialogDescription>
            </DialogHeader>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setSubmitting(true)
                try {
                  await registerAdmin({ first_name: firstName, last_name: lastName, email, password })
                  toast.success('Admin created successfully')
                  setOpen(false)
                  // clear form
                  setFirstName('')
                  setLastName('')
                  setEmail('')
                  setPassword('')
                } catch (err: any) {
                  toast.error(err?.message || 'Failed to create user')
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              <div className="grid gap-3">
                <label className="text-sm">First name</label>
                <Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label className="text-sm">Last name</label>
                <Input required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label className="text-sm">Email</label>
                <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="text-sm">Password</label>
                <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700">
                  {submitting ? 'Creating...' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name or email"
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
            <div className="flex gap-3">
            <select
              aria-label="Status filter"
              title="Status filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 px-3 border rounded-md text-sm text-gray-700 bg-white"
            >
              <option value="">Status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-x-auto">
        <table className="min-w-full">
          <thead>
              <tr className="text-left text-sm text-gray-600">
              <th className="py-3 pl-4 pr-2"><input aria-label="select all" title="Select all" type="checkbox" /></th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Joined On</th>
              <th className="py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {loading && (
              <tr>
                <td className="py-6 px-4" colSpan={7}>Loading admins...</td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td className="py-6 px-4 text-red-600" colSpan={7}>{error}</td>
              </tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td className="py-6 px-4" colSpan={7}>No admins found.</td>
              </tr>
            )}
            {filtered.map((u) => {
              const name = (u as any).name || ((u as any).first_name && `${(u as any).first_name} ${(u as any).last_name}`) || '—'
              const joined = (u as any).joinedAt || (u as any).created_at || '—'
              return (
                <tr key={String((u as any).id || name)} className="border-t">
                  <td className="py-3 pl-4 pr-2"><input aria-label={`select ${name}`} title={`Select ${name}`} type="checkbox" /></td>
                  <td className="py-3 px-2">{name}</td>
                  <td className="py-3 px-2">{u.email || '—'}</td>
                  <td className="py-3 px-2">{u.status || String((u as any).is_active) || '—'}</td>
                  <td className="py-3 px-2">{joined}</td>
                  <td className="py-3 px-2">
                    <button className="text-blue-600 hover:underline mr-3">View</button>
                    <button className="text-gray-600 hover:underline">Edit</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
