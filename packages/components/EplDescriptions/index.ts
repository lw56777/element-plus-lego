import type { DescriptionItemProps } from 'element-plus';
import type { TCompType } from '@element-plus-pro/utils';

type TProps =
  | string
  | number
  | {
      prop?: string;
      compType: TCompType; // 动态组件类型
      compProps?: unknown; // 动态组件的属性
    };

export type TDescriptionsItem = Omit<Partial<DescriptionItemProps>, 'label'> & {
  label: TProps;
  value: TProps;
  hidden?: boolean;
};

export { default as EplDescriptions } from './index.vue';
