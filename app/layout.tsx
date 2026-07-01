import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kenya Civic Info Bot',
  description: 'Ask questions about Kenya\'s Constitution, voting rights, and county government.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
