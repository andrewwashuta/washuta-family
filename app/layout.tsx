import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Agentation } from 'agentation'

const mdui = localFont({
  src: [
    { path: '../fonts/MDUI-Regular.woff2', weight: '400' },
    { path: '../fonts/MDUI-Medium.woff2', weight: '500' },
  ],
  variable: '--font-mdui',
  display: 'swap',
})

const mdio = localFont({
  src: [
    { path: '../fonts/MDIO-Regular.woff2', weight: '400' },
    { path: '../fonts/MDIO-Medium.woff2', weight: '500' },
  ],
  variable: '--font-mdio',
  display: 'swap',
})

const mduixl = localFont({
  src: [
    { path: '../fonts/MDUIXL-Regular.woff2', weight: '400' },
    { path: '../fonts/MDUIXL-Medium.woff2', weight: '500' },
  ],
  variable: '--font-mduixl',
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
    <html lang="en" suppressHydrationWarning className={`${mdui.variable} ${mdio.variable} ${mduixl.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}
