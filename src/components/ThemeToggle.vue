<!-- src/components/ThemeToggle.vue -->
<script setup>
import { ref, onMounted } from "vue";

const theme = ref("light");

onMounted(() => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value = saved ?? (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme.value === "dark");
});

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme.value);
  document.documentElement.classList.toggle("dark", theme.value === "dark");
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span v-if="theme === 'dark'">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>
