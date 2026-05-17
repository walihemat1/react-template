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
import { AppLogo } from '@/components/AppLogo'
import { Button } from '@/components/ui/button'
import { sidebarSections } from '@/config/navigation'
import { useTranslation } from '@/i18n/use-translation'
import { cn } from '@/lib/utils'
import { formatRole, getInitials } from '@/lib/user'

function AppSidebar({ isCollapsed, onToggle, user }) {
  const { direction } = useLanguage()
  const { t } = useTranslation()
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
      <div key={section.labelKey} className="space-y-1.5">
        {collapsed ? null : (
          <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
            {t(section.labelKey)}
          </p>
        )}
        <div className="space-y-0.5">
          {section.items.map((item) => {
            const Icon = item.icon
            const itemLabel = t(item.labelKey)
            const isActive =
              pathname === item.to || pathname.startsWith(`${item.to}/`)

            return (
              <NavLink
                key={`${section.labelKey}-${item.to}`}
                to={item.to}
                title={collapsed ? itemLabel : undefined}
                onClick={isMobile ? closeMobileSidebar : undefined}
                className={cn(
                  'group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                  collapsed && 'justify-center px-0',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0',
                    isActive
                      ? 'text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/65 group-hover:text-sidebar-foreground',
                  )}
                  aria-hidden
                />
                {collapsed ? null : (
                  <span className="truncate">{itemLabel}</span>
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
        aria-label={t('sidebar.open')}
        className={cn(
          'fixed top-4 z-40 h-10 w-10 rounded-xl border border-border/80 bg-background/95 shadow-sm backdrop-blur md:hidden',
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
          aria-label={t('sidebar.closeOverlay')}
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[1px] md:hidden"
          type="button"
          onClick={closeMobileSidebar}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 flex w-[17.5rem] flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-[transform,width] duration-200 md:z-30 md:shadow-none',
          isMobileOpen
            ? 'translate-x-0'
            : isRtl
              ? 'translate-x-full md:translate-x-0'
              : '-translate-x-full md:translate-x-0',
          'md:translate-x-0',
          isCollapsed ? 'md:w-[4.75rem]' : 'md:w-72',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-sidebar-border px-3',
            isCollapsed ? 'justify-center md:px-2' : 'justify-between gap-2',
          )}
        >
          <NavLink
            to="/dashboard"
            className={cn(
              'flex min-w-0 items-center gap-3',
              isCollapsed && 'md:justify-center',
            )}
            onClick={closeMobileSidebar}
          >
            <AppLogo size={isCollapsed ? 'sm' : 'default'} />
            {isCollapsed ? (
              <span className="sr-only">{t('app.name')}</span>
            ) : (
              <span className="min-w-0 md:block">
                <span className="block truncate text-sm font-semibold leading-tight">
                  {t('app.name')}
                </span>
                <span className="block truncate text-[11px] text-sidebar-foreground/60">
                  {t('app.workspace')}
                </span>
              </span>
            )}
          </NavLink>

          <div className="flex items-center gap-1">
            <Button
              aria-label={
                isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')
              }
              className="hidden h-9 w-9 rounded-lg border border-sidebar-border/70 bg-background/60 text-foreground hover:bg-sidebar-accent/60 md:inline-flex"
              size="icon"
              variant="ghost"
              onClick={onToggle}
            >
              <ToggleIcon className="h-4 w-4" />
            </Button>
            <Button
              aria-label={t('sidebar.close')}
              className="h-9 w-9 rounded-lg border border-sidebar-border/70 bg-background/60 md:hidden"
              size="icon"
              variant="ghost"
              onClick={closeMobileSidebar}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-5 md:hidden">
            {renderSections({ isMobile: true })}
          </nav>
          <nav className="hidden space-y-5 md:block">
            {renderSections({ collapsed: isCollapsed })}
          </nav>
        </div>

        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              'rounded-xl border border-sidebar-border/70 bg-background/40 p-2.5',
              isCollapsed && 'flex items-center justify-center p-2',
            )}
          >
            {isCollapsed ? (
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground"
                title={user?.name ?? t('common.user')}
              >
                {getInitials(user?.name)}
              </span>
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">
                  {getInitials(user?.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium leading-tight">
                    {user?.name ?? t('common.user')}
                  </p>
                  <p className="truncate text-[11px] text-sidebar-foreground/60">
                    {formatRole(user?.role, t)}
                  </p>
                </div>
                <ChevronRight
                  aria-hidden
                  className={cn(
                    'h-4 w-4 shrink-0 text-sidebar-foreground/40',
                    isRtl && 'rotate-180',
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export { AppSidebar }
