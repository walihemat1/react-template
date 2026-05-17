import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/10 text-primary',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        success: 'border-transparent bg-chart-3/15 text-chart-3',
        warning: 'border-transparent bg-chart-4/15 text-chart-4',
        destructive: 'border-transparent bg-destructive/10 text-destructive',
        info: 'border-transparent bg-chart-5/15 text-chart-5',
        accent: 'border-transparent bg-accent/20 text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

function StatusBadge({ active, activeLabel, inactiveLabel }) {
  return (
    <Badge variant={active ? 'success' : 'secondary'}>
      <span
        aria-hidden
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          active ? 'bg-chart-3' : 'bg-muted-foreground',
        )}
      />
      {active ? activeLabel : inactiveLabel}
    </Badge>
  )
}

export { Badge, StatusBadge }
