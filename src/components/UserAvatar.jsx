import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/user'

function UserAvatar({ className, name, size = 'default' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-9 w-9 text-xs',
    lg: 'h-11 w-11 text-sm',
  }

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground',
        sizes[size],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}

export { UserAvatar }
