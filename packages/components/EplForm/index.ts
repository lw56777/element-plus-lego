import type { ComputedRef } from 'vue';
import type { FormRules, FormItemProps } from 'element-plus';
import type { Compulsory, TCompType } from '@element-plus-lego/utils';
import { useComponent } from '@element-plus-lego/hooks';
import EplForm from './index.vue';

type TProps =
  | string
  | {
      compType: TCompType; // 动态组件类型
      compProps?: unknown; // 动态组件的属性
    };

export type TFormItem = Omit<Partial<FormItemProps>, 'label' | 'error'> & {
  label?: TProps;
  hidden?: boolean;
  span?: number;
  compType?: TCompType; // 动态组件类型
  compProps?: unknown; // 动态组件的属性
  error?: TProps;
};

type TComponentProps = {
  modelValue: any;
  rules: FormRules;
  items: TFormItem[] | ComputedRef<TFormItem[]>;
};

export const useEplForm = (props: TComponentProps) =>
  useComponent(EplForm)(props);

export { default as EplForm } from './index.vue';
