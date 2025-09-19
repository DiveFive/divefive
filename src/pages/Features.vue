<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import { useLocalizedContent } from '@/composables/useLocalizedContent'
import { markdownToHtml } from '@/utils/markdown'

const { t } = useI18n()
const { data, status } = useLocalizedContent('appcopy')

const markdown = computed(() => data.value?.features?.body ?? '')
const rendered = computed(() => markdownToHtml(markdown.value))
</script>

<template>
  <div class="p-8 space-y-6 text-gray-700 dark:text-gray-200">
    <div>
      <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{{ t('pages.features.title') }}</h1>
      <p class="text-gray-600 dark:text-gray-300">{{ t('pages.features.summary') }}</p>
    </div>
    <div v-if="markdown" class="space-y-4 leading-relaxed" v-html="rendered"></div>
    <p v-else class="text-gray-500 dark:text-gray-400">
      {{ status === 'loading' ? t('content.loading') : t('content.error') }}
    </p>
  </div>
</template>
