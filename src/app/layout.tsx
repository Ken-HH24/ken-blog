import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Layout from '@/components/layout'
import '@/styles/global.css'
import { cn } from '@/utils/style'

import NavBar from '../components/nav-bar'

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Ken's blog",
  description: "Ken's blog",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Layout.Header className="mt-2 mb-8">
          <NavBar
            items={[
              { name: 'Home', href: '/' },
              { name: 'Article', href: '/article' },
              { name: 'Tips', href: '/tips' },
            ]}
          />
        </Layout.Header>
        {children}
      </body>
    </html>
  )
}
