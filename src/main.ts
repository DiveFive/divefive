import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initI18n } from './i18n/i18n'
import { initTheme } from './composables/useTheme'

import './styles/base.css'

initI18n()
initTheme()

createApp(App).use(router).mount('#app')
