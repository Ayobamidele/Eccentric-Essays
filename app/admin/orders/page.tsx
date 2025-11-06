"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { getAdminOrders } from "@/lib/admin"

type Order = {
  id: string
  date: string
  customer: string
  service: string
  status: string
  total: number
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await getAdminOrders('in_progress', 0, 50)
      // getAdminOrders returns either an array or an object with data
      if (Array.isArray(data)) setOrders(data)
      else if (data?.orders) setOrders(data.orders)
      else if (data?.data && Array.isArray(data.data)) setOrders(data.data)
      else setOrders(data)
    } catch (error) {
      toast.error('Failed to fetch orders')
      // Return sample data for now
      setOrders([
        {
          id: '1',
          date: new Date().toISOString(),
          customer: 'John Doe',
          service: 'Essay Writing',
          status: 'In Progress',
          total: 120.00
        },
        {
          id: '2',
          date: new Date().toISOString(),
          customer: 'Jane Smith',
          service: 'Research Paper',
          status: 'Completed',
          total: 200.00
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-600">Manage and track all orders</p>
        </div>
        <Button>Export</Button>
      </div>

      <Card>
        {loading ? (
          <div className="p-8 text-center">Loading orders...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{
                    (() => {
                      try {
                        const d = new Date(order.date)
                        if (isNaN(d.getTime())) return '—'
                        return format(d, 'MMM d, yyyy')
                      } catch {
                        return '—'
                      }
                    })()
                  }</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
