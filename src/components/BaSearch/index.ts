import { type Component, type ComponentInstance, type VNode } from 'vue';
import { ElButton, ElCard } from 'element-plus';

export type TProps = ComponentInstance<typeof ElCard>;

export type TEmitsAttrs = Partial<ComponentInstance<typeof ElButton>> & {
  name?: string | (() => VNode) | Component; // 默认插槽
  prop?: string; // 绑定params的字段key/自定义插槽名称
  hidden?: boolean;
  nativeType?: string;
  compType?: string | (() => VNode) | Component; // 动态组件类型
  onClick?: Function;
  onChange?: Function;
};

export type TEmits = {
  search: () => void;
  reset: () => void;
  refresh: () => void;
};
