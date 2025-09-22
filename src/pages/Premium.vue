<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const benefits = tm('premium.benefits')

const onHover = (event: MouseEvent) => {
  (event.currentTarget as HTMLButtonElement).style.backgroundColor = '#002A55'
}

const onLeave = (event: MouseEvent) => {
  (event.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--brand-primary)'
}
</script>

<template>
  <section class="mx-auto max-w-4xl p-8 text-[color:var(--content-primary)]">
    <h1 class="mb-4 text-center text-3xl font-bold">
      {{ t('premium.title') }}
    </h1>
    <p class="mb-8 text-center text-[color:var(--content-secondary)]">
      {{ t('premium.subtitle') }}
    </p>

    <div class="mb-8 overflow-x-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]">
      <table class="w-full border-collapse text-left">
        <thead class="bg-[color:var(--surface-2)]">
          <tr class="border-b border-[color:var(--border)]">
            <th class="p-3 text-left"></th>
            <th class="p-3 text-center text-[color:var(--content-secondary)]">
              {{ t('premium.plans.free') }}
            </th>
            <th class="p-3 text-center text-[color:var(--content-secondary)]">
              {{ t('premium.plans.premium') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(b, idx) in benefits"
            :key="idx"
            class="border-b border-[color:var(--border)] last:border-0"
          >
            <td class="p-3">{{ b }}</td>
            <td class="p-3 text-center text-[color:var(--content-secondary)]">✗</td>
            <td class="p-3 text-center text-[color:var(--brand-accent)]">✓</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-center">
      <button
        class="rounded-xl px-6 py-3 text-white transition"
        style="background-color: var(--brand-primary)"
        @mouseover="onHover"
        @mouseleave="onLeave"
      >
        {{ t('premium.cta') }}
      </button>
    </div>
  </section>
</template>
