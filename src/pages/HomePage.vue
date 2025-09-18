<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import BenefitSection from '@/components/BenefitSection.vue'
import FeatureList from '@/components/FeatureList.vue'
import StepsSection from '@/components/StepsSection.vue'
import ScreenshotGallery from '@/components/ScreenshotGallery.vue'
import MarkdownSection from '@/components/MarkdownSection.vue'
import { useContent } from '@/composables/useContent'

const { document, loading, error } = useContent('appcopy', 'home')
</script>

<template>
  <HeroSection />
  <BenefitSection />
  <FeatureList />
  <StepsSection />
  <ScreenshotGallery />
  <MarkdownSection :html="document?.html" :loading="loading" :error="!!error" />
</template>
