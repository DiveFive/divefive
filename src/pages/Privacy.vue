<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { loadContent } from '@/utils/fetchContent'

const { t, locale } = useI18n()
const body = ref('')

const fetchPrivacy = async () => {
  const data = await loadContent('privacy', locale.value)
  body.value = data?.body ?? ''
}

onMounted(fetchPrivacy)
watch(() => locale.value, fetchPrivacy)
</script>

<template>
  <section class="mx-auto max-w-3xl p-8">
    <h1 class="mb-4 text-3xl font-bold">{{ t('legal.privacy') }}</h1>
    <div class="space-y-4 whitespace-pre-line text-[color:var(--content-secondary)]" v-text="body" />
  </section>
</template>
