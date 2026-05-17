import { Activity, Eye, MousePointerClick, Users } from 'lucide-react'

export const dashboardKpis = [
  {
    key: 'totalUsers',
    icon: Users,
    value: '2,845',
    trend: 12.5,
    sparkColor: 'var(--chart-1)',
    iconClass: 'bg-primary/10 text-primary',
    sparkData: [8, 10, 9, 12, 11, 14, 13, 16, 15, 18],
  },
  {
    key: 'pageViews',
    icon: Eye,
    value: '18,932',
    trend: 8.2,
    sparkColor: 'var(--chart-5)',
    iconClass: 'bg-chart-5/15 text-chart-5',
    sparkData: [14, 16, 15, 18, 17, 20, 19, 22, 21, 24],
  },
  {
    key: 'activeSessions',
    icon: Activity,
    value: '1,245',
    trend: 15.3,
    sparkColor: 'var(--chart-3)',
    iconClass: 'bg-chart-3/15 text-chart-3',
    sparkData: [6, 8, 7, 10, 9, 12, 11, 14, 13, 16],
  },
  {
    key: 'bounceRate',
    icon: MousePointerClick,
    value: '24.6%',
    trend: -3.1,
    sparkColor: 'var(--chart-4)',
    iconClass: 'bg-chart-4/15 text-chart-4',
    sparkData: [20, 18, 19, 17, 18, 16, 17, 15, 16, 14],
  },
]

export const analyticsChartData = [
  12, 18, 15, 22, 19, 28, 24, 32, 29, 35, 31, 38, 34, 42, 39, 45,
]

export const recentActivityItems = [
  {
    id: 1,
    key: 'newUser',
    iconVariant: 'primary',
    timestampKey: 'twoMinAgo',
  },
  {
    id: 2,
    key: 'settingsUpdated',
    iconVariant: 'accent',
    timestampKey: 'oneHourAgo',
  },
  {
    id: 3,
    key: 'reportGenerated',
    iconVariant: 'chart5',
    timestampKey: 'today',
  },
  {
    id: 4,
    key: 'backupCompleted',
    iconVariant: 'success',
    timestampKey: 'yesterday',
  },
]

export const recentUsersPreview = [
  {
    id: 1,
    name: 'Sara Khan',
    email: 'sara@example.com',
    role: 'admin',
    status: 'active',
    joined: '2025-04-12',
  },
  {
    id: 2,
    name: 'Omar Aziz',
    email: 'omar@example.com',
    role: 'manager',
    status: 'active',
    joined: '2025-03-28',
  },
  {
    id: 3,
    name: 'Ali Ahmad',
    email: 'ali@example.com',
    role: 'user',
    status: 'active',
    joined: '2025-02-15',
  },
  {
    id: 4,
    name: 'Laila Noor',
    email: 'laila@example.com',
    role: 'user',
    status: 'inactive',
    joined: '2025-01-08',
  },
]

export const systemStatusItems = [
  { id: 1, key: 'apiServer', status: 'operational' },
  { id: 2, key: 'database', status: 'operational' },
  { id: 3, key: 'cdn', status: 'operational' },
]
