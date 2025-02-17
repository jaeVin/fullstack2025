import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '../stores/userStore.mjs';

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if ((to.path === '/login' || to.path === '/register') && userStore.isLoggedIn) {
      next('/');
  } else {
      next(); 
  }
});