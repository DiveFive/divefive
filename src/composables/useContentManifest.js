import { ref } from 'vue'

const cache = new Map()

export function useContentManifest(name) {
  const data = ref(null)
  const error = ref(null)
  const ready = ref(false)

  async function load() {
    if (cache.has(name)) {
      data.value = cache.get(name)
      ready.value = true
      return
    }

    if (typeof fetch === 'undefined') {
      error.value = new Error('Fetch is not available in this environment')
      ready.value = true
      return
    }

    try {
      const response = await fetch(`/_data/${name}.json`)
      if (!response.ok) {
        throw new Error(`Unable to load ${name} manifest`)
      }
      const json = await response.json()
      cache.set(name, json)
      data.value = json
    } catch (err) {
      error.value = err
    } finally {
      ready.value = true
    }
  }

  load()

  return { data, error, ready, reload: load }
}
