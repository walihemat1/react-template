import { Search, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NotificationMenu } from '@/components/notification-menu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { UserMenu } from '@/components/user-menu'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config/app-config'

function AppHeader({ onLogout, user }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="flex min-h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden min-w-0 xl:block">
            <p className="text-sm font-semibold">{appConfig.name}</p>
            <p className="text-xs text-muted-foreground">Clean admin shell</p>
          </div>

          <label className="relative hidden w-full max-w-sm items-center md:flex">
            <Search className="pointer-events-none absolute start-3.5 h-[18px] w-[18px] text-muted-foreground" />
            <input
              className="h-11 w-full rounded-2xl border border-border/80 bg-muted/35 ps-11 pe-4 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring dark:bg-muted/25"
              placeholder="Search pages, users, and settings..."
              type="search"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <Button
            asChild
            className="h-11 w-11 rounded-2xl border border-border/80 bg-background/80 shadow-sm hover:bg-accent"
            size="icon"
            variant="ghost"
          >
            <NavLink to="/settings">
              <Settings className="h-6 w-6" />
            </NavLink>
          </Button>

          <NotificationMenu />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  )
}

export { AppHeader }
