# useRequest

请求管理 hook，提供统一的请求状态管理和错误处理。

## 功能特性

- 🔄 自动加载状态管理
- ⚡ 支持防抖请求
- 🎯 支持批量请求
- 🛡️ 自动错误处理

## 基本用法

```vue
<template>
  <div>
    <el-button @click="run" :loading="loading">
      {{ loading ? '加载中...' : '获取数据' }}
    </el-button>
    
    <div v-if="data">
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    
    <div v-if="error" style="color: red;">
      错误: {{ error.message }}
    </div>
  </div>
</template>

<script setup>
import { useRequest } from 'element-plus-lego';

// 单个请求
const fetchUser = async (params) => {
  const response = await fetch(`/api/users/${params.id}`);
  return response.json();
};

const {
  loading,
  params,
  data,
  error,
  run
} = useRequest(fetchUser, {
  params: { id: 1 },
  immediate: false
});
</script>
```

## 批量请求

```vue
<script setup>
import { useRequest } from 'element-plus-lego';

// 批量请求
const fetchUser = async (params) => {
  const response = await fetch(`/api/users/${params.id}`);
  return response.json();
};

const fetchProfile = async (params) => {
  const response = await fetch(`/api/profiles/${params.id}`);
  return response.json();
};

const {
  loading,
  params,
  data,
  error,
  run
} = useRequest([fetchUser, fetchProfile], {
  params: { id: 1 },
  immediate: true
});

// data.value 将是一个数组: [userData, profileData]
</script>
```

## 防抖请求

```vue
<script setup>
import { useRequest } from 'element-plus-lego';

const searchUsers = async (params) => {
  const response = await fetch(`/api/users/search?q=${params.query}`);
  return response.json();
};

const {
  loading,
  params,
  data,
  run
} = useRequest(searchUsers, {
  params: { query: '' },
  delay: 500,  // 500ms 防抖
  immediate: false
});

// 搜索输入时自动防抖
const handleSearch = (query) => {
  params.value.query = query;
  run(); // 会被防抖处理
};
</script>
```

## API 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| service | `TService \| TService[]` | - | 请求服务函数或函数数组 |
| options.initData | `any` | `undefined` | 初始数据 |
| options.immediate | `boolean` | `true` | 是否立即执行 |
| options.delay | `number` | `0` | 防抖等待时间（毫秒） |
| options.params | `any` | `{}` | 请求参数 |

## 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| loading | `Ref<boolean>` | 加载状态 |
| params | `Ref<any>` | 请求参数 |
| data | `Ref<any>` | 响应数据 |
| error | `Ref<any>` | 错误信息 |
| run | `() => void` | 手动执行请求 |

## 类型定义

```ts
export type TService = (...args: any[]) => Promise<any> | Promise<any>[];

export interface IOptions {
  initData?: any;     // 初始值
  immediate?: boolean; // 是否立即执行
  delay?: number;     // 防抖等待时间
  params?: any;       // 请求参数
}
```

## 使用场景

### 1. 数据列表请求
```vue
<script setup>
const fetchList = async (params) => {
  const response = await fetch('/api/list', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.json();
};

const { loading, data, run } = useRequest(fetchList);
</script>
```

### 2. 搜索功能
```vue
<script setup>
const search = async (params) => {
  const response = await fetch(`/api/search?q=${params.keyword}`);
  return response.json();
};

const { loading, data, run } = useRequest(search, {
  delay: 300,
  immediate: false
});
</script>
```

### 3. 表单提交
```vue
<script setup>
const submitForm = async (params) => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.json();
};

const { loading, run } = useRequest(submitForm, {
  immediate: false
});
</script>
```
