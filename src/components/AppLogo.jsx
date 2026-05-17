import { cn } from '@/lib/utils'

function AppLogo({ className, size = 'default' }) {
  const sizes = {
    sm: 'h-8 w-8 rounded-lg',
    default: 'h-9 w-9 rounded-xl',
    lg: 'h-11 w-11 rounded-xl',
  }

  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center bg-sidebar-primary shadow-sm ring-1 ring-sidebar-border/50',
        sizes[size],
        className,
      )}
    >
      <svg
        className="h-[55%] w-[55%] text-sidebar-primary-foreground"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3L4 8v8l8 5 8-5V8l-8-5z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
        <path
          d="M12 8v8M8 10.5l4 2.5 4-2.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      </svg>
    </span>
  )
}

export { AppLogo }
