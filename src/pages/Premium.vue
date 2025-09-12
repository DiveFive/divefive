<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
const benefits = tm('premium.benefits')
</script>

<template>
  <section class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-4 text-center">{{ t('premium.title') }}</h1>
    <p class="text-center mb-8">{{ t('premium.subtitle') }}</p>

    <table class="w-full mb-8 border-collapse">
      <thead>
        <tr class="border-b">
          <th class="text-left p-2"></th>
          <th class="text-center p-2">Free</th>
          <th class="text-center p-2">Premium</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(b, idx) in benefits" :key="idx" class="border-b">
          <td class="p-2">{{ b }}</td>
          <td class="text-center">✗</td>
          <td class="text-center">✓</td>
        </tr>
      </tbody>
    </table>

    <div class="text-center">
      <button class="bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 focus:outline-none">{{ t('premium.cta') }}</button>
    </div>
  </section>
</template>
