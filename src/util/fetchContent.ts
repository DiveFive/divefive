export async function loadContent(
  key: 'privacy' | 'terms' | 'appcopy' | 'screenshots',
  locale: string
) {
  const norm = (value: string) =>
    value.startsWith('es') ? 'es-MX' : value.startsWith('fr') ? 'fr' : 'en'

  const target = norm(locale)
  const response = await fetch(`/_data/${key}.${target}.json`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    if (key === 'screenshots') return []
    return {}
  }

  return response.json()
}
