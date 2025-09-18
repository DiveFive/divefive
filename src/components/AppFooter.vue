<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n/i18n'

const { t } = useI18n()

const navLinks = computed(() => [
  { to: '/features', labelKey: 'footer.links.features' },
  { to: '/faq', labelKey: 'footer.links.faq' },
  { to: '/privacy', labelKey: 'footer.links.privacy' },
  { to: '/press-kit', labelKey: 'footer.links.pressKit' },
])

const legalLinks = computed(() => [
  { to: '/privacy', labelKey: 'footer.legal.privacy' },
  { to: '/terms', labelKey: 'footer.legal.terms' },
])

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container stack">
      <div class="stack-sm">
        <span class="body-lg">{{ t('footer.tagline') }}</span>
        <nav class="footer-nav" aria-label="Footer">
          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to">{{ t(link.labelKey) }}</RouterLink>
        </nav>
      </div>

      <div class="footer-nav" aria-label="Legal">
        <RouterLink v-for="link in legalLinks" :key="link.to" :to="link.to">{{ t(link.labelKey) }}</RouterLink>
      </div>

      <span class="body-sm">{{ t('footer.copyright', { year }) }}</span>
    </div>
  </footer>
</template>
