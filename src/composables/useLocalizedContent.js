import { ref, watch, onMounted } from 'vue'
import { useI18n } from '@/i18n'

const cache = new Map()

function buildUrl(resource, locale) {
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}_data/${resource}.${locale}.json`
}

async function loadResource(resource, locale, fallback = 'en') {
  const cacheKey = `${resource}:${locale}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const url = buildUrl(resource, locale)
  const response = await fetch(url, { cache: 'no-cache' })

  if (!response.ok) {
    if (locale !== fallback) {
      return loadResource(resource, fallback, fallback)
    }
    throw new Error(`Unable to load ${resource} for locale ${locale}`)
  }

  const json = await response.json()
  cache.set(cacheKey, json)
  return json
}

export function useLocalizedContent(resource, options = {}) {
  const { locale } = useI18n()
  const data = ref(null)
  const status = ref('idle')
  const error = ref(null)

  const fetchContent = async activeLocale => {
    status.value = 'loading'
    error.value = null
    try {
      const payload = await loadResource(resource, activeLocale, options.fallback || 'en')
      data.value = payload
      status.value = 'ready'
    } catch (err) {
      error.value = err
      status.value = 'error'
    }
  }

  onMounted(() => {
    fetchContent(locale.value)
  })

  watch(locale, value => {
    fetchContent(value)
  })

  return {
    data,
    status,
    error,
    reload: () => fetchContent(locale.value)
  }
}
