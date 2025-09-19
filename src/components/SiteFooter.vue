<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const navItems = computed(() => [
  { name: 'features', to: '/features' },
  { name: 'faq', to: '/faq' },
  { name: 'privacy', to: '/privacy' },
  { name: 'pressKit', to: '/press-kit' }
].map(item => ({
  ...item,
  label: t(`app.nav.${item.name}`)
})))

const brand = computed(() => t('app.brand'))
const brandLabel = computed(() => t('app.logoAlt'))
const brandInitials = computed(() => {
  const value = brand.value || ''
  const capitalLetters = value.match(/[A-ZÀ-ÖØ-Ý]/g)
  if (capitalLetters && capitalLetters.length >= 2) {
    return capitalLetters.slice(0, 2).join('')
  }
  const alphanumeric = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9]/g, '')
  if (alphanumeric.length >= 2) {
    return alphanumeric.slice(0, 2).toUpperCase()
  }
  return value.slice(0, 2).toUpperCase()
})
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-8">
    <div
      class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center"
    >
      <div
        class="mb-4 md:mb-0 flex items-center gap-3"
        role="img"
        :aria-label="brandLabel"
      >
        <span
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 text-gray-900 font-semibold"
        >
          {{ brandInitials }}
        </span>
        <span class="text-white text-xl font-semibold tracking-wide">{{ brand }}</span>
      </div>
      <nav class="space-x-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="hover:text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>
