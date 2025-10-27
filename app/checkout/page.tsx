"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Lock, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [pages, setPages] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isReturningCustomer, setIsReturningCustomer] = useState(false)
  const [accountEmail, setAccountEmail] = useState("")

  const [paperFormat, setPaperFormat] = useState("Chicago")
  const [customFormat, setCustomFormat] = useState("")
  const [subject, setSubject] = useState("")
  const [topics, setTopics] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  useEffect(() => {
    const service = searchParams.get("service") || "Essay Writing"
    const level = searchParams.get("level") || "BA/BSC"
    const pagesParam = searchParams.get("pages") || "1"
    const deadline = searchParams.get("deadline") || ""

    setSelectedService(service)
    setSelectedLevel(level)
    setPages(Number.parseInt(pagesParam))
    setSelectedDate(deadline)
  }, [searchParams])

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

  const paperFormats = ["Chicago", "Harvard", "APA", "Vancouver", "MLA", "Oscola", "Turabian", "Other"]

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = [
        "text/plain",
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file)
      } else {
        alert("Please upload only txt, image, pdf, docx, or doc files")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side - Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-8 bg-white border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">1. Account Details</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">Change</button>
              </div>

              {/* Returning Customer Option */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isReturningCustomer}
                    onChange={(e) => setIsReturningCustomer(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-gray-900">I'm a returning customer</span>
                </label>
                {isReturningCustomer && (
                  <input
                    type="email"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    placeholder="Enter your account email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                )}
              </div>

              {!isReturningCustomer && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-8 bg-white border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Paper Details</h2>

              {/* Paper Format */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Paper Format</label>
                <div className="flex flex-wrap gap-3">
                  {paperFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => {
                        setPaperFormat(format)
                        if (format !== "Other") {
                          setCustomFormat("")
                        }
                      }}
                      className={`px-6 py-2 rounded-full font-semibold transition-all ${
                        paperFormat === format
                          ? "bg-blue-500 text-white"
                          : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
                {paperFormat === "Other" && (
                  <input
                    type="text"
                    value={customFormat}
                    onChange={(e) => setCustomFormat(e.target.value)}
                    placeholder="Enter your paper format"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                )}
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter your subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Topics */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topics <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  placeholder="Enter topic name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Enter any additional information"
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload only txt, image, pdf, docx, doc file
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload size={20} className="text-gray-400" />
                  <div>
                    <span className="font-semibold text-gray-700">Browse...</span>
                    <span className="text-gray-500 ml-2">
                      {uploadedFile ? uploadedFile.name : "No files selected."}
                    </span>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".txt,.jpg,.jpeg,.png,.pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
              </div>
            </Card>

            <Card className="p-8 bg-white border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Payment Method</h2>
              <div className="space-y-4">
                <label
                  className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                  style={{ borderColor: paymentMethod === "paystack" ? "#0052CC" : undefined }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked={paymentMethod === "paystack"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Paystack</span>
                    <p className="text-sm text-gray-600">Secure payment with Paystack</p>
                  </div>
                </label>
                <label
                  className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                  style={{ borderColor: paymentMethod === "stripe" ? "#0052CC" : undefined }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Stripe</span>
                    <p className="text-sm text-gray-600">Secure payment with Stripe</p>
                  </div>
                </label>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border border-blue-200">
              <p className="text-gray-800 mb-4 leading-relaxed">
                Your personal data will be used to process your order, support your experience throughout this website,
                and for other purposes described in our privacy policy.
              </p>
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded"
                />
                <span className="text-blue-600">
                  I have read and agree to the website{" "}
                  <Link href="/terms" className="underline hover:text-blue-700 font-semibold">
                    terms and conditions
                  </Link>
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <Button
                disabled={!agreedToTerms}
                className={`w-full py-3 text-lg font-semibold transition-all ${
                  agreedToTerms
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Lock size={20} className="mr-2" />
                Place Order
              </Button>
            </Card>
          </div>

          {/* Right Side - Order Summary */}
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-semibold text-gray-900">
                    {paperFormat === "Other" ? customFormat || "Custom" : paperFormat}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total:</span>
                  <span className="font-semibold">£{getCurrentPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold">£0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">£0.00</span>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-blue-600">
                  <span>Total:</span>
                  <span>£{getCurrentPrice().toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
