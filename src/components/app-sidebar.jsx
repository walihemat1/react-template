import {
  ChevronLeft,
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useLanguage } from '@/app/language-context'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config/app-config'
import { sidebarSections } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { formatRole, getInitials } from '@/lib/user'

function AppSidebar({ isCollapsed, onToggle, user }) {
  const { direction } = useLanguage()
  const { pathname } = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const isRtl = direction === 'rtl'
  const CollapseIcon = direction === 'rtl' ? PanelLeftOpen : PanelLeftClose
  const ExpandIcon = direction === 'rtl' ? ChevronLeft : ChevronRight
  const ToggleIcon = isCollapsed ? ExpandIcon : CollapseIcon

  function closeMobileSidebar() {
    setIsMobileOpen(false)
  }

  function renderSections({ collapsed = false, isMobile = false } = {}) {
    return sidebarSections.map((section) => (
      <div key={section.label} className="space-y-2">
        {collapsed ? null : (
          <p className="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
            {section.label}
          </p>
        )}
        <div className="space-y-1">
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.to || pathname.startsWith(`${item.to}/`)

            return (
              <NavLink
                key={`${section.label}-${item.to}`}
                to={item.to}
                title={collapsed ? item.label : undefined}
                onClick={isMobile ? closeMobileSidebar : undefined}
                className={cn(
                  'group flex h-12 items-center gap-3 rounded-2xl px-3.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm ring-1 ring-sidebar-border/40'
                    : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                  collapsed && 'justify-center px-0',
                )}
              >
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0',
                    !isActive &&
                      'text-sidebar-foreground/70 group-hover:text-sidebar-foreground',
                  )}
                />
                {collapsed ? null : (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            )
          })}
        </div>
      </div>
    ))
  }

  return (
    <>
      <Button
        aria-label="Open sidebar"
        className={cn(
          'fixed top-4 z-40 h-11 w-11 rounded-2xl border border-border/80 bg-background/95 shadow-sm backdrop-blur md:hidden',
          isRtl ? 'right-4' : 'left-4',
          isMobileOpen && 'hidden',
        )}
        size="icon"
        variant="ghost"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isMobileOpen ? (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/45 md:hidden"
          type="button"
          onClick={closeMobileSidebar}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 flex w-[18.5rem] flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-[transform,width] duration-200 md:z-30 md:shadow-none',
          isMobileOpen
            ? 'translate-x-0'
            : isRtl
              ? 'translate-x-full md:translate-x-0'
              : '-translate-x-full md:translate-x-0',
          'md:translate-x-0',
          isCollapsed ? 'md:w-20' : 'md:w-72',
        )}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-sidebar-border px-4">
          <NavLink
            to="/dashboard"
            className={cn('min-w-0', isCollapsed ? 'md:sr-only' : 'block')}
            onClick={closeMobileSidebar}
          >
            <span className="block truncate text-sm font-semibold">
              {appConfig.name}
            </span>
            <span className="block text-xs text-sidebar-foreground/65">
              Admin workspace
            </span>
          </NavLink>

          <div className="flex items-center gap-1">
            <Button
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden h-11 w-11 rounded-2xl border border-sidebar-border/80 bg-background/70 text-foreground shadow-sm hover:bg-sidebar-accent/70 md:inline-flex"
              size="icon"
              variant="ghost"
              onClick={onToggle}
            >
              <ToggleIcon className="h-6 w-6" />
            </Button>
            <Button
              aria-label="Close sidebar"
              className="h-11 w-11 rounded-2xl border border-sidebar-border/80 bg-background/70 text-foreground shadow-sm hover:bg-sidebar-accent/70 md:hidden"
              size="icon"
              variant="ghost"
              onClick={closeMobileSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-6 md:hidden">
            {renderSections({ isMobile: true })}
          </nav>
          <nav className="hidden space-y-6 md:block">
            {renderSections({ collapsed: isCollapsed })}
          </nav>
        </div>

        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              'rounded-2xl border border-sidebar-border/80 bg-background/50 p-3 shadow-sm',
              isCollapsed && 'flex items-center justify-center p-2.5',
            )}
          >
            {isCollapsed ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
                {getInitials(user?.name)}
              </span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                  {getInitials(user?.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user?.name ?? 'User'}
                  </p>
                  <p className="truncate text-xs capitalize text-sidebar-foreground/65">
                    {formatRole(user?.role)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export { AppSidebar }
