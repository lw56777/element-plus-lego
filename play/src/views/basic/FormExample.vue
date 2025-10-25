<script setup lang="ts">
import { ref, computed, useTemplateRef, type ComputedRef } from 'vue';
import type { FormRules } from 'element-plus';
import {
  EplForm,
  useEplForm,
  type TFormItem,
} from '@element-plus-pro/components';

const formData = ref({
  name: '',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
});

const rules: FormRules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
};

const formItems: ComputedRef<TFormItem[]> = computed(() => [
  {
    label: '姓名',
    prop: 'name',
    placeholder: '请输入姓名',
    span: 12,
  },
  {
    label: '地区',
    prop: 'region',
    hidden: formData.value.delivery,
    compType: 'cascader',
    compProps: {
      placeholder: '请选择地区',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
    span: 12,
  },
  {
    label: '自定义组件',
    prop: 'delivery',
    compType: 'switch',
    compProps: {
      onChange: () => {
        console.log('onChange', formData.value);
      },
    },
  },
  {
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
  },
]);

const formRef = useTemplateRef('formRef');

const {
  formComp: EplFormComp,
  validate: validateBaForm,
  resetFields: resetFieldsBaForm,
} = useEplForm({
  modelValue: formData,
  rules,
  items: formItems,
});
</script>

<template>
  <el-divider>模板式</el-divider>

  <EplForm v-model="formData" :rules="rules" :items="formItems" ref="formRef">
    <template #desc>
      <el-input v-model="formData.desc" type="textarea" />
    </template>
  </EplForm>

  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>

  <el-divider>函数式</el-divider>

  <EplFormComp>
    <template #desc>
      <el-input v-model="formData.desc" type="textarea" />
    </template>
  </EplFormComp>

  <el-button type="primary" @click="validateBaForm">校验</el-button>
  <el-button @click="resetFieldsBaForm">重置</el-button>
</template>
