<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'

interface Benefit {
  title: string
  description: string
  icon: 'logbook' | 'plan' | 'community'
}

const { t } = useI18n()

const benefits = computed(() => t('home.benefits', { returnObjects: true }) as Benefit[])
</script>

<template>
  <section class="section surface-muted" id="learn-more">
    <div class="container">
      <div class="grid-3">
        <article v-for="benefit in benefits" :key="benefit.title" class="token-card">
          <div
            class="flex-center"
            style="width:56px; height:56px; border-radius: var(--radius-md); background: var(--color-accent-subtle); color: var(--color-accent-strong);"
          >
            <svg v-if="benefit.icon === 'logbook'" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 4h10a2 2 0 0 1 2 2v12h-2l-3-1-3 1-3-1-3 1H5V6a2 2 0 0 1 2-2Zm1 4v2h8V8H8Zm0 4v2h6v-2H8Z"
                :fill="'currentColor'"
              />
            </svg>
            <svg v-else-if="benefit.icon === 'plan'" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h14v2H5V4Zm0 5h9v2H5V9Zm0 5h14v2H5v-2Zm0 5h9v2H5v-2Z"
                :fill="'currentColor'"
              />
            </svg>
            <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-7 9v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1Z"
                :fill="'currentColor'"
              />
            </svg>
          </div>
          <h3 class="heading-md">{{ benefit.title }}</h3>
          <p class="body-lg text-secondary">{{ benefit.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
