# 📖 使用示例

本文档提供 Element Plus Lego 各个功能模块的详细使用示例。

## 📦 安装

```bash
pnpm install element-plus-lego
# 或
npm install element-plus-lego
# 或
yarn add element-plus-lego
```

## 🎯 完整引入

```typescript
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ElementPlusLego from 'element-plus-lego';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementPlusLego);
app.mount('#app');
```

## 🧩 组件使用示例

### EplTable - 增强型表格

```vue
<template>
  <EplTable
    :data="tableData"
    :columns="columns"
    :pagination="pagination"
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EplTable } from 'element-plus-lego';

const tableData = ref([
  { id: 1, name: '张三', age: 18, address: '北京' },
  { id: 2, name: '李四', age: 20, address: '上海' },
]);

const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' },
]);

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

const handlePageChange = (page: number) => {
  pagination.value.currentPage = page;
  // 加载数据...
};
</script>
```

### EplForm - 增强型表单

```vue
<template>
  <EplForm
    :model="formData"
    :items="formItems"
    :rules="rules"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EplForm } from 'element-plus-lego';

const formData = ref({
  username: '',
  password: '',
  email: '',
});

const formItems = ref([
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
  },
  {
    prop: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'input',
    placeholder: '请输入邮箱',
  },
]);

const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
});

const handleSubmit = (formData: any) => {
  console.log('提交表单：', formData);
};
</script>
```

### EplSearch - 搜索表单

```vue
<template>
  <EplSearch :items="searchItems" @search="handleSearch" @reset="handleReset" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EplSearch } from 'element-plus-lego';

const searchItems = ref([
  {
    prop: 'keyword',
    label: '关键词',
    type: 'input',
    placeholder: '请输入关键词',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: '1' },
      { label: '禁用', value: '0' },
    ],
  },
  {
    prop: 'dateRange',
    label: '日期范围',
    type: 'daterange',
  },
]);

const handleSearch = (searchData: any) => {
  console.log('搜索条件：', searchData);
  // 执行搜索...
};

const handleReset = () => {
  console.log('重置搜索条件');
  // 重新加载数据...
};
</script>
```

### EplDialog - 增强型对话框

```vue
<template>
  <EplButton @click="dialogVisible = true">打开对话框</EplButton>

  <EplDialog
    v-model="dialogVisible"
    title="提示"
    width="500px"
    @confirm="handleConfirm"
  >
    <p>这是对话框内容</p>
  </EplDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EplDialog, EplButton } from 'element-plus-lego';

const dialogVisible = ref(false);

const handleConfirm = () => {
  console.log('确认操作');
  dialogVisible.value = false;
};
</script>
```

### EplButton - 增强型按钮

```vue
<template>
  <EplButton type="primary" @click="handleClick">主要按钮</EplButton>

  <EplButton type="success" icon="Check">成功按钮</EplButton>

  <EplButton type="danger" :loading="loading">危险按钮</EplButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EplButton } from 'element-plus-lego';

const loading = ref(false);

const handleClick = () => {
  console.log('按钮点击');
};
</script>
```

### EplDescriptions - 描述列表

```vue
<template>
  <EplDescriptions :data="descData" :columns="3" border>
    <template #label="{ label }">
      <span style="font-weight: bold">{{ label }}</span>
    </template>
  </EplDescriptions>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EplDescriptions } from 'element-plus-lego';

const descData = ref([
  { label: '姓名', value: '张三' },
  { label: '年龄', value: '18' },
  { label: '性别', value: '男' },
  { label: '手机', value: '138****8888' },
  { label: '邮箱', value: 'zhangsan@example.com' },
  { label: '地址', value: '北京市朝阳区' },
]);
</script>
```

## 🎣 Hooks 使用示例

### usePagination - 分页管理

```typescript
import { usePagination } from 'element-plus-lego';

const { pagination, handleCurrentChange, handleSizeChange, resetPagination } =
  usePagination({
    pageSize: 20,
    total: 100,
  });

// 监听页码变化
watch(
  () => pagination.currentPage,
  newPage => {
    console.log('当前页码：', newPage);
    // 加载数据...
  },
);

// 监听每页条数变化
watch(
  () => pagination.pageSize,
  newSize => {
    console.log('每页条数：', newSize);
    // 重新加载数据...
  },
);
```

### useRequest - 请求管理

```typescript
import { useRequest } from 'element-plus-lego';
import { getUserList } from '@/api/user';

const { data, loading, error, run, refresh } = useRequest(getUserList, {
  immediate: true,
  onSuccess: data => {
    console.log('请求成功：', data);
  },
  onError: error => {
    console.error('请求失败：', error);
  },
});

// 手动触发请求
const handleSearch = () => {
  run({ keyword: 'test' });
};

// 刷新数据
const handleRefresh = () => {
  refresh();
};
```

### useDynamicComponent - 动态组件

```typescript
import { useDynamicComponent } from 'element-plus-lego';
import MyComponent from '@/components/MyComponent.vue';

const { component, setComponent, resetComponent } = useDynamicComponent();

// 设置组件
setComponent(MyComponent);

// 重置组件
resetComponent();
```

```vue
<template>
  <component :is="component" v-if="component" />
</template>
```

### useShortcuts - 快捷键管理

```typescript
import { useShortcuts } from 'element-plus-lego';

const { registerShortcut, unregisterShortcut } = useShortcuts();

// 注册快捷键
onMounted(() => {
  registerShortcut('ctrl+s', () => {
    console.log('保存');
    // 执行保存操作...
  });

  registerShortcut('ctrl+f', () => {
    console.log('搜索');
    // 执行搜索操作...
  });
});

// 卸载时移除快捷键
onUnmounted(() => {
  unregisterShortcut('ctrl+s');
  unregisterShortcut('ctrl+f');
});
```

## 🛠️ 工具函数使用示例

### 类型判断

```typescript
import {
  isObject,
  isArray,
  isString,
  isNumber,
  isFunction,
} from 'element-plus-lego';

console.log(isObject({})); // true
console.log(isArray([1, 2, 3])); // true
console.log(isString('hello')); // true
console.log(isNumber(123)); // true
console.log(isFunction(() => {})); // true
```

### 值变化检测

```typescript
import { hasChanged } from 'element-plus-lego';

console.log(hasChanged(1, 2)); // true
console.log(hasChanged(NaN, NaN)); // false（使用 Object.is 判断）
console.log(hasChanged('a', 'a')); // false
```

### 事件处理

```typescript
import { isOn } from 'element-plus-lego';

console.log(isOn('onClick')); // true
console.log(isOn('onChange')); // true
console.log(isOn('value')); // false
```

### 本地存储

```typescript
import { getLocalStorage } from 'element-plus-lego';

const userData = getLocalStorage('user');
console.log(userData);
```

### 随机数生成

```typescript
import { getRandomInt } from 'element-plus-lego';

const randomNum = getRandomInt(1, 100);
console.log(randomNum); // 1-100 之间的随机整数
```

### 数组转策略对象

```typescript
import { arrayToStrategy } from 'element-plus-lego';

const users = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
];

const userMap = arrayToStrategy(users, 'id', 'name');
console.log(userMap); // { 1: '张三', 2: '李四' }
```

### 数组洗牌

```typescript
import { shuffleArray } from 'element-plus-lego';

const arr = [1, 2, 3, 4, 5];
const shuffled = shuffleArray([...arr]);
console.log(shuffled); // 打乱后的数组
```

### 颜色转换

```typescript
import { hexToRgba } from 'element-plus-lego';

const rgba = hexToRgba('#ff0000', 0.5);
console.log(rgba); // 'rgba(255, 0, 0, 0.5)'
```

### 数组比较

```typescript
import { isEqualArray } from 'element-plus-lego';

console.log(isEqualArray([1, 2, 3], [1, 2, 3])); // true
console.log(isEqualArray([1, 2, 3], [1, 2, 4])); // false
```

### 文本宽度计算

```typescript
import { getTextWidth } from 'element-plus-lego';

const width = getTextWidth('Hello World', 16);
console.log(width); // 文本在 16px 字号下的宽度
```

## 📝 TypeScript 类型使用

```typescript
import type { Optional, Compulsory, TCompType } from 'element-plus-lego';

// Optional: 将指定属性变为可选
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = Optional<User, 'age'>; // { id: number, name: string, age?: number }

// Compulsory: 将指定属性变为必选
interface Config {
  width?: number;
  height?: number;
}

type RequiredConfig = Compulsory<Config, 'width'>; // { width: number, height?: number }

// TCompType: 组件类型
import { Component, VNode } from 'vue';

const comp: TCompType = 'div'; // string
const comp2: TCompType = () => h('div'); // () => VNode
const comp3: TCompType = MyComponent; // Component
```

## 🎨 完整示例

```vue
<template>
  <div class="page-container">
    <!-- 搜索区域 -->
    <EplSearch
      :items="searchItems"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 表格区域 -->
    <EplTable
      :data="tableData"
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #operation="{ row }">
        <EplButton type="primary" size="small" @click="handleEdit(row)">
          编辑
        </EplButton>
        <EplButton type="danger" size="small" @click="handleDelete(row)">
          删除
        </EplButton>
      </template>
    </EplTable>

    <!-- 编辑对话框 -->
    <EplDialog
      v-model="dialogVisible"
      title="编辑用户"
      width="600px"
      @confirm="handleSubmit"
    >
      <EplForm
        ref="formRef"
        :model="formData"
        :items="formItems"
        :rules="rules"
      />
    </EplDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  EplSearch,
  EplTable,
  EplButton,
  EplDialog,
  EplForm,
  usePagination,
  useRequest,
} from 'element-plus-lego';
import { getUserList, updateUser, deleteUser } from '@/api/user';

// 分页
const { pagination, handleCurrentChange, handleSizeChange } = usePagination();

// 请求数据
const {
  data: tableData,
  loading,
  run,
} = useRequest(getUserList, {
  immediate: true,
});

// 搜索
const searchItems = ref([
  { prop: 'keyword', label: '关键词', type: 'input' },
  { prop: 'status', label: '状态', type: 'select', options: [] },
]);

const handleSearch = (searchData: any) => {
  run({ ...searchData, page: 1 });
};

const handleReset = () => {
  run({ page: 1 });
};

// 表格列
const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' },
  { prop: 'operation', label: '操作', width: 200, slot: 'operation' },
]);

// 分页
const handlePageChange = (page: number) => {
  run({ page });
};

// 编辑
const dialogVisible = ref(false);
const formRef = ref();
const formData = ref({});
const formItems = ref([]);
const rules = ref({});

const handleEdit = (row: any) => {
  formData.value = { ...row };
  dialogVisible.value = true;
};

const handleSubmit = async () => {
  await formRef.value.validate();
  await updateUser(formData.value);
  dialogVisible.value = false;
  run({ page: pagination.currentPage });
};

// 删除
const handleDelete = async (row: any) => {
  await deleteUser(row.id);
  run({ page: pagination.currentPage });
};
</script>
```

## 📚 更多示例

查看 [在线文档](https://element-plus-pro.vercel.app/) 获取更多详细示例和 API 文档。
