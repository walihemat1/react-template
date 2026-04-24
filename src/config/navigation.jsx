import { LayoutDashboard, Settings, Users } from 'lucide-react'

export const sidebarSections = [
  {
    label: 'General',
    items: [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Pages',
    items: [{ to: '/users', label: 'Users', icon: Users }],
  },
  {
    label: 'Other',
    items: [{ to: '/settings', label: 'Settings', icon: Settings }],
  },
]
