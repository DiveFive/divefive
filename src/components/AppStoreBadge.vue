<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '@/i18n'
import { getCurrentTheme } from '@/composables/useSystemTheme'

const BADGE_SVGS = {
  en: {
    light: String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60" role="img">
  <rect width="180" height="60" rx="12" fill="#000000" />
  <g fill="#ffffff" font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif">
    <path d="M38.58 18.03c2.15-2.62 5.29-4.11 8.35-3.99.68 3.1-.57 6.3-2.63 8.7-1.98 2.54-4.9 4.1-7.89 3.87-.74-2.96.83-6.48 2.17-8.58Zm15.47 27.58c-2.52 3.73-5.11 7.43-9.19 7.51-4.03.08-5.33-2.43-9.93-2.43s-6.06 2.36-9.87 2.5c-3.95.14-6.96-4.03-9.53-7.72-5.19-7.55-9.16-21.33-3.82-30.7 2.63-4.55 7.3-7.45 12.41-7.53 3.87-.08 7.54 2.62 9.93 2.62 2.38 0 6.83-3.24 11.54-2.76 1.96.08 7.45.78 10.98 5.94-.28.18-6.55 3.82-6.47 11.4.08 9.06 7.94 12.04 8.01 12.08Z" transform="translate(18 4)" />
    <text x="78" y="28" font-size="12" text-anchor="start">Download on the</text>
    <text x="78" y="45" font-size="20" font-weight="600" text-anchor="start">App Store</text>
  </g>
</svg>`,
    dark: String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60" role="img">
  <rect width="180" height="60" rx="12" fill="#ffffff" stroke="#000000" stroke-width="1" />
  <g fill="#000000" font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif">
    <path d="M38.58 18.03c2.15-2.62 5.29-4.11 8.35-3.99.68 3.1-.57 6.3-2.63 8.7-1.98 2.54-4.9 4.1-7.89 3.87-.74-2.96.83-6.48 2.17-8.58Zm15.47 27.58c-2.52 3.73-5.11 7.43-9.19 7.51-4.03.08-5.33-2.43-9.93-2.43s-6.06 2.36-9.87 2.5c-3.95.14-6.96-4.03-9.53-7.72-5.19-7.55-9.16-21.33-3.82-30.7 2.63-4.55 7.3-7.45 12.41-7.53 3.87-.08 7.54 2.62 9.93 2.62 2.38 0 6.83-3.24 11.54-2.76 1.96.08 7.45.78 10.98 5.94-.28.18-6.55 3.82-6.47 11.4.08 9.06 7.94 12.04 8.01 12.08Z" transform="translate(18 4)" />
    <text x="78" y="28" font-size="12" text-anchor="start">Download on the</text>
    <text x="78" y="45" font-size="20" font-weight="600" text-anchor="start">App Store</text>
  </g>
</svg>`
  },
  'es-MX': {
    light: String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60" role="img">
  <rect width="180" height="60" rx="12" fill="#000000" />
  <g fill="#ffffff" font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif">
    <path d="M38.58 18.03c2.15-2.62 5.29-4.11 8.35-3.99.68 3.1-.57 6.3-2.63 8.7-1.98 2.54-4.9 4.1-7.89 3.87-.74-2.96.83-6.48 2.17-8.58Zm15.47 27.58c-2.52 3.73-5.11 7.43-9.19 7.51-4.03.08-5.33-2.43-9.93-2.43s-6.06 2.36-9.87 2.5c-3.95.14-6.96-4.03-9.53-7.72-5.19-7.55-9.16-21.33-3.82-30.7 2.63-4.55 7.3-7.45 12.41-7.53 3.87-.08 7.54 2.62 9.93 2.62 2.38 0 6.83-3.24 11.54-2.76 1.96.08 7.45.78 10.98 5.94-.28.18-6.55 3.82-6.47 11.4.08 9.06 7.94 12.04 8.01 12.08Z" transform="translate(18 4)" />
    <text x="78" y="28" font-size="12" text-anchor="start">Descargar en el</text>
    <text x="78" y="45" font-size="20" font-weight="600" text-anchor="start">App Store</text>
  </g>
</svg>`,
    dark: String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60" role="img">
  <rect width="180" height="60" rx="12" fill="#ffffff" stroke="#000000" stroke-width="1" />
  <g fill="#000000" font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif">
    <path d="M38.58 18.03c2.15-2.62 5.29-4.11 8.35-3.99.68 3.1-.57 6.3-2.63 8.7-1.98 2.54-4.9 4.1-7.89 3.87-.74-2.96.83-6.48 2.17-8.58Zm15.47 27.58c-2.52 3.73-5.11 7.43-9.19 7.51-4.03.08-5.33-2.43-9.93-2.43s-6.06 2.36-9.87 2.5c-3.95.14-6.96-4.03-9.53-7.72-5.19-7.55-9.16-21.33-3.82-30.7 2.63-4.55 7.3-7.45 12.41-7.53 3.87-.08 7.54 2.62 9.93 2.62 2.38 0 6.83-3.24 11.54-2.76 1.96.08 7.45.78 10.98 5.94-.28.18-6.55 3.82-6.47 11.4.08 9.06 7.94 12.04 8.01 12.08Z" transform="translate(18 4)" />
    <text x="78" y="28" font-size="12" text-anchor="start">Descargar en el</text>
    <text x="78" y="45" font-size="20" font-weight="600" text-anchor="start">App Store</text>
  </g>
</svg>`
  },
  fr: {
    light: String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60" role="img">
  <rect width="180" height="60" rx="12" fill="#000000" />
  <g fill="#ffffff" font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif">
    <path d="M38.58 18.03c2.15-2.62 5.29-4.11 8.35-3.99.68 3.1-.57 6.3-2.63 8.7-1.98 2.54-4.9 4.1-7.89 3.87-.74-2.96.83-6.48 2.17-8.58Zm15.47 27.58c-2.52 3.73-5.11 7.43-9.19 7.51-4.03.08-5.33-2.43-9.93-2.43s-6.06 2.36-9.87 2.5c-3.95.14-6.96-4.03-9.53-7.72-5.19-7.55-9.16-21.33-3.82-30.7 2.63-4.55 7.3-7.45 12.41-7.53 3.87-.08 7.54 2.62 9.93 2.62 2.38 0 6.83-3.24 11.54-2.76 1.96.08 7.45.78 10.98 5.94-.28.18-6.55 3.82-6.47 11.4.08 9.06 7.94 12.04 8.01 12.08Z" transform="translate(18 4)" />
    <text x="78" y="28" font-size="12" text-anchor="start">Télécharger dans l’</text>
    <text x="78" y="45" font-size="20" font-weight="600" text-anchor="start">App Store</text>
  </g>
</svg>`,
    dark: String.raw`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="60" viewBox="0 0 180 60" role="img">
  <rect width="180" height="60" rx="12" fill="#ffffff" stroke="#000000" stroke-width="1" />
  <g fill="#000000" font-family="'SF Pro Display', 'Helvetica Neue', Arial, sans-serif">
    <path d="M38.58 18.03c2.15-2.62 5.29-4.11 8.35-3.99.68 3.1-.57 6.3-2.63 8.7-1.98 2.54-4.9 4.1-7.89 3.87-.74-2.96.83-6.48 2.17-8.58Zm15.47 27.58c-2.52 3.73-5.11 7.43-9.19 7.51-4.03.08-5.33-2.43-9.93-2.43s-6.06 2.36-9.87 2.5c-3.95.14-6.96-4.03-9.53-7.72-5.19-7.55-9.16-21.33-3.82-30.7 2.63-4.55 7.3-7.45 12.41-7.53 3.87-.08 7.54 2.62 9.93 2.62 2.38 0 6.83-3.24 11.54-2.76 1.96.08 7.45.78 10.98 5.94-.28.18-6.55 3.82-6.47 11.4.08 9.06 7.94 12.04 8.01 12.08Z" transform="translate(18 4)" />
    <text x="78" y="28" font-size="12" text-anchor="start">Télécharger dans l’</text>
    <text x="78" y="45" font-size="20" font-weight="600" text-anchor="start">App Store</text>
  </g>
</svg>`
  }
}

function toDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const badgeMap = {
  en: {
    light: toDataUri(BADGE_SVGS.en.light),
    dark: toDataUri(BADGE_SVGS.en.dark)
  },
  'es-MX': {
    light: toDataUri(BADGE_SVGS['es-MX'].light),
    dark: toDataUri(BADGE_SVGS['es-MX'].dark)
  },
  fr: {
    light: toDataUri(BADGE_SVGS.fr.light),
    dark: toDataUri(BADGE_SVGS.fr.dark)
  }
}

const { locale, t } = useI18n()
const theme = ref(getCurrentTheme())
let observer

function normalizeLocale(value) {
  if (!value) return 'en'
  if (value.startsWith('es')) return 'es-MX'
  if (value.startsWith('fr')) return 'fr'
  return 'en'
}

onMounted(() => {
  observer = new MutationObserver(() => {
    theme.value = getCurrentTheme()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
  theme.value = getCurrentTheme()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

const activeLocale = computed(() => normalizeLocale(locale.value))

const src = computed(() => {
  const currentTheme = theme.value === 'dark' ? 'dark' : 'light'
  return badgeMap[activeLocale.value][currentTheme]
})

const label = computed(() => t(`appStore.alt.${activeLocale.value}`))
</script>

<template>
  <img
    :src="src"
    :alt="label"
    :aria-label="label"
    class="h-12 w-auto object-contain"
    loading="lazy"
  />
</template>
