# Descriptions 描述列表

描述列表展示组件，支持动态组件和自定义内容。

<script setup>
import { h, ref, computed } from 'vue';
import { ElTag, ElCheckboxGroup } from 'element-plus';

// 基础用法
const demo1DescriptionsData = ref({
  name: '远方os',
});

const demo1Items = computed(() => [
  {
    label: '姓名',
    value: demo1DescriptionsData.value.name,
  },
]);

// 动态组件
const demo2DescriptionsData = ref({
  genderType: 1,
  gender: 0,
  date: '2016-05-03',
  state: [0],
});

const demo2Items = computed(() => [
  {
    span: 2,
    label: {
      compType: () => h(ElTag, { type: 'warning' }, () => '状态'),
    },
    value: {
      prop: 'state',
      compType: () =>
        h(ElCheckboxGroup, {
          options: [
            {
              label: '未付款',
              value: 0,
            },
            {
              label: '已付款',
              value: 1,
            },
            {
              label: '已发货',
              value: 2,
            },
          ],
        }),
    },
  },
  {
    label: {
      prop: 'genderType',
      compType: 'switch',
      compProps: {
        activeText: '性别',
        inactiveText: '爱好',
        activeValue: 1,
        inactiveValue: 0,
      },
    },
    value: {
      prop: 'gender',
      compType: 'switch',
      compProps: {
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      },
    },
  },
  {
    label: '时间',
    value: demo2DescriptionsData.value.date,
    hidden: demo2DescriptionsData.value.gender === 1,
  },
]);

// 插槽
const demo3DescriptionsData = ref({
  course: 'Vue源码课',
  price: 699,
});

const demo3Items = computed(() => [
  {
    label: 'course',
    value: 'price',
  },
]);
</script>

## 基础用法

通过配置快速生成描述列表。

<Demo>
  <ElpDescriptions v-model="demo1DescriptionsData" :items="demo1Items" border></ElpDescriptions>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElpDescriptions, type TDescriptionsItem } from '@element-plus-pro/components';

const descriptionsData = ref({
  name: '远方os',
});

const items = computed(() => [
  { label: '姓名', value: descriptionsData.value.name },
]);
<\/script>

<template>
  <ElpDescriptions v-model="descriptionsData" :items="items" border></ElpDescriptions>
</template>
```

  </template>
</Demo>

## 动态组件

支持使用函数组件和动态组件，以及动态显示/隐藏。

<Demo>
  <ElpDescriptions v-model="demo2DescriptionsData" :items="demo2Items" border></ElpDescriptions>
  
  <template #code>

```vue
<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { ElTag, ElCheckboxGroup } from 'element-plus';
import { ElpDescriptions, type TDescriptionsItem } from '@element-plus-pro/components';

const descriptionsData = ref({
  genderType: 1,
  gender: 0,
  date: '2016-05-03',
  state: [0],
});

const items = computed(() => [
  {
    span: 2,
    label: {
      compType: () => h(ElTag, { type: 'warning' }, () => '状态'),
    },
    value: {
      prop: 'state',
      compType: () =>
        h(ElCheckboxGroup, {
          options: [
            {
              label: '未付款',
              value: 0,
            },
            {
              label: '已付款',
              value: 1,
            },
            {
              label: '已发货',
              value: 2,
            },
          ],
        }),
    },
  },
  {
    label: {
      prop: 'genderType',
      compType: 'switch',
      compProps: {
        activeText: '性别',
        inactiveText: '爱好',
        activeValue: 1,
        inactiveValue: 0,
      },
    },
    value: {
      prop: 'gender',
      compType: 'switch',
      compProps: {
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      },
    },
  },
  {
    label: '时间',
    value: descriptionsData.value.date,
    hidden: descriptionsData.value.gender === 1,
  },
]);
<\/script>

<template>
  <ElpDescriptions v-model="descriptionsData" :items="items" border></ElpDescriptions>
</template>
```

  </template>
</Demo>

## 插槽

通过 `label` `value` 对应插槽名称。

<Demo>
  <ElpDescriptions v-model="demo3DescriptionsData" :items="demo3Items" border>
    <template #course>
      <el-tag type="primary" size="large">
        {{ demo3DescriptionsData.course }}
      </el-tag>
    </template>
    <template #price>
      <el-tag type="success" size="large">
        {{ demo3DescriptionsData.price }}
      </el-tag>
    </template>
  </ElpDescriptions>
  
  <template #code>

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElTag } from 'element-plus';
import { ElpDescriptions, type TDescriptionsItem } from '@element-plus-pro/components';

const descriptionsData = ref({
  course: 'Vue源码课',
  price: 699,
});

const items = computed(() => [
  {
    label: 'course',
    value: 'price',
  },
]);
<\/script>

<template>
  <ElpDescriptions v-model="descriptionsData" :items="items" border>
    <template #course>
      <el-tag type="primary" size="large">
        {{ descriptionsData.course }}
      </el-tag>
    </template>
    <template #price>
      <el-tag type="success" size="large">
        {{ descriptionsData.price }}
      </el-tag>
    </template>
  </ElpDescriptions>
</template>
```

  </template>
</Demo>

## API

### 属性

| 属性名               | 说明         | 类型                    | 默认值    |
| -------------------- | ------------ | ----------------------- | --------- |
| modelValue / v-model | 描述数据对象 | \`object\`              | —         |
| items                | 描述项配置   | \`TDescriptionsItem[]\` | \`[]\`    |
| border               | 是否带有边框 | \`boolean\`             | \`false\` |

### TDescriptionsItem 配置

| 属性名 | 说明           | 类型                                   |
| ------ | -------------- | -------------------------------------- |
| label  | 标签内容或配置 | \`string &#124; number &#124; TProps\` |
| value  | 值内容或配置   | \`string &#124; number &#124; TProps\` |
| span   | 跨列数         | \`number\`                             |
| hidden | 是否隐藏       | \`boolean\`                            |

### TProps 配置

当 \`label\` 或 \`value\` 为对象时，支持以下配置：

| 属性名    | 说明     | 类型                                     |
| --------- | -------- | ---------------------------------------- |
| prop      | 字段名   | \`string\`                               |
| compType  | 组件类型 | \`string &#124; VNode &#124; Component\` |
| compProps | 组件属性 | \`object\`                               |
