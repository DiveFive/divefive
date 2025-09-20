<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const steps = computed(() => tm('steps.items'))
</script>

<template>
  <section class="relative bg-[color:var(--color-surfaceSecondary)] py-20">
    <div
      class="pointer-events-none absolute -top-24 left-1/2 h-48 w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
      :style="{ background: 'radial-gradient(circle, rgba(0,102,204,0.18) 0%, rgba(0,0,0,0) 70%)' }"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl px-4">
      <h2 class="text-center text-3xl font-extrabold tracking-tight text-[color:var(--color-contentPrimary)] md:text-4xl">
        {{ t('steps.title') }}
      </h2>
      <p class="mt-3 text-center text-[color:var(--color-contentMuted)]">
        {{ t('steps.subtitle') }}
      </p>

      <div class="mt-12 grid gap-6 md:grid-cols-3" role="list" :aria-label="t('steps.listLabel')">
        <article
          v-for="(step, idx) in steps"
          :key="idx"
          class="group relative rounded-2xl bg-[color:var(--color-surfacePrimary)] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-elevated)]"
          tabindex="0"
          :aria-label="`${t('steps.stepLabel', { index: idx + 1 })}: ${step}`"
          role="listitem"
        >
          <div class="relative z-10 p-6 text-center md:p-7">
            <span
              class="mb-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-[color:var(--color-brandPrimary)]"
              :style="{ backgroundColor: 'color-mix(in srgb, var(--color-brandPrimary) 18%, transparent)' }"
            >
              {{ idx + 1 }}
            </span>

            <div
              class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--color-surfaceSecondary)] ring-1 ring-[color:var(--color-elevatedRing)] transition-transform duration-300 group-hover:scale-[1.06]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-8 w-8 text-[color:var(--color-brandPrimary)]"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="16" rx="3" />
              </svg>
            </div>

            <p class="text-base leading-7 text-[color:var(--color-contentPrimary)] md:text-lg">
              {{ step }}
            </p>

            <div
              class="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--color-brandAccent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <span
            class="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-[color:var(--color-focusRing)]/0 focus-within:ring-2 focus-within:ring-[color:var(--color-focusRing)] transition duration-300"
            aria-hidden="true"
          />
        </article>
      </div>
    </div>
  </section>
</template>
