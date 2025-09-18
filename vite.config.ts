import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const repoBase = 'DiveFive-webapp'
  const isGitHubPages = mode === 'production'

  return {
    base: isGitHubPages ? `/${repoBase}/` : '/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
