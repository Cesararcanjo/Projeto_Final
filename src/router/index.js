import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Cadastro from '../pages/Cadastro.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guarda de navegação
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userAuthenticated')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router