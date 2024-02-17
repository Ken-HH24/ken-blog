import Link from 'next/link'

import { allPosts } from 'contentlayer/generated'

import { sortPosts } from '@/utils/post'

const ArticlesPage = () => {
  return (
    <div>
      {allPosts.sort(sortPosts).map((post) => (
        <Link
          key={post._id}
          href={post.url}
          className="-mx-3 flex flex-col rounded-md px-3 no-underline hover:bg-gray-100/60 dark:hover:bg-gray-200 sm:py-4"
        >
          <span className="text-gray-600 mb-1">{post.formattedData}</span>
          <span className="font-semibold text-lg mb-1">{post.title}</span>
          <span className="text-gray-600">{post.description}</span>
        </Link>
      ))}
    </div>
  )
}

export default ArticlesPage
