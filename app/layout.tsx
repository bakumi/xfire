import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Roboto } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollAnimations from "@/components/scroll-animations"
import { ServiceProvider } from "./context/ServiceContext"
import Preloader from "@/components/preloader"
import MickeyMouse from "@/components/mickey-mouse"

// Оптимизация загрузки шрифтов
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ['400', '500', '600', '700'], // Загружаем только используемые веса
})

const roboto = Roboto({ 
  weight: ["400", "500", "700"], 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://centrpozhtech.ru'),
  title: {
    default: "Центр Пожтехника - Противопожарная безопасность",
    template: "%s | Центр Пожтехника"
  },
  description: "Профессиональные услуги в сфере пожарной безопасности: проектирование, монтаж и обслуживание систем пожаротушения, сигнализации и видеонаблюдения.",
  keywords: [
    "пожарная безопасность",
    "противопожарные системы",
    "пожарная сигнализация",
    "монтаж пожарной сигнализации",
    "обслуживание пожарных систем",
    "проектирование пожарных систем"
  ],
  authors: [{ name: "Центр Пожтехника" }],
  creator: "Центр Пожтехника",
  publisher: "Центр Пожтехника",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://centrpozhtech.ru",
    title: "Центр Пожтехника - Противопожарная безопасность",
    description: "Профессиональные услуги в сфере пожарной безопасности",
    siteName: "Центр Пожтехника",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Центр Пожтехника - Противопожарная безопасность",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Центр Пожтехника - Противопожарная безопасность",
    description: "Профессиональные услуги в сфере пожарной безопасности",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${roboto.className} font-sans bg-background text-text`} suppressHydrationWarning>
        <Preloader />
        <MickeyMouse />
        <ServiceProvider>
          <Header />
          <ScrollAnimations>
            <main>{children}</main>
          </ScrollAnimations>
          <div id="footer-container" className="default-footer">
            <Footer />
          </div>
        </ServiceProvider>
      </body>
    </html>
  )
}