import { onMounted, onBeforeUnmount } from 'vue'

const STORAGE_KEY = 'divefive:theme'
const SUPPORTED = ['light', 'dark']

function applyTheme(theme) {
  const value = SUPPORTED.includes(theme) ? theme : 'light'
  document.documentElement.setAttribute('data-theme', value)
}

function detectTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && SUPPORTED.includes(stored)) {
      return stored
    }
  } catch (err) {
    console.warn('[theme] Unable to read stored theme preference', err)
  }
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  return mq.matches ? 'dark' : 'light'
}

export function useSystemTheme() {
  let mq

  const update = event => {
    const next = event.matches ? 'dark' : 'light'
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (err) {
      console.warn('[theme] Unable to persist theme preference', err)
    }
  }

  onMounted(() => {
    const theme = detectTheme()
    applyTheme(theme)

    mq = window.matchMedia('(prefers-color-scheme: dark)')
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', update)
    } else if (mq && mq.addListener) {
      mq.addListener(update)
    }
  })

  onBeforeUnmount(() => {
    if (mq) {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', update)
      } else if (mq.removeListener) {
        mq.removeListener(update)
      }
    }
  })
}

export function getCurrentTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') || 'light'
}
