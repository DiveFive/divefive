export function createTestEnvironment({ locale = 'en', prefersDark = false } = {}) {
  const storage = new Map()

  globalThis.navigator = {
    languages: [locale],
    language: locale,
  }

  globalThis.window = {
    location: { search: '' },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
    },
    matchMedia: () => ({
      matches: prefersDark,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  }

  const metaElements = new Map()

  globalThis.document = {
    documentElement: {
      lang: locale,
      setAttribute: function (attr, value) {
        if (attr === 'data-theme') {
          this.dataset = this.dataset || {}
          this.dataset.theme = value
        }
      },
      getAttribute: function (attr) {
        if (attr === 'data-theme' && this.dataset) {
          return this.dataset.theme
        }
        return undefined
      },
      dataset: {},
    },
    head: {
      appendChild: (el) => {
        metaElements.set(el.__key, el)
      },
    },
    createElement: (tag) => {
      return {
        setAttribute(attr, value) {
          this[attr] = value
          if (attr === 'name' || attr === 'property') {
            this.__key = value
            metaElements.set(this.__key, this)
          }
        },
      }
    },
    querySelector: (selector) => {
      const match = selector.match(/meta\[(name|property)='(.+)'\]/)
      if (!match) return null
      return metaElements.get(match[2]) ?? null
    },
  }

  globalThis.console = globalThis.console || {}
  if (!globalThis.console.warn) {
    globalThis.console.warn = () => {}
  }
  if (!globalThis.console.error) {
    globalThis.console.error = () => {}
  }
}

export function resetTestEnvironment() {
  delete globalThis.window
  delete globalThis.document
  delete globalThis.navigator
}
