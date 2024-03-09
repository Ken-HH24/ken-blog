import { useMDXComponent } from 'next-contentlayer/hooks'

import { allTips } from 'contentlayer/generated'

export async function generateStaticParams() {
  return allTips.map((tip) => ({
    slug: tip.slug,
  }))
}

interface TipProps {
  params: { slug: string }
}

export default function Tip(props: TipProps) {
  const { slug } = props.params || {}

  const tip = allTips.find((tip) => tip.slug === slug)

  const MDXComponent = useMDXComponent(tip?.body?.code || '')

  return (
    <div>
      <div className="prose pb-8">
        <h1 className="mb-2">{tip?.title}</h1>
        <MDXComponent />
      </div>
    </div>
  )
}
