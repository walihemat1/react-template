import { useEffect, useState } from 'react'

import { LanguageContext } from '@/app/language-context'

const LANGUAGE_STORAGE_KEY = 'react-template-language'

const languages = {
  en: { label: 'English', dir: 'ltr' },
  fa: { label: 'Persian', dir: 'rtl' },
  ar: { label: 'Arabic', dir: 'rtl' },
}

function getInitialLanguage() {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en'
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const direction = languages[language]?.dir || 'ltr'

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
