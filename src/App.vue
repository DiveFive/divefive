<script setup>
import logo from "@/assets/images/logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import ThemeToggle from "@/components/ThemeToggle.vue"; // 👈 nuevo
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-[color:var(--bg)] text-[color:var(--content-primary)]"
  >
    <!-- Contenido principal -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="border-t bg-[color:var(--surface)] border-[color:var(--border)]">
      <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center space-y-4">
        <span class="text-sm text-[color:var(--content-secondary)]">
          © 2025 DiveFive. All rights reserved.
        </span>

        <nav class="flex space-x-6 text-sm">
          <RouterLink
            to="/"
            class="text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)] transition"
          >DiveFive</RouterLink>
          <RouterLink
            to="/privacy"
            class="text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)] transition"
          >Privacy Policy</RouterLink>
          <RouterLink
            to="/terms"
            class="text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)] transition"
          >Terms of Use</RouterLink>
        </nav>

        <div class="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  </div>
</template>
