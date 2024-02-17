import { useMDXComponent } from 'next-contentlayer/hooks'

import { allPosts } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export default function Article({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  const MDXComponent = useMDXComponent(post?.body.code || '')

  return (
    <div className="prose pb-8">
      <h1>{post?.title}</h1>
      <MDXComponent />
    </div>
  )
}
