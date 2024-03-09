import Link from 'next/link'

import { allTips } from 'contentlayer/generated'

const TipsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      {allTips.map((tip) => (
        <Link
          href={`/tips/${tip.slug}`}
          key={tip.slug}
          className="text-lg underline-offset-2 underline text-gray-700 hover:text-gray-900"
        >
          {tip.title}
        </Link>
      ))}
    </div>
  )
}

export default TipsPage
