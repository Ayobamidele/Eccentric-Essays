"use client"

import { redirect } from "next/navigation"

export default function DashboardPage() {
  redirect("/admin")
  const [greeting, setGreeting] = useState("Good Evening")
  const [currentDate, setCurrentDate] = useState("")
  const [userName, setUserName] = useState("John")
  const { setSidebarOpen } = useSidebar()

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



  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-700 hover:text-gray-900"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <div>
              <p className="text-sm text-gray-600">{currentDate}</p>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {greeting}, {userName}!
              </h1>
            </div>
          </div>

        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
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
    </>
  )
}
