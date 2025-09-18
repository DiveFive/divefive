<script setup lang="ts">
import PageIntro from '@/components/PageIntro.vue'
import MarkdownSection from '@/components/MarkdownSection.vue'
import { useContent } from '@/composables/useContent'

const { document, loading, error } = useContent('appcopy', 'press-kit')
</script>

<template>
  <PageIntro titleKey="pages.pressKit.title" introKey="pages.pressKit.intro" />
  <MarkdownSection :html="document?.html" :loading="loading" :error="!!error" />
</template>
