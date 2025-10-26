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
import { type TGlobalPagination, __setGlobalPagination } from './packages/hooks/usePagination';

type TComponentMap = Record<string, Component>;

export interface ElementPlusLegoOptions {
  componentMap: TComponentMap;
  pagination?: TGlobalPagination;
}

const install = (
  app: App,
  options: ElementPlusLegoOptions | TComponentMap,
) => {
  // 注册所有组件
  Object.values(components).forEach((component: any) => {
    if (component.install) {
      app.use(component);
    } else if (component.name) {
      app.component(component.name, component);
    }
  });

  const {
    componentMap,
    pagination
  } = options;

  if (!componentMap) {
    __setGlobalComponentMap(options as TComponentMap);
  } else {
    __setGlobalComponentMap(componentMap as TComponentMap);

    if (pagination) {
      __setGlobalPagination(pagination as TGlobalPagination);
    }
  }
};

export default { install };
