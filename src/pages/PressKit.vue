<script setup>
import { useI18n } from 'vue-i18n'
import AppStoreButton from '@/components/AppStoreButton.vue'
import logo from '@/assets/images/logo.png'
const { t, tm } = useI18n()
const brand = tm('brandData')
const store = tm('storeMeta')
</script>

<template>
  <section class="max-w-4xl mx-auto p-8 space-y-12">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">{{ t('pressKit.title') }}</h1>
      <p>{{ t('pressKit.intro') }}</p>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">{{ t('pressKit.brand.heading') }}</h2>
      <ul class="space-y-1">
        <li><strong>{{ t('pressKit.brand.appName') }}:</strong> {{ brand.appName }}</li>
        <li><strong>{{ t('pressKit.brand.bundleId') }}:</strong> {{ brand.bundleId }}</li>
        <li><strong>{{ t('pressKit.brand.website') }}:</strong> {{ brand.website }}</li>
        <li><strong>{{ t('pressKit.brand.supportEmail') }}:</strong> {{ brand.supportEmail }}</li>
        <li><strong>{{ t('pressKit.brand.privacyUrl') }}:</strong> {{ brand.privacyUrl }}</li>
        <li><strong>{{ t('pressKit.brand.supportUrl') }}:</strong> {{ brand.supportUrl }}</li>
        <li><strong>{{ t('pressKit.brand.marketingUrl') }}:</strong> {{ brand.marketingUrl }}</li>
      </ul>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">{{ t('pressKit.meta.heading') }}</h2>
      <ul class="space-y-1">
        <li><strong>{{ t('pressKit.meta.subtitle') }}:</strong> {{ store.subtitle }}</li>
        <li><strong>{{ t('pressKit.meta.promo') }}:</strong> {{ store.promo }}</li>
        <li><strong>{{ t('pressKit.meta.keywords') }}:</strong> {{ store.keywords }}</li>
        <li><strong>{{ t('pressKit.meta.description') }}:</strong> {{ store.description }}</li>
        <li><strong>{{ t('pressKit.meta.releaseNotes') }}:</strong> {{ store.releaseNotes }}</li>
      </ul>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">{{ t('pressKit.assets.heading') }}</h2>
      <div class="mb-4">
        <img :src="logo" alt="Logo" class="h-16 mx-auto" />
      </div>
      <p class="font-semibold">{{ t('pressKit.assets.logo') }}</p>
      <h3 class="mt-4 font-semibold">{{ t('pressKit.assets.usage') }}</h3>
      <p>{{ t('pressKit.assets.usageText') }}</p>
    </div>

    <div class="text-center space-y-4">
      <AppStoreButton />
      <div class="space-x-4 text-sm">
        <RouterLink to="/privacy" class="text-cyan-600 hover:underline">{{ t('pressKit.cta.privacy') }}</RouterLink>
        <RouterLink to="/terms" class="text-cyan-600 hover:underline">{{ t('pressKit.cta.terms') }}</RouterLink>
      </div>
    </div>
  </section>
</template>
