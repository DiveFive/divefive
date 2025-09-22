type ContentKey =
  | 'privacy'
  | 'terms'
  | 'appcopy'
  | 'screenshots'
  | 'features'
  | 'appstore'

const normalizeLocale = (value: string) =>
  value.startsWith('es') ? 'es-MX' : value.startsWith('fr') ? 'fr' : 'en'

export async function loadContent(key: ContentKey, locale: string) {
  const base = import.meta.env.BASE_URL?.replace(/\/+$/, '') || ''
  const target = normalizeLocale(locale)
  const url = `${base}/_data/${key}.${target}.json`

  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    if (key === 'screenshots' || key === 'features') return []
    return {}
  }

  return response.json()
}

export { normalizeLocale }
