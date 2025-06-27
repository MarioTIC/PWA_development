import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { AuthGuard } from "@/components/auth-guard"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PURP",
  description: "Aplicación para técnicos agrícolas - Gestión de visitas y productores",
manifest: "/manifest.json",
// Dentro del <head> de tu layout
themeColor: "#16a34a",
viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  generator: 'v0.dev'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/icons/purp-icon-192x192.png" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#16a34a" />
      {/* Otros metadatos si los necesitas */}
    </head>
      <body className={inter.className}>
        <Providers>
          <AuthGuard>
            {children}
            <Toaster />
          </AuthGuard>
        </Providers>
      </body>
    </html>
  )
}
