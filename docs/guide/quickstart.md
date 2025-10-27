# 快速开始

本节将介绍如何在项目中使用 Element Plus Lego。

## 安装

```bash
# 使用 pnpm
pnpm install element-plus-lego

# 使用 npm
npm install element-plus-lego

# 使用 yarn
yarn add element-plus-lego
```

## 引入

```ts
import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { ElInput } from 'element-plus';
import ElementPlusLego from 'element-plus-lego';
import 'element-plus-lego/dist/index.css';
import App from './App.vue';

const app = createApp(App);

// 动态组件映射
const componentMap = {
  input: ElInput,
  // ...
};

// 动态组件配置
app.use(ElementPlusLego, componentMap);

// 分页配置
// const pagination = { ... }

// 多项配置
// app.use(ElementPlusLego, { componentMap, pagination });

app.mount('#app');
```

## 配置说明

### 动态组件配置 (componentMap)

动态组件映射用于将字符串标识符映射到实际的 Vue 组件，这样可以在运行时动态渲染组件。

| 参数  | 类型      | 说明                             | 示例                                  |
| ----- | --------- | -------------------------------- | ------------------------------------- |
| key   | string    | 组件标识符，用于在配置中引用组件 | `'input'`, `'select'`, `'datePicker'` |
| value | Component | 实际的 Vue 组件                  | `ElInput`, `ElSelect`, `ElDatePicker` |

**示例：**

```ts
const componentMap = {
  input: ElInput,
  select: ElSelect,
  datePicker: ElDatePicker,
  // ... 更多组件
};
```

### 分页配置 (pagination)

分页配置用于统一管理分页相关的参数，确保分页组件能够正确解析后端返回的数据。

| 参数           | 类型   | 默认值          | 说明                           | 示例                       |
| -------------- | ------ | --------------- | ------------------------------ | -------------------------- |
| totalKey       | string | `'total'`       | 后端返回数据中总条数的字段名   | `'total'`, `'totalCount'`  |
| pageSizeKey    | string | `'pageSize'`    | 后端返回数据中每页大小的字段名 | `'pageSize'`, `'size'`     |
| currentPageKey | string | `'currentPage'` | 后端返回数据中当前页码的字段名 | `'pageIndex'`, `'pageNum'` |
| pageSize       | number | `10`            | 默认每页显示的条数             | `10`, `20`, `30`           |

**示例：**

```ts
const pagination = {
  totalKey: 'totalCount', // 后端返回: { totalCount: 100 }
  pageSizeKey: 'size', // 后端返回: { size: 10 }
  currentPageKey: 'current', // 后端返回: { current: 1 }
  pageSize: 20, // 默认每页20条
};
```

## 开始使用

现在你可以开始使用 Element Plus Lego 组件了！查看左侧导航栏了解各个组件的详细用法。
