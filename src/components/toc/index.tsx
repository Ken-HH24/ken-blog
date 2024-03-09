'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { cn } from '@/utils/style'

interface TocItem {
  level?: number
  text?: string
  slug?: string
}

interface TocProps {
  toc?: TocItem[]
  className?: string
}

const useActiveItem = (ids: string[]) => {
  const [activeItem, setActiveItem] = useState<string>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          observer.unobserve(el)
        }
      })
    }
  }, [ids])

  return activeItem
}

const Toc = (props: TocProps) => {
  const { toc, className } = props

  const renderedItems =
    toc
      ?.filter((item) => item.level === 2 || item.level === 3)
      .filter((item) => item.slug !== undefined) || []

  const activeItem = useActiveItem(renderedItems?.map((item) => item.slug) as string[])

  return (
    <div className={cn('max-w-52 fixed right-[calc((50vw-33ch-6rem)/2)] top-28', className)}>
      <div className="text-gray-700 text-lg mb-2">content on this page</div>
      <div className="flex flex-col">
        {renderedItems?.map((item) => (
          <div
            key={item.slug}
            className={cn('text-sm text-gray-600 hover:text-gray-950', {
              'ml-4 mt-2': item.level === 3,
              'mt-3': item.level === 2,
              'text-gray-900 font-semibold': item.slug === activeItem,
            })}
          >
            <Link href={`#${item.slug}`}>{item.text}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Toc
