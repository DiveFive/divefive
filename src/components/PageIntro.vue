<script setup lang="ts">
import { useI18n } from '@/i18n/i18n'

const props = defineProps<{ titleKey: string; introKey: string }>()
const { t } = useI18n()
</script>

<template>
  <section class="section">
    <div class="container stack-sm">
      <h1 class="heading-lg">{{ t(props.titleKey) }}</h1>
      <p class="body-lg text-secondary">{{ t(props.introKey) }}</p>
    </div>
  </section>
</template>
