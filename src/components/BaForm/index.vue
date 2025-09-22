<script setup lang="ts">
import { useTemplateRef, computed } from 'vue';
import type { PropType } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useDynamicComponent } from '~/hooks/useDynamicComponent';
import type { TFormItem } from '.';

const props = defineProps({
  rules: {
    type: Object as PropType<FormRules>,
    default: () => {},
  },
  items: {
    type: Array as PropType<TFormItem[]>,
    default: () => [],
  },
});

const formData = defineModel<any>('modelValue');
const formInstance = useTemplateRef<FormInstance>('formRef');

const { getComponent } = useDynamicComponent('input');

const items = computed(() => {
  return props.items.filter(item => !item.hidden);
});

defineExpose({
  validate: () => formInstance.value?.validate(),
  resetFields: () => formInstance.value?.resetFields(),
});
</script>

<template>
  <el-form :model="formData" :rules="rules" ref="formRef">
    <el-row :gutter="16">
      <el-col v-for="item in items" :key="item.label" v-bind="item">
        <el-form-item v-bind="item">
          <slot :name="item.prop">
            <component
              :is="getComponent(item.compType)"
              v-model="formData[item.compProps]"
              v-bind="item"
            />
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
