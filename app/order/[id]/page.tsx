"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { toast } from "sonner"
import { getOrderById } from "@/lib/orders"

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params?.id
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any | null>(null)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!orderId) return
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const res = await getOrderById(orderId)
        if (mounted) setOrder(res?.data || res)
      } catch (err: any) {
        toast.error(err?.message || 'Failed to load order')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [orderId])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4">
            <ChevronLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Order #{orderId}</h1>
        </div>
        <Card className="p-6 bg-white border-gray-200">
          {loading ? (
            <div>Loading...</div>
          ) : order ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-semibold">{order.first_name} {order.last_name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{order.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="font-semibold">{order.status}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="font-semibold">£{order.total_amount?.toFixed ? order.total_amount.toFixed(2) : order.total_amount}</div>
                </div>
              </div>

              {/* Papers list */}
              <div>
                <h3 className="text-lg font-semibold mt-4 mb-2">Papers</h3>
                {Array.isArray(order.papers) && order.papers.length > 0 ? (
                  <div className="space-y-4">
                    {order.papers.map((p: any, idx: number) => (
                      <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <div className="text-sm text-gray-600">Service</div>
                            <div className="font-semibold">{p.service_type || p.service || '—'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Level</div>
                            <div className="font-semibold">{p.academic_level || p.academicLevel || '—'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Pages</div>
                            <div className="font-semibold">{p.pages ?? p.page_count ?? '—'}</div>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <div className="text-sm text-gray-600">Deadline</div>
                            <div className="font-semibold">{p.deadline ? new Date(p.deadline).toLocaleString() : 'Not set'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Format</div>
                            <div className="font-semibold">{p.paper_format || p.format || '—'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Word Count</div>
                            <div className="font-semibold">{p.word_count ?? '—'}</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-gray-600">Subject / Topic</div>
                          <div className="font-semibold">{p.subject || p.topic || '—'}</div>
                        </div>
                        {p.instructions && (
                          <div className="mt-2">
                            <div className="text-sm text-gray-600">Instructions</div>
                            <div className="text-sm text-gray-800">{p.instructions}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No papers listed for this order.</div>
                )}
              </div>

              {/* Payment details */}
              {order.payment && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Payment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <div className="text-sm text-gray-600">Status</div>
                      <div className="font-semibold">{order.payment.status}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Amount</div>
                      <div className="font-semibold">£{order.payment.amount?.toFixed ? order.payment.amount.toFixed(2) : order.payment.amount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Method</div>
                      <div className="font-semibold">{order.payment.payment_method || order.payment.paymentMethod || '—'}</div>
                    </div>
                  </div>
                  {order.payment.receipt_url && (
                    <div className="mt-3">
                      <a href={order.payment.receipt_url} target="_blank" rel="noreferrer" className="text-red-600 hover:underline">View receipt</a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>No order found.</div>
          )}
        </Card>

  {/* Payment success modal on arrival */}
  <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Successful</DialogTitle>
              <DialogDescription>Your payment was successful. Thank you — your order is being processed.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => { setOpen(false) }}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
