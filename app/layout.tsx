import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TubeProfit — AI YouTube Description Optimizer',
  description: 'Turn your YouTube descriptions into affiliate revenue machines. Paste your video URL, get an AI-optimized description with better affiliate hooks, SEO keywords, and CTAs in seconds.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tubeprofit.co'),
  openGraph: {
    title: 'TubeProfit — AI YouTube Description Optimizer',
    description: 'Your YouTube descriptions are leaving money on the table. Fix them in seconds with AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
