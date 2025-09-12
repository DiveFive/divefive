<script setup lang="ts">
interface Shot { src: string; caption?: string }
const props = withDefaults(defineProps<{
  title: string
  description?: string
  shots: Shot[]
  tone?: 'ocean' | 'light' | 'dark'
  reversed?: boolean
}>(), { tone: 'ocean', reversed: false })
</script>

<template>
  <section
    class="py-16 md:py-24"
    :class="{
      'bg-[#00ACC1] text-white': tone==='ocean',
      'bg-[#F3F7FB] text-gray-900': tone==='light',
      'bg-gray-900 text-gray-100': tone==='dark'
    }"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div
        class="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        :class="reversed ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1' : ''"
      >
        <div>
          <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight">{{ title }}</h2>
          <p v-if="description" class="mt-4 text-lg opacity-90">{{ description }}</p>
        </div>

        <div class="flex flex-wrap justify-center gap-6">
          <figure v-for="(s,i) in shots" :key="i" class="group w-40 sm:w-48 md:w-56">
            <div
              class="relative aspect-[9/19.5] rounded-[2rem] ring-1 ring-black/10 shadow-xl overflow-hidden
                     bg-gradient-to-b from-white/85 to-white/70 dark:from-white/10 dark:to-white/5
                     transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]"
            >
              <div class="absolute left-1/2 -translate-x-1/2 top-1.5 h-4 w-20 rounded-full bg-black/10 dark:bg-white/15"></div>
              <img :src="s.src" :alt="s.caption || title"
                   class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                   loading="lazy" />
            </div>
            <figcaption class="mt-2 text-center text-sm opacity-90">{{ s.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
