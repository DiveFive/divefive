<script setup>
import { useI18n } from 'vue-i18n'
import BuceoImage from '@/assets/images/BuceoImage.png'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden py-20 text-center text-[color:var(--color-actionOnPrimary)]">
    <div class="absolute inset-0 bg-[color:var(--color-brandPrimary)]" aria-hidden="true"></div>
    <img
      :src="BuceoImage"
      :alt="t('hero.backgroundAlt')"
      class="absolute inset-0 h-full w-full object-cover opacity-40"
      @error="e=>e.target.style.display='none'"
    />
    <div class="relative z-10 mx-auto max-w-2xl px-4">
      <h1 class="mb-4 text-4xl font-bold md:text-5xl">{{ t('legacyHero.title') }}</h1>
      <p class="mb-6 text-[color:var(--color-actionOnPrimary)]/80">
        {{ t('legacyHero.description') }}
      </p>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl bg-[color:var(--color-actionSecondary)] px-6 py-3 text-sm font-medium text-[color:var(--color-brandPrimary)] transition hover:bg-[color:var(--color-actionSecondaryHover)]"
      >
        {{ t('legacyHero.cta') }}
      </button>
    </div>
  </section>
</template>
