"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Minus, Calendar, Trash2, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState<"new" | "existing">("new")
  const [selectedService, setSelectedService] = useState("Essay Writing")
  const [selectedLevel, setSelectedLevel] = useState("BA/BSC")
  const [pages, setPages] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [existingOrders, setExistingOrders] = useState([
    {
      id: 1,
      service: "Essay Writing",
      pages: 5,
      level: "BA/BSC",
      price: 102.5,
      status: "Pending Payment",
      deadline: "2025-11-15",
    },
    {
      id: 2,
      service: "Thesis Writing",
      pages: 10,
      level: "MA/MSC/MBA/MPHIL",
      price: 225,
      status: "Pending Payment",
      deadline: "2025-12-01",
    },
  ])

  const services = [
    "Essay Writing",
    "Thesis Writing",
    "Dissertation Writing",
    "Research Proposal",
    "Literature Review Writing",
    "Data Analysis",
    "Statistics Presentation",
    "Dissertation Supervisor",
    "Assignment Help",
    "Business Plans",
    "Academic Posters",
    "Articles",
    "Case Study",
    "Custom Coursework Writing",
    "Reports",
    "Proofreading and Editing",
    "Dissertation Results",
    "Dissertation Methodology",
    "Dissertation Introduction",
    "Dissertation Findings",
    "Dissertation Data Analysis",
    "Dissertation Conclusion",
  ]

  const academicLevels = [
    { label: "BA/BSC", price: 20.5 },
    { label: "MA/MSC/MBA/MPHIL", price: 22.5 },
    { label: "PHD", price: 24.5 },
  ]

  const wordCountMap: { [key: number]: number } = {
    1: 250,
    2: 500,
    3: 750,
    4: 1000,
    5: 1250,
    6: 1500,
    7: 1750,
    8: 2000,
    9: 2250,
    10: 2500,
    11: 2750,
    12: 3000,
    13: 3250,
    14: 3500,
    15: 3750,
    16: 4000,
    17: 4250,
    18: 4500,
    19: 4750,
    20: 5000,
  }

  const getCurrentPrice = () => {
    const level = academicLevels.find((l) => l.label === selectedLevel)
    return (level?.price || 20.5) * pages
  }

  const deleteOrder = (id: number) => {
    setExistingOrders(existingOrders.filter((order) => order.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4">
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "new" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Plus className="inline mr-2" size={20} />
            Create New Order
          </button>
          <button
            onClick={() => setActiveTab("existing")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "existing" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Edit3 className="inline mr-2" size={20} />
            Existing Orders ({existingOrders.length})
          </button>
        </div>

        {/* New Order Tab */}
        {activeTab === "new" && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="md:col-span-2">
              <Card className="p-8 bg-white border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Your Order</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Service Type</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Academic Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {academicLevels.map((level) => (
                        <option key={level.label} value={level.label}>
                          {level.label} - £{level.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Number of Pages</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPages(Math.max(1, pages - 1))}
                        className="bg-red-600 text-white w-10 h-10 rounded-lg hover:bg-red-700 flex items-center justify-center"
                      >
                        <Minus size={20} />
                      </button>
                      <input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-center"
                      />
                      <button
                        onClick={() => setPages(pages + 1)}
                        className="bg-red-600 text-white w-10 h-10 rounded-lg hover:bg-red-700 flex items-center justify-center"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {wordCountMap[pages] || 250} words / {pages} page{pages !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Deadline</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">
                        £{(academicLevels.find((l) => l.label === selectedLevel)?.price || 20.5).toFixed(2)} per page
                      </span>
                      <span className="text-3xl font-bold text-red-600">£{getCurrentPrice().toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg">
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 bg-white border-gray-200 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold text-gray-900">{selectedService}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Academic Level:</span>
                    <span className="font-semibold text-gray-900">{selectedLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pages:</span>
                    <span className="font-semibold text-gray-900">{pages}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Words:</span>
                    <span className="font-semibold text-gray-900">{wordCountMap[pages] || 250}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-semibold text-gray-900">{selectedDate || "Not set"}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">£{getCurrentPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold">£0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-red-600 border-t pt-4">
                    <span>Total:</span>
                    <span>£{getCurrentPrice().toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Existing Orders Tab */}
        {activeTab === "existing" && (
          <div>
            {existingOrders.length === 0 ? (
              <Card className="p-12 bg-white border-gray-200 text-center">
                <p className="text-gray-600 mb-4">No existing orders found.</p>
                <Button onClick={() => setActiveTab("new")} className="bg-red-600 hover:bg-red-700 text-white">
                  Create New Order
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {existingOrders.map((order) => (
                  <Card key={order.id} className="p-6 bg-white border-gray-200 hover:shadow-md transition">
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-gray-600">Service</p>
                        <p className="font-semibold text-gray-900">{order.service}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Details</p>
                        <p className="font-semibold text-gray-900">
                          {order.pages} pages • {order.level}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Deadline</p>
                        <p className="font-semibold text-gray-900">{order.deadline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-semibold text-yellow-600">{order.status}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="text-right flex-1">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-2xl font-bold text-red-600">£{order.price.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2">Pay Now</Button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
