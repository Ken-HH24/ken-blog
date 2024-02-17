import { ReactNode } from 'react'

import Layout from '@/components/layout'

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return <Layout.Body>{children}</Layout.Body>
}
