<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const benefits = computed(() => tm('premium.benefits'))
const plans = computed(() => tm('pricing.plans'))
</script>

<template>
  <section class="mx-auto max-w-4xl px-6 py-16 text-[color:var(--color-contentPrimary)]">
    <h1 class="mb-4 text-center text-3xl font-bold">
      {{ t('premium.title') }}
    </h1>
    <p class="mb-8 text-center text-[color:var(--color-contentMuted)]">
      {{ t('premium.subtitle') }}
    </p>

    <div class="mb-8 overflow-x-auto rounded-xl border border-[color:var(--color-borderSubtle)] bg-[color:var(--color-surfacePrimary)]">
      <table class="w-full border-collapse text-left">
        <thead class="bg-[color:var(--color-surfaceTertiary)]">
          <tr class="border-b border-[color:var(--color-borderSubtle)]">
            <th class="p-3 text-left"></th>
            <th class="p-3 text-center text-[color:var(--color-contentMuted)]">
              {{ plans.free }}
            </th>
            <th class="p-3 text-center text-[color:var(--color-contentMuted)]">
              {{ plans.premium }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(benefit, idx) in benefits"
            :key="idx"
            class="border-b border-[color:var(--color-borderSubtle)] last:border-0"
          >
            <td class="p-3 text-[color:var(--color-contentPrimary)]">{{ benefit }}</td>
            <td class="p-3 text-center text-[color:var(--color-contentMuted)]" aria-hidden="true">✗</td>
            <td class="p-3 text-center text-[color:var(--color-brandAccent)]" aria-hidden="true">✓</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl bg-[color:var(--color-actionPrimary)] px-6 py-3 font-medium text-[color:var(--color-actionOnPrimary)] transition hover:bg-[color:var(--color-actionPrimaryHover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focusRing)]"
      >
        {{ t('premium.cta') }}
      </button>
    </div>
  </section>
</template>
