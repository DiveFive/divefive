<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '' },
})

const errored = ref(false)
</script>

<template>
  <div
    class="group relative rounded-2xl border border-[color:var(--color-borderSubtle)] bg-[color:var(--color-surfacePrimary)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-elevated)]"
    tabindex="0"
    :aria-label="title"
  >
    <div class="relative z-10 p-6 text-center">
      <div
        class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surfaceSecondary)] ring-1 ring-[color:var(--color-elevatedRing)] transition-transform duration-300 group-hover:scale-105"
      >
        <img
          v-if="!errored && props.icon"
          :src="props.icon"
          alt=""
          class="h-8 w-8 object-contain"
          @error="errored = true"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-8 w-8 text-[color:var(--color-brandPrimary)]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      <h3 class="text-lg font-semibold tracking-tight text-[color:var(--color-contentPrimary)]">
        {{ props.title }}
      </h3>

      <p class="mt-2 text-sm leading-6 text-[color:var(--color-contentMuted)]">
        {{ props.description }}
      </p>

      <div
        class="mx-auto mt-5 h-px w-12 bg-gradient-to-r from-transparent via-[color:var(--color-brandAccent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
    </div>

    <span
      class="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[color:var(--color-focusRing)]/0 focus-within:ring-2 focus-within:ring-[color:var(--color-focusRing)] transition duration-300"
      aria-hidden="true"
    />
  </div>
</template>
