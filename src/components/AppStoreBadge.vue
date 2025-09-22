<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import esLight from '@/assets/images/ESMX/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg'
import esDark from '@/assets/images/ESMX/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_ESMX_RGB_wht_100217.svg'
import frLight from '@/assets/images/FR/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg'
import frDark from '@/assets/images/FR/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_FR_RGB_wht_100217.svg'
import enLight from '@/assets/images/US/Download_on_App_Store/Black_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'
import enDark from '@/assets/images/US/Download_on_App_Store/White_lockup/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg'

import { normalizeLocale } from '@/i18n'
import { useThemeValue } from '@/composables/useSystemTheme'

const { locale } = useI18n()
const theme = useThemeValue()

const sources = {
  en: { light: enLight, dark: enDark },
  'es-MX': { light: esLight, dark: esDark },
  fr: { light: frLight, dark: frDark },
} as const

const labels = {
  en: 'Download on the App Store',
  'es-MX': 'Descargar en el App Store',
  fr: 'Télécharger dans l’App Store',
}

const localeKey = computed(() => normalizeLocale(locale.value))
const current = computed(() => sources[localeKey.value][theme.value === 'dark' ? 'dark' : 'light'])
const label = computed(() => labels[localeKey.value])
</script>

<template>
  <img
    v-bind="$attrs"
    :src="current"
    :alt="label"
    :aria-label="label"
    class="appstore-badge"
  />
</template>
