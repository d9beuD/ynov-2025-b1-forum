import HomePage from '@/pages/HomePage.vue'
import LoginForm from '@/pages/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => LoginForm,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.loadUser()

  if (to.matched.some((route) => route.meta?.requiresAuth === true && !authStore.isLoggedIn)) {
    return next({ name: 'login' })
  }

  return next()
})

export default router
