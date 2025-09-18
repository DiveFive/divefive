<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'

interface FeatureItem {
  title: string
  description: string
  icon: 'narrative' | 'sensor' | 'site' | 'insight'
}

const { t } = useI18n()

const featureList = computed(() => t('home.featureList', { returnObjects: true }) as {
  title: string
  subtitle: string
  items: FeatureItem[]
})
</script>

<template>
  <section class="section">
    <div class="container stack">
      <div class="stack-sm" style="text-align: center;">
        <h2 class="heading-lg">{{ featureList.title }}</h2>
        <p class="body-lg text-secondary">{{ featureList.subtitle }}</p>
      </div>
      <div class="grid-2">
        <article v-for="item in featureList.items" :key="item.title" class="token-card">
          <div class="flex-center" style="width:48px; height:48px; border-radius: var(--radius-md); background: var(--color-accent-subtle); color: var(--color-accent-strong);">
            <svg v-if="item.icon === 'narrative'" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 4h14v12H9l-4 4V4Z" :fill="'currentColor'" />
            </svg>
            <svg v-else-if="item.icon === 'sensor'" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2a10 10 0 0 1 7.07 17.07l-1.41-1.41A8 8 0 1 0 6.34 6.34L4.93 4.93A10 10 0 0 1 12 2Zm0 5a5 5 0 0 1 3.54 8.54l-1.42-1.42A3 3 0 1 0 9.88 9.88L8.46 8.46A5 5 0 0 1 12 7Z" :fill="'currentColor'" />
            </svg>
            <svg v-else-if="item.icon === 'site'" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2a7 7 0 0 1 7 7c0 4.2-4.2 8.83-6.08 10.65a1.3 1.3 0 0 1-1.84 0C9.2 17.83 5 13.2 5 9a7 7 0 0 1 7-7Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" :fill="'currentColor'" />
            </svg>
            <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 13h4v8H3v-8Zm7-6h4v14h-4V7Zm7-4h4v18h-4V3Z" :fill="'currentColor'" />
            </svg>
          </div>
          <h3 class="heading-md">{{ item.title }}</h3>
          <p class="body-lg text-secondary">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
