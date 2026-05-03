import type { Metadata } from 'next'
import './globals.css'
import { Noto_Sans_Arabic } from 'next/font/google'

const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], weight: ['300', '400'], variable: '--font-arabic', display: 'swap' })

export const metadata: Metadata = {
  title: 'ZOVA — Intelligence Operations',
  description:
    'The intelligence system behind your growth. We run the operations. You run the vision.',
  keywords: ['intelligence operations', 'business automation', 'AI', 'Saudi Arabia', 'ZOVA'],
  openGraph: {
    title: 'ZOVA — Intelligence Operations',
    description: 'The intelligence system behind your growth.',
    siteName: 'ZOVA',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoArabic.variable}>{children}</body>
    </html>
  )
}
