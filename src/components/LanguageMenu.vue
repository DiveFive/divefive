<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, type LocaleCode } from '@/i18n/i18n'

const { locale, changeLanguage, supportedLocales, t } = useI18n()
const controlId = 'language-menu'

const options = computed(() =>
  supportedLocales.map((item) => ({ code: item.code, label: t(item.i18nKey) as string })),
)

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  changeLanguage(target.value as LocaleCode)
}
</script>

<template>
  <label class="visually-hidden" :for="controlId">{{ t('languageMenu.label') }}</label>
  <select
    class="utility-select"
    :id="controlId"
    :value="locale"
    @change="onChange"
    :aria-label="t('languageMenu.trigger')"
  >
    <option v-for="item in options" :key="item.code" :value="item.code">
      {{ item.label }}
    </option>
  </select>
</template>
