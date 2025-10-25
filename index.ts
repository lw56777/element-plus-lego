// 导出所有组件
export * from './packages/components';

// 导出所有 hooks
export * from './packages/hooks';

// 导出所有 utils
export * from './packages/utils';

// 导出 Vue 插件安装函数
import type { App } from 'vue';
import * as components from './packages/components';

const install = (app: App) => {
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });
};

export default { install };
