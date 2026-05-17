import { useEffect } from 'react'

import { useTranslation } from '@/i18n/use-translation'

function DocumentTitle() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t('app.name')
  }, [t])

  return null
}

export { DocumentTitle }
