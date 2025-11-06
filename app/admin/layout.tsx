"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { isAdmin, logout } from "@/lib/auth"
import { toast } from "sonner"
import { AdminProvider, useAdmin } from "@/lib/admin-context"


const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/")

  useEffect(() => {
    // Check admin status on mount and route changes
    if (!isAdmin()) {
      router.replace('/login')
    }
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/login')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to log out')
    }
  }



  function SidebarHeader() {
    // small component to show admin name/greeting from context
    try {
      const { admin, loading } = useAdmin()
      return (
        <div className="px-4 py-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <img src="/eccentric-essays-logo.png" alt="Eccentric Essays" className="h-8 w-auto" />
          </Link>
          <div className="mt-3">
            {loading ? (
              <div className="text-sm text-gray-500">Loading profile...</div>
            ) : admin ? (
              <div className="text-sm text-gray-700">{`Hello, ${admin.first_name}`}</div>
            ) : (
              <div className="text-sm text-gray-500">Welcome</div>
            )}
          </div>
        </div>
      )
    } catch {
      // if not within provider, render basic header
      return (
        <div className="px-4 py-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <img src="/eccentric-essays-logo.png" alt="Eccentric Essays" className="h-8 w-auto" />
          </Link>
        </div>
      )
    }
  }

  return (
    <AdminProvider>
      <div className="min-h-screen flex bg-[#F7F8FA]">
      <aside className="w-64 shrink-0 border-r bg-white">
        <SidebarHeader />
        <nav className="p-2 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm ` +
                  (active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
                }
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}

          <Button
            variant="ghost"
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-4"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="p-6">{children}</div>
      </main>
    </div>
    </AdminProvider>
  )
}
