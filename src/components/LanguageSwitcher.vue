<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { persistLocale, SUPPORTED_LOCALES } from '@/locales'

const { locale, t } = useI18n()

const baseLanguages = [
  { code: 'en', labelKey: 'language.labels.en' },
  { code: 'es-MX', labelKey: 'language.labels.esMX' },
  { code: 'fr', labelKey: 'language.labels.fr' },
]

const languages = computed(() =>
  baseLanguages
    .filter(({ code }) => SUPPORTED_LOCALES.includes(code))
    .map(({ code, labelKey }) => ({ code, label: t(labelKey) }))
)

function changeLang(code) {
  if (SUPPORTED_LOCALES.includes(code)) {
    locale.value = code
    persistLocale(code)
  }
}
</script>

<template>
  <div class="flex gap-2" role="group" :aria-label="t('language.switcherLabel')">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      @click="changeLang(lang.code)"
      class="rounded-md border px-3 py-1 text-sm font-medium transition-colors"
      :class="
        locale === lang.code
          ? 'border-[color:var(--color-actionPrimary)] bg-[color:var(--color-actionPrimary)] text-[color:var(--color-actionOnPrimary)]'
          : 'border-[color:var(--color-borderSubtle)] text-[color:var(--color-contentMuted)] hover:bg-[color:var(--color-actionSecondaryHover)]'
      "
      :aria-pressed="locale === lang.code"
    >
      {{ lang.label }}
    </button>
  </div>
</template>
