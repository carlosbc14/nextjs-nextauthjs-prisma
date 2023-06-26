import './globals.css'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/libs/next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home - Next App',
  description: 'Authentication Application with NextAuth.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
