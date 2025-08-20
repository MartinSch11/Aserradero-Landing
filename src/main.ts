import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './assets/tailwind.css';
import { initAnalytics } from './utils/analytics';

const app = createApp(App);
app.use(router);
app.mount('#app');

// Analítica
initAnalytics();
