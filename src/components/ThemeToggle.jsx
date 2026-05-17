import { Monitor, Moon, Sun } from 'lucide-react'

import { useTheme } from '@/app/theme-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/i18n/use-translation'

const themeOptionKeys = {
  light: { labelKey: 'theme.light', icon: Sun },
  dark: { labelKey: 'theme.dark', icon: Moon },
  system: { labelKey: 'theme.system', icon: Monitor },
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const Icon = themeOptionKeys[theme]?.icon || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t('theme.label')}
          className="h-10 gap-2 rounded-xl border border-border bg-background px-3 shadow-xs hover:bg-accent"
          variant="ghost"
        >
          <Icon className="h-4 w-4" />
          <span className="hidden text-sm sm:inline">
            {t(themeOptionKeys[theme]?.labelKey)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {Object.entries(themeOptionKeys).map(([value, item]) => {
          const ItemIcon = item.icon

          return (
            <DropdownMenuCheckboxItem
              key={value}
              checked={theme === value}
              onCheckedChange={() => setTheme(value)}
            >
              <ItemIcon className="h-4 w-4" />
              {t(item.labelKey)}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ThemeToggle }
