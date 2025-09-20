<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import AddNewDive from '@/assets/images/AddNewDive.png'
import DiveLogList from '@/assets/images/DiveLogList.png'
import DiveDetail from '@/assets/images/DiveDetail.png'
import DiveSiteDetail from '@/assets/images/DiveSiteDetail.png'

const { t } = useI18n()

const baseScreens = [
  { src: AddNewDive, key: 'screens.add' },
  { src: DiveLogList, key: 'screens.list' },
  { src: DiveDetail, key: 'screens.detail' },
  { src: DiveSiteDetail, key: 'screens.site' },
]

const screenshots = computed(() =>
  baseScreens.map((shot) => ({ src: shot.src, alt: t(shot.key) }))
)

const open = ref(false)
const index = ref(0)
const zoomed = ref(false)

function openLightbox(i) {
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
  index.value = (index.value - 1 + screenshots.value.length) % screenshots.value.length
  zoomed.value = false
}
function next() {
  index.value = (index.value + 1) % screenshots.value.length
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
    <div class="mx-auto max-w-6xl px-4">
      <Swiper
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="true"
        class="h-[400px] w-full rounded-2xl bg-[color:var(--color-surfacePrimary)] shadow-[var(--shadow-soft)]"
      >
        <SwiperSlide v-for="(shot, i) in screenshots" :key="i">
          <div class="flex h-full items-center justify-center overflow-hidden rounded-2xl">
            <img
              :src="shot.src"
              :alt="shot.alt"
              class="max-h-full cursor-zoom-in object-contain transition-transform duration-300 hover:scale-105"
              @click="openLightbox(i)"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      :style="{ backgroundColor: 'var(--overlay-scrim)' }"
      role="dialog"
      aria-modal="true"
      :aria-label="t('screens.lightboxLabel')"
      @click.self="closeLightbox"
    >
      <button
        class="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-actionSecondary)] text-[color:var(--color-contentPrimary)] shadow-sm transition hover:bg-[color:var(--color-actionSecondaryHover)]"
        type="button"
        @click.stop="prev"
        :aria-label="t('carousel.previous')"
      >
        ‹
      </button>

      <button
        class="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-actionSecondary)] text-[color:var(--color-contentPrimary)] shadow-sm transition hover:bg-[color:var(--color-actionSecondaryHover)]"
        type="button"
        @click.stop="next"
        :aria-label="t('carousel.next')"
      >
        ›
      </button>

      <div class="flex max-h-[85vh] w-full max-w-6xl items-center justify-center">
        <img
          :src="screenshots[index].src"
          :alt="screenshots[index].alt"
          class="max-h-[85vh] max-w-full select-none object-contain transition-transform duration-300"
          :class="zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'"
          @click.stop="toggleZoom"
        />
      </div>

      <button
        class="absolute top-4 right-4 rounded-full bg-[color:var(--color-actionSecondary)] px-3 py-1.5 text-sm text-[color:var(--color-contentPrimary)] shadow-sm transition hover:bg-[color:var(--color-actionSecondaryHover)]"
        type="button"
        @click="closeLightbox"
        :aria-label="t('screens.close')"
      >
        {{ t('screens.close') }}
      </button>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
