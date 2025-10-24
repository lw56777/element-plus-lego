import { h, reactive, ref, type Component } from 'vue';
import type { ComputedRef } from 'vue';
import type { FormRules, FormItemProps } from 'element-plus';
import type { Compulsory, TCompType } from '@element-plus-pro/utils';
import ElpForm from './index.vue';

export type TFormItem = Compulsory<Partial<FormItemProps>, 'label'> & {
  hidden?: boolean;
  span?: number;
  compType?: TCompType; // 动态组件类型
  compProps?: unknown; // 动态组件的属性
};

type FuncComponentProps = {
  modelValue: any;
  rules: FormRules;
  items: TFormItem[] | ComputedRef<TFormItem[]>;
};

export const useElpForm = (props: FuncComponentProps) => {
  const formRef = ref();
  const Component: Component = (_: any, { slots }: any) => {
    return h(ElpForm, { ...reactive(props), ref: formRef }, slots);
  };

  return {
    formComp: Component,
    validate: () => formRef.value?.validate(),
    resetFields: () => formRef.value?.resetFields(),
  };
};

export { default as ElpForm } from './index.vue';
