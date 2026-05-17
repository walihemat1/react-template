import { useTranslation } from '@/i18n/use-translation'

function AccountPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold">{t('account.title')}</h1>
      <p className="text-muted-foreground">{t('account.description')}</p>
    </section>
  )
}

export { AccountPage }
