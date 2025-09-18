import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import FeaturesPage from '@/pages/FeaturesPage.vue'
import FaqPage from '@/pages/FaqPage.vue'
import PrivacyPage from '@/pages/PrivacyPage.vue'
import TermsPage from '@/pages/TermsPage.vue'
import PressKitPage from '@/pages/PressKitPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/features', name: 'features', component: FeaturesPage },
    { path: '/faq', name: 'faq', component: FaqPage },
    { path: '/privacy', name: 'privacy', component: PrivacyPage },
    { path: '/terms', name: 'terms', component: TermsPage },
    { path: '/press-kit', name: 'press-kit', component: PressKitPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
