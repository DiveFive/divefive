<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'
import { useTheme } from '@/composables/useTheme'
import { getAppStoreBadgePath } from '@/utils/appStoreBadge'

const { locale, t } = useI18n()
const { mode } = useTheme()

const badgeSrc = computed(() => getAppStoreBadgePath(locale.value, mode.value))
</script>

<template>
  <a
    class="utility-button"
    href="https://divefive.app/app-store"
    target="_blank"
    rel="noopener"
    :aria-label="t('appStoreBadge.aria')"
  >
    <img :src="badgeSrc" :alt="t('appStoreBadge.alt')" style="height:52px; width:auto" />
  </a>
</template>
