"use client"

import { PropsWithChildren } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AdminProvider } from "@/lib/admin-context"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdminProvider>
        {children}
        <Toaster />
      </AdminProvider>
    </ThemeProvider>
  )
}