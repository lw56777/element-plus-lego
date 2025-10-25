# Search 搜索

搜索表单组件，快速构建搜索条件表单。

## 基础用法

通过配置快速生成搜索表单。

<script setup>
import { ref, computed } from 'vue';

const params = ref({
  keywords: '',
  region: 'beijing',
  date: [],
});

const items = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
  },
  {
    label: '地区',
    prop: 'region',
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
  {
    label: '时间',
    prop: 'date',
    compType: 'date',
  },
]);

const onSearch = () => {
  console.log('搜索参数:', params.value);
};

const onReset = () => {
  console.log('重置');
};

const onRefresh = () => {
  console.log('刷新');
};
</script>

<Demo>
  <EplSearch
    v-model="params"
    :items="items"
    @reset="onReset"
    @refresh="onRefresh"
    @search="onSearch"
  />
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { EplSearch } from '@element-plus-lego/components';

const params = ref({
  keywords: '',
  region: 'beijing',
  date: [],
});

const items = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
  },
  {
    label: '地区',
    prop: 'region',
    compType: 'select',
    compProps: {
      placeholder: '请选择地区',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
      ],
    },
  },
]);

const onSearch = () => {
  console.log('搜索');
};
<\/script>

<template>
  <EplSearch
    v-model="params"
    :items="items"
    @search="onSearch"
  />
</template>
```

  </template>
</Demo>

## API

### 属性

| 属性名               | 说明         | 类型            | 默认值 |
| -------------------- | ------------ | --------------- | ------ |
| modelValue / v-model | 搜索参数对象 | \`object\`      | —      |
| items                | 搜索项配置   | \`TFormItem[]\` | \`[]\` |

### 事件

| 事件名  | 说明     | 类型           |
| ------- | -------- | -------------- |
| search  | 搜索事件 | \`() => void\` |
| reset   | 重置事件 | \`() => void\` |
| refresh | 刷新事件 | \`() => void\` |
