import { CheckCircle2, Settings2, ShieldCheck, UserPlus } from 'lucide-react'

export const mockNotifications = [
  {
    id: 1,
    icon: UserPlus,
    title: 'New user joined',
    description: 'Sara Khan was added to the workspace.',
    timestamp: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Permission updated',
    description: 'Admin access was updated for Omar Aziz.',
    timestamp: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    icon: Settings2,
    title: 'Settings changed',
    description: 'Theme preferences were updated successfully.',
    timestamp: 'Today',
    unread: false,
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: 'Backup completed',
    description: 'Your latest backup finished without issues.',
    timestamp: 'Yesterday',
    unread: false,
  },
]
