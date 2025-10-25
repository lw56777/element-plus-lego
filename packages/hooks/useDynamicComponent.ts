import { h, type Component } from 'vue';
import { isString, isFunction } from '@element-plus-lego/utils';

/**
 * 全局动态组件映射表
 * 通过插件注册时的 componentMap 选项配置
 */
let globalComponentMap: Record<string, Component> = {};

/**
 * 设置全局组件映射表（内部函数）
 * @internal
 */
export function __setGlobalComponentMap(
  componentMap: Record<string, Component>,
): void {
  globalComponentMap = componentMap;
}

/**
 * 动态组件 Hook
 *
 * @description
 * 用于动态渲染组件，支持字符串类型、组件对象和渲染函数
 * 需要在插件注册时配置 componentMap
 *
 * @param initType 默认组件类型（可选）
 * @returns 包含 componentMap 和 getComponent 方法的对象
 *
 * @example
 * // 在组件中使用
 * const { getComponent } = useDynamicComponent('input');
 *
 * @example
 * // 使用字符串获取组件
 * const component = getComponent('button');
 *
 * @example
 * // 使用组件对象
 * const component = getComponent(ElButton);
 *
 * @example
 * // 使用渲染函数
 * const component = getComponent((scope) => h('div', scope.row.value), scope);
 */
export function useDynamicComponent(initType?: string): {
  componentMap: Record<string, Component>;
  getComponent: (type: unknown, scope?: any) => any;
} {
  const getComponent = (type: unknown, scope?: any) => {
    // 如果 type 不是字符串，说明是组件对象或渲染函数
    if (type && !isString(type)) {
      return isFunction(type) ? (type as Function)(scope) : type;
    }

    // 从全局组件映射表中获取组件
    const componentKey = (type as string) || initType;
    const dynamicComponent = componentKey
      ? globalComponentMap[componentKey]
      : undefined;

    // 如果找到组件则返回，否则返回一个渲染文本的默认组件
    return (
      dynamicComponent || {
        render() {
          return h('span', {}, type as string);
        },
      }
    );
  };

  return {
    componentMap: globalComponentMap,
    getComponent,
  };
}
