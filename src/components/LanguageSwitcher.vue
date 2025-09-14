<!-- src/components/LanguageSwitcher.vue -->
<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

function changeLang(code) {
  locale.value = code;
  localStorage.setItem("locale", code); // recuerda idioma entre sesiones
}
</script>

<template>
  <div class="flex gap-2">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="changeLang(lang.code)"
      class="px-3 py-1 rounded-md text-sm font-medium transition
             border border-gray-300 hover:bg-gray-100
             dark:border-gray-600 dark:hover:bg-gray-800"
      :class="locale === lang.code
        ? 'bg-[#003366] text-white border-[#003366]'
        : 'text-gray-600 dark:text-gray-300'"
    >
      {{ lang.label }}
    </button>
  </div>
</template>
