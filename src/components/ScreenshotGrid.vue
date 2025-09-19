<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useLocalizedContent } from '@/composables/useLocalizedContent'
import { useI18n } from '@/i18n'

const { t } = useI18n()
const { data, status } = useLocalizedContent('screenshots')

const open = ref(false)
const index = ref(0)
const zoomed = ref(false)

const screenshots = computed(() => {
  const items = Array.isArray(data.value) ? data.value : []
  return items.map(item => ({
    src: item.file,
    alt: t(`screenshots.alt.${item.slug}`)
  }))
})

const hasScreenshots = computed(() => screenshots.value.length > 0)

const fallbackMessage = computed(() => {
  if (status.value === 'loading') return t('content.loading')
  if (status.value === 'error') return t('content.error')
  return t('content.empty')
})

function openLightbox(i) {
  if (!hasScreenshots.value) return
  index.value = i
  open.value = true
  zoomed.value = false
  document.documentElement.style.overflow = 'hidden'
}

function closeLightbox() {
  open.value = false
  zoomed.value = false
  document.documentElement.style.overflow = ''
}

function toggleZoom() {
  zoomed.value = !zoomed.value
}

function prev() {
  const total = screenshots.value.length
  if (!total) return
  index.value = (index.value - 1 + total) % total
  zoomed.value = false
}

function next() {
  const total = screenshots.value.length
  if (!total) return
  index.value = (index.value + 1) % total
  zoomed.value = false
}

function onKey(e) {
  if (!open.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section class="py-16">
    <div class="max-w-6xl mx-auto px-4">
      <Swiper
        v-if="hasScreenshots"
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="true"
        class="w-full h-[400px] rounded-2xl"
      >
        <SwiperSlide v-for="(shot, i) in screenshots" :key="i">
          <div class=" h-full flex justify-center items-center rounded-2xl overflow-hidden shadow">
            <img
              :src="shot.src"
              :alt="shot.alt"
              class="max-h-full object-contain transition-transform duration-300 hover:scale-105 cursor-zoom-in"
              @click="openLightbox(i)"
              @error="e => (e.target.style.display = 'none')"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <p v-else class="text-center text-gray-600 dark:text-gray-300 py-12">
        {{ fallbackMessage }}
      </p>
    </div>
  </section>

  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="closeLightbox"
      aria-modal="true"
      role="dialog"
      :aria-label="t('lightbox.modalLabel')"
    >
      <button
        class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full w-10 h-10 flex items-center justify-center"
        @click.stop="prev"
        :aria-label="t('lightbox.previous')"
      >
        ‹
      </button>

      <button
        class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full w-10 h-10 flex items-center justify-center"
        @click.stop="next"
        :aria-label="t('lightbox.next')"
      >
        ›
      </button>

      <div class="max-w-6xl max-h-[85vh] w-full flex items-center justify-center">
        <img
          :src="screenshots[index]?.src"
          :alt="screenshots[index]?.alt"
          class="select-none transition-transform duration-300 object-contain max-h-[85vh] max-w-full"
          :class="zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'"
          @click.stop="toggleZoom"
          @error="e => (e.target.style.display = 'none')"
          draggable="false"
        />
      </div>

      <button
        class="absolute top-4 right-4 text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-sm"
        @click="closeLightbox"
        :aria-label="t('lightbox.close')"
      >
        {{ t('lightbox.close') }}
      </button>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
