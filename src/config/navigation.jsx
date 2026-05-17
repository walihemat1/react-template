import { LayoutDashboard, Settings, Users } from 'lucide-react'

export const sidebarSections = [
  {
    labelKey: 'nav.general',
    items: [
      { to: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    ],
  },
  {
    labelKey: 'nav.pages',
    items: [{ to: '/users', labelKey: 'nav.users', icon: Users }],
  },
  {
    labelKey: 'nav.other',
    items: [{ to: '/settings', labelKey: 'nav.settings', icon: Settings }],
  },
]
