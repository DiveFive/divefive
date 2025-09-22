<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import AppStoreBadge from '@/components/AppStoreBadge.vue'
import NewFeatures from '@/components/NewFeatures.vue'
import ShowcaseSection from '@/components/ShowcaseSection.vue'
import logo from '@/assets/images/logo.png'
import imgAdd from '@/assets/images/AddNewDive.png'
import imgList from '@/assets/images/DiveLogList.png'
import imgDetail from '@/assets/images/DiveDetail.png'
import imgSite from '@/assets/images/DiveSiteDetail.png'
import { loadContent } from '@/utils/fetchContent'

interface RemoteScreenshot {
  file: string
  alt?: string
}

const { t, tm, locale } = useI18n()

const appCopy = ref<Record<string, { body?: string }>>({})
const screenshots = ref<RemoteScreenshot[]>([])
const DEFAULT_APP_STORE_URL =
  'https://apps.apple.com/mx/app/divefive-be-a-better-diver/id6749786184?l=en-GB'
const appStoreUrl = ref(DEFAULT_APP_STORE_URL)

const fetchContent = async () => {
  const [copyData, screenData, appStoreData] = await Promise.all([
    loadContent('appcopy', locale.value),
    loadContent('screenshots', locale.value),
    loadContent('appstore', locale.value),
  ])

  appCopy.value = copyData && typeof copyData === 'object' ? copyData : {}
  screenshots.value = Array.isArray(screenData) ? screenData : []

  const resolved =
    appStoreData && typeof appStoreData === 'object' && 'url' in appStoreData
      ? String((appStoreData as { url?: string }).url || '')
      : ''
  appStoreUrl.value = resolved.trim() || DEFAULT_APP_STORE_URL
}

onMounted(fetchContent)
watch(() => locale.value, fetchContent)

const heroDescription = computed(() => (appCopy.value['home-hero']?.body ?? '').trim())

const featuresLines = computed(() =>
  (appCopy.value['home-features']?.body ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean),
)
const featuresHeading = computed(() => featuresLines.value[0] || t('features.title'))
const featuresIntro = computed(() => featuresLines.value.slice(1).join(' ').trim())

const fallbackShowcase = computed(() => [
  { title: t('showcase.wallpapersTitle'), description: t('showcase.wallpapersDesc') },
  { title: t('showcase.superchargeTitle'), description: t('showcase.superchargeDesc') },
])

const showcaseSections = computed(() => {
  const blocks = (appCopy.value['home-showcase']?.body ?? '').split(/\n\s*\n/)
  return fallbackShowcase.value.map((fallback, index) => {
    const lines = (blocks[index] ?? '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    const [title, ...rest] = lines
    return {
      title: title || fallback.title,
      description: rest.join(' ').trim() || fallback.description,
    }
  })
})

const premiumSubtitle = computed(
  () => (appCopy.value['premium-copy']?.body ?? '').trim() || t('premium.subtitle'),
)

const features = computed(() => tm('features.items'))
const premiumBenefits = computed(() => tm('premium.benefits'))

const formatFeatureDate = (value?: string) => {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  try {
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(parsed)
  } catch (error) {
    return value
  }
}

const fallbackScreens = computed(() => [
  { src: imgAdd, caption: t('screens.add') },
  { src: imgList, caption: t('screens.list') },
  { src: imgDetail, caption: t('screens.detail') },
  { src: imgSite, caption: t('screens.site') },
])

const localizedScreens = computed(() => {
  const merged = [...fallbackScreens.value]
  screenshots.value.forEach((item, index) => {
    merged[index] = {
      src: item.file,
      caption: item.alt || fallbackScreens.value[index]?.caption || t('screens.title'),
    }
  })
  return merged
})

const shots1 = computed(() => localizedScreens.value.slice(0, 2))
const shots2 = computed(() => localizedScreens.value.slice(2, 4))

const Icon = defineComponent({
  props: { name: { type: String, required: true } },
  template: `
    <svg v-if="name==='notebook'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4a2 2 0 0 0-2 2v13h2l2-1 2 1 2-1 2 1 2-1 2 1h2V6a2 2 0 0 0-2-2H6Zm2 4h8v2H8V8Zm0 4h8v2H8v-2Z"/></svg>
    <svg v-else-if="name==='sync'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 9.54 6.8h-2.1A8 8 0 1 1 4 12H1l4 4 4-4H6a6 6 0 1 0 5.72-7.95l.78-1.95A8 8 0 0 1 20 12h3l-4 4-4-4h2a6 6 0 1 0-5.68-8Z"/></svg>
    <svg v-else-if="name==='map'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3 3 5v14l6-2 6 2 6-2V3l-6 2-6-2Zm0 2.62v12.76l6 1.99V7.62L9 5.62Z"/></svg>
    <svg v-else-if="name==='stats'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 20h16v-2H4v2Zm2-4h3V7H6v9Zm5 0h3V4h-3v12Zm5 0h3V10h-3v6Z"/></svg>
  `,
})

const onCtaHover = (event: MouseEvent) => {
  (event.currentTarget as HTMLButtonElement).style.backgroundColor = '#002A55'
}

const onCtaLeave = (event: MouseEvent) => {
  (event.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--brand-primary)'
}
</script>

<template>
  <div>
    <section class="bg-white py-20 text-center text-[#111827] dark:bg-[color:#0A0A0A] dark:text-[color:#F3F4F6]">
      <h1 class="mb-4 text-5xl font-bold">{{ t('hero.title') }}</h1>
      <h2 class="mb-4 text-2xl text-gray-600 dark:text-[color:#D1D5DB]">
        {{ t('hero.subtitle') }}
      </h2>
      <img :src="logo" :alt="t('app.name')" class="mx-auto mb-7 h-56" />
      <a
        :href="appStoreUrl"
        class="mx-auto mb-10 block w-fit"
        target="_blank"
        rel="noreferrer noopener"
      >
        <AppStoreBadge class="h-12 w-auto" />
      </a>
      <p
        class="mx-auto max-w-2xl whitespace-pre-line text-lg text-gray-700 dark:text-[color:#D1D5DB]"
        v-text="heroDescription"
      />
    </section>

    <section class="bg-[color:var(--surface)] py-16">
      <h2 class="mb-12 text-center text-3xl font-semibold">
        {{ featuresHeading }}
      </h2>
      <p
        v-if="featuresIntro"
        class="mx-auto mb-10 max-w-3xl text-center text-base text-[color:var(--content-secondary)]"
      >
        {{ featuresIntro }}
      </p>
      <div class="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-4">
        <div v-for="(f, idx) in features" :key="idx" class="text-center">
          <Icon
            :name="f.icon"
            class="mx-auto mb-4 h-12 w-12"
            style="color: var(--brand-primary)"
          />
          <h3 class="mb-2 font-semibold" style="color: var(--brand-primary)">
            {{ f.title }}
          </h3>
          <p class="text-sm text-[color:var(--content-secondary)]">
            {{ f.desc }}
          </p>
        </div>
      </div>
    </section>

    <ShowcaseSection
      :title="showcaseSections[0]?.title ?? ''"
      :description="showcaseSections[0]?.description"
      tone="light"
      :shots="shots1"
    />

    <ShowcaseSection
      :title="showcaseSections[1]?.title ?? ''"
      :description="showcaseSections[1]?.description"
      tone="light"
      :reversed="true"
      :shots="shots2"
    />

    <NewFeatures :format-date="formatFeatureDate" class="bg-[color:var(--surface)]" />

    <section id="premium" class="bg-white py-20 text-[#111827] dark:bg-[color:#0A0A0A] dark:text-[color:#F3F4F6]">
      <div class="mx-auto max-w-4xl px-6">
        <h2 class="mb-3 text-center text-3xl font-bold">
          {{ t('premium.title') }}
        </h2>
        <p class="mb-10 text-center text-gray-600 dark:text-[color:#D1D5DB]">
          {{ premiumSubtitle }}
        </p>

        <div class="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-[color:#1F2937] dark:bg-[color:#141414]">
          <table class="w-full border-collapse text-left">
            <thead class="bg-gray-50 dark:bg-[color:#141414]">
              <tr class="border-b border-gray-200 dark:border-[color:#1F2937]">
                <th class="p-3 text-sm font-semibold text-gray-600 dark:text-[color:#D1D5DB]"></th>
                <th class="p-3 text-center text-sm font-semibold text-gray-600 dark:text-[color:#D1D5DB]">
                  {{ t('premium.plans.free') }}
                </th>
                <th class="p-3 text-center text-sm font-semibold text-gray-600 dark:text-[color:#D1D5DB]">
                  {{ t('premium.plans.premium') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(b, idx) in premiumBenefits"
                :key="idx"
                class="border-b border-gray-200 last:border-0 dark:border-[color:#1F2937]"
              >
                <td class="p-3 text-gray-800 dark:text-[color:#F3F4F6]">
                  {{ b }}
                </td>
                <td class="p-3 text-center text-gray-400">✗</td>
                <td class="p-3 text-center text-[color:#FF6600]">✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-8 text-center">
          <button
            class="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white transition"
            style="background-color: var(--brand-primary)"
            @mouseover="onCtaHover"
            @mouseleave="onCtaLeave"
          >
            {{ t('premium.cta') }}
          </button>
        </div>
      </div>
    </section>

    <section class="bg-white py-16 text-center dark:bg-[color:#0A0A0A]">
      <a :href="appStoreUrl" class="mx-auto block w-fit" target="_blank" rel="noreferrer noopener">
        <AppStoreBadge class="h-12 w-auto" />
      </a>
    </section>
  </div>
</template>
