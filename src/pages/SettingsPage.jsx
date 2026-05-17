import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useLanguage } from '@/app/language-context'
import { useTheme } from '@/app/theme-context'
import { PageHeader } from '@/components/PageHeader'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { permissions } from '@/config/rbac'
import { useTranslation } from '@/i18n/use-translation'
import { PermissionGuard } from '@/routes/PermissionGuard'

function SettingsToggle({ checked, description, id, label, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/80 bg-muted/15 p-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <input
        checked={checked}
        className="mt-1 h-4 w-4 shrink-0 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
        id={id}
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
    </div>
  )
}

function SettingsPage() {
  const { t } = useTranslation()
  const { language, languages, setLanguage } = useLanguage()
  const { theme } = useTheme()
  const user = useSelector((state) => state.auth.user)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [savedMessage, setSavedMessage] = useState(false)

  function handleSave() {
    setSavedMessage(true)
    window.setTimeout(() => setSavedMessage(false), 2500)
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title={t('settings.title')}
        description={t('settings.description')}
        actions={
          <PermissionGuard permission={permissions.settingsUpdate}>
            <div className="flex gap-2">
              <Button type="button" variant="outline">
                {t('settings.discard')}
              </Button>
              <Button type="button" onClick={handleSave}>
                {t('common.save')}
              </Button>
            </div>
          </PermissionGuard>
        }
      />

      {savedMessage ? (
        <p
          className="rounded-lg border border-chart-3/30 bg-chart-3/10 px-4 py-2 text-sm text-chart-3"
          role="status"
        >
          {t('settings.saved')}
        </p>
      ) : null}

      <PermissionGuard
        permission={permissions.settingsUpdate}
        fallback={
          <p className="text-sm text-muted-foreground">
            {t('settings.viewOnly')}
          </p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.account')}</CardTitle>
              <CardDescription>
                {t('settings.accountDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="display-name">
                  {t('settings.displayName')}
                </label>
                <Input defaultValue={user?.name ?? ''} id="display-name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email-address">
                  {t('settings.emailAddress')}
                </label>
                <Input
                  defaultValue={user?.email ?? ''}
                  id="email-address"
                  type="email"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.appearance')}</CardTitle>
              <CardDescription>
                {t('settings.appearanceDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/15 p-4">
                <div>
                  <p className="text-sm font-medium">{t('theme.label')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t(`theme.${theme}`)}
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.language')}</CardTitle>
              <CardDescription>
                {t('settings.languageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {Object.entries(languages).map(([code, item]) => (
                <button
                  key={code}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-start text-sm transition-colors ${
                    language === code
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border/80 bg-muted/15 hover:bg-muted/30'
                  }`}
                  type="button"
                  onClick={() => setLanguage(code)}
                >
                  <span>{item.nativeLabel}</span>
                  {language === code ? (
                    <span className="text-xs font-medium text-primary">
                      {t('common.selected')}
                    </span>
                  ) : null}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.notifications')}</CardTitle>
              <CardDescription>
                {t('settings.notificationsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <SettingsToggle
                checked={emailNotifications}
                description={t('settings.emailNotificationsHint')}
                id="email-notifications"
                label={t('settings.emailNotifications')}
                onChange={setEmailNotifications}
              />
              <SettingsToggle
                checked={pushNotifications}
                description={t('settings.pushNotificationsHint')}
                id="push-notifications"
                label={t('settings.pushNotifications')}
                onChange={setPushNotifications}
              />
              <SettingsToggle
                checked={marketingEmails}
                description={t('settings.marketingEmailsHint')}
                id="marketing-emails"
                label={t('settings.marketingEmails')}
                onChange={setMarketingEmails}
              />
            </CardContent>
          </Card>
        </div>
      </PermissionGuard>
    </section>
  )
}

export { SettingsPage }
