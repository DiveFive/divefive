<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/images/logo.png'

const logoError = ref(false)
const { t } = useI18n()
</script>

<template>
  <footer class="bg-[color:var(--color-backgroundPrimary)] py-8 text-[color:var(--color-contentMuted)]">
    <div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <div class="flex items-center gap-3">
        <img
          v-if="!logoError"
          :src="logo"
          :alt="t('brand.name')"
          class="h-10"
          @error="logoError = true"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-[color:var(--color-brandPrimary)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        <span class="text-sm">{{ t('footer.tagline') }}</span>
      </div>

      <nav class="flex gap-4 text-sm">
        <RouterLink to="/" class="transition hover:text-[color:var(--color-contentPrimary)]">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/premium" class="transition hover:text-[color:var(--color-contentPrimary)]">{{ t('nav.premium') }}</RouterLink>
        <RouterLink to="/privacy" class="transition hover:text-[color:var(--color-contentPrimary)]">{{ t('nav.privacy') }}</RouterLink>
        <RouterLink to="/press-kit" class="transition hover:text-[color:var(--color-contentPrimary)]">{{ t('nav.pressKit') }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>
