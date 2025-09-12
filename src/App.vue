<script setup>
import logo from '@/assets/images/logo.png'
</script>

<template>
  <div class="flex flex-col min-h-screen text-gray-800">
    <!-- Header with navigation -->
    <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
      <RouterLink to="/" class="font-bold text-lg text-cyan-600">DiveFive</RouterLink>
      <nav class="space-x-4">
        <RouterLink to="/" class="hover:text-cyan-600">{{ $t('nav.home') }}</RouterLink>
        <RouterLink to="/premium" class="hover:text-cyan-600">{{ $t('nav.premium') }}</RouterLink>
        <RouterLink to="/press-kit" class="hover:text-cyan-600">{{ $t('nav.pressKit') }}</RouterLink>
        <RouterLink to="/privacy" class="hover:text-cyan-600">{{ $t('nav.privacy') }}</RouterLink>
        <RouterLink to="/terms" class="hover:text-cyan-600">{{ $t('nav.terms') }}</RouterLink>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main class="flex-1">
      <!-- Aquí se cargan las páginas según la ruta -->
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-6">
      <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center">
        <div class="flex items-center mb-4 md:mb-0 space-x-2">
          <img :src="logo" alt="DiveFive logo" class="h-6 w-6" />
          <span>© 2025 DiveFive</span>
        </div>
        <nav class="space-x-4">
          <RouterLink to="/" class="hover:text-white">{{ $t('nav.home') }}</RouterLink>
          <RouterLink to="/premium" class="hover:text-white">{{ $t('nav.premium') }}</RouterLink>
          <RouterLink to="/press-kit" class="hover:text-white">{{ $t('nav.pressKit') }}</RouterLink>
          <RouterLink to="/privacy" class="hover:text-white">{{ $t('nav.privacy') }}</RouterLink>
          <RouterLink to="/terms" class="hover:text-white">{{ $t('nav.terms') }}</RouterLink>
        </nav>
      </div>
    </footer>
  </div>
</template>


<style>
/* Puedes añadir estilos globales aquí si lo necesitas */
</style>
