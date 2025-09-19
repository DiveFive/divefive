<script setup>
import AppStoreBadge from '@/components/AppStoreBadge.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <section class="relative text-white text-center py-20 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-cyan-900 to-cyan-600"></div>
    <div class="absolute inset-0 opacity-40 mix-blend-overlay" aria-hidden="true">
      <div
        class="absolute -top-32 -right-16 w-80 h-80 rounded-full"
        style="background: radial-gradient(circle at center, var(--color-overlay-soft), transparent 65%);"
      ></div>
      <div
        class="absolute top-40 -left-20 w-96 h-96 rounded-full"
        style="background: radial-gradient(circle at center, var(--color-overlay-soft), transparent 70%);"
      ></div>
      <div
        class="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full"
        style="background: radial-gradient(circle at center, var(--color-overlay-soft), transparent 70%);"
      ></div>
    </div>
    <div class="relative z-10 max-w-2xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('hero.title') }}</h1>
      <p class="mb-6">{{ t('hero.subtitle') }}</p>
      <div class="flex justify-center">
        <AppStoreBadge />
      </div>
    </div>
  </section>
</template>
