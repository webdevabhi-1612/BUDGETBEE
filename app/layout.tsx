import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'



const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BudgetBee - Voice-First AI Finance Assistant',
    template: '%s | BudgetBee'
  },
  description: 'Revolutionizing Personal Finance Through Voice Technology. Track expenses, manage budgets, and achieve financial goals with just your voice. Built specifically for Indian users.',
  keywords: [
    'voice finance',
    'AI budget tracker', 
    'expense tracking',
    'Indian finance app',
    'voice assistant',
    'personal finance',
    'budget management',
    'savings goals',
    'debt tracking'
  ],
  authors: [{ name: 'Team Brogrammers' }],
  creator: 'Team Brogrammers',
  publisher: 'BudgetBee AI',
  metadataBase: new URL('https://budgetbee.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://budgetbee.ai',
    title: 'BudgetBee - Voice-First AI Finance Assistant',
    description: 'Revolutionizing Personal Finance Through Voice Technology. Track expenses, manage budgets, and achieve financial goals with just your voice.',
    siteName: 'BudgetBee',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BudgetBee - Voice-First AI Finance Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BudgetBee - Voice-First AI Finance Assistant',
    description: 'Revolutionizing Personal Finance Through Voice Technology. Track expenses, manage budgets, and achieve financial goals with just your voice.',
    creator: '@budgetbee',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#10b981" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
    <body className="antialiased bg-white text-gray-900 font-gilroy">
              {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        <Navbar/>
        
        <main id="main-content" className="pt-16">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}
