<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/i18n/i18n'

const { selection, setTheme, availableThemes } = useTheme()
const { t } = useI18n()
const controlId = 'theme-toggle'

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  setTheme(target.value as typeof availableThemes[number]['value'])
}
</script>

<template>
  <label class="visually-hidden" :for="controlId">{{ t('theme.label') }}</label>
  <select
    :id="controlId"
    class="utility-select"
    :value="selection"
    @change="onChange"
    :aria-label="t('theme.label')"
  >
    <option v-for="theme in availableThemes" :key="theme.value" :value="theme.value">
      {{ t(theme.labelKey) }}
    </option>
  </select>
</template>
