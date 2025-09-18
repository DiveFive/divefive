<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'

const props = defineProps<{
  html?: string
  loading?: boolean
  error?: boolean
}>()

const { t } = useI18n()

const stateMessage = computed(() => {
  if (props.loading) return t('state.loading')
  if (props.error) return t('errors.content')
  return ''
})
</script>

<template>
  <section v-if="props.loading || props.error" class="section">
    <div class="container">
      <p class="body-lg text-secondary">{{ stateMessage }}</p>
    </div>
  </section>
  <section v-else class="section">
    <div class="container surface-card">
      <div class="stack-sm" v-html="props.html" />
    </div>
  </section>
</template>
