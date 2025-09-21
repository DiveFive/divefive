<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { availableLocales, normalizeLocale, setLocale } from '@/i18n'

const { locale, t } = useI18n()

// Lista visible de idiomas (en el orden que prefieras)
const languages = computed(() =>
  availableLocales.map((code) => ({
    code,
    label: t(`language.options.${code}`),
  }))
)

const displayLabel = (code: string) => {
  const c = normalizeLocale(code)
  if (c.startsWith('en')) return 'EN'
  if (c.startsWith('fr')) return 'FR'
  if (c.startsWith('es')) return 'ES'
  return c.toUpperCase()
}

const handleChange = (code: string) => {
  const normalized = normalizeLocale(code)
  setLocale(normalized)
  locale.value = normalized
}

const isActive = (code: string) =>
  normalizeLocale(locale.value) === normalizeLocale(code)
</script>

<template>
  <div class="flex items-center gap-2" role="group" :aria-label="t('language.label')">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      class="rounded-md px-3 py-1 text-sm font-medium transition outline-offset-2"
      :class="[
        // borde siempre visible pero cambia con el estado
        isActive(lang.code)
          ? 'border-[color:var(--actionPrimary)] bg-[color:var(--actionPrimary)] text-[color:var(--contentInverse)]'
          : 'border-[color:var(--border)] bg-transparent text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)]',
        'border'
      ]"
      :title="lang.label"
      :aria-pressed="isActive(lang.code)"
      @click="handleChange(lang.code)"
    >
      {{ displayLabel(lang.code) }}
    </button>
  </div>
</template>
