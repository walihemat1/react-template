import {
  Bell,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { mockNotificationKeys } from '@/config/notifications'
import { useTranslation } from '@/i18n/use-translation'
import { cn } from '@/lib/utils'

function NotificationMenu() {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState(mockNotificationKeys)
  const unreadCount = notifications.filter((item) => item.unread).length

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false })),
    )
  }

  const notificationsLabel =
    unreadCount > 0
      ? t('notifications.labelWithCount', { count: unreadCount })
      : t('notifications.label')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={notificationsLabel}
          className="relative h-11 w-11 rounded-2xl border border-border/80 bg-background/80 shadow-sm hover:bg-accent"
          size="icon"
          variant="ghost"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 ? (
            <span className="absolute end-0 top-0 flex h-5 min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground shadow-sm">
              {unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[22rem] rounded-2xl p-0">
        <div className="border-b border-border px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium">{t('notifications.title')}</p>
              <p className="text-xs text-muted-foreground">
                {t('notifications.unread', { count: unreadCount })}
              </p>
            </div>
            <Button
              className="h-8 rounded-lg px-2.5"
              size="sm"
              variant="ghost"
              onClick={markAllAsRead}
            >
              <CheckCircle2 className="h-4 w-4" />
              {t('notifications.markAllRead')}
            </Button>
          </div>
        </div>

        <div className="max-h-96 space-y-1 overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium">{t('notifications.emptyTitle')}</p>
              <p className="text-sm text-muted-foreground">
                {t('notifications.emptyDescription')}
              </p>
            </div>
          ) : (
            notifications.map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl p-3 text-start transition-colors',
                    'hover:bg-muted/70',
                  )}
                  type="button"
                >
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {t(item.titleKey)}
                      </span>
                      {item.unread ? (
                        <Circle className="mt-1 h-2.5 w-2.5 fill-primary text-primary" />
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {t(item.descriptionKey)}
                    </span>
                    <span className="mt-2 block text-[11px] uppercase tracking-wide text-muted-foreground">
                      {t(item.timestampKey)}
                    </span>
                  </span>
                </button>
              )
            })
          )}
        </div>

        <div className="border-t border-border p-2">
          <Button className="w-full rounded-xl" variant="ghost">
            {t('notifications.viewAll')}
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { NotificationMenu }
