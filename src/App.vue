<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { useSystemTheme } from '@/composables/useSystemTheme'

useSystemTheme()

const { t, locale, availableLocales, setLocale } = useI18n()

const navItems = computed(() => [
  { name: 'features', to: '/features' },
  { name: 'faq', to: '/faq' },
  { name: 'privacy', to: '/privacy' },
  { name: 'pressKit', to: '/press-kit' }
].map(item => ({
  ...item,
  label: t(`app.nav.${item.name}`)
})))

const languageOptions = computed(() => availableLocales.map(code => ({
  code,
  label: t(`app.language.options.${code}`)
})))

function handleLocaleChange(event) {
  const value = event.target.value
  setLocale(value)
}
</script>

<template>
  <div class="flex flex-col min-h-screen text-gray-800">
    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <RouterLink to="/" class="font-bold text-lg text-cyan-600">
        {{ t('app.brand') }}
      </RouterLink>
      <div class="flex items-center gap-4">
        <nav class="space-x-4">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="hover:text-cyan-600"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
        <label class="sr-only" :for="`lang-select`">{{ t('app.language.ariaLabel') }}</label>
        <select
          id="lang-select"
          :value="locale"
          @change="handleLocaleChange"
          class="border border-gray-200 rounded px-2 py-1 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          :aria-label="t('app.language.ariaLabel')"
        >
          <option v-for="option in languageOptions" :key="option.code" :value="option.code">
            {{ option.label }}
          </option>
        </select>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="bg-gray-900 text-gray-300 py-6">
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center">
        <p class="mb-4 md:mb-0">{{ t('app.footer.copyright') }}</p>
        <nav class="space-x-4">
          <RouterLink
            v-for="item in navItems"
            :key="`footer-${item.to}`"
            :to="item.to"
            class="hover:text-white"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
    </footer>
  </div>
</template>
