# Table 表格

高级表格组件，支持多级表头、自定义列和动态组件。

## 基础用法

通过配置快速生成表格。

<script setup>
import { h, ref, computed } from 'vue';
import { ElTag, ElSwitch } from 'element-plus';

const tableData = ref([
  {
    date: '2016-05-03',
    name: '远方os',
    gender: 0,
    age: 35,
    city: 3,
    course: 'Vue源码课',
    price: 699,
    state: '已白嫖',
  },
  {
    date: '2016-05-02',
    name: '近圆os',
    gender: 1,
    age: 45,
    city: 2,
    course: 'Vue源码课',
    price: 999,
    state: '已下单没付钱',
  },
  {
    date: '2016-05-04',
    name: '远万os',
    gender: 1,
    age: 55,
    city: 1,
    course: 'Vue源码课',
    price: 1398,
    state: '下了两单',
  },
  {
    date: '2016-05-01',
    name: '运芳os',
    gender: 0,
    age: 65,
    city: '',
    course: 'Vue源码课',
    price: 9999,
    state: '送小姐姐',
  },
]);

const columns = computed(() => [
  // 普通列
  {
    prop: 'date',
    label: '时间',
    width: '110',
  },

  // 自定义列-插槽
  {
    prop: 'name',
    label: '姓名',
    width: '120',
    align: 'center',
    header: 'nameHeader', // 自定义表头-字符串对应插槽name
  },

  // 自定义列-函数组件
  {
    prop: 'gender',
    label: '性别',
    width: '120',
    header: ({ column }) =>
      h(ElTag, { size: 'large' }, () => `自定义: ${column.label}`), // 自定义表头-函数组件
    compType: ({ row }) =>
      h(ElSwitch, {
        modelValue: row.gender,
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      }),
  },

  // 自定义列-动态组件
  {
    prop: 'city',
    label: '城市',
    width: 120,
    compType: 'select',
    compProps: {
      placeholder: '请选择城市',
      options: [
        { label: '北京', value: 1 },
        { label: '上海', value: 2 },
        { label: '杭州', value: 3 },
      ],
    },
  },

  // 多级表头
  {
    label: '订单详情',
    child: [
      {
        prop: 'course',
        label: '课程名称',
        width: 100
      },
      {
        label: '内容介绍',
        child: [
          {
            prop: 'price',
            label: '价格',
          },
          {
            prop: 'state',
            label: '状态',
            width: 120,
          },
        ],
      },
    ],
  },

  {
    prop: 'actions',
    label: '操作',
  },
]);
</script>

<Demo>
  <EplTable v-model="tableData" :columns="columns" border>
    <template #name="{ row }">
      <el-tag type="success" size="large">{{ row.name }}</el-tag>
    </template>
    <template #nameHeader="{ column }">自定义: {{ column.label }}</template>
    <template #actions="{ row }">
      <el-button @click="console.log(row)">查看</el-button>
    </template>
  </EplTable>
  
  <template #code>

```vue
<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { ElTag, ElSwitch } from 'element-plus';
import { EplTable, type TTableColumn } from '@element-plus-lego/components';

const tableData = ref([
  {
    date: '2016-05-03',
    name: '远方os',
    gender: 0,
    age: 35,
    city: 3,
    course: 'Vue源码课',
    price: 699,
    state: '已白嫖',
  },
  {
    date: '2016-05-02',
    name: '近圆os',
    gender: 1,
    age: 45,
    city: 2,
    course: 'Vue源码课',
    price: 999,
    state: '已下单没付钱',
  },
  {
    date: '2016-05-04',
    name: '远万os',
    gender: 1,
    age: 55,
    city: 1,
    course: 'Vue源码课',
    price: 1398,
    state: '下了两单',
  },
  {
    date: '2016-05-01',
    name: '运芳os',
    gender: 0,
    age: 65,
    city: '',
    course: 'Vue源码课',
    price: 9999,
    state: '送小姐姐',
  },
]);

const columns: ComputedRef<TTableColumn[]> = computed(() => [
  // 普通列
  {
    prop: 'date',
    label: '时间',
    width: '110',
  },

  // 自定义列-插槽
  {
    prop: 'name',
    label: '姓名',
    width: '120',
    align: 'center',
    header: 'nameHeader', // 自定义表头-字符串对应插槽name
  },

  // 自定义列-函数组件
  {
    prop: 'gender',
    label: '性别',
    width: '120',
    header: ({ column }) =>
      h(ElTag, { size: 'large' }, () => `自定义: ${column.label}`), // 自定义表头-函数组件
    compType: ({ row }) =>
      h(ElSwitch, {
        modelValue: row.gender,
        activeText: '男',
        inactiveText: '女',
        activeValue: 1,
        inactiveValue: 0,
      }),
  },

  // 自定义列-动态组件
  {
    prop: 'city',
    label: '城市',
    width: 120,
    compType: 'select',
    compProps: {
      placeholder: '请选择城市',
      options: [
        { label: '北京', value: 1 },
        { label: '上海', value: 2 },
        { label: '杭州', value: 3 },
      ],
    },
  },

  // 多级表头
  {
    label: '订单详情',
    child: [
      {
        prop: 'course',
        label: '课程名称',
        width: 100
      },
      {
        label: '内容介绍',
        child: [
          {
            prop: 'price',
            label: '价格',
          },
          {
            prop: 'state',
            label: '状态',
            width: 120,
          },
        ],
      },
    ],
  },

  {
    prop: 'actions',
    label: '操作',
  },
]);
<\/script>

<template>
  <EplTable v-model="tableData" :columns="columns" border>
    <template #actions="{ row }">
      <el-button @click="console.log(row)">查看</el-button>
    </template>
  </EplTable>
</template>
```

  </template>
</Demo>

## API

### 属性

| 属性名               | 说明             | 类型               | 默认值    |
| -------------------- | ---------------- | ------------------ | --------- |
| modelValue / v-model | 表格数据         | \`array\`          | \`[]\`    |
| columns              | 列配置           | \`TTableColumn[]\` | \`[]\`    |
| border               | 是否带有纵向边框 | \`boolean\`        | \`false\` |
| pageProps            | 分页配置         | \`TPageProps\`     | -         |
| pageSize             | 每页显示条数     | \`number\`         | \`10\`    |
| currentPage          | 当前页码         | \`number\`         | \`1\`     |

### TPageProps 分页配置

| 属性名           | 说明                         | 类型         | 默认值                                |
| ---------------- | ---------------------------- | ------------ | ------------------------------------- |
| totalKey         | 数据总数的字段名             | \`string\`   | \`'total'\`                           |
| pageSizeKey      | 每页条数的字段名             | \`string\`   | \`'pageSize'\`                        |
| currentPageKey   | 当前页码的字段名             | \`string\`   | \`'currentPage'\`                     |
| background       | 是否为分页按钮添加背景色     | \`boolean\`  | \`true\`                              |
| hideOnSinglePage | 只有一页时是否隐藏分页器     | \`boolean\`  | \`true\`                              |
| layout           | 组件布局，子组件名用逗号分隔 | \`string\`   | \`'total, sizes, prev, pager, next'\` |
| small            | 是否使用小型分页样式         | \`boolean\`  | \`false\`                             |
| pageSizes        | 每页显示个数选择器的选项设置 | \`number[]\` | \`[10, 20, 30, 40, 50, 100]\`         |

更多分页配置请参考 [Element Plus Pagination](https://element-plus.org/zh-CN/component/pagination.html)

### TTableColumn 配置

| 属性名    | 说明             | 类型                                      |
| --------- | ---------------- | ----------------------------------------- |
| prop      | 字段名           | \`string\`                                |
| label     | 列标题           | \`string\`                                |
| width     | 列宽度           | \`string &#124; number\`                  |
| align     | 对齐方式         | \`'left' &#124; 'center' &#124; 'right'\` |
| header    | 自定义表头       | \`string &#124; VNode &#124; Component\`  |
| compType  | 单元格组件类型   | \`string &#124; VNode &#124; Component\`  |
| compProps | 组件属性         | \`object\`                                |
| child     | 子列（多级表头） | \`TTableColumn[]\`                        |
