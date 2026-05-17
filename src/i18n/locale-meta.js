const localeMeta = {
  en: {
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
  },
  fa: {
    label: 'Persian',
    nativeLabel: 'فارسی',
    dir: 'rtl',
  },
  ps: {
    label: 'Pashto',
    nativeLabel: 'پښتو',
    dir: 'rtl',
  },
}

const supportedLanguages = Object.keys(localeMeta)

const legacyLanguageMap = {
  ar: 'ps',
}

function normalizeLanguage(language) {
  if (legacyLanguageMap[language]) {
    return legacyLanguageMap[language]
  }

  return supportedLanguages.includes(language) ? language : 'en'
}

export { legacyLanguageMap, localeMeta, normalizeLanguage, supportedLanguages }
