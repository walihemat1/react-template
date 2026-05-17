import {
  Calendar,
  CheckCircle2,
  FileText,
  Settings,
  UserPlus,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { AreaChart } from '@/components/AreaChart'
import { PageHeader } from '@/components/PageHeader'
import { RoleBadge } from '@/components/RoleBadge'
import { StatCard } from '@/components/StatCard'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import {
  analyticsChartData,
  dashboardKpis,
  recentActivityItems,
  recentUsersPreview,
  systemStatusItems,
} from '@/config/dashboard'
import { useTranslation } from '@/i18n/use-translation'
import { cn } from '@/lib/utils'
import { routes } from '@/routes/routes'

const activityIconMap = {
  newUser: UserPlus,
  settingsUpdated: Settings,
  reportGenerated: FileText,
  backupCompleted: CheckCircle2,
}

const activityIconStyles = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/20 text-accent-foreground',
  chart5: 'bg-chart-5/15 text-chart-5',
  success: 'bg-chart-3/15 text-chart-3',
}

function DashboardPage() {
  const { t } = useTranslation()
  const trendLabel = t('dashboard.vsLastPeriod')

  return (
    <section className="space-y-8">
      <PageHeader
        title={t('dashboard.title')}
        description={t('dashboard.subtitle')}
        actions={
          <Button
            className="gap-2 rounded-xl border border-border bg-card shadow-sm"
            variant="outline"
          >
            <Calendar aria-hidden className="h-4 w-4" />
            <span className="hidden sm:inline">{t('dashboard.dateRange')}</span>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <StatCard
            key={kpi.key}
            icon={kpi.icon}
            iconClassName={kpi.iconClass}
            label={t(`dashboard.${kpi.key}`)}
            sparkColor={kpi.sparkColor}
            sparkData={kpi.sparkData}
            trend={kpi.trend}
            trendLabel={trendLabel}
            value={kpi.value}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
            <div>
              <CardTitle>{t('dashboard.analyticsOverview')}</CardTitle>
              <CardDescription>
                {t('dashboard.analyticsDescription')}
              </CardDescription>
            </div>
            <Button
              className="h-8 shrink-0 rounded-lg text-xs"
              size="sm"
              variant="outline"
            >
              {t('dashboard.last30Days')}
            </Button>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-48 w-full sm:h-52">
              <AreaChart color="var(--chart-1)" data={analyticsChartData} />
            </div>
          </CardContent>
          <CardFooter className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.totalViews')}
              </p>
              <p className="text-lg font-semibold">124.5k</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.uniqueVisitors')}
              </p>
              <p className="text-lg font-semibold">38.2k</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.avgEngagement')}
              </p>
              <p className="text-lg font-semibold">4m 32s</p>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <Button className="h-8 text-xs" size="sm" variant="ghost">
              {t('dashboard.viewAll')}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {recentActivityItems.map((item) => {
              const Icon = activityIconMap[item.key]
              const title = t(`dashboard.activity.${item.key}.title`)
              const description = t(
                `dashboard.activity.${item.key}.description`,
              )
              const timestamp = t(
                `dashboard.activity.timestamps.${item.timestampKey}`,
              )

              return (
                <div key={item.id} className="flex gap-3">
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                      activityIconStyles[item.iconVariant],
                    )}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {timestamp}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle>{t('dashboard.recentUsers')}</CardTitle>
              <CardDescription>
                {t('dashboard.recentUsersDescription')}
              </CardDescription>
            </div>
            <Button asChild className="h-8 text-xs" size="sm" variant="outline">
              <Link to={routes.users}>{t('dashboard.viewAllUsers')}</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-6 py-3 text-start font-medium">
                      {t('users.name')}
                    </th>
                    <th className="hidden px-4 py-3 text-start font-medium md:table-cell">
                      {t('users.email')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      {t('users.role')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      {t('users.status')}
                    </th>
                    <th className="hidden px-6 py-3 text-start font-medium sm:table-cell">
                      {t('users.joined')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentUsersPreview.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={user.name} />
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">
                        {user.email}
                      </td>
                      <td className="px-4 py-3.5">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge
                          active={user.status === 'active'}
                          activeLabel={t('users.statusActive')}
                          inactiveLabel={t('users.statusInactive')}
                        />
                      </td>
                      <td className="hidden px-6 py-3.5 text-muted-foreground sm:table-cell">
                        {user.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.systemStatus')}</CardTitle>
            <CardDescription>
              {t('dashboard.systemStatusDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {systemStatusItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/20 px-4 py-3"
              >
                <span className="text-sm font-medium">
                  {t(`dashboard.system.${item.key}`)}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-chart-3">
                  <CheckCircle2 aria-hidden className="h-4 w-4" />
                  {t('dashboard.operational')}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export { DashboardPage }
