// 导出所有组件
export * from './packages/components';

// 导出所有 hooks
export * from './packages/hooks';

// 导出所有 utils
export * from './packages/utils';

// 导出 Vue 插件安装函数
import type { App, Component } from 'vue';
import * as components from './packages/components';
import { __setGlobalComponentMap } from './packages/hooks/useDynamicComponent';

type TComponentMap = Record<string, Component>;
export interface ElementPlusLegoOptions {
  componentMap?: TComponentMap;
}

const install = (
  app: App,
  options: ElementPlusLegoOptions | TComponentMap = {},
) => {
  // 注册所有组件
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });

  __setGlobalComponentMap((options.componentMap || options) as TComponentMap);
};

export default { install };
