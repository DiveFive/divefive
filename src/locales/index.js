import { createI18n } from 'vue-i18n'
import en from './en.json'
import esMX from './es-MX.json'
import fr from './fr.json'

export const SUPPORTED_LOCALES = ['en', 'es-MX', 'fr']
export const DEFAULT_LOCALE = 'en'

const messages = {
  en,
  'es-MX': esMX,
  fr,
}

const STORAGE_KEY = 'locale'

function resolveInitialLocale() {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      return stored
    }

    const [browserLanguage] = window.navigator.language?.split?.('-') ?? []
    if (browserLanguage) {
      if (browserLanguage.toLowerCase().startsWith('es')) {
        return 'es-MX'
      }
      if (browserLanguage.toLowerCase().startsWith('fr')) {
        return 'fr'
      }
    }
  }
  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export function persistLocale(locale) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }
}
