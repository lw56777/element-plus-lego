import { h, reactive, ref } from 'vue';
import type { Component, ComputedRef, VNode } from 'vue';
import type { FormRules, FormItemProps } from 'element-plus';
import type { Compulsory } from '~/utils/types';
import BaForm from './index.vue';

export type TFormItem = Compulsory<Partial<FormItemProps>, 'label'> & {
  hidden?: boolean;
  span?: number;
  compType?: string | (() => VNode) | Component; // 动态组件类型
  compProps?: unknown; // 动态组件的属性
};

type FuncComponentProps = {
  modelValue: any;
  rules: FormRules;
  items: TFormItem[] | ComputedRef<TFormItem[]>;
};

export const useBaForm = (props: FuncComponentProps) => {
  const formRef = ref();
  const Component = (_: any, { slots }: any) => {
    return h(BaForm, { ...reactive(props), ref: formRef }, slots);
  };

  return {
    BaForm: Component,
    validate: () => formRef.value?.validate(),
    resetFields: () => formRef.value?.resetFields(),
  };
};
