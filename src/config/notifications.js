import { CheckCircle2, Settings2, ShieldCheck, UserPlus } from 'lucide-react'

export const mockNotificationKeys = [
  {
    id: 1,
    icon: UserPlus,
    titleKey: 'notifications.items.newUser.title',
    descriptionKey: 'notifications.items.newUser.description',
    timestampKey: 'notifications.items.newUser.timestamp',
    unread: true,
  },
  {
    id: 2,
    icon: ShieldCheck,
    titleKey: 'notifications.items.permission.title',
    descriptionKey: 'notifications.items.permission.description',
    timestampKey: 'notifications.items.permission.timestamp',
    unread: true,
  },
  {
    id: 3,
    icon: Settings2,
    titleKey: 'notifications.items.settings.title',
    descriptionKey: 'notifications.items.settings.description',
    timestampKey: 'notifications.items.settings.timestamp',
    unread: false,
  },
  {
    id: 4,
    icon: CheckCircle2,
    titleKey: 'notifications.items.backup.title',
    descriptionKey: 'notifications.items.backup.description',
    timestampKey: 'notifications.items.backup.timestamp',
    unread: false,
  },
]
