import { cn } from '@/utils/style'

type CalloutType = 'success' | 'warn' | 'error'

interface CalloutProps {
  type: CalloutType
  content: string
}

const IconMap: Record<CalloutType, string> = {
  success: '✅',
  warn: '💡',
  error: '🚫',
}

const ContainerStyleMap: Record<CalloutType, string> = {
  success: 'border-green-500 text-green-900 bg-green-100',
  warn: 'border-yellow-500 text-orange-900 bg-yellow-100',
  error: 'border-rose-500 text-rose-900 bg-rose-100',
}

const Callout = (props: CalloutProps) => {
  const { type, content } = props

  return (
    <div
      className={cn(
        'overflow-x-auto flex rounded-lg border py-2 px-4 contrast-more:border-current contrast-more:dark:border-current',
        ContainerStyleMap[type],
      )}
    >
      <div className='mr-2'>{IconMap[type]}</div>
      <div>{content}</div>
    </div>
  )
}

export default Callout
