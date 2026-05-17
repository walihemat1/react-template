import { useTranslation } from '@/i18n/use-translation'

function ProfilePage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold">{t('profile.title')}</h1>
      <p className="text-muted-foreground">{t('profile.description')}</p>
    </section>
  )
}

export { ProfilePage }
