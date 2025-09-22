<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { loadContent } from '@/utils/fetchContent'

interface FeatureItem {
  id: string
  title?: string
  body: string
  date?: string
}

const props = defineProps<{ formatDate?: (value?: string) => string }>()

const { locale, t } = useI18n()
const items = ref<FeatureItem[]>([])

const applyFormat = (value?: string) => {
  if (!value) return ''
  return props.formatDate ? props.formatDate(value) : value
}

const fetchFeatures = async () => {
  const data = await loadContent('features', locale.value)
  if (Array.isArray(data)) {
    items.value = data
      .filter((item): item is FeatureItem => !!item && typeof item === 'object' && 'body' in item)
      .map((item) => ({
        id: String(item.id ?? ''),
        title: typeof item.title === 'string' ? item.title : undefined,
        body: typeof item.body === 'string' ? item.body : '',
        date: typeof item.date === 'string' ? item.date : undefined,
      }))
      .filter((item) => item.body)
  } else {
    items.value = []
  }
}

onMounted(fetchFeatures)
watch(() => locale.value, fetchFeatures)

const heading = computed(() => t('newFeatures.title') || 'New Features')
</script>

<template>
  <section v-if="items.length" v-bind="$attrs" class="py-16">
    <div class="mx-auto max-w-5xl px-6">
      <h2 class="mb-8 text-center text-3xl font-semibold">{{ heading }}</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="item in items"
          :key="item.id"
          class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-left shadow-sm"
        >
          <h3 class="text-xl font-semibold text-[color:var(--content-primary)]">
            {{ item.title || heading }}
          </h3>
          <p v-if="item.date" class="mt-2 text-sm text-[color:var(--content-secondary)]">
            {{ applyFormat(item.date) }}
          </p>
          <div class="mt-4 space-y-3 text-[color:var(--content-secondary)]" v-html="item.body" />
        </article>
      </div>
    </div>
  </section>
</template>
