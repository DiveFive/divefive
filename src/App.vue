<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import LanguageMenu from '@/components/LanguageMenu.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'

useSystemTheme()

const { t } = useI18n()

const footerLinks = computed(() => [
  { to: '/', label: t('Home') },
  { to: '/privacy', label: t('nav.privacy') },
  { to: '/terms', label: t('nav.terms') },
  { to: '/faq', label: t('nav.faq') },
])
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[color:var(--bg)] text-[color:var(--content-primary)]">
    <header class="bg-[color:var(--surface)]">
      <div class="mx-auto flex max-w-5xl justify-end px-4 py-4">
        <LanguageMenu />
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
      </div>
    </footer>
  </div>
</template>
