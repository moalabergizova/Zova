import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
