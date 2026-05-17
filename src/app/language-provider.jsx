import { useEffect, useState } from 'react'

import { LanguageContext } from '@/app/language-context'
import { localeMeta, normalizeLanguage } from '@/i18n/locale-meta'

const LANGUAGE_STORAGE_KEY = 'react-template-language'

function getInitialLanguage() {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en'
  const normalized = normalizeLanguage(stored)

  if (stored !== normalized) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized)
  }

  return normalized
}

function buildLanguageOptions() {
  return Object.fromEntries(
    Object.entries(localeMeta).map(([code, meta]) => [
      code,
      {
        dir: meta.dir,
        label: meta.label,
        nativeLabel: meta.nativeLabel,
      },
    ]),
  )
}

const languages = buildLanguageOptions()

function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)
  const direction = localeMeta[language]?.dir || 'ltr'

  function setLanguage(nextLanguage) {
    const normalized = normalizeLanguage(nextLanguage)
    setLanguageState(normalized)
  }

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = direction
  }, [direction, language])

  return (
    <LanguageContext.Provider
      value={{ direction, language, languages, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageProvider }
