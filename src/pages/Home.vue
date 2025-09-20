<script setup>
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppStoreBadge from '@/components/AppStoreBadge.vue'
import ShowcaseSection from '@/components/ShowcaseSection.vue'
import { useContentManifest } from '@/composables/useContentManifest'

import logo from '@/assets/images/logo.png'
import imgAdd from '@/assets/images/AddNewDive.png'
import imgList from '@/assets/images/DiveLogList.png'
import imgDetail from '@/assets/images/DiveDetail.png'
import imgSite from '@/assets/images/DiveSiteDetail.png'

const { t, tm, locale } = useI18n()
const { data: screenshotManifest } = useContentManifest('screenshots')

const Icon = defineComponent({
  props: { name: String },
  template: `
    <svg v-if="name==='notebook'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4a2 2 0 0 0-2 2v13h2l2-1 2 1 2-1 2 1 2-1 2 1h2V6a2 2 0 0 0-2-2H6Zm2 4h8v2H8V8Zm0 4h8v2H8v-2Z"/></svg>
    <svg v-else-if="name==='sync'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 9.54 6.8h-2.1A8 8 0 1 1 4 12H1l4 4 4-4H6a6 6 0 1 0 5.72-7.95l.78-1.95A8 8 0 0 1 20 12h3l-4 4-4-4h2a6 6 0 1 0-5.68-8Z"/></svg>
    <svg v-else-if="name==='map'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3 3 5v14l6-2 6 2 6-2V3l-6 2-6-2Zm0 2.62v12.76l6 1.99V7.62L9 5.62Z"/></svg>
    <svg v-else-if="name==='stats'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 20h16v-2H4v2Zm2-4h3V7H6v9Zm5 0h3V4h-3v12Zm5 0h3V10h-3v6Z"/></svg>
  `,
})

const features = computed(() => tm('features.items'))
const premiumBenefits = computed(() => tm('premium.benefits'))
const planLabels = computed(() => tm('pricing.plans'))

const assetMap = {
  '@/assets/images/AddNewDive.png': imgAdd,
  '@/assets/images/DiveLogList.png': imgList,
  '@/assets/images/DiveDetail.png': imgDetail,
  '@/assets/images/DiveSiteDetail.png': imgSite,
}

const screenshotItems = computed(() => {
  const manifest = screenshotManifest.value?.[locale.value] ?? screenshotManifest.value?.en
  if (!manifest?.length) {
    return [
      { src: imgAdd, caption: t('screens.add') },
      { src: imgList, caption: t('screens.list') },
      { src: imgDetail, caption: t('screens.detail') },
      { src: imgSite, caption: t('screens.site') },
    ]
  }
  return manifest.map((item) => ({
    src: assetMap[item.asset] ?? item.asset,
    caption: item.captionKey ? t(item.captionKey) : '',
  }))
})

const shots1 = computed(() => screenshotItems.value.slice(0, 2))
const shots2 = computed(() => screenshotItems.value.slice(2, 4))
</script>

<template>
  <div>
    <section class="bg-[color:var(--color-surfacePrimary)] py-20 text-center text-[color:var(--color-contentPrimary)]">
      <h1 class="mb-4 text-5xl font-bold tracking-tight">{{ t('hero.title') }}</h1>
      <h2 class="mb-4 text-2xl text-[color:var(--color-contentMuted)]">
        {{ t('hero.subtitle') }}
      </h2>
      <img :src="logo" :alt="t('hero.logoAlt')" class="mx-auto mb-7 h-56" />
      <div class="mb-12 flex justify-center">
        <AppStoreBadge />
      </div>
      <p class="mx-auto max-w-2xl text-lg text-[color:var(--color-contentSecondary)]">
        {{ t('hero.description') }}
      </p>
    </section>

    <section class="bg-[color:var(--color-surfaceSecondary)] py-16">
      <h2 class="mb-12 text-center text-3xl font-semibold text-[color:var(--color-contentPrimary)]">
        {{ t('features.title') }}
      </h2>
      <div class="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-4">
        <div v-for="(f, idx) in features" :key="idx" class="text-center">
          <Icon
            :name="f.icon"
            class="mx-auto mb-4 h-12 w-12 text-[color:var(--color-brandPrimary)]"
          />
          <h3 class="mb-2 font-semibold text-[color:var(--color-brandPrimary)]">
            {{ f.title }}
          </h3>
          <p class="text-sm text-[color:var(--color-contentMuted)]">
            {{ f.desc }}
          </p>
        </div>
      </div>
    </section>

    <ShowcaseSection
      :title="t('showcase.wallpapersTitle')"
      :description="t('showcase.wallpapersDesc')"
      tone="light"
      :shots="shots1"
    />

    <ShowcaseSection
      :title="t('showcase.superchargeTitle')"
      :description="t('showcase.superchargeDesc')"
      tone="light"
      :reversed="true"
      :shots="shots2"
    />

    <section
      id="premium"
      class="bg-[color:var(--color-surfacePrimary)] py-20 text-[color:var(--color-contentPrimary)]"
    >
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="mb-3 text-center text-3xl font-bold">
          {{ t('premium.title') }}
        </h2>
        <p class="mb-10 text-center text-[color:var(--color-contentMuted)]">
          {{ t('premium.subtitle') }}
        </p>

        <div class="overflow-x-auto rounded-xl border border-[color:var(--color-borderSubtle)] bg-[color:var(--color-surfacePrimary)]">
          <table class="w-full border-collapse text-left">
            <thead class="bg-[color:var(--color-surfaceTertiary)]">
              <tr class="border-b border-[color:var(--color-borderSubtle)]">
                <th class="p-3 text-left"></th>
                <th class="p-3 text-center text-[color:var(--color-contentMuted)]">
                  {{ planLabels.free }}
                </th>
                <th class="p-3 text-center text-[color:var(--color-contentMuted)]">
                  {{ planLabels.premium }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(b, idx) in premiumBenefits"
                :key="idx"
                class="border-b border-[color:var(--color-borderSubtle)] last:border-0"
              >
                <td class="p-3 text-[color:var(--color-contentPrimary)]">{{ b }}</td>
                <td class="p-3 text-center text-[color:var(--color-contentMuted)]" aria-hidden="true">✗</td>
                <td class="p-3 text-center text-[color:var(--color-brandAccent)]" aria-hidden="true">✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-8 text-center">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-[color:var(--color-actionPrimary)] px-6 py-3 font-medium text-[color:var(--color-actionOnPrimary)] transition hover:bg-[color:var(--color-actionPrimaryHover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focusRing)]"
          >
            {{ t('premium.cta') }}
          </button>
        </div>
      </div>
    </section>

    <section class="bg-[color:var(--color-surfacePrimary)] py-16 text-center">
      <div class="flex justify-center">
        <AppStoreBadge />
      </div>
    </section>
  </div>
</template>
