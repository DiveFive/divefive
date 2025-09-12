import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Premium from './pages/Premium.vue'
import PressKit from './pages/PressKit.vue'
import Privacy from './pages/Privacy.vue'
import Terms from './pages/Terms.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/premium', component: Premium },
    { path: '/press-kit', component: PressKit },
    { path: '/privacy', component: Privacy },
    { path: '/terms', component: Terms },
  ],
})
