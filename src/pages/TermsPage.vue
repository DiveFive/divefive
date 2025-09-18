<script setup lang="ts">
import PageIntro from '@/components/PageIntro.vue'
import MarkdownSection from '@/components/MarkdownSection.vue'
import { useContent } from '@/composables/useContent'

const { document, loading, error } = useContent('legal', 'terms')
</script>

<template>
  <PageIntro titleKey="pages.terms.title" introKey="pages.terms.intro" />
  <MarkdownSection :html="document?.html" :loading="loading" :error="!!error" />
</template>
