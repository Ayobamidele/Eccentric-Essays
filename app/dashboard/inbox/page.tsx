"use client"

import { useState } from "react"
import {
  Mail,
  Menu,
  Search,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useSidebar } from "@/hooks/use-sidebar"

export default function InboxPage() {
  const { setSidebarOpen } = useSidebar()
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1)



  const messages = [
    {
      id: 1,
      orderId: "#ORD-2024-001",
      assignment: "The Productivity Report",
      message:
        "Hello, Batuhan! I checked the productivity and efficiency of our team and wanted to share the results with you. The report shows significant improvements in our workflow processes...",
      from: "Josef Draf",
      avatar: "/placeholder-user.jpg",
      date: "01:15 PM",
      isRead: false,
      fullMessage:
        "Hello, Batuhan!\n\nAnd since you want to be competitive you want to come up with a material that will make you stand out and recognizable.\n\nWe all know that competition in the industry is tight so there is a need for every business to come up with excellent prints that will help their companies create a remarkable name.",
    },
    {
      id: 2,
      orderId: "#ORD-2024-002",
      assignment: "Work inquiry from Dribbble",
      message:
        "Hey, We had received a new inquiry on Dribbble. Please take a look at this and let me know your thoughts on how we should proceed with this opportunity...",
      from: "Alexis Tufina",
      avatar: "/placeholder-user.jpg",
      date: "12:28 PM",
      isRead: false,
      fullMessage: "Hey, We had received a new inquiry on Dribbble. Please take a look at this...",
    },
    {
      id: 3,
      orderId: "#ORD-2024-003",
      assignment: "Meeting with Nikken",
      message:
        "Hello, Batuhan! I remind you about today's meeting. I prepared some materials for discussion and would like to review them with you before the meeting starts...",
      from: "Camel Dilees",
      avatar: "/placeholder-user.jpg",
      date: "02:30 PM",
      isRead: true,
      fullMessage: "Hello, Batuhan! I remind you about today's meeting. I prepared some...",
    },
    {
      id: 4,
      orderId: "#ORD-2024-004",
      assignment: "Possible Collaboration",
      message:
        "Hi there! I wanted to reach out regarding a potential collaboration opportunity that I think would be mutually beneficial for both our organizations...",
      from: "Bronte Aida",
      avatar: "/placeholder-user.jpg",
      date: "03:45 PM",
      isRead: true,
      fullMessage: "Hi there! I wanted to reach out regarding a potential collaboration...",
    },
  ]

  const currentMessage = messages.find((msg) => msg.id === selectedMessage)
  const currentIndex = messages.findIndex((msg) => msg.id === selectedMessage)
  const totalMessages = messages.length

  const handlePrevMessage = () => {
    if (currentIndex > 0) {
      setSelectedMessage(messages[currentIndex - 1].id)
    }
  }

  const handleNextMessage = () => {
    if (currentIndex < messages.length - 1) {
      setSelectedMessage(messages[currentIndex + 1].id)
    }
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Messages List */}
      <div className="w-full lg:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Inbox Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700 hover:text-gray-900" aria-label="Open sidebar">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Inbox</h1>
              <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                {messages.filter((m) => !m.isRead).length}
              </span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200" />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message.id)}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedMessage === message.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
              } ${!message.isRead ? "bg-blue-50/30" : ""}`}
            >
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`text-sm ${!message.isRead ? "font-bold" : "font-medium"} text-gray-900 truncate`}>
                      {message.from}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">{message.date}</span>
                  </div>
                  <p className={`text-sm ${!message.isRead ? "font-semibold" : ""} text-gray-900 mb-1 truncate`}>
                    {message.assignment}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                </div>
                {!message.isRead && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 flex flex-col bg-white">
        {currentMessage ? (
          <>
            {/* Message Header */}
            <div className="border-b border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button className="text-gray-600 hover:text-gray-900" aria-label="Star message">
                    <Star size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900" aria-label="Delete message">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {currentIndex + 1} of {totalMessages}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMessage}
                      disabled={currentIndex === 0}
                      className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Previous message"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextMessage}
                      disabled={currentIndex === totalMessages - 1}
                      className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Next message"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={currentMessage.avatar} />
                  <AvatarFallback>{currentMessage.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-600">Chat With</p>
                  <h2 className="text-xl font-bold text-gray-900">{currentMessage.from}</h2>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{currentMessage.assignment}</h1>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Order ID</p>
                    <p className="font-semibold text-gray-900">{currentMessage.orderId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{currentMessage.date}</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                {currentMessage.fullMessage.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Mail size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a message to read</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
