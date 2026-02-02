import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Washuta Family Year in Review',
  description: 'A visual collection of our year - from the mountains to the oceans, these are the moments we\'ll remember forever.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
