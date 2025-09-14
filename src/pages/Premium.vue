<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const benefits = tm('premium.benefits')
</script>

<template>
  <section class="max-w-4xl mx-auto p-8 text-[color:var(--content-primary)]">
    <!-- Título -->
    <h1 class="text-3xl font-bold mb-4 text-center">
      {{ t('premium.title') }}
    </h1>
    <p class="text-center mb-8 text-[color:var(--content-secondary)]">
      {{ t('premium.subtitle') }}
    </p>

    <!-- Tabla comparativa -->
    <div
      class="overflow-x-auto rounded-xl border mb-8 border-[color:var(--border)] bg-[color:var(--surface)]"
    >
      <table class="w-full border-collapse text-left">
        <thead class="bg-[color:var(--surface-2)]">
          <tr class="border-b border-[color:var(--border)]">
            <th class="text-left p-3"></th>
            <th class="text-center p-3 text-[color:var(--content-secondary)]">
              Free
            </th>
            <th class="text-center p-3 text-[color:var(--content-secondary)]">
              Premium
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(b, idx) in benefits"
            :key="idx"
            class="border-b last:border-0 border-[color:var(--border)]"
          >
            <td class="p-3">{{ b }}</td>
            <td
              class="text-center p-3 text-[color:var(--content-secondary)]"
            >
              ✗
            </td>
            <td
              class="text-center p-3 text-[color:var(--brand-accent)]"
            >
              ✓
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CTA -->
    <div class="text-center">
      <button
        class="px-6 py-3 rounded-xl text-white transition"
        style="background-color: var(--brand-primary)"
        @mouseover="e => e.target.style.backgroundColor = '#002A55'"
        @mouseleave="e => e.target.style.backgroundColor = 'var(--brand-primary)'"
      >
        {{ t('premium.cta') }}
      </button>
    </div>
  </section>
</template>
