import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./pages/Home.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'home', component: Home }],
  scrollBehavior(to, from, saved) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // compensar header fijo
      };
    }
    return saved || { top: 0, behavior: 'smooth' };
  }
});
