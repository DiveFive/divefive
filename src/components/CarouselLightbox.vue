<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  items: { type: Array, default: () => [] }
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
    <div class="flex overflow-x-auto space-x-4 snap-x pb-4">
      <div v-for="(item, idx) in items" :key="idx" class="snap-start flex-shrink-0">
        <img :src="item.src" :alt="item.alt" class="h-64 w-auto object-cover rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105" @click="show(idx)" />
      </div>
    </div>

    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <button
        class="absolute right-4 top-4 text-2xl text-white"
        type="button"
        :aria-label="t('gallery.close')"
        @click="close"
      >
        {{ items[current].close || '×' }}
      </button>
      <button
        class="absolute left-4 text-2xl text-white"
        type="button"
        :aria-label="t('gallery.prev')"
        @click="prev"
      >
        ‹
      </button>
      <img
        :src="items[current].src"
        :alt="items[current].alt"
        class="max-h-full max-w-full transition-transform"
        :class="zoom ? 'scale-150' : ''"
        :aria-label="t('gallery.zoom')"
        role="img"
        @click="toggleZoom"
      />
      <button
        class="absolute right-4 text-2xl text-white"
        type="button"
        :aria-label="t('gallery.next')"
        @click="next"
      >
        ›
      </button>
    </div>
  </div>
</template>
