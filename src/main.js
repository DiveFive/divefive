import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './styles/tokens.css'
import './styles/theme.css'
import './assets/tailwind.css'
import { i18n } from './locales'
import { initSystemTheme } from './composables/useSystemTheme'

initSystemTheme()

createApp(App).use(router).use(i18n).mount('#app')
