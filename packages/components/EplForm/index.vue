<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { ComponentInstance, PropType } from 'vue';
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus';
import type { FormRules } from 'element-plus';
import { useDynamicComponent } from '@element-plus-lego/hooks';
import { get, set, omit, isObject } from 'lodash-es';
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

const { getComponent: getComponentInput } = useDynamicComponent('input');
const { getComponent } = useDynamicComponent();

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
      <el-col v-for="item in items" :key="item.toString()" v-bind="item">
        <el-form-item v-bind="omit(item, ['label', 'error'])">
          <template v-if="item.label" #label>
            <component
              v-if="isObject(item.label)"
              :is="getComponent(item.label?.compType)"
              v-bind="(item.label?.compProps as Record<string, any>) || {}"
            />

            <slot v-else :name="item.label">{{ item.label }}</slot>
          </template>

          <slot :name="item.prop">
            <component
              :is="getComponentInput(item.compType)"
              :model-value="get(formData, item.prop)"
              @update:model-value="value => set(formData, item.prop, value)"
              v-bind="(item.compProps as Record<string, any>) || {}"
            />
          </slot>

          <template v-if="item.error" #error>
            <component
              v-if="isObject(item.error)"
              :is="getComponent(item.error?.compType)"
              v-bind="(item.error?.compProps as Record<string, any>) || {}"
            />

            <slot v-else :name="item.error">{{ item.error }}</slot>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
