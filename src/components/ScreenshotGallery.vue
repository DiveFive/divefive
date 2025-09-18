<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from '@/i18n/i18n'

interface ScreenshotItem {
  filename: string
  src: string
}

const { locale, t } = useI18n()

const items = ref<ScreenshotItem[]>([])
const loading = ref(true)
const hasError = ref(false)

function getBaseUrl() {
  const baseEnv = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
  const testBase = (globalThis as { __APP_BASE__?: string }).__APP_BASE__
  return baseEnv ?? testBase ?? '/'
}

async function fetchScreenshots(currentLocale: string) {
  loading.value = true
  hasError.value = false
  const base = getBaseUrl()
  const url = `${base}_data/screenshots.${currentLocale}.json`
  try {
    const response = await fetch(url, { cache: 'no-cache' })
    if (!response.ok) {
      throw new Error('Failed to load screenshots')
    }
    const payload = await response.json()
    items.value = Array.isArray(payload.items) ? payload.items : []
  } catch (error) {
    if (currentLocale !== 'en') {
      await fetchScreenshots('en')
      return
    }
    console.error('DiveFive screenshots error', error)
    hasError.value = true
    items.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchScreenshots(locale.value)
})

watch(locale, (next) => {
  fetchScreenshots(next)
})
</script>

<template>
  <section class="section surface-muted">
    <div class="container stack">
      <div class="stack-sm" style="text-align: center;">
        <h2 class="heading-lg">{{ t('home.screenshots.title') }}</h2>
        <p class="body-lg text-secondary">{{ t('home.screenshots.caption') }}</p>
      </div>
      <div v-if="loading" class="flex-center" style="min-height: 120px;">
        <p class="body-lg text-secondary">{{ t('state.loading') }}</p>
      </div>
      <div v-else-if="hasError" class="flex-center" style="min-height: 120px;">
        <p class="body-lg text-secondary">{{ t('errors.content') }}</p>
      </div>
      <div v-else class="grid-2" style="gap: var(--space-xl);">
        <figure v-for="item in items" :key="item.filename" class="surface-card" style="overflow: hidden;">
          <img :src="`${getBaseUrl()}${item.src}`" :alt="t('home.screenshots.alt')" />
        </figure>
      </div>
    </div>
  </section>
</template>
