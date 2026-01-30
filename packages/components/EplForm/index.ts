import type { ComputedRef } from 'vue';
import type { FormRules, FormItemProps } from 'element-plus';
import type { Compulsory, TCompType } from '@element-plus-lego/utils';
import { useComponent } from '@element-plus-lego/hooks';
import EplForm from './index.vue';

export type TFormItem = Compulsory<Partial<FormItemProps>, 'label'> & {
  hidden?: boolean;
  span?: number;
  compType?: TCompType; // 动态组件类型
  compProps?: unknown; // 动态组件的属性
};

type TComponentProps = {
  modelValue: any;
  rules: FormRules;
  items: TFormItem[] | ComputedRef<TFormItem[]>;
};

export const useEplForm = (props: TComponentProps) =>
  useComponent(EplForm)(props);

export { default as EplForm } from './index.vue';
