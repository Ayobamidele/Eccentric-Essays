import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "./providers"

import { Barlow } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })
const barlow = Barlow({ weight: ["700", "600"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eccentric Essays - Professional Essay Writing Service",
  description: "Get expert essay writing services. Quality essays delivered on time. Order now!",
  generator: "v0.app",
  icons: {
    icon: "/eccentric-essays-logo.png",
    shortcut: "/eccentric-essays-logo.png",
    apple: "/eccentric-essays-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background text-foreground antialiased ${inter.className}`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
