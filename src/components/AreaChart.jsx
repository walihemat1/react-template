function AreaChart({
  color = 'var(--chart-1)',
  data = [12, 18, 15, 22, 19, 28, 24, 32, 29, 35, 31, 38],
  height = 200,
  width = 600,
}) {
  if (!data.length) {
    return null
  }

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const padding = 8

  const linePoints = data.map((value, index) => {
    const x = index * step
    const y =
      height - padding - ((value - min) / range) * (height - padding * 2)
    return { x, y }
  })

  const linePath = linePoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ')

  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <svg
      aria-hidden
      className="w-full"
      preserveAspectRatio="none"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGradient)" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  )
}

export { AreaChart }
