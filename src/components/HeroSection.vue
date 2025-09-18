<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'

interface Metric {
  label: string
  value: string
  description: string
}

const { t } = useI18n()

const metrics = computed(() => t('hero.metrics', { returnObjects: true }) as Metric[])

function handlePrimary() {
  const anchor = document.getElementById('learn-more')
  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="section">
    <div class="container stack">
      <div class="surface-card hero-gradient" style="padding: var(--space-3xl)">
        <div class="stack" style="gap: var(--space-xl)">
          <div class="stack-sm">
            <span class="badge">{{ t('hero.kicker') }}</span>
            <h1 class="heading-xl">{{ t('hero.heading') }}</h1>
            <p class="body-lg text-secondary">{{ t('hero.subheading') }}</p>
            <div class="flex" style="display:flex; gap: var(--space-sm); flex-wrap: wrap;">
              <button class="button-primary" type="button" @click="handlePrimary">
                {{ t('hero.primaryCta') }}
              </button>
              <a class="button-secondary" href="https://divefive.app/security" target="_blank" rel="noopener">
                {{ t('hero.secondaryCta') }}
              </a>
            </div>
          </div>

          <div class="grid-3">
            <article v-for="metric in metrics" :key="metric.label" class="metric-card">
              <span class="metric-value">{{ metric.value }}</span>
              <span class="metric-label">{{ metric.label }}</span>
              <p class="metric-description">{{ metric.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
