import { Monitor, Moon, Sun } from 'lucide-react'

import { useTheme } from '@/app/theme-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const themeOptions = {
  light: { label: 'Light', icon: Sun },
  dark: { label: 'Dark', icon: Moon },
  system: { label: 'System', icon: Monitor },
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = themeOptions[theme]?.icon || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Theme"
          className="h-10 gap-2 rounded-xl border border-border bg-background px-3 shadow-xs hover:bg-accent"
          variant="ghost"
        >
          <Icon className="h-4 w-4" />
          <span className="hidden text-sm sm:inline">
            {themeOptions[theme]?.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {Object.entries(themeOptions).map(([value, item]) => {
          const ItemIcon = item.icon

          return (
            <DropdownMenuCheckboxItem
              key={value}
              checked={theme === value}
              onCheckedChange={() => setTheme(value)}
            >
              <ItemIcon className="h-4 w-4" />
              {item.label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ThemeToggle }
