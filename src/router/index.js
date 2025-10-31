import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import TicketsPage from '../pages/TicketsPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth/login', component: LoginPage },
  { path: '/auth/signup', component: SignupPage },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', component: TicketsPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    const session = localStorage.getItem('ticketapp_session')
    if (!session) return next('/auth/login')
  }
  next()
})

export default router
