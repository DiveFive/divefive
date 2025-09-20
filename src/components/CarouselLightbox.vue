<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  items: { type: Array, default: () => [] },
})

const current = ref(0)
const open = ref(false)
const zoom = ref(false)
const { t } = useI18n()

function show(index) {
  current.value = index
  open.value = true
  zoom.value = false
}

function close() {
  open.value = false
  zoom.value = false
}

function next() {
  current.value = (current.value + 1) % props.items.length
}

function prev() {
  current.value = (current.value - 1 + props.items.length) % props.items.length
}

function toggleZoom() {
  zoom.value = !zoom.value
}

function handleKey(e) {
  if (!open.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
</script>

<template>
  <div>
    <div class="flex space-x-4 overflow-x-auto pb-4 snap-x">
      <div v-for="(item, idx) in items" :key="idx" class="flex-shrink-0 snap-start">
        <img
          :src="item.src"
          :alt="item.alt"
          class="h-64 w-auto cursor-pointer rounded-lg object-cover transition-transform duration-300 hover:scale-105"
          @click="show(idx)"
        />
      </div>
    </div>

    <div
      v-if="open && items.length"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      :style="{ backgroundColor: 'var(--overlay-scrim)' }"
      role="dialog"
      aria-modal="true"
    >
      <button
        class="absolute top-4 right-4 rounded-full bg-[color:var(--color-actionSecondary)] px-3 py-1.5 text-[color:var(--color-contentPrimary)] shadow-sm transition hover:bg-[color:var(--color-actionSecondaryHover)]"
        type="button"
        @click="close"
        :aria-label="t('carousel.close')"
      >
        ×
      </button>

      <button
        class="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-actionSecondary)] text-[color:var(--color-contentPrimary)] shadow-sm transition hover:bg-[color:var(--color-actionSecondaryHover)]"
        type="button"
        @click="prev"
        :aria-label="t('carousel.previous')"
      >
        ‹
      </button>

      <div class="flex max-h-[85vh] max-w-5xl items-center justify-center">
        <img
          :src="items[current].src"
          :alt="items[current].alt"
          class="max-h-[85vh] max-w-full select-none object-contain transition-transform duration-300"
          :class="zoom ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'"
          @click="toggleZoom"
        />
      </div>

      <button
        class="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-actionSecondary)] text-[color:var(--color-contentPrimary)] shadow-sm transition hover:bg-[color:var(--color-actionSecondaryHover)]"
        type="button"
        @click="next"
        :aria-label="t('carousel.next')"
      >
        ›
      </button>
    </div>
  </div>
</template>
