<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/i18n'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '' },
})

const errored = ref(false)
const { t } = useI18n()
const ariaLabel = computed(() => t('home.featureCard.ariaLabel'))
</script>

<template>
  <!-- Contenedor interactivo -->
  <div
    class="group relative rounded-2xl border border-gray-200/60 bg-white/80 dark:bg-gray-900/60 shadow-sm
           transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-cyan-300/50
           focus-within:-translate-y-1 focus-within:shadow-xl focus-within:border-cyan-400/60
           backdrop-blur will-change-transform"
    tabindex="0"
    :aria-label="ariaLabel"
  >
    <!-- Glow sutil al hover -->
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl
             transition-opacity duration-300 group-hover:opacity-100"
      style="background: radial-gradient(40% 40% at 50% 0%, rgba(34,211,238,.15) 0%, rgba(0,0,0,0) 70%);"
    />

    <!-- Contenido -->
    <div class="relative z-10 p-6 text-center">
      <!-- Icono con círculo y animación -->
      <div
        class="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full
               bg-gradient-to-b from-cyan-100 to-cyan-50 dark:from-cyan-900/40 dark:to-cyan-800/30
               ring-1 ring-cyan-100/60 dark:ring-cyan-700/40
               transition-transform duration-300 group-hover:scale-105"
      >
        <img
          v-if="!errored && icon"
          :src="icon"
          alt=""
          class="h-8 w-8 object-contain"
          @error="errored = true"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-8 w-8 text-cyan-500"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      <!-- Título -->
      <h3
        class="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100
               transition-colors group-hover:text-cyan-700 dark:group-hover:text-cyan-300"
      >
        {{ title }}
      </h3>

      <!-- Descripción -->
      <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>

      <!-- Línea de acento al hover -->
      <div
        class="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent
               opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>

    <!-- Anillo de enfoque accesible -->
    <span
      class="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-400/0
             focus-within:ring-2 focus-within:ring-cyan-400/60 transition duration-300"
      aria-hidden="true"
    />
  </div>
</template>

<!-- Opcional: reduce animaciones si el usuario lo prefiere -->
<style>
@media (prefers-reduced-motion: reduce) {
  .group:hover, .group:focus-within {
    transform: none !important;
    box-shadow: none !important;
  }
}
</style>
