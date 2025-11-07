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
  
  // Common input classes with forced black text
  const inputClasses = "[&]:text-gray-900 [&::placeholder]:text-gray-500 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
  const selectClasses = "[&]:text-gray-900 [&>option]:text-gray-900 w-full min-w-0 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  // Account Details state

  type PaperItem = {
    id: string;
    paperFormat: string;
    customFormat: string;
    subject: string;
    topics: string;
    additionalInfo: string;
    uploadedFiles: File[];
    service?: string;
    level?: string;
    pages?: number;
    deadline?: string;
  }

  const [paperItems, setPaperItems] = useState<PaperItem[]>([])

  // Initialize paper items on first load (or when URL params arrive)
  useEffect(() => {
    if (paperItems.length === 0) {
      const initialPaper: PaperItem = {
        id: '1',
        paperFormat: searchParams?.get("paperFormat") || "Chicago",
        customFormat: searchParams?.get("customFormat") || "",
        subject: searchParams?.get("subject") || "",
        topics: searchParams?.get("topics") || "",
        additionalInfo: searchParams?.get("additionalInfo") || "",
        uploadedFiles: [],
        service: searchParams?.get("service") || "Essay Writing",
        level: searchParams?.get("level") || "BA/BSC",
        pages: Number.parseInt(searchParams?.get("pages") || "1"),
        deadline: searchParams?.get("deadline") || "",
      }
      setPaperItems([initialPaper])
    }
  }, [searchParams, paperItems.length])

  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Handle URL parameters
  useEffect(() => {
    if (!searchParams) return;
    
    const service = searchParams.get("service") || "Essay Writing"
    const level = searchParams.get("level") || "BA/BSC"
    const pagesParam = searchParams.get("pages") || "1"
    const deadline = searchParams.get("deadline") || ""
    
    setSelectedService(service)
    setSelectedLevel(level)
    setPages(Number.parseInt(pagesParam))
    setSelectedDate(deadline)
  }, [searchParams])

  // Normalize paperItems: ensure each item always has numeric `pages` and sensible defaults.
  // Run only when an item is missing required defaults to avoid infinite loops.
  useEffect(() => {
    if (paperItems.length === 0) return
    let needsFix = false
    for (const p of paperItems) {
      if (typeof p.pages !== 'number' || Number.isNaN(p.pages) || p.pages < 1) {
        needsFix = true
        break
      }
      if (!p.service || !p.level || p.deadline === undefined) {
        needsFix = true
        break
      }
    }
    if (needsFix) {
      setPaperItems(prev => prev.map((p, i) => ({
        id: p.id ?? String(i + 1),
        paperFormat: p.paperFormat ?? 'Chicago',
        customFormat: p.customFormat ?? '',
        subject: p.subject ?? '',
        topics: p.topics ?? '',
        additionalInfo: p.additionalInfo ?? '',
        uploadedFiles: p.uploadedFiles ?? [],
        service: p.service || 'Essay Writing',
        level: p.level || 'BA/BSC',
        pages: (typeof p.pages === 'number' && !Number.isNaN(p.pages) && p.pages >= 1) ? p.pages : 1,
        deadline: p.deadline ?? ''
      })))
    }
  }, [paperItems])

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
    // Sum price across each paper item using its own level and pages
    return paperItems.reduce((sum, item) => {
      const lvl = academicLevels.find((l) => l.label === item.level) || academicLevels[0]
      const itemPages = item.pages || 1
      return sum + (lvl.price || 20.5) * itemPages
    }, 0)
  }


  const subtotal = getCurrentPrice()
  const total = subtotal

  // Helper function to validate file types
  const isValidFileType = (file: File) => {
    const allowedTypes = [
      "text/plain",
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    return allowedTypes.includes(file.type)
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
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side - Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-8 bg-white border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">1. Account Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className={inputClasses}
                  />
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className={inputClasses}
                    />
                  </div>
                </div>
            </Card>

            <Card className="p-8 bg-white border-gray-200">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">2. Paper Details</h2>
                <Button 
                  onClick={() => setPaperItems(prev => [...prev, {
                    id: String(prev.length + 1),
                    paperFormat: "Chicago",
                    customFormat: "",
                    subject: "",
                    topics: "",
                    additionalInfo: "",
                    uploadedFiles: [],
                    // Ensure a new paper always has a pages value so the UI shows the number
                    pages: 1,
                    // sensible defaults to match initialPaper
                    service: "Essay Writing",
                    level: "BA/BSC",
                    deadline: "",
                  }])}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Add Another Paper
                </Button>
              </div>

              {paperItems.map((item, index) => (
                <div key={item.id} className="mb-8 pb-8 border-b border-gray-200 last:mb-0 last:pb-0 last:border-0">
                  {paperItems.length > 1 && (
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Paper {index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => setPaperItems(prev => prev.filter(p => p.id !== item.id))}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}

                  {/* Per-item order fields: Service, Level, Pages, Deadline, Format */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                        <select
                          title="Service Type"
                          value={item.service}
                          onChange={(e) => setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, service: e.target.value } : p))}
                          className={selectClasses}
                        >
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                        <select
                          title="Academic Level"
                          value={item.level}
                          onChange={(e) => setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, level: e.target.value } : p))}
                          className={selectClasses}
                        >
                          {academicLevels.map((lvl) => (
                            <option key={lvl.label} value={lvl.label}>{lvl.label} - £{lvl.price.toFixed(2)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
                      <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of pages</label>
                        <div className="flex items-stretch h-6">
                          <button
                            onClick={() => setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, pages: Math.max(1, (p.pages || 1) - 1) } : p))}
                            className="bg-red-600 text-white w-6 h-6 rounded-l-md hover:bg-red-700 flex items-center justify-center text-sm font-medium"
                            aria-label="Decrease pages"
                          >
                            −
                          </button>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            min={1}
                            value={item.pages || 1}
                            onChange={(e) => {
                              const v = Math.max(1, Number.parseInt(e.target.value) || 1)
                              setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, pages: v } : p))
                            }}
                            className="w-8 h-6 border-0 bg-white px-0 text-center text-sm [&]:text-gray-900 font-medium focus:outline-none"
                            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                            aria-label={`Pages for paper ${index + 1}`}
                            title="Number of pages"
                          />
                          <button
                            onClick={() => setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, pages: (p.pages || 1) + 1 } : p))}
                            className="bg-red-600 text-white w-6 h-6 rounded-r-md hover:bg-red-700 flex items-center justify-center text-sm font-medium"
                            aria-label="Increase pages"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center mt-1 gap-1">
                          <span className="text-xs text-gray-500">{(item.pages || 1)}</span>
                          <span className="text-xs text-gray-500">·</span>
                          <span className="text-xs text-gray-500">{wordCountMap[item.pages || 1] || 250} words</span>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                        <input
                          title="Deadline date"
                          type="date"
                          value={item.deadline || ''}
                          onChange={(e) => setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, deadline: e.target.value } : p))}
                          className="w-full min-w-0 border border-gray-300 rounded-lg px-4 py-3 [&]:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <select
                          title="Paper format"
                          value={item.paperFormat}
                          onChange={(e) => setPaperItems(prev => prev.map(p => p.id === item.id ? { ...p, paperFormat: e.target.value } : p))}
                          className={selectClasses}
                        >
                          {paperFormats.map((fmt) => (
                            <option key={fmt} value={fmt}>{fmt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  

                  {/* Subject */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) => setPaperItems(prev => prev.map(p =>
                        p.id === item.id ? { ...p, subject: e.target.value } : p
                      ))}
                      placeholder="Enter your subject"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 [&]:text-gray-900 [&::placeholder]:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topics <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.topics}
                      onChange={(e) => setPaperItems(prev => prev.map(p =>
                        p.id === item.id ? { ...p, topics: e.target.value } : p
                      ))}
                      placeholder="Enter topic name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 [&]:text-gray-900 [&::placeholder]:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={item.additionalInfo}
                      onChange={(e) => setPaperItems(prev => prev.map(p =>
                        p.id === item.id ? { ...p, additionalInfo: e.target.value } : p
                      ))}
                      placeholder="Enter any additional information"
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 [&]:text-gray-900 [&::placeholder]:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload only txt, image, pdf, docx, doc file
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                      <Upload size={20} className="text-gray-400" />
                      <div>
                        <span className="font-semibold text-gray-700">Browse...</span>
                        <span className="text-gray-500 ml-2">
                          {item.uploadedFiles.length 
                            ? `${item.uploadedFiles.length} file(s) selected` 
                            : "No files selected."}
                        </span>
                      </div>
                      <input
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            setPaperItems(prev => prev.map(p =>
                              p.id === item.id 
                                ? { ...p, uploadedFiles: [...p.uploadedFiles, ...Array.from(files)] }
                                : p
                            ))
                          }
                        }}
                        accept=".txt,.jpg,.jpeg,.png,.pdf,.doc,.docx"
                        className="hidden"
                        multiple
                      />
                    </label>
                    {item.uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {item.uploadedFiles.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-600">{file.name}</span>
                            <button
                              onClick={() => setPaperItems(prev => prev.map(p =>
                                p.id === item.id 
                                  ? { ...p, uploadedFiles: p.uploadedFiles.filter((_, i) => i !== fileIndex) }
                                  : p
                              ))}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card>

            <Card className="p-8 bg-white border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Payment Method</h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center gap-3 p-4 border-2 ${paymentMethod === "paystack" ? 'border-red-600' : 'border-gray-300'} rounded-lg cursor-pointer hover:border-red-500 transition-colors`}
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
                  className={`flex items-center gap-3 p-4 border-2 ${paymentMethod === "stripe" ? 'border-red-600' : 'border-gray-300'} rounded-lg cursor-pointer hover:border-red-500 transition-colors`}
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

            <Card className="p-6 bg-red-50 border border-red-200">
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
                <span className="text-red-600">
                  I have read and agree to the website{" "}
                  <Link href="/terms" className="underline hover:text-red-700 font-semibold">
                    terms and conditions
                  </Link>
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <Button
                disabled={!agreedToTerms}
                className={`w-full py-3 text-lg font-semibold transition-all ${
                  agreedToTerms
                    ? "bg-red-600 hover:bg-red-700 text-white"
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
            <Card className="p-6 bg-white border-gray-200 lg:sticky lg:top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {paperItems.map((item, index) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Paper {index + 1} Service:</span>
                      <span className="font-semibold text-gray-900">{item.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-semibold text-gray-900">{item.level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-semibold text-gray-900">{item.pages || 1}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-semibold text-gray-900">{wordCountMap[item.pages || 1] || 250}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-semibold text-gray-900">{item.deadline || "Not set"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-semibold text-gray-900">{item.paperFormat === "Other" ? item.customFormat || "Custom" : item.paperFormat}</span>
                    </div>
                    <div className="border-t mt-2 pt-2" />
                  </div>
                ))}
              </div>

              {/* Discount code removed — admin-only promotions are disabled in checkout */}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total:</span>
                  <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                </div>
                {/* Discounts removed from checkout summary */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">£0.00</span>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-red-600">
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
