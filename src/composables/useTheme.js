import { onBeforeUnmount, onMounted, ref } from 'vue'

const STORAGE_KEY = 'divefive:theme'

const selection = ref('system')
const activeMode = ref('light')
const listeners = new Set()

let mediaQuery = null

function resolveMode(next) {
  if (next === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }
  return next
}

function applyTheme(mode) {
  activeMode.value = mode
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', mode)
  }
  notify()
}

function notify() {
  for (const listener of listeners) {
    listener(selection.value, activeMode.value)
  }
}

function persistSelection(value) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch (error) {
    console.warn('DiveFive: unable to persist theme', error)
  }
}

function readStoredSelection() {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
    return null
  } catch (error) {
    console.warn('DiveFive: unable to read theme selection', error)
    return null
  }
}

function setupMediaQueryListener() {
  if (typeof window === 'undefined' || !window.matchMedia) return
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleMediaChange)
}

function teardownMediaQueryListener() {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleMediaChange)
    mediaQuery = null
  }
}

function handleMediaChange() {
  if (selection.value === 'system') {
    applyTheme(resolveMode('system'))
  }
}

export function initTheme() {
  const stored = readStoredSelection()
  if (stored) {
    selection.value = stored
  }
  applyTheme(resolveMode(selection.value))
  setupMediaQueryListener()
}

export function useTheme() {
  const localSelection = ref(selection.value)
  const localMode = ref(activeMode.value)

  const sync = (nextSelection, nextMode) => {
    localSelection.value = nextSelection
    localMode.value = nextMode
  }

  onMounted(() => {
    listeners.add(sync)
    sync(selection.value, activeMode.value)
  })

  onBeforeUnmount(() => {
    listeners.delete(sync)
  })

  return {
    selection: localSelection,
    mode: localMode,
    setTheme: setThemeSelection,
    availableThemes: [
      { value: 'light', labelKey: 'theme.light' },
      { value: 'dark', labelKey: 'theme.dark' },
      { value: 'system', labelKey: 'theme.system' },
    ],
  }
}

export function destroyTheme() {
  teardownMediaQueryListener()
  listeners.clear()
}

export function setThemeSelection(next) {
  selection.value = next
  persistSelection(next)
  applyTheme(resolveMode(next))
}
