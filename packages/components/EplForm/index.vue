<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { ComponentInstance, PropType } from 'vue';
import { ElForm, ElFormItem, ElRow, ElCol, type FormRules } from 'element-plus';
import { useDynamicComponent } from '@element-plus-lego/hooks';
import { get, set } from 'lodash-es';
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

const { getComponent } = useDynamicComponent('input');

const items = computed(() => {
  return props.items.filter(item => !item.hidden);
});

const formData = defineModel<any>('modelValue');
const formInstance = getCurrentInstance();

const formRef = exposed => {
  formInstance.exposed = exposed;
};

defineExpose({} as ComponentInstance<typeof ElForm>);
</script>

<template>
  <el-form :model="formData" :rules="rules" :ref="formRef">
    <el-row :gutter="gutter">
      <el-col v-for="item in items" :key="item.label" v-bind="item">
        <el-form-item v-bind="item">
          <slot :name="item.prop">
            <component
              :is="getComponent(item.compType)"
              :model-value="get(formData, item.prop)"
              @update:model-value="value => set(formData, item.prop, value)"
              v-bind="(item.compProps as Record<string, any>) || {}"
            />
          </slot>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
