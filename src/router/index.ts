import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/HomeView.vue'),
    // },
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue'),
    },
    // Auth routes
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/auth/SignupView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/auth/ForgotPasswordView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/auth/ResetPasswordView.vue'),
    },
    // User's routes
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import('../views/dashboard/ExpensesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/incomes',
      name: 'incomes',
      component: () => import('../views/dashboard/IncomesView.vue'),
      meta: { requiresAuth: true },
    },
    // Catch all route - 404 Not Found
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/errors/E404View.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  if (!authStore.ready) {
    await authStore.init()
  }

  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
