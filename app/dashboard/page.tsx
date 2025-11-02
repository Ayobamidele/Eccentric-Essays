"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Clock,
  CheckCircle2,
  Hourglass,
  LayoutDashboard,
  ListTodo,
  Calendar as CalendarIcon,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good Evening")
  const [currentDate, setCurrentDate] = useState("")
  const [userName, setUserName] = useState("John")

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()

    if (hour < 12) {
      setGreeting("Good Morning")
    } else if (hour < 18) {
      setGreeting("Good Afternoon")
    } else {
      setGreeting("Good Evening")
    }

    const dateString = now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    setCurrentDate(dateString)
  }, [])

  const stats = [
    {
      label: "Total Essays",
      value: 14,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "In Progress",
      value: 3,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Completed",
      value: 7,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending",
      value: 4,
      icon: Hourglass,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  const recentActivity = [
    {
      title: "The Impact of Social Media on Society",
      status: "In Progress",
      date: "Jul 20",
      statusColor: "text-orange-600",
    },
    {
      title: "The Benefits of Renewable Energy",
      status: "Completed",
      date: "Jul 18",
      statusColor: "text-green-600",
    },
    {
      title: "The Importance of Education",
      status: "Pending",
      date: "Jul 15",
      statusColor: "text-yellow-600",
    },
  ]

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: ListTodo, label: "Tasks", href: "/dashboard/tasks", badge: "10" },
    { icon: CalendarIcon, label: "Calendar", href: "/dashboard/calendar" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Users, label: "Team", href: "/dashboard/team" },
  ]

  const generalItems = [
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
        <div className="p-6">
          <Link href="/" className="inline-block mb-8">
            <img src="/eccentric-essays-logo.png" alt="Eccentric Essays" className="h-12 w-auto" />
          </Link>

          <nav className="space-y-1">
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</p>
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-red-50 text-red-600 border-l-4 border-red-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">General</p>
              {generalItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{currentDate}</p>
              <h1 className="text-2xl font-bold text-gray-900">
                {greeting}, {userName}!
              </h1>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus size={20} className="mr-2" />
              New Order
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="p-6 bg-white border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                      <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`${stat.color}`} size={24} />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className={`text-sm font-medium ${activity.statusColor}`}>{activity.status}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-600">{activity.date}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
