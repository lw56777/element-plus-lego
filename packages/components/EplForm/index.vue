<script setup lang="ts">
import { useTemplateRef, computed } from 'vue';
import type { PropType } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  type FormInstance,
  type FormRules,
} from 'element-plus';
import { useDynamicComponent } from '@element-plus-lego/hooks';
import type { TFormItem } from '.';

const props = defineProps({
  rules: {
    type: Object as PropType<FormRules>,
    default: () => {},
  },
  gutter: {
    type: Number,
    default: () => 16,
  },
  items: {
    type: Array as PropType<TFormItem[]>,
    default: () => [],
  },
});

const items = computed(() => {
  return props.items.filter(item => !item.hidden);
});

const formData = defineModel<any>('modelValue');
const formInstance = useTemplateRef<FormInstance>('formRef');

const { getComponent } = useDynamicComponent('input');

defineExpose({
  validate: () => formInstance.value?.validate(),
  resetFields: () => formInstance.value?.resetFields(),
});
</script>

<template>
  <el-form :model="formData" :rules="rules" ref="formRef">
    <el-row :gutter="gutter">
      <el-col v-for="item in items" :key="item.label" v-bind="item">
        <el-form-item v-bind="item">
          <slot :name="item.prop">
            <component
              :is="getComponent(item.compType)"
              v-model="formData[item.prop as keyof typeof formData]"
              v-bind="(item.compProps as Record<string, any>) || {}"
            />
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
