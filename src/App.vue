<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import logo from '@/assets/images/logo.png'
import LanguageMenu from '@/components/LanguageMenu.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'

useSystemTheme()

const route = useRoute()
const { t } = useI18n()

const headerLinks = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/features', label: t('nav.features') },
  { to: '/faq', label: t('nav.faq') },
  { to: '/premium', label: t('nav.premium') },
])

const footerLinks = computed(() => [
  { to: '/', label: t('app.name') },
  { to: '/privacy', label: t('nav.privacy') },
  { to: '/terms', label: t('nav.terms') },
])

const isActive = (path: string) => route.path === path
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[color:var(--bg)] text-[color:var(--content-primary)]">
    <header class="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
      <div class="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <RouterLink to="/" class="flex items-center gap-3">
          <img :src="logo" :alt="t('app.name')" class="h-8 w-auto" />
          <span class="text-lg font-semibold text-[color:var(--content-primary)]">{{ t('app.name') }}</span>
        </RouterLink>
        <nav class="hidden items-center gap-6 text-sm font-medium text-[color:var(--content-secondary)] sm:flex">
          <RouterLink
            v-for="link in headerLinks"
            :key="link.to"
            :to="link.to"
            class="transition hover:text-[color:var(--content-primary)]"
            :class="isActive(link.to) ? 'text-[color:var(--content-primary)]' : ''"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
        <LanguageMenu class="sm:ml-4" />
        <nav class="flex flex-wrap gap-4 text-sm font-medium text-[color:var(--content-secondary)] sm:hidden">
          <RouterLink
            v-for="link in headerLinks"
            :key="link.to"
            :to="link.to"
            class="transition hover:text-[color:var(--content-primary)]"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div class="mx-auto flex max-w-5xl flex-col items-center space-y-4 px-4 py-6">
        <span class="text-sm text-[color:var(--content-secondary)]">
          {{ t('app.copyright') }}
        </span>

        <nav class="flex space-x-6 text-sm">
          <RouterLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="transition text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)]"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <LanguageMenu />
      </div>
    </footer>
  </div>
</template>
