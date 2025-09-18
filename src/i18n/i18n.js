import { ref, onMounted, onBeforeUnmount } from 'vue'
import en from './locales/en.js'
import esMX from './locales/es-MX.js'
import fr from './locales/fr.js'

const STORAGE_KEY = 'divefive:locale'
const FALLBACK_LOCALE = 'en'

const resources = {
  en,
  'es-MX': esMX,
  fr,
}

export const supportedLocales = [
  { code: 'en', i18nKey: 'languageMenu.options.en' },
  { code: 'es-MX', i18nKey: 'languageMenu.options.es-MX' },
  { code: 'fr', i18nKey: 'languageMenu.options.fr' },
]

function normaliseLocale(input) {
  if (!input) return null
  const cleaned = input.trim()
  const match = supportedLocales.find(({ code }) => {
    if (code === cleaned) return true
    return cleaned.toLowerCase().startsWith(code.toLowerCase())
  })
  return match ? match.code : null
}

function detectLocaleFromQuery() {
  if (typeof window === 'undefined') return null
  const search = window.location.search ?? ''
  if (!search) return null
  const params = new URLSearchParams(search)
  return normaliseLocale(params.get('lang'))
}

function detectLocaleFromStorage() {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return normaliseLocale(stored)
  } catch (error) {
    console.warn('DiveFive: unable to read locale from storage', error)
    return null
  }
}

function detectLocaleFromNavigator() {
  if (typeof navigator === 'undefined') return null
  const locales = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : navigator.language
    ? [navigator.language]
    : []
  for (const locale of locales) {
    const detected = normaliseLocale(locale)
    if (detected) return detected
  }
  return null
}

class MiniI18Next {
  constructor(map, fallback) {
    this.map = map
    this.fallback = fallback
    this.locale = fallback
    this.listeners = new Set()
  }

  init(initialLocale) {
    this.locale = initialLocale
  }

  get language() {
    return this.locale
  }

  changeLanguage(next) {
    if (!this.map[next]) {
      throw new Error(`Locale ${next} is not supported`)
    }
    if (this.locale === next) return
    this.locale = next
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch (error) {
        console.warn('DiveFive: unable to persist locale', error)
      }
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next
    }
    this.emit()
  }

  t(key, options = {}) {
    const { returnObjects = false, values = {}, defaultValue } = options
    const current = this.resolve(this.locale, key)
    const fallbackValue = this.locale === this.fallback ? undefined : this.resolve(this.fallback, key)
    const value = current ?? fallbackValue ?? defaultValue
    if (value === undefined) {
      return key
    }
    if (typeof value === 'string') {
      return interpolate(value, values)
    }
    if (returnObjects) {
      return deepClone(value)
    }
    return value
  }

  on(event, listener) {
    if (event !== 'languageChanged') return
    this.listeners.add(listener)
  }

  off(event, listener) {
    if (event !== 'languageChanged') return
    this.listeners.delete(listener)
  }

  emit() {
    for (const listener of this.listeners) {
      listener(this.locale)
    }
  }

  resolve(locale, key) {
    const segments = key.split('.')
    let pointer = this.map[locale]
    for (const segment of segments) {
      if (pointer && Object.prototype.hasOwnProperty.call(pointer, segment)) {
        pointer = pointer[segment]
      } else {
        return undefined
      }
    }
    return pointer
  }
}

function interpolate(template, values) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, token) => {
    if (Object.prototype.hasOwnProperty.call(values, token)) {
      return String(values[token])
    }
    return `{{${token}}}`
  })
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

export const i18n = new MiniI18Next(resources, FALLBACK_LOCALE)

export function detectInitialLocale() {
  return (
    detectLocaleFromQuery() ||
    detectLocaleFromStorage() ||
    detectLocaleFromNavigator() ||
    FALLBACK_LOCALE
  )
}

export function initI18n() {
  const locale = detectInitialLocale()
  i18n.init(locale)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
  return locale
}

export function useI18n() {
  const locale = ref(i18n.language)
  const listener = (next) => {
    locale.value = next
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next
    }
  }

  onMounted(() => {
    i18n.on('languageChanged', listener)
  })

  onBeforeUnmount(() => {
    i18n.off('languageChanged', listener)
  })

  return {
    locale,
    t: i18n.t.bind(i18n),
    changeLanguage: (next) => i18n.changeLanguage(next),
    supportedLocales,
  }
}

export function formatLocaleLabel(locale) {
  return String(i18n.t(`languageMenu.options.${locale}`))
}
