# Form 表单

动态配置式表单组件，支持模板式和函数式两种用法。

<script setup>
import { h, ref, computed } from 'vue';
import { ElSwitch } from 'element-plus';
import { useElpForm } from '@element-plus-pro/components';

// 基础用法 demo
const demo1FormData = ref({
  name: '',
  age: '',
});

const demo1FormItems = computed(() => [
  {
    label: '姓名',
    prop: 'name',
    placeholder: '请输入姓名',
    span: 12,
  },
  {
    label: '年龄',
    prop: 'age',
    placeholder: '请输入年龄',
    span: 12,
  },
]);

const demo1Rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
};

const demo1FormRef = ref();

// 动态组件 demo
const demo2FormData = ref({
  gender: 0,
  region: '',
});

const demo2FormItems = computed(() => [
  {
    label: '性别',
    prop: 'gender',
    compType: () =>
      h(ElSwitch, {
        modelValue: demo2FormData.value.gender,
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      }),
  },
  {
    label: '地区',
    prop: 'region',
    hidden: demo2FormData.value.gender,
    compType: 'select',
    compProps: {
      placeholder: '请选择地区',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
  },
]);

const demo2Rules = {
  region: [
    { required: true, message: '请选择地区', trigger: 'change' },
  ],
};

const demo2FormRef = ref();

// 插槽
const demo3FormData = ref({
  desc: '',
});

const demo3FormItems = computed(() => [
  {
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
  },
]);

const demo3Rules = {
  desc: [
    { required: true, message: '请输入描述', trigger: 'blur' },
  ],
};

const demo3FormRef = ref();

// 函数式用法 demo
const demo4FormData = ref({
  username: '',
  email: '',
});

const demo4FormItems = computed(() => [
  {
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    span: 12,
  },
  {
    label: '邮箱',
    prop: 'email',
    placeholder: '请输入邮箱',
    span: 12,
  },
]);

const demo4Rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
};

const { formComp: Demo4FormComp, validate: demo4Validate, resetFields: demo4ResetFields } = useElpForm({
  modelValue: demo4FormData,
  rules: demo4Rules,
  items: demo4FormItems,
});
</script>

## 基础用法

通过配置快速生成表单。

<Demo>
  <ElpForm v-model="demo1FormData" :rules="demo1Rules" :items="demo1FormItems" ref="demo1FormRef"></ElpForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo1FormRef?.validate">校验</el-button>
    <el-button @click="demo1FormRef?.resetFields">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormRules } from 'element-plus';
import { ElpForm, type TFormItem } from '@element-plus-pro/components';

const formData = ref({
  name: '',
  age: '',
});

const formItems = computed(() => [
  {
    label: '姓名',
    prop: 'name',
    placeholder: '请输入姓名',
    span: 12,
  },
  {
    label: '年龄',
    prop: 'age',
    placeholder: '请输入年龄',
    span: 12,
  },
]);

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
};

const formRef = ref();
<\/script>

<template>
  <ElpForm
    v-model="formData"
    :rules="rules"
    :items="formItems"
    ref="formRef"
  ></ElpForm>
  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>
</template>
```

  </template>
</Demo>

## 动态组件

支持使用 `compType` 配置不同的表单组件类型，`compProps` 传递组件属性。

<Demo>
  <ElpForm v-model="demo2FormData" :rules="demo2Rules" :items="demo2FormItems" ref="demo2FormRef"></ElpForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo2FormRef?.validate">校验</el-button>
    <el-button @click="demo2FormRef?.resetFields">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { ElSwitch, type FormRules } from 'element-plus';
import { ElpForm, type TFormItem } from '@element-plus-pro/components';

const formData = ref({
  gender: 0,
  region: '',
});

const formItems = computed(() => [
  {
    label: '性别',
    prop: 'gender',
    compType: () =>
      h(ElSwitch, {
        modelValue: formData.value.gender,
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      }),
  },
  {
    label: '地区',
    prop: 'region',
    hidden: formData.value.gender,
    compType: 'select',
    compProps: {
      placeholder: '请选择地区',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
  },
]);

const rules: FormRules = {
  region: [{ required: true, message: '请选择地区', trigger: 'change' }],
};

const formRef = ref();
</script>

<template>
  <ElpForm
    v-model="formData"
    :rules="rules"
    :items="formItems"
    ref="formRef"
  ></ElpForm>
  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>
</template>
```

  </template>
</Demo>

## 插槽

通过 `prop` 对应插槽名称。

<Demo>
  <ElpForm v-model="demo3FormData" :rules="demo3Rules" :items="demo3FormItems" ref="demo3FormRef">
    <template #desc>
      <el-input v-model="demo3FormData.desc" type="textarea" />
    </template>
  </ElpForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo3FormRef?.validate">校验</el-button>
    <el-button @click="demo3FormRef?.resetFields">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormRules } from 'element-plus';
import { ElpForm, type TFormItem } from '@element-plus-pro/components';

const formData = ref({
  desc: '',
});

const formItems = computed(() => [
  {
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
  },
]);

const rules: FormRules = {
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
};

const formRef = ref();
<\/script>

<template>
  <ElpForm
    v-model="formData"
    :rules="rules"
    :items="formItems"
    ref="formRef"
  >
    <template #desc>
      <el-input v-model="formData.desc" type="textarea" />
    </template>
  </ElpForm>
  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>
</template>
```

  </template>
</Demo>

## 函数式用法

使用 `useElpForm` 创建表单组件。

<Demo>
  <Demo4FormComp />
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo4Validate">校验</el-button>
    <el-button @click="demo4ResetFields">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormRules } from 'element-plus';
import { useElpForm, type TFormItem } from '@element-plus-pro/components';

const formData = ref({
  username: '',
  email: '',
});

const formItems = computed(() => [
  {
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    span: 12,
  },
  {
    label: '邮箱',
    prop: 'email',
    placeholder: '请输入邮箱',
    span: 12,
  },
]);

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
};

const { formComp: FormComp, validate, resetFields } = useElpForm({
  modelValue: formData,
  rules,
  items: formItems,
});
<\/script>

<template>
  <FormComp />
  <el-button type="primary" @click="validate">校验</el-button>
  <el-button @click="resetFields">重置</el-button>
</template>
```

  </template>
</Demo>

## API

### 属性

| 属性名               | 说明         | 类型          | 默认值 |
| -------------------- | ------------ | ------------- | ------ |
| modelValue / v-model | 表单数据对象 | `object`      | —      |
| items                | 表单项配置   | `TFormItem[]` | `[]`   |
| rules                | 表单验证规则 | `FormRules`   | —      |

### TFormItem 配置

| 属性名      | 说明           | 类型                           |
| ----------- | -------------- | ------------------------------ |
| label       | 标签文本       | `string`                       |
| prop        | 字段名         | `string`                       |
| placeholder | 占位文本       | `string`                       |
| span        | 栅格占据的列数 | `number`                       |
| hidden      | 是否隐藏       | `boolean`                      |
| compType    | 组件类型       | `string \| VNode \| Component` |
| compProps   | 组件属性       | `object`                       |

### 方法

| 方法名      | 说明     | 类型                     |
| ----------- | -------- | ------------------------ |
| validate    | 验证表单 | `() => Promise<boolean>` |
| resetFields | 重置表单 | `() => void`             |

## useElpForm

函数式创建表单。

```ts
const { formComp, validate, resetFields } = useElpForm({
  modelValue,
  rules,
  items,
});
```

### 参数

| 参数名     | 说明         | 类型                                      |
| ---------- | ------------ | ----------------------------------------- |
| modelValue | 表单数据对象 | `Ref<object>`                             |
| rules      | 表单验证规则 | `FormRules`                               |
| items      | 表单项配置   | `TFormItem[] \| ComputedRef<TFormItem[]>` |

### 返回值

| 属性名      | 说明         | 类型                     |
| ----------- | ------------ | ------------------------ |
| formComp    | 表单组件     | `Component`              |
| validate    | 验证表单方法 | `() => Promise<boolean>` |
| resetFields | 重置表单方法 | `() => void`             |
