"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Minus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
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

export default function OrderPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedService, setSelectedService] = useState("Essay Writing")
  const [selectedLevel, setSelectedLevel] = useState("BA/BSC")
  const [pages, setPages] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  

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

  // public page: no existing orders stored client-side

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
        {/* Create New Order */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Create New Order</h2>
        </div>

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
                    <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg">
                          Proceed to Payment
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Payment Successful</DialogTitle>
                          <DialogDescription>
                            Your order has been created and payment was processed (simulated).
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-sm text-gray-700">Service: <strong>{selectedService}</strong></p>
                          <p className="text-sm text-gray-700">Level: <strong>{selectedLevel}</strong></p>
                          <p className="text-sm text-gray-700">Pages: <strong>{pages}</strong></p>
                          <p className="text-sm text-gray-700">Total: <strong>£{getCurrentPrice().toFixed(2)}</strong></p>
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button onClick={() => setShowSuccess(false)}>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

        {/* existing orders removed from public page */}
      </div>
    </div>
  )
}
