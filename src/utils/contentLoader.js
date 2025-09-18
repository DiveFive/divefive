const cache = new Map()

function buildKey(type, slug, locale) {
  return `${type}.${slug}.${locale}`
}

function buildUrl(type, slug, locale) {
  const baseEnv = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  const base = baseEnv ?? '/'
  return `${base}_data/${type}.${slug}.${locale}.json`
}

async function fetchDocument(type, slug, locale) {
  const url = buildUrl(type, slug, locale)
  const response = await fetch(url, { cache: 'no-cache' })
  if (!response.ok) {
    throw new Error(`Unable to load content: ${url}`)
  }
  const payload = await response.json()
  return {
    slug,
    locale,
    html: String(payload.html ?? ''),
    meta: {
      title: payload.meta?.title,
      description: payload.meta?.description,
      updated: payload.meta?.updated,
    },
  }
}

export async function loadContent(type, slug, locale, fallback = 'en') {
  const key = buildKey(type, slug, locale)
  if (!cache.has(key)) {
    cache.set(key, fetchDocument(type, slug, locale))
  }
  try {
    return await cache.get(key)
  } catch (error) {
    if (locale !== fallback) {
      const fallbackKey = buildKey(type, slug, fallback)
      if (!cache.has(fallbackKey)) {
        cache.set(fallbackKey, fetchDocument(type, slug, fallback))
      }
      return await cache.get(fallbackKey)
    }
    throw error
  }
}

export function clearContentCache() {
  cache.clear()
}
