import type { TableColumnCtx } from 'element-plus';
import type { Compulsory, TCompType } from '@element-plus-pro/utils';

export type TTableColumn = Compulsory<Partial<TableColumnCtx>, 'label'> & {
  hidden?: boolean;
  compType?: TCompType; // 动态组件类型
  compProps?: unknown; // 动态组件的属性
  child?: TTableColumn[];
  header?: TCompType; // 自定义表头
};

export { default as ElpTableColumn } from './index.vue';
