# Search 搜索

搜索表单组件，快速构建搜索条件表单。

## 基础用法

通过配置快速生成搜索表单。

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

const demo1Params = ref({
  keywords: '',
});

const demo1Items = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
    compProps: {
      placeholder: '回车触发搜索',
    },
  },
]);

const demo2Params = ref({
  keywords: '',
});

const demo2Items = computed(() => [
  {
    label: '条件插槽',
    prop: 'keywords',
  },
]);

const emits = computed(() => [
  {
    label: '提交插槽',
    prop: 'submit',
  },
]);

const onSearch = () => {
  ElMessage.primary('搜索')
};

const onReset = () => {
  ElMessage('重置')
};

const onRefresh = () => {
  ElMessage.success('刷新')
};
</script>

<Demo>
  <EplSearch
    v-model="demo1Params"
    :items="demo1Items"
    @reset="onReset"
    @refresh="onRefresh"
    @search="onSearch"
  />
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { EplSearch } from '@element-plus-lego/components';

const params = ref({
  keywords: '',
});

const items = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
    compProps: {
      placeholder: '回车触发搜索',
    },
  },
]);

const onSearch = () => {
  ElMessage.primary('搜索')
};

const onReset = () => {
  ElMessage('重置')
};

const onRefresh = () => {
  ElMessage.success('刷新')
};
<\/script>

<template>
  <EplSearch
    v-model="params"
    :items="items"
    @reset="onReset"
    @refresh="onRefresh"
    @search="onSearch"
  />
</template>
```

  </template>
</Demo>

## 插槽

EplSearch 组件支持两种类型的插槽，用于自定义搜索条件和操作按钮。

### 条件插槽

通过在 `items` 配置中定义 `prop` 属性，可以使用同名插槽来自定义搜索条件的展示。插槽名称与 `prop` 值保持一致。适用于需要完全自定义输入组件或添加复杂交互逻辑的场景。

### 操作按钮插槽

通过 `emits` 配置定义操作按钮，使用 `prop` 属性作为插槽名，可以自定义按钮的样式和行为。适用于需要自定义提交、重置等操作按钮的场景。

<Demo>
  <EplSearch
    v-model="demo2Params"
    :items="demo2Items"
    :emits="emits"
    @reset="onReset"
    @refresh="onRefresh"
  >
    <template #keywords>
      <el-input v-model="demo2Params.keywords" placeholder="回车触发搜索" />
    </template>
    <template #submit>
      <el-button type="primary" nativeType="submit" @click="onSearch">提交插槽</el-button>
    </template>
  </EplSearch>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElInput, ElButton } from 'element-plus';
import { EplSearch } from '@element-plus-lego/components';

const params = ref({
  keywords: '',
});

const items = computed(() => [
  {
    label: '条件插槽',
    prop: 'keywords',
  },
]);

const emits = computed(() => [
  {
    label: '提交插槽',
    prop: 'submit',
  },
]);

const onSearch = () => {
  ElMessage.primary('搜索')
};

const onReset = () => {
  ElMessage('重置')
};

const onRefresh = () => {
  ElMessage.success('刷新')
};
<\/script>

<template>
  <EplSearch
    v-model="params"
    :items="items"
    :emits="emits"
    @reset="onReset"
    @refresh="onRefresh"
  >
    <template #keywords>
      <el-input v-model="params.keywords" placeholder="回车触发搜索" />
    </template>
    <template #submit>
      <el-button type="primary" nativeType="submit" @click="onSearch">提交插槽</el-button>
    </template>
  </EplSearch>
</template>
```

  </template>
</Demo>

## API

### 属性

| 属性名               | 说明         | 类型              | 默认值 |
| -------------------- | ------------ | ----------------- | ------ |
| modelValue / v-model | 搜索参数对象 | \`object\`        | —      |
| items                | 搜索项配置   | \`TFormItem[]\`   | \`[]\` |
| emits                | 操作按钮配置 | \`TEmitsAttrs[]\` | \`[]\` |

### 事件

| 事件名  | 说明     | 类型           |
| ------- | -------- | -------------- |
| search  | 搜索事件 | \`() => void\` |
| reset   | 重置事件 | \`() => void\` |
| refresh | 刷新事件 | \`() => void\` |

:::tip 按钮自动显示规则
组件会根据传入的事件自动显示对应的操作按钮：

- 传入 `@search` 事件，显示"搜索"按钮（主要按钮，带搜索图标）
- 传入 `@reset` 事件，显示"重置"按钮（普通按钮，带重置图标）
- 传入 `@refresh` 事件，显示"刷新"按钮（普通按钮，带刷新图标）

未传入的事件对应的按钮不会显示，这样可以根据实际需求灵活控制按钮的展示。
:::

### 插槽

| 插槽名 | 说明                                                      |
| ------ | --------------------------------------------------------- |
| [prop] | 搜索条件插槽，插槽名为 \`items\` 配置中的 \`prop\` 属性值 |
| [prop] | 操作按钮插槽，插槽名为 \`emits\` 配置中的 \`prop\` 属性值 |
