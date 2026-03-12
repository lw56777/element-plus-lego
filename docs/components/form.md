# Form 表单

动态配置式表单组件，支持模板式和函数式两种用法。

<script setup>
import { h, ref, computed } from 'vue';
import { ElSwitch, ElSelect, ElTooltip, ElIcon } from 'element-plus';
import { WarningFilled } from '@element-plus/icons-vue';
import { useEplForm } from '@element-plus-lego/components';

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

// 自定义 label 与 error demo
const demoLabelErrorFormData = ref({
  name: '',
  desc: '',
});
const demoLabelErrorFormItems = computed(() => [
  {
    label: {
      compType: () =>
        h(
          ElTooltip,
          {
            content: '这是自定义 label 提示',
            placement: 'top',
          },
          () => h('span', ['姓名', h(ElIcon, () => h(WarningFilled))]),
        ),
    },
    prop: 'name',
    placeholder: '请输入姓名',
    span: 12,
    error: 'nameError',
  },
  {
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
    span: 12,
    error: 'descError',
  },
]);
const demoLabelErrorRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
};
const demoLabelErrorFormRef = ref();

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

const [Demo4FormComp, demo4FormRef] = useEplForm({
  modelValue: demo4FormData,
  rules: demo4Rules,
  items: demo4FormItems,
});
</script>

## 基础用法

通过配置快速生成表单。

<Demo>
  <EplForm v-model="demo1FormData" :rules="demo1Rules" :items="demo1FormItems" ref="demo1FormRef"></EplForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo1FormRef?.validate()">校验</el-button>
    <el-button @click="demo1FormRef?.resetFields()">重置</el-button>
  </div>

<template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormRules } from 'element-plus';
import { EplForm, type TFormItem } from 'element-plus-lego';

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
</script>

<template>
  <EplForm
    v-model="formData"
    :rules="rules"
    :items="formItems"
    ref="formRef"
  ></EplForm>
  <el-button type="primary" @click="formRef?.validate()">校验</el-button>
  <el-button @click="formRef?.resetFields()">重置</el-button>
</template>
```

  </template>
</Demo>

## 自定义 label 与 error

`TFormItem` 的 `label` 和 `error` 除字符串外，可配置为 `{ compType, compProps }` 使用动态组件；`error` 为字符串时作为插槽名，对应插槽内容会渲染在表单项错误区域。

- **label**：`string` 时作为文本或插槽名；对象时用 `getComponent(compType)` 渲染，常用于 Tooltip、图标等。
- **error**：`string` 时作为插槽名；对象时用动态组件渲染错误区域。

<Demo>
  <EplForm
    v-model="demoLabelErrorFormData"
    :rules="demoLabelErrorRules"
    :items="demoLabelErrorFormItems"
    ref="demoLabelErrorFormRef"
  >
    <template #nameError>
      <el-alert type="error">姓名错误</el-alert>
    </template>
    <template #descError>
      <el-alert type="warning">描述错误</el-alert>
    </template>
  </EplForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demoLabelErrorFormRef?.validate()">校验</el-button>
    <el-button @click="demoLabelErrorFormRef?.resetFields()">重置</el-button>
  </div>

<template #code>

```vue
<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { ElTooltip, ElIcon } from 'element-plus';
import type { FormRules } from 'element-plus';
import { WarningFilled } from '@element-plus/icons-vue';
import { EplForm, type TFormItem } from 'element-plus-lego';

const formData = ref({
  name: '',
  desc: '',
});

const formItems = computed<TFormItem[]>(() => [
  {
    label: {
      compType: () =>
        h(
          ElTooltip,
          {
            content: '这是自定义 label 提示',
            placement: 'top',
          },
          () => h('span', ['姓名', h(ElIcon, () => h(WarningFilled))]),
        ),
    },
    prop: 'name',
    placeholder: '请输入姓名',
    span: 12,
    error: 'nameError',
  },
  {
    label: '描述',
    prop: 'desc',
    placeholder: '请输入描述',
    span: 12,
    error: 'descError',
  },
]);

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
};

const formRef = ref();
</script>

<template>
  <EplForm v-model="formData" :rules="rules" :items="formItems" ref="formRef">
    <template #nameError>
      <el-alert type="error">姓名错误</el-alert>
    </template>
    <template #descError>
      <el-alert type="warning">描述错误</el-alert>
    </template>
  </EplForm>
  <el-button type="primary" @click="formRef?.validate()">校验</el-button>
  <el-button @click="formRef?.resetFields()">重置</el-button>
</template>
```

  </template>
</Demo>

## 动态组件

支持使用 `compType` 配置不同的表单组件类型，`compProps` 传递组件属性。

<Demo>
  <EplForm v-model="demo2FormData" :rules="demo2Rules" :items="demo2FormItems" ref="demo2FormRef"></EplForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo2FormRef?.validate()">校验</el-button>
    <el-button @click="demo2FormRef?.resetFields()">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { ElSwitch, type FormRules } from 'element-plus';
import { EplForm, type TFormItem } from 'element-plus-lego';

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
  <EplForm
    v-model="formData"
    :rules="rules"
    :items="formItems"
    ref="formRef"
  ></EplForm>
  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>
</template>
```

  </template>
</Demo>

## 插槽

通过 `prop` 对应插槽名称。

<Demo>
  <EplForm v-model="demo3FormData" :rules="demo3Rules" :items="demo3FormItems" ref="demo3FormRef">
    <template #desc>
      <el-input v-model="demo3FormData.desc" type="textarea" />
    </template>
  </EplForm>
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo3FormRef?.validate()">校验</el-button>
    <el-button @click="demo3FormRef?.resetFields()">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormRules } from 'element-plus';
import { EplForm, type TFormItem } from 'element-plus-lego';

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
</script>

<template>
  <EplForm v-model="formData" :rules="rules" :items="formItems" ref="formRef">
    <template #desc>
      <el-input v-model="formData.desc" type="textarea" />
    </template>
  </EplForm>
  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>
</template>
```

  </template>
</Demo>

## 函数式用法

使用 `useEplForm` 创建表单组件。

<Demo>
  <Demo4FormComp />
  <div style="margin-top: 20px;">
    <el-button type="primary" @click="demo4FormRef?.validate()">校验</el-button>
    <el-button @click="demo4FormRef?.resetFields()">重置</el-button>
  </div>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { FormRules } from 'element-plus';
import { useEplForm, type TFormItem } from '@element-plus-lego/components';

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

const [FormComp, formRef] = useEplForm({
  modelValue: formData,
  rules,
  items: formItems,
});
</script>

<template>
  <FormComp />
  <el-button type="primary" @click="formRef?.validate">校验</el-button>
  <el-button @click="formRef?.resetFields">重置</el-button>
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

| 属性名      | 说明                               | 类型                                                     |
| ----------- | ---------------------------------- | -------------------------------------------------------- |
| label       | 标签文本或自定义标签组件           | `string \| { compType: TCompType; compProps?: unknown }` |
| prop        | 字段名                             | `string`                                                 |
| placeholder | 占位文本                           | `string`                                                 |
| span        | 栅格占据的列数                     | `number`                                                 |
| hidden      | 是否隐藏                           | `boolean`                                                |
| compType    | 组件类型                           | `string \| VNode \| Component`                           |
| compProps   | 组件属性                           | `object`                                                 |
| error       | 自定义错误展示（插槽名或动态组件） | `string \| { compType: TCompType; compProps?: unknown }` |

### 方法

EplForm 通过 `ref` 暴露底层 ElForm 实例，拥有 ElForm 的全部方法，常用如下：

| 方法名      | 说明     | 类型                     |
| ----------- | -------- | ------------------------ |
| validate    | 验证表单 | `() => Promise<boolean>` |
| resetFields | 重置表单 | `() => void`             |

## useEplForm

基于 `useComponent` 的函数式创建表单，返回表单组件与实例 ref，通过实例 ref 调用 validate、resetFields 等方法。

```ts
const [FormComp, formRef] = useEplForm({
  modelValue,
  rules,
  items,
});
// 校验：formRef.value?.validate()
// 重置：formRef.value?.resetFields()
```

### 参数

| 参数名     | 说明         | 类型                                      |
| ---------- | ------------ | ----------------------------------------- |
| modelValue | 表单数据对象 | `Ref<object>`                             |
| rules      | 表单验证规则 | `FormRules`                               |
| items      | 表单项配置   | `TFormItem[] \| ComputedRef<TFormItem[]>` |

### 返回值

返回值为元组（也可解构为命名属性）：`[formComp, formRef]`

| 属性名   | 说明           | 类型                                            |
| -------- | -------------- | ----------------------------------------------- |
| formComp | 表单组件       | `Component`                                     |
| formRef  | 表单实例的 Ref | `Ref<FormInstance \| undefined>`（ElForm 实例） |

通过 `formRef.value` 调用 ElForm 实例方法，如 `validate`、`resetFields` 等。
