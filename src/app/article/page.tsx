import Link from 'next/link'

import { ENPost, ZHPost, allENPosts, allZHPosts } from 'contentlayer/generated'

import { getPostURL, sortPosts } from '@/utils/post'

const PostLink = ({ post }: { post: ZHPost | ENPost }) => (
  <Link
    key={post._id}
    href={getPostURL(post)}
    className="-mx-3 mb-2 sm:mb-0 sm:py-3 flex px-3 flex-col rounded-md no-underline hover:bg-gray-100/60 dark:hover:bg-gray-200"
  >
    <span className="text-gray-600 mb-1.5 text-sm">{post.formattedData}</span>
    <div className="flex items-center">
      {post.locale === 'zh' && (
        <span className="text-xs bg-zinc-100 text-zinc-700 rounded px-1 py-0.5 -ml-12 -mt-0.5 mr-4 hidden md:block">
          中文
        </span>
      )}
      <span className="font-semibold mb-1.5">{post.title}</span>
    </div>

    {/* <span className="text-gray-600 text-sm">{post.description}</span> */}
  </Link>
)

const ArticlesPage = () => {
  return (
    <div>
      {allENPosts.sort(sortPosts).map((enPost) => {
        const zhPost = allZHPosts.find((zhPost) => zhPost.metaName === enPost.metaName)

        return (
          <>
            <PostLink key={enPost._id} post={enPost} />
            {zhPost && <PostLink key={zhPost._id} post={zhPost} />}
          </>
        )
      })}
    </div>
  )
}

export default ArticlesPage
