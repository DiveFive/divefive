<script setup>
import { computed, reactive, watch } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const iconMap = {
  watch: '/icon-watch.svg',
  map: '/icon-map.svg',
  log: '/icon-log.svg'
}

const localizedSteps = computed(() => {
  const items = t('steps.items', null, { returnObjects: true }) || []
  return items.map(item => ({
    icon: item.icon && iconMap[item.icon] ? iconMap[item.icon] : item.icon,
    text: item.text
  }))
})

const steps = reactive([])

watch(localizedSteps, value => {
  steps.splice(0, steps.length, ...value.map(item => ({ ...item, error: false })))
}, { immediate: true })

const heading = computed(() => t('steps.title'))
const description = computed(() => t('steps.description'))
</script>

<template>
  <section class="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
    <!-- Decor: glow superior muy sutil -->
    <div
      class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[40rem] rounded-full blur-3xl opacity-30
             bg-gradient-to-r from-cyan-400/20 via-sky-400/20 to-blue-400/20"
      aria-hidden="true"
    />

    <div class="relative max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-gray-100">
        {{ heading }}
      </h2>
      <p class="mt-3 text-center text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>

      <div
        class="mt-12 grid gap-6 md:gap-8 md:grid-cols-3"
        role="list"
        aria-label="DiveFive steps"
      >
        <article
          v-for="(step, idx) in steps"
          :key="idx"
          class="group relative rounded-2xl 
                 bg-white/80 dark:bg-gray-900/60 shadow-sm backdrop-blur
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-300/60
                 focus-within:-translate-y-1 focus-within:shadow-xl focus-within:border-cyan-400/70"
          tabindex="0"
          :aria-label="`${idx + 1}. ${step.text}`"
          role="listitem"
        >
          <!-- Halo sutil al hover -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl
                   transition-opacity duration-300 group-hover:opacity-100"
            style="background: radial-gradient(60% 50% at 50% -10%, rgba(34,211,238,.18) 0%, rgba(0,0,0,0) 70%);"
            aria-hidden="true"
          />

          <div class="relative z-10 p-6 md:p-7 text-center">
            <!-- Número -->
            <span
              class="inline-flex items-center justify-center rounded-full text-xs font-semibold
                     text-cyan-900/80 dark:text-cyan-100
                     bg-cyan-100/90 dark:bg-cyan-700/50 ring-1 ring-cyan-200/70 dark:ring-cyan-700/60
                     w-7 h-7 mb-4"
            >
              {{ idx + 1 }}
            </span>

            <!-- Icono en contenedor animado -->
            <div
              class="mx-auto h-14 w-14 mb-4 flex items-center justify-center rounded-xl
                     bg-gradient-to-b from-cyan-50 to-white dark:from-cyan-900/40 dark:to-cyan-800/30
                     ring-1 ring-cyan-100/70 dark:ring-cyan-700/40
                     transition-transform duration-300 group-hover:scale-[1.06]"
            >
              <img
                v-if="!step.error"
                :src="step.icon"
                alt=""
                class="h-8 w-8 object-contain"
                @error="step.error = true"
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-8 w-8 text-cyan-500"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="16" rx="3" />
              </svg>
            </div>

            <!-- Texto del paso -->
            <p class="text-base md:text-lg leading-7 text-gray-800 dark:text-gray-100">
              {{ step.text }}
            </p>

            <!-- Línea decorativa al hover -->
            <div
              class="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                     opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>

          <!-- Anillo de foco accesible -->
          <span
            class="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-400/0
                   focus-within:ring-2 focus-within:ring-cyan-400/60 transition duration-300"
            aria-hidden="true"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style>
@media (prefers-reduced-motion: reduce) {
  .group:hover,
  .group:focus-within {
    transform: none !important;
    box-shadow: none !important;
  }
}
</style>
