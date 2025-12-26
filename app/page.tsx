"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import {
  X,
  ChevronRight,
  Menu,
  Star,
  CheckCircle2,
  Lock,
  Users,
  Shield,
  Clock,
  FileText,
  BookOpen,
  BarChart3,
  Lightbulb,
  GraduationCap,
  Briefcase,
  PenTool,
  Calendar,
  Download,
  CreditCard,
  Edit3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LazyRender } from "@/components/lazy-render"

const SERVICES = [
  {
    title: "Essay Writing",
    description: "Original, research-backed essays tailored to your brief.",
    icon: PenTool,
  },
  {
    title: "Thesis Writing",
    description: "Structured theses with clear argument and citations.",
    icon: BookOpen,
  },
  {
    title: "Dissertation Writing",
    description: "Full dissertation support from proposal to conclusion.",
    icon: FileText,
  },
  {
    title: "Research Proposal",
    description: "Concise, fundable proposals with clear methodology.",
    icon: Lightbulb,
  },
  {
    title: "Literature Review Writing",
    description: "Focused reviews synthesising key sources and gaps.",
    icon: BookOpen,
  },
  {
    title: "Data Analysis",
    description: "Accurate statistical analysis and clear interpretation.",
    icon: BarChart3,
  },
  {
    title: "Statistics Presentation",
    description: "Readable charts and tables to highlight key findings.",
    icon: BarChart3,
  },
  {
    title: "Dissertation Supervisor",
    description: "Expert supervision and milestone guidance.",
    icon: GraduationCap,
  },
  {
    title: "Assignment Help",
    description: "Fast, on-brief support for individual assignments.",
    icon: FileText,
  },
  {
    title: "Business Plans",
    description: "Clear, investor-ready business plans.",
    icon: Briefcase,
  },
  {
    title: "Academic Posters",
    description: "Visually effective posters summarising your study.",
    icon: PenTool,
  },
  {
    title: "Articles",
    description: "Well-referenced articles for journals or blogs.",
    icon: FileText,
  },
  {
    title: "Case Study",
    description: "Detailed case analyses with evidence and insight.",
    icon: BookOpen,
  },
  {
    title: "Custom Coursework Writing",
    description: "Tailored coursework written to your specifications.",
    icon: GraduationCap,
  },
  {
    title: "Reports",
    description: "Professional reports with clear structure and data.",
    icon: FileText,
  },
  {
    title: "Proofreading and Editing",
    description: "Polish language, style, and academic tone.",
    icon: PenTool,
  },
  {
    title: "Dissertation Results",
    description: "Clear presentation and interpretation of results.",
    icon: FileText,
  },
  {
    title: "Dissertation Methodology",
    description: "Robust methodology chapters tailored to your study.",
    icon: FileText,
  },
  {
    title: "Dissertation Introduction",
    description: "Concise, compelling introductions that frame your research.",
    icon: FileText,
  },
  {
    title: "Dissertation Findings",
    description: "Organised findings with clear narrative flow.",
    icon: FileText,
  },
  {
    title: "Dissertation Data Analysis",
    description: "Thorough analysis using appropriate statistical methods.",
    icon: BarChart3,
  },
  {
    title: "Dissertation Conclusion",
    description: "Concise conclusions linking findings to objectives.",
    icon: FileText,
  },
]

const WORD_COUNT_MAP: Record<number, number> = {
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

const ACADEMIC_LEVELS = [
  { label: "BA/BSC", price: 20.5 },
  { label: "MA/MSC/MBA/MPHIL", price: 22.5 },
  { label: "PHD", price: 24.5 },
]

const PAPER_FORMATS = ["Chicago", "Harvard", "APA", "MLA", "Other"]

const GUARANTEES = [
  {
    title: "Zero Plagiarism",
    description: "Original writing only—every order is run through Turnitin-grade checks before delivery.",
    icon: CheckCircle2,
  },
  {
    title: "Quality Assurance",
    description: "Senior editors review each paper for structure, accuracy, and polish so it’s submission-ready.",
    icon: Shield,
  },
  {
    title: "Professional Writers",
    description: "Subject-matter experts with graduate degrees craft your work to match the brief and citation style.",
    icon: Users,
  },
  {
    title: "Data Security",
    description: "All files, chats, and payments are encrypted and never shared outside your project.",
    icon: Lock,
  },
  {
    title: "Timely Delivery",
    description: "Clear milestones and proactive updates ensure your paper arrives before the deadline.",
    icon: Clock,
  },
  {
    title: "24/7 Support",
    description: "Our coordinators are always online to answer questions, add files, or adjust requirements.",
    icon: Users,
  },
]

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Excellent service! The essay was well-researched and delivered on time.",
  },
  { name: "Michael Chen", rating: 5, text: "Professional writers who understand academic requirements perfectly." },
  { name: "Emma Davis", rating: 5, text: "Best essay writing service I've used. Highly recommended!" },
  { name: "James Wilson", rating: 5, text: "Great quality and customer support. Will definitely use again." },
]

const FAQS = [
  {
    question: "What subjects and citation styles can you handle?",
    answer:
      "We cover 60+ academic disciplines and all major citation styles (APA, MLA, Harvard, Chicago, custom). Describe the brief and we’ll match a specialist in that field.",
  },
  {
    question: "How do I stay involved once the order is placed?",
    answer:
      "You’ll get a personal dashboard with progress updates, drafts, and a chat thread where you can add sources, clarify instructions, or request tweaks any time.",
  },
  {
    question: "Can I request revisions if something needs to change?",
    answer:
      "Yes—every order includes unlimited revisions for 14 days after delivery. Share the edits you need and the writer updates the paper within the agreed window.",
  },
  {
    question: "Is my information safe with Eccentric Essays?",
    answer:
      "Absolutely. We encrypt all files and payments, anonymize writer communication, and never resell or publish your documents. Your project stays between us.",
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Place Your Order",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    icon: Edit3,
    color: "from-red-500 to-red-600",
  },
  {
    number: 2,
    title: "Make the Payment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    icon: CreditCard,
    color: "from-red-500 to-red-600",
  },
  {
    number: 3,
    title: "Download Your Paper",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    icon: Download,
    color: "from-red-500 to-red-600",
  },
]

const VISIBLE_SERVICE_COUNT = 4
const SCROLL_ADVANCE_THRESHOLD = 300

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("Essay Writing")
  const [selectedLevel, setSelectedLevel] = useState("BA/BSC")
  const [pages, setPages] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedPaperFormat, setSelectedPaperFormat] = useState("Chicago")
  const [customPaperFormat, setCustomPaperFormat] = useState("")
  const lastScrollYRef = useRef(0)
  const scrollTickingRef = useRef(false)

  const currentPrice = useMemo(() => {
    const level = ACADEMIC_LEVELS.find((l) => l.label === selectedLevel)
    return (level?.price || 20.5) * pages
  }, [selectedLevel, pages])

  const handleOrderNow = () => {
    // Create paper details
    const params = new URLSearchParams()

    // Add order parameters
    params.append("service", selectedService)
    params.append("level", selectedLevel)
    params.append("pages", pages.toString())
    params.append("deadline", selectedDate)

    // Add paper details
    params.append("paperFormat", selectedPaperFormat)
    params.append("customFormat", selectedPaperFormat === "Other" ? customPaperFormat : "")
    params.append("paper_format_other", selectedPaperFormat === "Other" ? customPaperFormat : "")
    params.append("subject", "")
    params.append("topics", "")
    params.append("additionalInfo", "")

    // Navigate to checkout
    window.location.href = `/checkout?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="hover:opacity-80 transition">
                <img src="/eccentric-essays-logo.png" alt="Eccentric Essays" className="h-12 w-auto" />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-700 hover:text-red-600 transition">
                Home
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-700 hover:text-red-600 transition">
                Services
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }} className="text-gray-700 hover:text-red-600 transition">
                Contact Us
              </a>
              <div className="flex items-center gap-4">
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-900 bg-transparent hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50">
              <div className="px-4 py-6 space-y-2">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  Services
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-linear-to-br from-red-600 via-red-500 to-red-700 text-white py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-400/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">✨ Save 15% Use ECCENTRIC code</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Stop the Stress. Start the Success. ✨
              </h1>
              <p className="text-sm md:text-sm text-red-100 mb-4 text-balance">
                Imagine handing in every assignment with total confidence. That's the power of having Eccentric Essays
                on your team.
              </p>
              <p className="text-sm md:text-sm text-red-100 mb-8 text-balance">
                That midnight panic, the blank screen stare, the fear of a looming deadline... It ends now.
              </p>
              <Button onClick={handleOrderNow} className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6">
                Get Started
              </Button>
            </div>

            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-2xl text-gray-900 w-full max-w-md">
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-6">Calculate the price of your order:</h3>
                <div className="space-y-2.5 md:space-y-4">
                  <div>
                    <label htmlFor="serviceType" className="block text-[10px] md:text-sm font-medium mb-1 md:mb-2">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-2.5 md:px-4 py-1.5 md:py-3 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option>Essay Writing</option>
                      <option>Thesis Writing</option>
                      <option>Dissertation Writing</option>
                      <option>Research Proposal</option>
                      <option>Literature Review Writing</option>
                      <option>Data Analysis</option>
                      <option>Statistics Presentation</option>
                      <option>Dissertation Supervisor</option>
                      <option>Assignment Help</option>
                      <option>Business Plans</option>
                      <option>Academic Posters</option>
                      <option>Articles</option>
                      <option>Case Study</option>
                      <option>Custom Coursework Writing</option>
                      <option>Reports</option>
                      <option>Proofreading and Editing</option>
                      <option>Dissertation Results</option>
                      <option>Dissertation Methodology</option>
                      <option>Dissertation Introduction</option>
                      <option>Dissertation Findings</option>
                      <option>Dissertation Data Analysis</option>
                      <option>Dissertation Conclusion</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div>
                      <label htmlFor="academicLevel" className="block text-[10px] md:text-sm font-medium mb-1 md:mb-2">
                        Level
                      </label>
                      <select
                        id="academicLevel"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-2 md:px-4 py-1.5 md:py-3 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        {ACADEMIC_LEVELS.map((level) => (
                          <option key={level.label} value={level.label}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="paperFormat" className="block text-[10px] md:text-sm font-medium mb-1 md:mb-2">
                        Format
                      </label>
                      <select
                        id="paperFormat"
                        value={selectedPaperFormat}
                        onChange={(e) => {
                          const value = e.target.value
                          setSelectedPaperFormat(value)
                          if (value !== "Other") {
                            setCustomPaperFormat("")
                          }
                        }}
                        className="w-full border border-gray-300 rounded-lg px-2 md:px-4 py-1.5 md:py-3 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        {PAPER_FORMATS.map((fmt) => (
                          <option key={fmt} value={fmt}>
                            {fmt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div>
                      <label htmlFor="pageCount" className="block text-[10px] md:text-sm font-medium mb-1 md:mb-2">
                        Pages
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setPages(Math.max(1, pages - 1))}
                          className="bg-red-600 text-white w-7 h-7 md:w-10 md:h-10 rounded-lg hover:bg-red-700 shrink-0 flex items-center justify-center text-sm"
                        >
                          −
                        </button>
                        <input
                          id="pageCount"
                          type="number"
                          value={pages}
                          onChange={(e) => setPages(Math.max(1, Number.parseInt(e.target.value) || 1))}
                          className="w-full border border-gray-300 rounded-lg py-1 md:py-2 text-center text-xs md:text-base"
                        />
                        <button
                          onClick={() => setPages(pages + 1)}
                          className="bg-red-600 text-white w-7 h-7 md:w-10 md:h-10 rounded-lg hover:bg-red-700 shrink-0 flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[9px] md:text-xs text-gray-500 mt-0.5">{WORD_COUNT_MAP[pages] || 250} words</p>
                    </div>
                    <div>
                      <label htmlFor="deadline" className="block text-[10px] md:text-sm font-medium mb-1 md:mb-2">
                        Deadline
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2 md:left-3 md:top-3.5 text-gray-400" size={12} />
                        <input
                          id="deadline"
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-2 md:px-4 py-1.5 md:py-3 pl-7 md:pl-10 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    </div>
                  </div>
                  {selectedPaperFormat === "Other" && (
                    <div className="mt-1.5">
                      <label htmlFor="customPaperFormat" className="block text-[10px] md:text-sm font-medium mb-1 md:mb-2">
                        Specify format
                      </label>
                      <input
                        id="customPaperFormat"
                        type="text"
                        value={customPaperFormat}
                        onChange={(e) => setCustomPaperFormat(e.target.value)}
                        placeholder="Citation style"
                        className="w-full border border-gray-300 rounded-lg px-2.5 md:px-4 py-1.5 md:py-3 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  )}
                  <div className="border-t pt-2.5 md:pt-4 mt-2.5 md:mt-4">
                    <div className="flex justify-between items-center mb-2.5 md:mb-4">
                      <span className="text-[10px] md:text-sm text-gray-600">
                        £{(ACADEMIC_LEVELS.find((l) => l.label === selectedLevel)?.price || 20.5).toFixed(2)} / pg
                      </span>
                      <span className="text-xl md:text-3xl font-bold text-red-600">£{currentPrice.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={handleOrderNow}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 text-sm md:text-lg"
                    >
                      Order now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <LazyRender placeholderClassName="min-h-[640px]">
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Writing Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A verified expert will write a turn-in-ready paper for you while you enjoy doing what you like the most!
              </p>
            </div>

            <div className="relative overflow-hidden py-10">
              <div className="flex animate-infinite-scroll hover:pause">
                {[...SERVICES, ...SERVICES].map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <div key={idx} className="flex-none w-[300px] px-4">
                      <Card
                        className="p-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col bg-red-50 text-gray-900 border-red-200 hover:border-red-400 hover:shadow-lg h-80 w-full"
                      >
                        <Icon className="w-12 h-12 mb-4 text-red-600 shrink-0" />
                        <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">{service.title}</h3>
                        <p className="text-sm grow text-gray-600 line-clamp-2">{service.description}</p>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </LazyRender>
      {/* Testimonials Section */}
      <LazyRender placeholderClassName="min-h-[520px]">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Valuable Customers Say About Us?</h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of satisfied students who have improved their grades with our essay writing service.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TESTIMONIALS.map((testimonial, idx) => (
                  <Card key={idx} className="p-6 bg-gray-50 border-gray-200 h-full">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{testimonial.text}</p>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazyRender>

      {/* Guarantees Section */}
      <LazyRender placeholderClassName="min-h-[480px]">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Guarantees</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GUARANTEES.map((guarantee) => {
                const Icon = guarantee.icon
                return (
                  <Card key={guarantee.title} className="p-8 bg-white border-gray-200 hover:shadow-lg transition h-full">
                    <Icon className="text-red-600 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{guarantee.title}</h3>
                    <p className="text-gray-600 text-sm">{guarantee.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </LazyRender>

      {/* How It Works - Updated with new process */}
      <LazyRender placeholderClassName="min-h-[520px]">
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                We've Perfected the Process So You Can Relax
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three simple steps to transform your academic stress into standout success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Timeline line for desktop */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-red-400 via-red-400 to-red-400 -z-10"></div>

              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="relative">
                    {/* Step number badge */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`w-20 h-20 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg relative z-10`}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Step card */}
                    <Card className="p-8 bg-white border-0 shadow-lg rounded-2xl text-center h-full">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-red-50 rounded-full">
                          <Icon className="w-8 h-8 text-red-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {idx === 0 && "Match with Your Perfect Expert in 3 simple steps."}
                        {idx === 1 && "Collaborate Directly with your writer for a truly custom piece."}
                        {idx === 2 && "Receive a Masterpiece that's original, insightful, and delivered right on time."}
                      </p>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </LazyRender>

      {/* CTA Section - Redesigned */}
      <LazyRender placeholderClassName="min-h-[420px]">
        <section className="py-20 bg-linear-to-br from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Headline + benefits */}
              <div className="md:col-span-7 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Stop stressing. Start submitting.</h2>
                <p className="text-sm md:text-base text-red-100 max-w-2xl mb-6">
                  Get a research-backed, professionally written paper that matches your brief — on time, every time.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 gap-3 justify-center md:justify-start mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/90" />
                    <span className="text-sm md:text-base text-red-100">Plagiarism-free work</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-white/90" />
                    <span className="text-sm md:text-base text-red-100">Verified expert writers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-white/90" />
                    <span className="text-sm md:text-base text-red-100">Secure & confidential</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
                  <Button onClick={handleOrderNow} className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 text-base md:text-lg font-semibold w-full sm:w-auto">
                    Order Your Expert — Start Now
                  </Button>
                  <a href="#contact" className="inline-block text-white/95 border border-white/30 hover:border-white rounded-md px-5 py-3 text-sm md:text-base text-center w-full sm:w-auto">
                    Talk to Support
                  </a>
                </div>
              </div>

              {/* Right: Card with short bullets and testimonial */}
              <div className="md:col-span-5">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-white border border-white/10">
                  <h3 className="text-lg font-bold mb-3">Fast & reliable — how it works</h3>
                  <ul className="space-y-2 mb-4 text-sm md:text-base text-red-100">
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-white/90">•</span> Place your order in minutes</li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-white/90">•</span> Get matched with a specialist</li>
                    <li className="flex items-start gap-3"><span className="mt-0.5 text-white/90">•</span> Receive drafts and final paper on time</li>
                  </ul>

                  <div className="mt-2">
                    <p className="text-sm text-red-100/90 italic">“Delivered exactly to the brief — saved my semester.”</p>
                    <p className="font-semibold mt-3">— A satisfied student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyRender>

      {/* FAQ Section */}
      <LazyRender placeholderClassName="min-h-[520px]">
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Frequently asked questions?</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border border-gray-200 rounded-lg px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 no-underline hover:no-underline py-4 flex items-center justify-between">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 border-t border-gray-100 pt-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </LazyRender>

      {/* Contact Us Section */}
      <LazyRender placeholderClassName="min-h-[640px]" id="contact">
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Side - Contact Info */}
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                  Get in <span className="text-primary-foreground">—</span>
                  <br />
                  touch with us
                </h2>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  We're here to help! Whether you have a question about our services, need assistance with your account,
                  or want to provide feedback, our team is ready to assist you.
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Email:</p>
                    <p className="text-gray-900 font-bold text-lg">kossyakabogu0007@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Phone:</p>
                    <p className="text-gray-900 font-bold text-lg">+1 234 567 78</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Available:</p>
                    <p className="text-gray-700">Monday to Friday, 9 AM - 6 PM GMT</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="Enter your first name..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter your last name..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">How can we help you?</label>
                    <textarea
                      placeholder="Enter your message..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                  >
                    Send Message
                    <ChevronRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </LazyRender>

      {/* Footer */}
      <LazyRender placeholderClassName="min-h-[360px]">
        <footer className="bg-white border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
              {/* Brand Column */}
              <div>
                <a href="/" className="inline-block mb-4 hover:opacity-80 transition">
                  <img src="/eccentric-essays-logo.png" alt="Eccentric Essays" />
                </a>

              </div>

              {/* Services Column (wider) */}
              <div className="md:col-span-3">
                <h4 className="text-gray-900 font-semibold mb-6">Services</h4>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base text-gray-600">
                  {SERVICES.map((s) => (
                    <li key={s.title}>
                      <a href="#services" className="hover:text-gray-900 transition block">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h4 className="text-gray-900 font-semibold mb-6">Company</h4>
                <ul className="space-y-3 text-sm md:text-base text-gray-600">
                  <li>
                    <a href="#home" className="hover:text-gray-900 transition">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-gray-900 transition">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-gray-900 transition">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Media Column */}
              <div>
                <h4 className="text-gray-900 font-semibold mb-6">Social Media</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                    aria-label="Connect with us on LinkedIn"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.338-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/"
                    className="text-gray-600 hover:text-gray-900 transition"
                    aria-label="Follow us on X"
                    title="X"
                    dangerouslySetInnerHTML={{
                      __html: `
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                          </svg>
                        ` }}
                  />
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2025 Eccentric Essays. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </LazyRender>
    </div>
  )
}
