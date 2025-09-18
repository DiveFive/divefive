<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'

interface StepItem {
  title: string
  description: string
}

const { t } = useI18n()

const steps = computed(() => t('home.steps', { returnObjects: true }) as { title: string; items: StepItem[] })
</script>

<template>
  <section class="section">
    <div class="container stack">
      <div class="stack-sm" style="text-align: center;">
        <h2 class="heading-lg">{{ steps.title }}</h2>
      </div>
      <ol class="list-reset stack" style="gap: var(--space-xl);">
        <li
          v-for="(item, index) in steps.items"
          :key="item.title"
          class="surface-card"
          style="padding: var(--space-xl); position: relative;"
        >
          <span
            style="position:absolute; top: var(--space-xl); left: var(--space-xl); width:40px; height:40px; border-radius: var(--radius-pill); background: var(--color-accent-subtle); color: var(--color-accent-strong); display:flex; align-items:center; justify-content:center; font-weight:700;"
            aria-hidden="true"
          >
            {{ index + 1 }}
          </span>
          <div style="margin-left: 56px;" class="stack-sm">
            <h3 class="heading-md">{{ item.title }}</h3>
            <p class="body-lg text-secondary">{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
