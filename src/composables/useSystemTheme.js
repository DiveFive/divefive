const THEME_QUERY = '(prefers-color-scheme: dark)'

let mediaQuery
let initialized = false

function applyTheme(isDark) {
  const theme = isDark ? 'dark' : 'light'
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

function handleChange(event) {
  applyTheme(event.matches)
}

export function initSystemTheme() {
  if (typeof window === 'undefined' || initialized) {
    return
  }

  initialized = true
  mediaQuery = window.matchMedia?.(THEME_QUERY)

  if (mediaQuery) {
    applyTheme(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
  } else {
    applyTheme(false)
  }
}

export function disposeSystemTheme() {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleChange)
  }
  initialized = false
}
