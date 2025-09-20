<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import AppStoreBadge from '@/components/AppStoreBadge.vue'
import logo from '@/assets/images/logo.png'
import { loadContent } from '@/util/fetchContent'

const { t, tm, locale } = useI18n()
const brand = tm('brandData')
const store = tm('storeMeta')

const copy = ref<Record<string, { body: string }>>({})

const fetchCopy = async () => {
  const data = await loadContent('appcopy', locale.value)
  copy.value = data ?? {}
}

onMounted(fetchCopy)
watch(() => locale.value, fetchCopy)

const intro = computed(() => copy.value.presskitIntro?.body ?? '')
const description = computed(() => copy.value.storeDescription?.body ?? '')
const notes = computed(() => copy.value.releaseNotes?.body ?? '')
</script>

<template>
  <section class="mx-auto max-w-4xl space-y-12 p-8">
    <div class="text-center">
      <h1 class="mb-4 text-3xl font-bold">{{ t('pressKit.title') }}</h1>
      <p class="mx-auto max-w-2xl whitespace-pre-line text-[color:var(--content-secondary)]" v-text="intro" />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-semibold">{{ t('pressKit.brand.heading') }}</h2>
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
      <h2 class="mb-4 text-2xl font-semibold">{{ t('pressKit.meta.heading') }}</h2>
      <ul class="space-y-1">
        <li><strong>{{ t('pressKit.meta.subtitle') }}:</strong> {{ store.subtitle }}</li>
        <li><strong>{{ t('pressKit.meta.promo') }}:</strong> {{ store.promo }}</li>
        <li><strong>{{ t('pressKit.meta.keywords') }}:</strong> {{ store.keywords }}</li>
      </ul>
      <div class="mt-4 space-y-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
        <div>
          <h3 class="mb-2 font-semibold">{{ t('pressKit.meta.description') }}</h3>
          <div class="whitespace-pre-line text-sm text-[color:var(--content-secondary)]" v-text="description" />
        </div>
        <div>
          <h3 class="mb-2 font-semibold">{{ t('pressKit.meta.releaseNotes') }}</h3>
          <div class="whitespace-pre-line text-sm text-[color:var(--content-secondary)]" v-text="notes" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-semibold">{{ t('pressKit.assets.heading') }}</h2>
      <div class="mb-4">
        <img :src="logo" :alt="t('app.name')" class="mx-auto h-16" />
      </div>
      <p class="font-semibold">{{ t('pressKit.assets.logo') }}</p>
      <h3 class="mt-4 font-semibold">{{ t('pressKit.assets.usage') }}</h3>
      <p>{{ t('pressKit.assets.usageText') }}</p>
    </div>

    <div class="text-center">
      <AppStoreBadge class="mx-auto h-12 w-auto" />
    </div>
  </section>
</template>
