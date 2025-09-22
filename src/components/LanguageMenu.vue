<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { availableLocales, normalizeLocale, setLocale } from '@/i18n'

const { locale, t } = useI18n()

const languages = computed(() =>
  availableLocales.map((code) => ({
    code,
    label: t(`language.options.${code}`),
  }))
)

const isActive = (code: string) => normalizeLocale(locale.value) === code

const displayLabel = (code: string) => {
  if (code.startsWith('en')) return 'EN'
  if (code.startsWith('fr')) return 'FR'
  if (code.startsWith('es')) return 'ES'
  return code.toUpperCase()
}

const handleChange = (code: string) => {
  const normalized = normalizeLocale(code)
  setLocale(normalized)
  locale.value = normalized
}
</script>

<template>
  <div class="flex items-center gap-2" role="group" :aria-label="t('language.label')">
    <button
      v-for="lang in languages"
      :key="lang.code"
      type="button"
      class="rounded-md border px-3 py-1 text-sm font-medium transition"
      :class="
        isActive(lang.code)
          ? 'border-[color:var(--brand-primary)] bg-[color:var(--brand-primary)] text-white'
          : 'border-[color:var(--border)] bg-transparent text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)]'
      "
      :title="lang.label"
      :aria-pressed="isActive(lang.code)"
      :aria-current="isActive(lang.code) ? 'true' : undefined"
      @click="handleChange(lang.code)"
    >
      {{ displayLabel(lang.code) }}
    </button>
  </div>
</template>
