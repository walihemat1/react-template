import { TrendingDown, TrendingUp } from 'lucide-react'

import { Sparkline } from '@/components/Sparkline'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function StatCard({
  icon: Icon,
  iconClassName = 'bg-primary/10 text-primary',
  label,
  sparkColor = 'var(--chart-1)',
  sparkData,
  trend,
  trendLabel,
  value,
}) {
  const isPositive = trend >= 0

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              iconClassName,
            )}
          >
            <Icon aria-hidden className="h-5 w-5" />
          </div>
          <Sparkline color={sparkColor} data={sparkData} />
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <div className="flex items-center gap-1.5 text-xs">
            {isPositive ? (
              <TrendingUp aria-hidden className="h-3.5 w-3.5 text-chart-3" />
            ) : (
              <TrendingDown
                aria-hidden
                className="h-3.5 w-3.5 text-destructive"
              />
            )}
            <span
              className={cn(
                'font-medium',
                isPositive ? 'text-chart-3' : 'text-destructive',
              )}
            >
              {isPositive ? '+' : ''}
              {trend}%
            </span>
            <span className="text-muted-foreground">{trendLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { StatCard }
