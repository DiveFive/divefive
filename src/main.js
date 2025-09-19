import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './assets/tailwind.css'
import './styles/tokens.css'
import './styles/theme.css'


createApp(App).use(router).mount('#app')
