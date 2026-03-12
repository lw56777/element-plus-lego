# usePagination

分页管理 hook，结合了 `useRequest` 和 Element Plus 的分页组件，提供完整的分页功能。

## 功能特性

- 🔄 自动分页参数管理
- 📊 支持全局分页配置
- 🎯 与 Element Plus Pagination 组件完美集成
- ⚡ 自动处理页码和每页大小变化

## 基本用法

```vue
<template>
  <div>
    <!-- 使用 EplTable 组件，内置分页功能 -->
    <EplTable
      v-loading="loading"
      v-model="data"
      :columns="columns"
      :pageProps="pageProps"
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { EplTable, usePagination } from 'element-plus-lego';

// 模拟 API 请求
const fetchUsers = async params => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response.json();
};

// 使用分页 hook
const { pageProps, loading, params, pageSize, currentPage, data, run } =
  usePagination(fetchUsers, {
    pagination: {
      totalKey: 'total',
      pageSizeKey: 'pageSize',
      currentPageKey: 'currentPage',
      pageSize: 10,
    },
  });

// 表格列配置
const columns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
    width: '180',
    compType: 'input',
  },
  {
    prop: 'age',
    label: '年龄',
    compType: 'input',
    compProps: {
      type: 'number',
    },
  },
  {
    prop: 'email',
    label: '邮箱',
    compType: 'input',
  },
  {
    prop: 'status',
    label: '状态',
    compType: 'select',
    compProps: {
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
      ],
    },
  },
]);
</script>
```

## 高级用法

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <EplSearch
      v-model="searchParams"
      :items="searchItems"
      :emits="searchEmits"
    />

    <!-- 数据表格 -->
    <EplTable
      v-loading="loading"
      v-model="data"
      :columns="columns"
      :pageProps="pageProps"
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      border
    >
      <template #actions="{ row }">
        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" link @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </EplTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { EplTable, EplSearch, usePagination } from 'element-plus-lego';

// 搜索参数
const searchParams = ref({
  name: '',
  status: '',
  department: 'IT',
});

// 搜索表单项配置
const searchItems = computed(() => [
  {
    label: '姓名',
    prop: 'name',
    compType: 'input',
    compProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    label: '状态',
    prop: 'status',
    compType: 'select',
    compProps: {
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
      ],
    },
  },
]);

// 搜索按钮配置
const searchEmits = [
  {
    type: 'primary',
    name: '搜索',
    nativeType: 'submit',
    onClick: handleSearch,
  },
  {
    name: '重置',
    onClick: handleReset,
  },
];

// 自定义分页配置
const { pageProps, loading, params, pageSize, currentPage, data, run } =
  usePagination(fetchUsers, {
    // 初始参数
    params: searchParams,

    // 分页配置
    pagination: {
      totalKey: 'totalCount', // 后端返回的总数字段
      pageSizeKey: 'size', // 后端接收的每页大小字段
      currentPageKey: 'pageNum', // 后端接收的页码字段
      pageSize: 20, // 默认每页条数

      // Element Plus Pagination 的其他属性
      background: true,
      hideOnSinglePage: false,
      layout: 'total, sizes, prev, pager, next, jumper',
    },

    // useRequest 的其他选项
    immediate: true,
    delay: 300,
  });

// 表格列配置
const columns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
    width: '180',
    compType: 'input',
  },
  {
    prop: 'age',
    label: '年龄',
    compType: 'input',
    compProps: {
      type: 'number',
    },
  },
  {
    prop: 'email',
    label: '邮箱',
    compType: 'input',
  },
  {
    prop: 'status',
    label: '状态',
    compType: 'select',
    compProps: {
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'inactive' },
      ],
    },
  },
  {
    label: '操作',
    prop: 'actions',
    width: '140',
  },
]);

// API 请求函数
async function fetchUsers(params) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return response.json();
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  run();
};

// 重置
const handleReset = () => {
  searchParams.value = {
    name: '',
    status: '',
    department: 'IT',
  };
  currentPage.value = 1;
  run();
};

// 编辑
const handleEdit = row => {
  console.log('编辑', row);
};

// 删除
const handleDelete = row => {
  console.log('删除', row);
};
</script>
```

## API 参数

| 参数                              | 类型       | 默认值          | 说明                           |
| --------------------------------- | ---------- | --------------- | ------------------------------ |
| service                           | `TService` | -               | 请求服务函数                   |
| options.pagination.totalKey       | `string`   | `'total'`       | 后端返回数据中总条数的字段名   |
| options.pagination.pageSizeKey    | `string`   | `'pageSize'`    | 后端返回数据中每页大小的字段名 |
| options.pagination.currentPageKey | `string`   | `'currentPage'` | 后端返回数据中当前页码的字段名 |
| options.pagination.pageSize       | `number`   | `10`            | 默认每页显示的条数             |
| options.params                    | `any`      | `{}`            | 额外的请求参数                 |
| options.immediate                 | `boolean`  | `true`          | 是否立即执行请求               |
| options.delay                     | `number`   | `0`             | 防抖延迟时间（毫秒）           |

## 返回值

| 属性        | 类型              | 说明                               |
| ----------- | ----------------- | ---------------------------------- |
| pageProps   | `Ref<TPageProps>` | Element Plus Pagination 组件的属性 |
| loading     | `Ref<boolean>`    | 加载状态                           |
| params      | `Ref<any>`        | 请求参数（包含分页参数）           |
| pageSize    | `Ref<number>`     | 每页大小                           |
| currentPage | `Ref<number>`     | 当前页码                           |
| data        | `Ref<any>`        | 响应数据                           |
| run         | `() => void`      | 手动执行请求                       |

## 全局配置

通过插件注册时的 `pagination` 选项可以设置全局分页配置：

```ts
// main.ts
import ElementPlusLego from 'element-plus-lego';

const pagination = {
  totalKey: 'totalCount',
  pageSizeKey: 'size',
  currentPageKey: 'pageNum',
  pageSize: 20,
};

app.use(ElementPlusLego, { pagination });
```

全局配置会被所有 `usePagination` 实例继承（后续所有分页请求只需传入剩余参数即可），但可以在具体使用时覆盖。
