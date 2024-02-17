import Layout from '@/components/layout'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <Layout.Body>{children}</Layout.Body>
}
