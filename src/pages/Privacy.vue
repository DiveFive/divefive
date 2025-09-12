<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section class="max-w-3xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-4">{{ t('nav.privacy') }}</h1>
    <p class="text-gray-700">This is a placeholder privacy policy. Replace with real content.</p>
  </section>
</template>
