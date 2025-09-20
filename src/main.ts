import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { installI18n } from './i18n'

const app = createApp(App)

installI18n(app)
app.use(router)

app.mount('#app')
