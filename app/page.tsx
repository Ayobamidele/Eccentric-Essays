"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
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
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: PenTool,
  },
  {
    title: "Thesis Writing",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: BookOpen,
  },
  {
    title: "Dissertation Writing",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Research Proposal",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: Lightbulb,
  },
  {
    title: "Literature Review Writing",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: BookOpen,
  },
  {
    title: "Data Analysis",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: BarChart3,
  },
  {
    title: "Statistics Presentation",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: BarChart3,
  },
  {
    title: "Dissertation Supervisor",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: GraduationCap,
  },
  {
    title: "Assignment Help",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Business Plans",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: Briefcase,
  },
  {
    title: "Academic Posters",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: PenTool,
  },
  {
    title: "Articles",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Case Study",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: BookOpen,
  },
  {
    title: "Custom Coursework Writing",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: GraduationCap,
  },
  {
    title: "Reports",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Proofreading and Editing",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: PenTool,
  },
  {
    title: "Dissertation Results",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Dissertation Methodology",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Dissertation Introduction",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Dissertation Findings",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: FileText,
  },
  {
    title: "Dissertation Data Analysis",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
    icon: BarChart3,
  },
  {
    title: "Dissertation Conclusion",
    description: "Our research based and goal driven approach in consulting lays the perfect foundation & strategy",
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
  const [servicesIndex, setServicesIndex] = useState(0)
  const [selectedService, setSelectedService] = useState("Essay Writing")
  const [selectedLevel, setSelectedLevel] = useState("BA/BSC")
  const [pages, setPages] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedPaperFormat, setSelectedPaperFormat] = useState("Chicago")
  const [customPaperFormat, setCustomPaperFormat] = useState("")
  const lastScrollYRef = useRef(0)
  const scrollTickingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTickingRef.current) return

      scrollTickingRef.current = true
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollYRef.current

        if (delta > SCROLL_ADVANCE_THRESHOLD) {
          setServicesIndex((prev) => (prev + 1) % SERVICES.length)
          lastScrollYRef.current = currentScrollY
        } else if (delta < -SCROLL_ADVANCE_THRESHOLD) {
          lastScrollYRef.current = currentScrollY
        }

        scrollTickingRef.current = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setServicesIndex((prev) => (prev + 1) % SERVICES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const visibleServices = useMemo(() => {
    return Array.from({ length: VISIBLE_SERVICE_COUNT }, (_, idx) =>
      SERVICES[(servicesIndex + idx) % SERVICES.length],
    )
  }, [servicesIndex])

  const nextService = () => {
    setServicesIndex((prev) => (prev + 1) % SERVICES.length)
  }

  const prevService = () => {
    setServicesIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)
  }

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
              <a href="#home" className="text-gray-700 hover:text-red-600 transition">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-red-600 transition">
                Services
              </a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition">
                Contact Us
              </a>
              <div className="flex items-center gap-4">
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#home" className="block text-gray-700 hover:text-red-600 py-2">
                Home
              </a>
              <a href="#services" className="block text-gray-700 hover:text-red-600 py-2">
                Services
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-red-600 py-2">
                Contact Us
              </a>

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
              <p className="text-xl text-red-100 mb-4 text-balance">
                Imagine handing in every assignment with total confidence. That's the power of having Eccentric Essays
                on your team.
              </p>
              <p className="text-lg text-red-100 mb-8 text-balance">
                That midnight panic, the blank screen stare, the fear of a looming deadline... It ends now.
              </p>
              <Button onClick={handleOrderNow} className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6">
                Get Started
              </Button>
            </div>

            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-900 w-full max-w-md">
                <h3 className="text-2xl font-bold mb-6">Calculate the price of your order:</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  <div>
                    <label htmlFor="academicLevel" className="block text-sm font-medium mb-2">
                      Academic Level
                    </label>
                    <select
                      id="academicLevel"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {ACADEMIC_LEVELS.map((level) => (
                        <option key={level.label} value={level.label}>
                          {level.label} - £{level.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pageCount" className="block text-sm font-medium mb-2">
                      Number of pages
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPages(Math.max(1, pages - 1))}
                        className="bg-red-600 text-white w-10 h-10 rounded-lg hover:bg-red-700"
                      >
                        −
                      </button>
                      <input
                        id="pageCount"
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-center"
                      />
                      <button
                        onClick={() => setPages(pages + 1)}
                        className="bg-red-600 text-white w-10 h-10 rounded-lg hover:bg-red-700"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{WORD_COUNT_MAP[pages] || 250} words</p>
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium mb-2">
                      Deadline
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                      <input
                        id="deadline"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="paperFormat" className="block text-sm font-medium mb-2">
                      Paper Format
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
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      {PAPER_FORMATS.map((fmt) => (
                        <option key={fmt} value={fmt}>
                          {fmt}
                        </option>
                      ))}
                    </select>
                    {selectedPaperFormat === "Other" && (
                      <div className="mt-3">
                        <label htmlFor="customPaperFormat" className="block text-sm font-medium mb-2">
                          Specify paper format
                        </label>
                        <input
                          id="customPaperFormat"
                          type="text"
                          value={customPaperFormat}
                          onChange={(e) => setCustomPaperFormat(e.target.value)}
                          placeholder="Enter your desired citation style"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">
                        £{(ACADEMIC_LEVELS.find((l) => l.label === selectedLevel)?.price || 20.5).toFixed(2)} per page
                      </span>
                      <span className="text-3xl font-bold text-red-600">£{currentPrice.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={handleOrderNow}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
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

            <div className="relative px-20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-700 ease-in-out">
                {visibleServices.map((service, idx) => {
                  const Icon = service.icon
                  const isFocused = idx === 0
                  return (
                    <Card
                      key={idx}
                      className={`p-6 rounded-2xl transition-all duration-700 ease-in-out cursor-pointer flex flex-col bg-red-50 text-gray-900 border-red-200 hover:border-red-400 hover:shadow-md h-80 w-full ${
                        idx > 0 ? "hidden md:flex" : "flex"
                      } ${
                        isFocused
                          ? "opacity-100 scale-100 border-2 border-red-600 shadow-lg"
                          : "opacity-50 scale-95 hover:opacity-75"
                      }`}
                    >
                      <Icon className="w-12 h-12 mb-4 text-red-600 shrink-0" />
                      <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">{service.title}</h3>
                      <p className="text-sm grow text-gray-600 line-clamp-3">{service.description}</p>
                    </Card>
                  )
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevService}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition shadow-lg"
                aria-label="Previous services"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextService}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition shadow-lg"
                aria-label="Next services"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {SERVICES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setServicesIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx >= servicesIndex && idx < servicesIndex + VISIBLE_SERVICE_COUNT ? "bg-red-600 w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Go to service ${idx + 1}`}
                />
              ))}
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
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">See all testimonials</Button>
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

      {/* CTA Section - New section with powerful call-to-action */}
      <LazyRender placeholderClassName="min-h-[420px]">
        <section className="py-20 bg-linear-to-br from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Don't just keep coping. Start excelling.
            </h2>
            <p className="text-xl text-red-100 mb-8 text-balance">You have two choices:</p>
            <div className="space-y-4 mb-12 text-lg text-red-100">
              <p>1. Keep battling the same stress cycle, hoping for the best.</p>
              <p>
                2. Make a powerful change. Click the button below, and in minutes, you'll be on the path to your best
                semester yet.
              </p>
            </div>
            <Button className="bg-white text-red-600 hover:bg-gray-100 text-base md:text-lg px-4 md:px-8 md:py-6 w-full md:w-auto mb-0 py-[18px]">
              <a href="/checkout" className="no-underline">
                Click Here to Get Your Expert & Unlock Your A!
              </a>
            </Button>
            <p className="text-xl text-red-100">Your future self will thank you.</p>
            <p className="text-2xl font-bold mt-6">Eccentric Essays. Your Grade. Our Passion.</p>
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
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-red-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </LazyRender>

      {/* Contact Us Section */}
      <LazyRender placeholderClassName="min-h-[640px]">
        <section id="contact" className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Side - Contact Info */}
              <div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                  Get in <span className="text-gray-400">—</span>
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
                    <p className="text-gray-900 font-bold text-lg">hello@eccentricessays.com</p>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Column */}
              <div>
                <a href="/" className="inline-block mb-4 hover:opacity-80 transition">
                  <img src="/eccentric-essays-logo.png" alt="Eccentric Essays" className="h-20 w-auto" />
                </a>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Start by ordering your essay today and experience the quality that sets us apart from other writing
                  services.
                </p>
              </div>

              {/* Services Column */}
              <div>
                <h4 className="text-gray-900 font-semibold mb-6">Services</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    <a href="#services" className="hover:text-gray-900 transition">
                      Essay Writing
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-gray-900 transition">
                      Thesis Writing
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-gray-900 transition">
                      Dissertation Writing
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-gray-900 transition">
                      Research Proposal
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h4 className="text-gray-900 font-semibold mb-6">Company</h4>
                <ul className="space-y-3 text-sm text-gray-600">
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
                  <li>
                    <a href="#" className="hover:text-gray-900 transition">
                      Blog
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
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition"
                    aria-label="Follow us on Twitter"
                    title="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 00-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9-5.5z" />
                    </svg>
                  </a>
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
