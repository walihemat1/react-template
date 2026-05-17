import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/use-translation'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {t('notFound.code')}
          </p>
          <h1 className="text-3xl font-semibold">{t('notFound.title')}</h1>
          <p className="text-muted-foreground">{t('notFound.description')}</p>
        </div>
        <Button asChild>
          <Link to="/dashboard">{t('notFound.goToDashboard')}</Link>
        </Button>
      </div>
    </main>
  )
}

export { NotFoundPage }
