import { createRouter, createWebHistory } from 'vue-router';
const Layout = () => import('@/views/Layout.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [],
    },
  ],
});

export default router;
