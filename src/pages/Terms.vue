<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContentManifest } from '@/composables/useContentManifest'

const { t, locale } = useI18n()
const { data, ready, error } = useContentManifest('legal')

const paragraphs = computed(() => {
  const manifest = data.value?.terms ?? {}
  return manifest[locale.value] ?? manifest.en ?? []
})
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="mb-6 text-3xl font-bold text-[color:var(--color-contentPrimary)]">
      {{ t('nav.terms') }}
    </h1>

    <p v-if="error" class="text-[color:var(--color-contentMuted)]">{{ t('content.error') }}</p>
    <p v-else-if="!ready" class="text-[color:var(--color-contentMuted)]">{{ t('content.loading') }}</p>

    <div v-else class="space-y-5 text-[color:var(--color-contentSecondary)]">
      <p v-for="(paragraph, idx) in paragraphs" :key="idx">{{ paragraph }}</p>
    </div>
  </section>
</template>
