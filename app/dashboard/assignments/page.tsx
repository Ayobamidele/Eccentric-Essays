"use client"

import {
  Menu,
  ChevronLeft,
  Plus,
  Filter,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/hooks/use-sidebar"

export default function AssignmentsPage() {
  const { setSidebarOpen } = useSidebar()
  const router = useRouter()



  const assignments = [
    {
      id: 1,
      name: "Annual Projection",
      date: "02/12/20",
      status: "Complete",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 2,
      name: "Revenue Forecast",
      date: "02/12/20",
      status: "In progress",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 3,
      name: "Cash Flow Analysis",
      date: "02/12/20",
      status: "In progress",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 4,
      name: "Portfolio Summary",
      date: "02/12/20",
      status: "In progress",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 5,
      name: "Investment Summary",
      date: "02/12/20",
      status: "Complete",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 6,
      name: "Operational Cost",
      date: "02/12/20",
      status: "In progress",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 7,
      name: "Revenue Growth",
      date: "02/12/20",
      status: "Inactive",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 8,
      name: "Market Trends",
      date: "02/12/20",
      status: "Inactive",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
    {
      id: 9,
      name: "Reconciliation Log",
      date: "02/12/20",
      status: "Inactive",
      responsible: ["/placeholder-user.jpg", "/placeholder-user.jpg"],
      dueDate: "02/12/20",
    },
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-700"
      case "In progress":
        return "bg-yellow-100 text-yellow-700"
      case "Inactive":
        return "bg-gray-100 text-gray-700"
      default:
        return ""
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700 hover:text-gray-900" aria-label="Open sidebar">
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
            <p className="text-sm text-gray-600">Find assignments details below.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filters
          </Button>
          <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
            <Plus size={16} />
            Drop an assignment
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md">Incomes</Button>
            <Button variant="ghost" className="px-4 py-2 text-sm font-medium text-gray-700">Expenses</Button>
            <Button variant="ghost" className="px-4 py-2 text-sm font-medium text-gray-700">Transfers</Button>
            <Button variant="ghost" className="px-4 py-2 text-sm font-medium text-gray-700">Investments</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Checkbox id="select-all" className="mr-2" />
                      Assignments
                      <ChevronLeft size={16} className="ml-1 rotate-90" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Date
                      <ChevronLeft size={16} className="ml-1 rotate-90" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Status
                      <ChevronLeft size={16} className="ml-1 rotate-90" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Responsible
                      <ChevronLeft size={16} className="ml-1 rotate-90" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      Due Date
                      <ChevronLeft size={16} className="ml-1 rotate-90" />
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id} className="cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/dashboard/assignments/${assignment.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Checkbox id={`assignment-${assignment.id}`} className="mr-2" />
                          <span className="text-sm font-medium text-gray-900">{assignment.name}</span>
                        </div>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{assignment.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          assignment.status
                        )}`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2 overflow-hidden">
                        {assignment.responsible.map((avatar, index) => (
                          <Avatar key={index} className="w-8 h-8 border-2 border-white">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-sm text-gray-900">{assignment.dueDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}