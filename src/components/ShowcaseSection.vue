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
    :class="[
      props.tone === 'dark'
        ? 'bg-[color:var(--color-backgroundPrimary)] text-[color:var(--color-contentPrimary)]'
        : 'bg-[color:var(--color-surfacePrimary)] text-[color:var(--color-contentPrimary)]'
    ]"
  >
    <div class="mx-auto max-w-7xl px-6">
      <div
        class="grid items-center gap-10 md:grid-cols-2 md:gap-16"
        :class="props.reversed ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1' : ''"
      >
        <div>
          <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight">{{ props.title }}</h2>
          <p v-if="props.description" class="mt-4 text-lg text-[color:var(--color-contentMuted)]">
            {{ props.description }}
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6">
          <figure v-for="(s,i) in props.shots" :key="i" class="group w-40 sm:w-48 md:w-56">
            <div
              class="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-[color:var(--color-surfaceSecondary)] shadow-lg shadow-[color:var(--color-elevatedRing)] ring-1 ring-[color:var(--color-elevatedRing)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]"
            >
              <div class="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-[color:var(--color-contentMuted)]/10"></div>
              <img
                :src="s.src"
                :alt="s.caption || props.title"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <figcaption class="mt-2 text-center text-sm text-[color:var(--color-contentMuted)]">
              {{ s.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
