import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Abdullahi Siba - Portfolio",
  description: "Portfolio of Abdullahi M Siba - Creative Developer & Designer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-black text-white antialiased overflow-x-hidden`} suppressHydrationWarning>
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      </body>
    </html>
  )
}
