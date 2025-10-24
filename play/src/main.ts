import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'virtual:uno.css';
import './styles/common.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

const app = createApp(App);

app.use(router);
router.isReady().then(() => {
  app.mount('#app');
});
