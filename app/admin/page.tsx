"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Clock3, FileText, Hourglass } from "lucide-react"
import { getGreeting, getAdminMe, type AdminData } from "@/lib/admin"

function StatCard({ label, value, icon, accent }: { label: string; value: string | number; icon: React.ReactNode; accent: string }) {
  return (
    <div className="rounded-xl border bg-white p-5 flex items-center gap-4">
      <div className={`h-10 w-10 grid place-content-center rounded-lg ${accent}`}>{icon}</div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const today = new Date()
  const dateStr = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminMe()
        setAdminData(data)
      } catch (error) {
        console.error('Failed to fetch admin data:', error)
      }
    }
    fetchAdminData()
  }, [])

  // Sample data placeholders; swap with live data later
  const metrics = {
    pendingOrders: 6,
    inProgressOrders: 5,
    completedOrders: 9,
    totalUsers: 289,
  }

  const orders = {
    pending: [
      { id: "#10512", title: "Essay: Social Media", date: "Nov 3" },
      { id: "#10511", title: "Case Study: Marketing", date: "Nov 3" },
      { id: "#10510", title: "Report: Supply Chain", date: "Nov 2" },
      { id: "#10509", title: "Essay: Behavioral Econ", date: "Nov 2" },
    ],
    inProgress: [
      { id: "#10508", title: "Report: AI Ethics", date: "Nov 2" },
      { id: "#10506", title: "Thesis: Climate Policy", date: "Nov 1" },
      { id: "#10505", title: "Review: Data Privacy", date: "Nov 1" },
      { id: "#10504", title: "Essay: Globalization", date: "Oct 31" },
    ],
    completed: [
      { id: "#10502", title: "Review: Renewable Energy", date: "Oct 31" },
      { id: "#10499", title: "Essay: Education", date: "Oct 30" },
      { id: "#10497", title: "Memo: HR Policy", date: "Oct 29" },
      { id: "#10495", title: "Case: Product Launch", date: "Oct 29" },
    ],
    history: [
      { id: "#10490", title: "Essay: Philosophy", date: "Oct 28" },
      { id: "#10483", title: "Report: UX Research", date: "Oct 26" },
      { id: "#10480", title: "Brief: Market Trends", date: "Oct 25" },
      { id: "#10478", title: "Summary: Literature Review", date: "Oct 24" },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-500">{dateStr}</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {adminData ? getGreeting(adminData.first_name) : 'Loading...'}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Orders" value={metrics.pendingOrders} icon={<Hourglass className="text-yellow-600" size={18} />} accent="bg-yellow-50" />
        <StatCard label="In-Progress Orders" value={metrics.inProgressOrders} icon={<Clock3 className="text-orange-600" size={18} />} accent="bg-orange-50" />
        <StatCard label="Completed Orders" value={metrics.completedOrders} icon={<CheckCircle2 className="text-green-600" size={18} />} accent="bg-green-50" />
        <StatCard label="Total Users" value={metrics.totalUsers} icon={<FileText className="text-blue-600" size={18} />} accent="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pending */}
        <div className="rounded-xl border bg-white">
          <div className="px-6 py-4 border-b font-semibold text-gray-900">Pending</div>
          <div className="divide-y">
            {orders.pending.map((o) => (
              <div key={o.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{o.title}</div>
                  <div className="text-xs text-gray-500">{o.id}</div>
                </div>
                <div className="inline-flex items-center text-xs px-2 py-0.5 rounded-full text-yellow-700 bg-yellow-50">{o.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border bg-white">
          <div className="px-6 py-4 border-b font-semibold text-gray-900">In Progress</div>
          <div className="divide-y">
            {orders.inProgress.map((o) => (
              <div key={o.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{o.title}</div>
                  <div className="text-xs text-gray-500">{o.id}</div>
                </div>
                <div className="inline-flex items-center text-xs px-2 py-0.5 rounded-full text-orange-600 bg-orange-50">{o.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border bg-white">
          <div className="px-6 py-4 border-b font-semibold text-gray-900">Completed</div>
          <div className="divide-y">
            {orders.completed.map((o) => (
              <div key={o.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{o.title}</div>
                  <div className="text-xs text-gray-500">{o.id}</div>
                </div>
                <div className="inline-flex items-center text-xs px-2 py-0.5 rounded-full text-green-600 bg-green-50">{o.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="rounded-xl border bg-white">
          <div className="px-6 py-4 border-b font-semibold text-gray-900">Order History</div>
          <div className="divide-y">
            {orders.history.map((o) => (
              <div key={o.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{o.title}</div>
                  <div className="text-xs text-gray-500">{o.id}</div>
                </div>
                <div className="text-xs text-gray-500">{o.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
