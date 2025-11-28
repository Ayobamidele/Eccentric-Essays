import Link from "next/link"
import Image from "next/image"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PaymentsCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <Image src="/eccentric-essays-logo.png" alt="Eccentric Essays" width={120} height={120} priority />
        </div>

        <Card className="p-8 bg-white border-gray-200 text-center space-y-6">
          <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-2" />

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
            <p className="text-gray-600">Your payment was not completed. Your order has not been created.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">Don't worry! No charges were made. You can start a new order anytime.</p>
          </div>

          <Link href="/checkout" className="block">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Try Payment Again</Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
