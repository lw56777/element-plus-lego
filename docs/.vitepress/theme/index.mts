import DefaultTheme from 'vitepress/theme';
import ElementPlus, { ElCheckbox, ElDatePicker, ElInput, ElSelect, ElSwitch, ElTag } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import * as ElementPlusLego from '@element-plus-lego/components';
import { __setGlobalComponentMap } from '@element-plus-lego/hooks/useDynamicComponent';
import Demo from './components/demo.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);

    // 注册 Element Plus 图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    // 注册 Element Plus Lego 组件
    Object.keys(ElementPlusLego).forEach(key => {
      if (key.startsWith('Epl')) {
        app.component(key, ElementPlusLego[key]);
      }
    });

    // 设置全局组件映射，用于动态组件
    __setGlobalComponentMap({
      'input': ElInput,
      'select': ElSelect,
      'switch': ElSwitch,
      'tag': ElTag,
      'date': ElDatePicker,
      'checkbox': ElCheckbox,
    });

    // 注册 Demo 组件
    app.component('Demo', Demo);
  },
};
