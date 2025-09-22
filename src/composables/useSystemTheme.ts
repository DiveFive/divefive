import { onBeforeUnmount, onMounted, ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')

export function useSystemTheme() {
  let mq: MediaQueryList | null = null

  const apply = () => {
    if (typeof window === 'undefined') return
    const matcher = mq ?? window.matchMedia('(prefers-color-scheme: dark)')
    const isDark = matcher.matches
    theme.value = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme.value)
    document.documentElement.classList.toggle('dark', isDark)
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    mq = window.matchMedia('(prefers-color-scheme: dark)')
    apply()
    mq.addEventListener('change', apply)
  })

  onBeforeUnmount(() => {
    mq?.removeEventListener('change', apply)
  })

  return { theme }
}

export function useThemeValue() {
  return theme
}
