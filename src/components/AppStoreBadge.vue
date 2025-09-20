<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import badgeEnLight from '@/assets/images/US/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'
import badgeEnDark from '@/assets/images/US/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg'
import badgeEsLight from '@/assets/images/ESMX/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg'
import badgeEsDark from '@/assets/images/ESMX/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_ESMX_RGB_wht_100217.svg'
import badgeFrLight from '@/assets/images/FR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg'
import badgeFrDark from '@/assets/images/FR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_FR_RGB_wht_100217.svg'

const props = defineProps({
  href: { type: String, default: '#' },
})

const { locale, t } = useI18n()
const currentTheme = ref('light')
let observer
let mediaQuery

const sources = {
  en: { light: badgeEnLight, dark: badgeEnDark },
  'es-MX': { light: badgeEsLight, dark: badgeEsDark },
  fr: { light: badgeFrLight, dark: badgeFrDark },
}

function resolveTheme() {
  const themeAttr = document.documentElement.dataset.theme
  if (themeAttr === 'dark' || themeAttr === 'light') {
    currentTheme.value = themeAttr
    return
  }
  currentTheme.value = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

onMounted(() => {
  resolveTheme()
  observer = new MutationObserver(resolveTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
  mediaQuery?.addEventListener('change', resolveTheme)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  mediaQuery?.removeEventListener('change', resolveTheme)
})

const badge = computed(() => {
  const localeKey = sources[locale.value] ? locale.value : 'en'
  const themeKey = currentTheme.value === 'dark' ? 'dark' : 'light'
  return sources[localeKey][themeKey]
})
</script>

<template>
  <a
    :href="props.href"
    class="inline-flex h-12 items-center"
    rel="noopener"
    :aria-label="t('appStore.badgeAria')"
  >
    <img
      :src="badge"
      :alt="t('appStore.badgeAlt')"
      class="h-full w-auto drop-shadow-sm"
      loading="lazy"
    />
  </a>
</template>
