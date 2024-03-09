import { ReactNode } from 'react'

import Layout from '@/components/layout'

export default function TipsLayout({ children }: { children: ReactNode }) {
  return <Layout.Body>{children}</Layout.Body>
}
