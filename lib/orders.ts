import { apiFetch } from "./api"

export type OrderPaper = {
  service_type: string
  academic_level: string
  pages: number
  deadline?: string
  paper_format?: string
  paper_format_other?: string
  subject?: string
  topic?: string
  topics?: string[]
  word_count?: number
  instructions?: string
}

export async function createOrder(payload: {
  first_name: string
  last_name: string
  email: string
  phone?: string
  papers: OrderPaper[]
}) {
  // Uses apiFetch which applies tokens and will attempt refresh if needed
  return await apiFetch<any>("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  }, { redirectOnAuthFail: true })
}

export async function getOrderById(orderId: string) {
  const path = `/api/v1/orders/${orderId}`
  return await apiFetch<any>(path, { method: "GET" }, { redirectOnAuthFail: true })
}
