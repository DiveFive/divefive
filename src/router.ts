import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Features from './pages/Features.vue'
import Faq from './pages/Faq.vue'
import Premium from './pages/Premium.vue'
import PressKit from './pages/PressKit.vue'
import Privacy from './pages/Privacy.vue'
import Terms from './pages/Terms.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/features', component: Features },
    { path: '/faq', component: Faq },
    { path: '/premium', component: Premium },
    { path: '/press-kit', component: PressKit },
    { path: '/privacy', component: Privacy },
    { path: '/terms', component: Terms },
  ],
})
