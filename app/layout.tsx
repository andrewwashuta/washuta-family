import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Agentation } from 'agentation'

const marist = localFont({
  src: [
    { path: '../fonts/ABCMarist-Book-Trial.woff2', weight: '400' },
    { path: '../fonts/ABCMarist-Book-Trial.woff', weight: '400' },
  ],
  variable: '--font-marist',
  display: 'swap',
})

const grotesk = localFont({
  src: [
    { path: '../fonts/mnkybananagrotesk-regular.woff2', weight: '400' },
    { path: '../fonts/mnkybananagrotesk-regular.woff', weight: '400' },
  ],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Washuta Family Year in Review',
  description: 'A visual collection of our year - from the mountains to the oceans, these are the moments we\'ll remember forever.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${marist.variable} ${grotesk.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}
