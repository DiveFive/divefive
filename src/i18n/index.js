import { reactive, computed, watchEffect } from 'vue'

import en from './locales/en.json'
import esMX from './locales/es-MX.json'
import fr from './locales/fr.json'

const STORAGE_KEY = 'divefive:lang'
const SUPPORTED = ['en', 'es-MX', 'fr']
const messages = { en, 'es-MX': esMX, fr }

function normalizeLocale(input) {
  if (!input) return 'en'
  const lower = input.toLowerCase()
  if (lower.startsWith('es')) return 'es-MX'
  if (lower.startsWith('fr')) return 'fr'
  return 'en'
}

function detectLocale() {
  if (typeof window === 'undefined') return 'en'
  const params = new URLSearchParams(window.location.search)
  const queryLang = params.get('lang')
  if (queryLang) {
    const normalized = normalizeLocale(queryLang)
    if (SUPPORTED.includes(normalized)) {
      try {
        localStorage.setItem(STORAGE_KEY, normalized)
      } catch (err) {
        console.warn('[i18n] Unable to persist locale', err)
      }
      return normalized
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.includes(stored)) {
      return stored
    }
  } catch (err) {
    console.warn('[i18n] Unable to read stored locale', err)
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    return normalizeLocale(navigator.language)
  }

  return 'en'
}

const state = reactive({
  locale: 'en'
})

state.locale = detectLocale()

function setHtmlLang(lang) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('lang', lang)
}

function translateFrom(messagesObj, keyPath) {
  return keyPath.split('.').reduce((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return acc[segment]
    }
    return undefined
  }, messagesObj)
}

function formatMessage(value, params) {
  if (!params || typeof value !== 'string') return value
  return value.replace(/\{(.*?)\}/g, (_, token) => {
    const trimmed = token.trim()
    if (trimmed in params) {
      return params[trimmed]
    }
    return `{${trimmed}}`
  })
}

function translate(key, params, options = {}) {
  const activeLocale = state.locale
  const fallbackLocale = 'en'
  const localeValue = translateFrom(messages[activeLocale], key)
  const fallbackValue = translateFrom(messages[fallbackLocale], key)
  const value = localeValue ?? fallbackValue

  if (value === undefined) {
    console.warn(`[i18n] Missing translation for key "${key}"`)
    return key
  }

  if (options.returnObjects && typeof value === 'object') {
    return value
  }

  if (typeof value === 'string') {
    return formatMessage(value, params)
  }

  return value
}

function setLocale(newLocale) {
  const normalized = normalizeLocale(newLocale)
  if (!SUPPORTED.includes(normalized)) return
  state.locale = normalized
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, normalized)
    }
  } catch (err) {
    console.warn('[i18n] Unable to persist locale', err)
  }
}

watchEffect(() => {
  setHtmlLang(state.locale)
})

export function useI18n() {
  const locale = computed({
    get: () => state.locale,
    set: value => setLocale(value)
  })

  const t = (key, params, options) => translate(key, params, options)

  return {
    locale,
    availableLocales: Object.freeze([...SUPPORTED]),
    t,
    setLocale
  }
}

export function getLocaleMessages() {
  return messages
}

export function getCurrentLocale() {
  return state.locale
}
