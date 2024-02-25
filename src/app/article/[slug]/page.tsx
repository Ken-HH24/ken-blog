import { useMDXComponent } from 'next-contentlayer/hooks'

import { allEnPosts, allZhPosts } from 'contentlayer/generated'

export async function generateStaticParams() {
  return [...allZhPosts, ...allEnPosts].map((post) => ({
    slug: post.slug,
  }))
}

interface ArticleProps {
  params: { slug: string }
}

export default function Article(props: ArticleProps) {
  const { slug } = props.params || {}

  const post = [...allEnPosts, ...allZhPosts].find((post) => post.slug === slug)

  const MDXComponent = useMDXComponent(post?.body.code || '')

  return (
    <div className="prose pb-8">
      <h1 className="mb-2">{post?.title}</h1>
      <div className="text-gray-400 font-medium">{post?.formattedData}</div>

      <MDXComponent />
    </div>
  )
}
