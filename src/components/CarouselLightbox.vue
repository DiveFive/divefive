<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const current = ref(0)
const open = ref(false)
const zoom = ref(false)

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

    <div v-if="open" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <button class="absolute top-4 right-4 text-white text-2xl" @click="close">{{ items[current].close || '×' }}</button>
      <button class="absolute left-4 text-white text-2xl" @click="prev">‹</button>
      <img :src="items[current].src" :alt="items[current].alt" class="max-h-full max-w-full transition-transform" :class="zoom ? 'scale-150' : ''" @click="toggleZoom" />
      <button class="absolute right-4 text-white text-2xl" @click="next">›</button>
    </div>
  </div>
</template>
