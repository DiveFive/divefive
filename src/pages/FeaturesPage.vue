<script setup lang="ts">
import PageIntro from '@/components/PageIntro.vue'
import MarkdownSection from '@/components/MarkdownSection.vue'
import { useContent } from '@/composables/useContent'

const { document, loading, error } = useContent('appcopy', 'features')
</script>

<template>
  <PageIntro titleKey="pages.features.title" introKey="pages.features.intro" />
  <MarkdownSection :html="document?.html" :loading="loading" :error="!!error" />
</template>
