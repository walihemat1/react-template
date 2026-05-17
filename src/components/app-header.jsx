import { Search, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NotificationMenu } from '@/components/notification-menu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UserMenu } from '@/components/user-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/i18n/use-translation'
import { cn } from '@/lib/utils'

function AppHeader({ onLogout, user }) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <label className="relative mx-auto hidden w-full max-w-md md:block lg:max-w-lg">
          <span className="sr-only">{t('header.searchLabel')}</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label={t('header.searchLabel')}
            className="h-10 rounded-xl border-border/80 bg-muted/30 ps-10 shadow-xs"
            placeholder={t('header.searchPlaceholder')}
            type="search"
          />
          <kbd
            className={cn(
              'pointer-events-none absolute end-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-flex',
            )}
          >
            <span className="text-xs">⌘</span>K
          </kbd>
        </label>

        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <LanguageSwitcher />

          <Button
            asChild
            className="h-10 w-10 rounded-xl border border-border/80 bg-background shadow-xs hover:bg-accent"
            size="icon"
            variant="ghost"
          >
            <NavLink aria-label={t('header.settingsAria')} to="/settings">
              <Settings className="h-4 w-4" />
            </NavLink>
          </Button>

          <NotificationMenu />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>

      <label className="relative block border-t border-border/60 px-4 py-2.5 md:hidden">
        <span className="sr-only">{t('header.searchLabel')}</span>
        <Search
          aria-hidden
          className="pointer-events-none absolute start-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          aria-label={t('header.searchLabel')}
          className="h-9 rounded-xl border-border/80 bg-muted/30 ps-10 text-sm"
          placeholder={t('header.searchPlaceholder')}
          type="search"
        />
      </label>
    </header>
  )
}

export { AppHeader }
