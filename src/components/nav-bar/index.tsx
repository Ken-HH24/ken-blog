'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/style'

interface NavBarProps {
  items: { name: string; href: string }[]
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { items } = props

  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6 md:gap-10">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn('text-gray-600', {
            'text-gray-900 font-medium': item.href === pathname,
          })}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default NavBar
