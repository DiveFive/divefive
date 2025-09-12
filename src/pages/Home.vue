<script setup>
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue'
import AppStoreButton from '@/components/AppStoreButton.vue'
import ShowcaseSection from '@/components/ShowcaseSection.vue'
import logo from '@/assets/images/logo.png'
import imgAdd from '@/assets/images/AddNewDive.png'
import imgList from '@/assets/images/DiveLogList.png'
import imgDetail from '@/assets/images/DiveDetail.png'
import imgSite from '@/assets/images/DiveSiteDetail.png'

const { t, tm } = useI18n()

const Icon = defineComponent({
  props: { name: String },
  template: `
    <svg v-if="name==='notebook'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4a2 2 0 0 0-2 2v13h2l2-1 2 1 2-1 2 1 2-1 2 1h2V6a2 2 0 0 0-2-2H6Zm2 4h8v2H8V8Zm0 4h8v2H8v-2Z"/></svg>
    <svg v-else-if="name==='sync'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 9.54 6.8h-2.1A8 8 0 1 1 4 12H1l4 4 4-4H6a6 6 0 1 0 5.72-7.95l.78-1.95A8 8 0 0 1 20 12h3l-4 4-4-4h2a6 6 0 1 0-5.68-8Z"/></svg>
    <svg v-else-if="name==='map'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3 3 5v14l6-2 6 2 6-2V3l-6 2-6-2Zm0 2.62v12.76l6 1.99V7.62L9 5.62Z"/></svg>
    <svg v-else-if="name==='stats'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 20h16v-2H4v2Zm2-4h3V7H6v9Zm5 0h3V4h-3v12Zm5 0h3V10h-3v6Z"/></svg>
  `
})

const features = tm('features.items')

const shots1 = [
  { src: imgAdd,    caption: t('screens.add') },
  { src: imgList,   caption: t('screens.list') },
]
const shots2 = [
  { src: imgDetail, caption: t('screens.detail') },
  { src: imgSite,   caption: t('screens.site') },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="text-center py-20">
      <img :src="logo" alt="DiveFive logo" class="mx-auto h-16 mb-6" />
      <h1 class="text-4xl font-bold mb-4">{{ t('hero.title') }}</h1>
      <p class="text-lg mb-6 max-w-2xl mx-auto">{{ t('hero.subtitle') }}</p>
      <AppStoreButton />
    </section>

    <!-- Features (tu bloque existente) -->
    <section class="py-16 bg-gray-100">
      <h2 class="text-3xl font-semibold text-center mb-12">{{ t('features.title') }}</h2>
      <div class="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 px-4">
        <div v-for="(f, idx) in features" :key="idx" class="text-center">
          <Icon :name="f.icon" class="h-12 w-12 mx-auto mb-4 text-cyan-600" />
          <h3 class="font-semibold mb-2">{{ f.title }}</h3>
          <p class="text-sm text-gray-600">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Showcase tipo Widgetsmith -->
    <ShowcaseSection
      :title="t('showcase.wallpapersTitle', 'Focused logging, beautiful visuals')"
      :description="t('showcase.wallpapersDesc', 'Log dives, coordinate maps and keep your data clean and professional.')"
      tone="ocean"
      :shots="shots1"
    />
    <ShowcaseSection
      :title="t('showcase.superchargeTitle', 'Supercharge your diving workflow')"
      :description="t('showcase.superchargeDesc', 'Review dive details and sites to improve with every session.')"
      tone="light"
      :reversed="true"
      :shots="shots2"
    />

    <!-- CTA final -->
    <section class="text-center py-16">
      <AppStoreButton />
      <div class="mt-4 space-x-4 text-sm">
        <RouterLink to="/privacy" class="text-cyan-600 hover:underline">{{ t('nav.privacy') }}</RouterLink>
        <RouterLink to="/terms" class="text-cyan-600 hover:underline">{{ t('nav.terms') }}</RouterLink>
        <RouterLink to="/press-kit" class="text-cyan-600 hover:underline">{{ t('nav.pressKit') }}</RouterLink>
      </div>
    </section>
  </div>
</template>
