const BADGE_MAP = {
  en: {
    light: 'assets/badges/app-store/en/light.svg',
    dark: 'assets/badges/app-store/en/dark.svg',
  },
  'es-MX': {
    light: 'assets/badges/app-store/es-MX/light.svg',
    dark: 'assets/badges/app-store/es-MX/dark.svg',
  },
  fr: {
    light: 'assets/badges/app-store/fr/light.svg',
    dark: 'assets/badges/app-store/fr/dark.svg',
  },
}

function resolveLocale(locale) {
  if (BADGE_MAP[locale]) return locale
  return 'en'
}

export function getAppStoreBadgePath(locale, mode) {
  const resolvedLocale = resolveLocale(locale)
  const path = BADGE_MAP[resolvedLocale][mode]
  const baseEnv = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  const base = baseEnv ?? globalThis.__APP_BASE__ ?? '/'
  return `${base}${path}`
}
