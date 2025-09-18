<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '@/i18n/i18n'
import LanguageMenu from './LanguageMenu.vue'
import ThemeToggle from './ThemeToggle.vue'
import AppStoreBadge from './AppStoreBadge.vue'

const { t } = useI18n()
const route = useRoute()

const navigation = computed(() => [
  { to: '/', name: 'home', labelKey: 'nav.home' },
  { to: '/features', name: 'features', labelKey: 'nav.features' },
  { to: '/faq', name: 'faq', labelKey: 'nav.faq' },
  { to: '/privacy', name: 'privacy', labelKey: 'nav.privacy' },
  { to: '/press-kit', name: 'press-kit', labelKey: 'nav.pressKit' },
])
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink :aria-label="t('app.name')" to="/" class="heading-md">
        {{ t('app.name') }}
      </RouterLink>

      <nav class="primary-nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          :aria-current="route.name === item.name ? 'page' : undefined"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
      </nav>

      <div class="utility-controls" aria-label="Site preferences">
        <LanguageMenu />
        <ThemeToggle />
        <AppStoreBadge />
      </div>
    </div>
  </header>
</template>
