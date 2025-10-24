import { type ComponentInstance } from 'vue';
import { ElButton, ElCard } from 'element-plus';
import type { TCompType } from '@element-plus-pro/utils';

export type TProps = ComponentInstance<typeof ElCard>;

export type TEmitsAttrs = Partial<ComponentInstance<typeof ElButton>> & {
  name?: TCompType; // 默认插槽
  prop?: string; // 绑定params的字段key/自定义插槽名称
  hidden?: boolean;
  nativeType?: string;
  compType?: TCompType; // 动态组件类型
  onClick?: Function;
  onChange?: Function;
};

export type TEmits = {
  search: () => void;
  reset: () => void;
  refresh: () => void;
};

export { default as ElpSearch } from './index.vue';
