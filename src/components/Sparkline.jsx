import { cn } from '@/lib/utils'

function Sparkline({
  className,
  color = 'var(--chart-1)',
  data = [4, 6, 5, 8, 7, 9, 8, 11, 10, 12],
  height = 32,
  width = 80,
}) {
  if (!data.length) {
    return null
  }

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)

  const points = data
    .map((value, index) => {
      const x = index * step
      const y = height - ((value - min) / range) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      aria-hidden
      className={cn('overflow-visible', className)}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <polyline
        fill="none"
        points={points}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export { Sparkline }
