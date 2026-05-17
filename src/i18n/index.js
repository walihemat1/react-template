import { en } from '@/i18n/locales/en'
import { fa } from '@/i18n/locales/fa'
import { ps } from '@/i18n/locales/ps'

const locales = {
  en,
  fa,
  ps,
}

function getNestedValue(source, keyPath) {
  return keyPath.split('.').reduce((value, key) => {
    if (value == null) {
      return undefined
    }

    return value[key]
  }, source)
}

function interpolate(template, params = {}) {
  if (typeof template !== 'string') {
    return template
  }

  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = params[key]
    return value == null ? '' : String(value)
  })
}

function translate(language, key, params) {
  const messages = locales[language] ?? locales.en
  const value = getNestedValue(messages, key) ?? getNestedValue(locales.en, key)

  if (value == null) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation for "${key}" (${language})`)
    }

    return key
  }

  if (typeof value === 'string') {
    return interpolate(value, params)
  }

  return key
}

export { locales, translate }
