<script setup>
import { useI18n } from "vue-i18n";
import { defineComponent, computed } from "vue";
import AppStoreButton from "@/components/AppStoreButton.vue";
import ShowcaseSection from "@/components/ShowcaseSection.vue";

import logo from "@/assets/images/logo.png";
import imgAdd from "@/assets/images/AddNewDive.png";
import imgList from "@/assets/images/DiveLogList.png";
import imgDetail from "@/assets/images/DiveDetail.png";
import imgSite from "@/assets/images/DiveSiteDetail.png";

const { t, tm } = useI18n();

// Iconos
const Icon = defineComponent({
  props: { name: String },
  template: `
    <svg v-if="name==='notebook'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4a2 2 0 0 0-2 2v13h2l2-1 2 1 2-1 2 1 2-1 2 1h2V6a2 2 0 0 0-2-2H6Zm2 4h8v2H8V8Zm0 4h8v2H8v-2Z"/></svg>
    <svg v-else-if="name==='sync'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 9.54 6.8h-2.1A8 8 0 1 1 4 12H1l4 4 4-4H6a6 6 0 1 0 5.72-7.95l.78-1.95A8 8 0 0 1 20 12h3l-4 4-4-4h2a6 6 0 1 0-5.68-8Z"/></svg>
    <svg v-else-if="name==='map'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3 3 5v14l6-2 6 2 6-2V3l-6 2-6-2Zm0 2.62v12.76l6 1.99V7.62L9 5.62Z"/></svg>
    <svg v-else-if="name==='stats'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 20h16v-2H4v2Zm2-4h3V7H6v9Zm5 0h3V4h-3v12Zm5 0h3V10h-3v6Z"/></svg>
  `,
});

// Reactivo al idioma
const features = computed(() => tm("features.items"));
const premiumBenefits = computed(() => tm("premium.benefits"));

// Textos en arrays (reactivos a idioma)
const shots1 = computed(() => [
  { src: imgAdd, caption: t("screens.add") },
  { src: imgList, caption: t("screens.list") },
]);
const shots2 = computed(() => [
  { src: imgDetail, caption: t("screens.detail") },
  { src: imgSite, caption: t("screens.site") },
]);
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="text-center py-20 bg-white text-[#111827] dark:bg-[color:#0A0A0A] dark:text-[color:#F3F4F6]"
    >
      <h1 class="text-5xl font-bold mb-4">{{ t("hero.title") }}</h1>
      <h2 class="text-2xl text-gray-600 dark:text-[color:#D1D5DB] mb-4">
        {{ t("hero.subtitle") }}
      </h2>
      <img :src="logo" alt="DiveFive logo" class="mx-auto h-56 mb-7" />
      <AppStoreButton class="mb-12" />
      <p
        class="text-lg mb-6 max-w-2xl mx-auto text-gray-700 dark:text-[color:#D1D5DB]"
      >
        {{ t("hero.description") }}
      </p>
    </section>

    <!-- Features -->
    <section class="py-16 bg-[color:var(--surface)]">
      <h2 class="text-3xl font-semibold text-center mb-12">
        {{ t("features.title") }}
      </h2>
      <div class="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 px-4">
        <div v-for="(f, idx) in features" :key="idx" class="text-center">
          <!-- Ícono: usa color de marca primario -->
          <Icon
            :name="f.icon"
            class="h-12 w-12 mx-auto mb-4"
            style="color: var(--brand-primary)"
          />
          <h3 class="font-semibold mb-2" style="color: var(--brand-primary)">
            {{ f.title }}
          </h3>
          <p class="text-sm text-[color:var(--content-secondary)]">
            {{ f.desc }}
          </p>
        </div>
      </div>
    </section>

    <!-- Showcase 1 (claro) -->
    <ShowcaseSection
      :title="
        t('showcase.wallpapersTitle', 'Focused logging, beautiful visuals')
      "
      :description="
        t(
          'showcase.wallpapersDesc',
          'Log dives, coordinate maps and keep your data clean and professional.'
        )
      "
      tone="light"
      :shots="shots1"
    />

    <!-- Showcase 2 (claro o invertido) -->
    <ShowcaseSection
      :title="
        t('showcase.superchargeTitle', 'Supercharge your diving workflow')
      "
      :description="
        t(
          'showcase.superchargeDesc',
          'Review dive details and sites to improve with every session.'
        )
      "
      tone="light"
      :reversed="true"
      :shots="shots2"
    />

    <!-- Premium (integrado en Home) -->
    <section
      id="premium"
      class="py-20 bg-white text-[#111827] dark:bg-[color:#0A0A0A] dark:text-[color:#F3F4F6]"
    >
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-3">
          {{ t("premium.title") }}
        </h2>
        <p class="text-center text-gray-600 dark:text-[color:#D1D5DB] mb-10">
          {{ t("premium.subtitle") }}
        </p>

        <!-- Tabla responsive -->
        <div
          class="overflow-x-auto rounded-xl border border-gray-200 dark:border-[color:#1F2937] bg-white dark:bg-[color:#141414]"
        >
          <table class="w-full border-collapse text-left">
            <thead class="bg-gray-50 dark:bg-[color:#141414]">
              <tr class="border-b border-gray-200 dark:border-[color:#1F2937]">
                <th
                  class="p-3 text-sm font-semibold text-gray-600 dark:text-[color:#D1D5DB]"
                ></th>
                <th
                  class="p-3 text-center text-sm font-semibold text-gray-600 dark:text-[color:#D1D5DB]"
                >
                  Free
                </th>
                <th
                  class="p-3 text-center text-sm font-semibold text-gray-600 dark:text-[color:#D1D5DB]"
                >
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(b, idx) in premiumBenefits"
                :key="idx"
                class="border-b last:border-0 border-gray-200 dark:border-[color:#1F2937]"
              >
                <td class="p-3 text-gray-800 dark:text-[color:#F3F4F6]">
                  {{ b }}
                </td>
                <td class="p-3 text-center text-gray-400">✗</td>
                <td class="p-3 text-center text-[color:#FF6600]">✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CTA -->
        <div class="text-center mt-8">
          <!-- Primario light: #003366 / hover #002A55 | dark: #0099FF / hover #0086E6 -->
          <button
            class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[color:#003366] text-white hover:bg-[color:#002A55] dark:bg-[color:#0099FF] dark:hover:bg-[color:#0086E6] font-medium transition"
          >
            {{ t("premium.cta") }}
          </button>
          <!-- O AppStoreButton si prefieres -->
          <!-- <AppStoreButton class="mt-4" /> -->
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="text-center py-16 bg-white dark:bg-[color:#0A0A0A]">
      <AppStoreButton />
    </section>
  </div>
</template>
