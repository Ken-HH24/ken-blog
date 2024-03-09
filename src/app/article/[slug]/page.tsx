import { useMDXComponent } from 'next-contentlayer/hooks'

import { allPosts } from 'contentlayer/generated'

import Toc from '@/components/toc'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

interface ArticleProps {
  params: { slug: string }
}

export default function Article(props: ArticleProps) {
  const { slug } = props.params || {}

  const post = allPosts.find((post) => post.slug === slug)

  const MDXComponent = useMDXComponent(post?.body.code || '')

  return (
    <div className="relative">
      <div className="prose pb-8">
        <h1 className="mb-2">{post?.title}</h1>
        <div className="text-gray-400 mt-4 font-mono">{post?.formattedData}</div>
        <MDXComponent />
      </div>
      <Toc toc={post?.toc} className="hidden xl:block" />
    </div>
  )
}
