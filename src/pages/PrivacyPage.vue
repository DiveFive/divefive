<script setup lang="ts">
import PageIntro from '@/components/PageIntro.vue'
import MarkdownSection from '@/components/MarkdownSection.vue'
import { useContent } from '@/composables/useContent'

const { document, loading, error } = useContent('legal', 'privacy')
</script>

<template>
  <PageIntro titleKey="pages.privacy.title" introKey="pages.privacy.intro" />
  <MarkdownSection :html="document?.html" :loading="loading" :error="!!error" />
</template>
