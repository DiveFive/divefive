import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

import en from './en.json'
import esMX from './es-MX.json'
import fr from './fr.json'

const LOCALES = ['en', 'es-MX', 'fr'] as const
export type LocaleCode = (typeof LOCALES)[number]
const STORAGE_KEY = 'divefive:locale'

const normalize = (value?: string | null): LocaleCode => {
  if (!value) return 'en'
  const lower = value.toLowerCase()
  if (lower.startsWith('es')) return 'es-MX'
  if (lower.startsWith('fr')) return 'fr'
  return 'en'
}

export const normalizeLocale = (value?: string | null) => normalize(value)

const fromQuery = () => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('lang') || params.get('locale')
}

function resolveInitialLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'en'

  const query = normalize(fromQuery())
  if (fromQuery()) {
    localStorage.setItem(STORAGE_KEY, query)
    return query
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return normalize(stored)

  return normalize(navigator.language)
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'es-MX': esMX,
    fr,
  },
})

i18n.global.locale.value = normalize(i18n.global.locale.value)
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', i18n.global.locale.value)

  watch(
    i18n.global.locale,
    (value) => {
      document.documentElement.setAttribute('lang', normalize(value))
      localStorage.setItem(STORAGE_KEY, normalize(value))
    },
    { immediate: false }
  )
}

export function installI18n(app: App) {
  app.use(i18n)
}

export function setLocale(locale: string) {
  const normalized = normalize(locale)
  i18n.global.locale.value = normalized
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, normalized)
  }
}

export const availableLocales = LOCALES
