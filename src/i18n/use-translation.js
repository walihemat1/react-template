import { useCallback } from 'react'

import { useLanguage } from '@/app/language-context'
import { translate } from '@/i18n'

function useTranslation() {
  const { direction, language, languages, setLanguage } = useLanguage()

  const t = useCallback(
    (key, params) => translate(language, key, params),
    [language],
  )

  return {
    direction,
    language,
    languages,
    setLanguage,
    t,
  }
}

export { useTranslation }
