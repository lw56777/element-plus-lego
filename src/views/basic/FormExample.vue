<script setup lang="ts">
import { ref, computed, useTemplateRef, h, type ComputedRef } from 'vue';
import { ElSwitch } from 'element-plus';
import type { FormRules } from 'element-plus';
import { useBaForm, type TFormItem } from '~/components/BaForm';

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
    // compType: 'input',
    placeholder: '请输入姓名',
    span: 12,
  },
  {
    label: '地区',
    prop: 'region',
    hidden: !formData.value.delivery,
    comType: 'select',
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
    comType: () =>
      h(ElSwitch, {
        modelValue: formData.value.delivery,
        onChange: () => {
          console.log('onChange', formData.value);
        },
      }),
  },
  {
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
  },
]);

const lwFormRef = useTemplateRef('lwFormRef');

const {
  BaForm: BaFormComp,
  validate: validateBaForm,
  resetFields: resetFieldsBaForm,
} = useBaForm({
  modelValue: formData,
  rules,
  items: formItems,
});
</script>

<template>
  <el-divider>模板式</el-divider>

  <BaForm v-model="formData" :rules="rules" :items="formItems" ref="baFormRef">
    <template #desc>
      <el-input v-model="formData.desc" type="textarea" />
    </template>
  </BaForm>

  <el-button type="primary" @click="lwFormRef?.validate">校验</el-button>
  <el-button @click="lwFormRef?.resetFields">重置</el-button>

  <el-divider>函数式</el-divider>

  <BaFormComp>
    <template #desc>
      <el-input v-model="formData.desc" type="textarea" />
    </template>
  </BaFormComp>

  <el-button type="primary" @click="validateBaForm">校验</el-button>
  <el-button @click="resetFieldsBaForm">重置</el-button>
</template>
