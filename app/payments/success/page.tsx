"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Confetti from 'confetti-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, AlertCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti on page load
    const timer = setTimeout(() => setShowConfetti(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 0}
          height={typeof window !== 'undefined' ? window.innerHeight : 0}
          numberOfPieces={150}
          recycle={false}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/eccentric-essays-logo.png"
            alt="Eccentric Essays Logo"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-2">Payment Successful! 🎉</h1>
          <p className="text-lg text-gray-600">Thank you — your order is being processed.</p>
        </div>

        <Card className="p-8 bg-white border-gray-200">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Mail className="w-16 h-16 text-red-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Please check your email to confirm your order
              </h2>
              <p className="text-gray-600 text-lg">
                We've sent a confirmation email with your order details. Please check your inbox (and spam folder) to confirm your order.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-yellow-900 mb-1">Having issues?</p>
                  <p className="text-yellow-800 text-sm">
                    If you encounter any problems or haven't received the confirmation email, please report the issue to our support team.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a href="mailto:hello@eccentricessays.com?subject=Order Issue Report" className="block w-full">
                <Button variant="outline" className="w-full py-6 text-lg font-semibold">
                  Report an Issue
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
