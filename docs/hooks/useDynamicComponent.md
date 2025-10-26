# useDynamicComponent

动态组件管理 hook，支持通过字符串标识符动态渲染组件。

## 功能特性

- 🎯 字符串到组件的映射
- 🔄 支持组件对象和渲染函数
- 🌐 全局组件映射管理
- 🛡️ 默认组件兜底

## 基本用法

```vue
<template>
  <div>
    <!-- 通过字符串渲染组件 -->
    <component :is="getComponent('input')" v-model="value" placeholder="请输入" />
    
    <!-- 通过组件对象渲染 -->
    <component :is="getComponent(ElButton)" @click="handleClick">
      点击我
    </component>
    
    <!-- 通过渲染函数渲染 -->
    <component :is="getComponent(customRenderer, { text: 'Hello' })" />
  </div>
</template>

<script setup>
import { ElInput, ElButton } from 'element-plus';
import { useDynamicComponent } from 'element-plus-lego';

const { getComponent } = useDynamicComponent();

const value = ref('');

// 自定义渲染函数
const customRenderer = (scope) => {
  return h('div', { style: 'color: blue;' }, scope.text);
};

const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

## 在 EplForm 中使用

```vue
<template>
  <div>
    <!-- 使用 EplForm 动态渲染表单 -->
    <EplForm
      v-model="formData"
      :items="formItems"
      :emits="formEmits"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { EplForm } from '@element-plus-lego/components';
import { useDynamicComponent } from 'element-plus-lego';

const { getComponent } = useDynamicComponent();

const formData = ref({
  name: '',
  age: '',
  email: '',
  status: 'active'
});

// 动态表单配置
const formItems = computed(() => [
  {
    label: '姓名',
    prop: 'name',
    compType: 'input',
    compProps: {
      placeholder: '请输入姓名'
    }
  },
  {
    label: '年龄',
    prop: 'age',
    compType: 'input',
    compProps: {
      type: 'number',
      placeholder: '请输入年龄'
    }
  },
  {
    label: '邮箱',
    prop: 'email',
    compType: 'input',
    compProps: {
      type: 'email',
      placeholder: '请输入邮箱'
    }
  },
  {
    label: '状态',
    prop: 'status',
    compType: 'select',
    compProps: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' }
      ]
    }
  }
]);

const formEmits = [
  {
    type: 'primary',
    name: '提交',
    nativeType: 'submit',
    onClick: handleSubmit
  },
  {
    name: '重置',
    onClick: handleReset
  }
];

const handleSubmit = () => {
  console.log('提交表单', formData.value);
};

const handleReset = () => {
  formData.value = {
    name: '',
    age: '',
    email: '',
    status: 'active'
  };
};
</script>
```

## 全局组件映射

通过插件注册时的 `componentMap` 选项可以设置全局组件映射：

```ts
// main.ts
import ElementPlusLego from 'element-plus-lego';
import { ElInput, ElButton, ElSelect } from 'element-plus';

const componentMap = {
  input: ElInput,
  button: ElButton,
  select: ElSelect,
  // ... 更多组件
};

app.use(ElementPlusLego, { componentMap });
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initType | `string` | `undefined` | 默认组件类型 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| componentMap | `Record<string, Component>` | 全局组件映射表 |
| getComponent | `(type: unknown, scope?: any) => any` | 获取组件函数 |

## 使用场景

### 1. 动态表单渲染
```vue
<template>
  <EplForm
    v-model="formData"
    :items="formItems"
    :emits="formEmits"
  />
</template>

<script setup>
const formItems = [
  { 
    label: '姓名', 
    prop: 'name', 
    compType: 'input',
    compProps: { placeholder: '请输入姓名' }
  },
  { 
    label: '年龄', 
    prop: 'age', 
    compType: 'input',
    compProps: { type: 'number', placeholder: '请输入年龄' }
  },
  { 
    label: '性别', 
    prop: 'gender', 
    compType: 'select',
    compProps: { 
      placeholder: '请选择性别',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    }
  }
];
</script>
```

### 2. 表格列渲染
```vue
<template>
  <EplTable
    v-model="tableData"
    :columns="columns"
  />
</template>

<script setup>
const columns = [
  {
    prop: 'name',
    label: '姓名',
    compType: 'input'
  },
  {
    prop: 'status',
    label: '状态',
    compType: 'select',
    compProps: {
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' }
      ]
    }
  }
];
</script>
```

### 3. 条件渲染
```vue
<template>
  <div>
    <component
      :is="getComponent(componentType)"
      v-bind="componentProps"
    />
  </div>
</template>

<script setup>
const componentType = computed(() => {
  if (userRole.value === 'admin') return 'adminPanel';
  if (userRole.value === 'user') return 'userPanel';
  return 'defaultPanel';
});
</script>
```

## 组件类型支持

`getComponent` 函数支持以下类型的 `type` 参数：

1. **字符串** - 从全局组件映射表中查找
2. **组件对象** - 直接使用传入的组件
3. **渲染函数** - 调用函数并传入 scope 参数
4. **其他** - 返回默认的文本渲染组件

## 默认组件

当找不到对应的组件时，会返回一个默认的文本渲染组件：

```ts
{
  render() {
    return h('span', {}, type as string);
  }
}
```
