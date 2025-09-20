<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppStoreBadge from '@/components/AppStoreBadge.vue'
import logo from '@/assets/images/logo.png'
import { useContentManifest } from '@/composables/useContentManifest'

const { t, tm, locale } = useI18n()
const brand = computed(() => tm('brandData'))
const store = computed(() => tm('storeMeta'))

const { data: appcopyData } = useContentManifest('appcopy')

const introCopy = computed(() => {
  const manifest = appcopyData.value?.pressKit?.intro
  const content = manifest?.[locale.value] ?? manifest?.en
  return content ?? [t('pressKit.intro')]
})

const storeDescription = computed(() => {
  const manifest = appcopyData.value?.pressKit?.storeDescription
  const content = manifest?.[locale.value] ?? manifest?.en
  return content ?? [store.value.description]
})

const releaseNotes = computed(() => {
  const manifest = appcopyData.value?.pressKit?.releaseNotes
  const content = manifest?.[locale.value] ?? manifest?.en
  return content ?? [store.value.releaseNotes]
})
</script>

<template>
  <section class="mx-auto max-w-4xl space-y-12 px-6 py-16 text-[color:var(--color-contentPrimary)]">
    <div class="text-center">
      <h1 class="mb-4 text-3xl font-bold">{{ t('pressKit.title') }}</h1>
      <p v-for="(paragraph, idx) in introCopy" :key="`intro-${idx}`" class="text-[color:var(--color-contentSecondary)]">
        {{ paragraph }}
      </p>
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-semibold">{{ t('pressKit.brand.heading') }}</h2>
      <ul class="space-y-2 text-[color:var(--color-contentSecondary)]">
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
      <h2 class="mb-4 text-2xl font-semibold">{{ t('pressKit.meta.heading') }}</h2>
      <ul class="space-y-2 text-[color:var(--color-contentSecondary)]">
        <li><strong>{{ t('pressKit.meta.subtitle') }}:</strong> {{ store.subtitle }}</li>
        <li><strong>{{ t('pressKit.meta.promo') }}:</strong> {{ store.promo }}</li>
        <li><strong>{{ t('pressKit.meta.keywords') }}:</strong> {{ store.keywords }}</li>
        <li>
          <strong>{{ t('pressKit.meta.description') }}:</strong>
          <span class="block whitespace-pre-line">{{ storeDescription.join('\n\n') }}</span>
        </li>
        <li>
          <strong>{{ t('pressKit.meta.releaseNotes') }}:</strong>
          <span class="block whitespace-pre-line">{{ releaseNotes.join('\n\n') }}</span>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-semibold">{{ t('pressKit.assets.heading') }}</h2>
      <div class="mb-4 flex justify-center">
        <img :src="logo" :alt="t('pressKit.assets.logo')" class="h-16" />
      </div>
      <p class="font-semibold text-[color:var(--color-contentPrimary)]">{{ t('pressKit.assets.logo') }}</p>
      <h3 class="mt-4 font-semibold text-[color:var(--color-contentPrimary)]">{{ t('pressKit.assets.usage') }}</h3>
      <p class="text-[color:var(--color-contentSecondary)]">{{ t('pressKit.assets.usageText') }}</p>
    </div>

    <div class="space-y-4 text-center">
      <div class="flex justify-center">
        <AppStoreBadge />
      </div>
      <div class="flex justify-center gap-4 text-sm text-[color:var(--color-brandPrimary)]">
        <RouterLink to="/privacy" class="hover:underline">{{ t('pressKit.cta.privacy') }}</RouterLink>
        <RouterLink to="/terms" class="hover:underline">{{ t('pressKit.cta.terms') }}</RouterLink>
      </div>
    </div>
  </section>
</template>
