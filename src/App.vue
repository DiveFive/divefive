<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[color:var(--color-backgroundPrimary)] text-[color:var(--color-contentPrimary)]">
    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="border-t border-[color:var(--color-borderSubtle)] bg-[color:var(--color-surfacePrimary)]">
      <div class="mx-auto flex max-w-5xl flex-col items-center space-y-4 px-4 py-6">
        <span class="text-sm text-[color:var(--color-contentMuted)]">
          {{ t('footer.copyright', { year }) }}
        </span>

        <nav class="flex space-x-6 text-sm">
          <RouterLink
            to="/"
            class="text-[color:var(--color-contentMuted)] transition hover:text-[color:var(--color-contentPrimary)]"
          >{{ t('brand.name') }}</RouterLink>
          <RouterLink
            to="/privacy"
            class="text-[color:var(--color-contentMuted)] transition hover:text-[color:var(--color-contentPrimary)]"
          >{{ t('nav.privacy') }}</RouterLink>
          <RouterLink
            to="/terms"
            class="text-[color:var(--color-contentMuted)] transition hover:text-[color:var(--color-contentPrimary)]"
          >{{ t('nav.terms') }}</RouterLink>
        </nav>

        <div class="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  </div>
</template>
