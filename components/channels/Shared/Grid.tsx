import { cn } from '@/lib/utils'

interface GridProps {
  children: React.ReactNode
  cols?: 2 | 3 | 4
  className?: string
}

const colsMap: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export function Grid({ children, cols = 3, className }: GridProps) {
  return (
    <div className={cn('grid gap-4', colsMap[cols], className)}>
      {children}
    </div>
  )
}
