import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import * as ElementPlusPro from '@element-plus-pro/components';
import Demo from './components/demo.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);

    // 注册 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    // 注册 Element Plus Pro 组件
    Object.keys(ElementPlusPro).forEach(key => {
      if (key.startsWith('Elp')) {
        app.component(key, ElementPlusPro[key]);
      }
    });

    // 注册 Demo 组件
    app.component('Demo', Demo);
  },
};
