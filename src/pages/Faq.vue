<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { loadContent } from '@/util/fetchContent'

const { t, locale } = useI18n()
const body = ref('')

const fetchFaq = async () => {
  const data = await loadContent('appcopy', locale.value)
  body.value = data?.faq?.body ?? ''
}

onMounted(fetchFaq)
watch(() => locale.value, fetchFaq)
</script>

<template>
  <section class="mx-auto max-w-3xl p-8">
    <h1 class="mb-4 text-3xl font-bold">{{ t('faq.title') }}</h1>
    <div class="space-y-4 whitespace-pre-line text-[color:var(--content-secondary)]" v-text="body" />
  </section>
</template>
