import { ReactNode } from 'react'

import { cn } from '@/utils/style'

interface HeaderProps {
  className?: string
  children: ReactNode
}

const Header = (props: HeaderProps): ReactNode => {
  const { children, className } = props
  return (
    <header className={cn('px-auto mx-auto max-w-2xl py-4 px-4 md:px-0', className)}>
      {children}
    </header>
  )
}

interface BodyProps {
  className?: string
  children: ReactNode
}

const Body = (props: BodyProps): ReactNode => {
  const { children, className } = props

  return <main className={cn('max-w-2xl mx-auto px-4 md:px-0', className)}>{children}</main>
}

const Layout = {
  Header,
  Body,
}

export default Layout
