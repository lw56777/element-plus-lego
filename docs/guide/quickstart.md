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

## 导入

```ts
import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import {
  ElButton,
  ElInput,
  // ...
} from 'element-plus';
import ElementPlusLego from 'element-plus-lego';
import App from './App.vue';

// 动态组件映射
const componentMap = {
  button: ElButton,
  input: ElInput,
  // ...
};

const app = createApp(App);

app.use(ElementPlusLego, componentMap);
app.mount('#app');
```

## 开始使用

现在你可以开始使用 Element Plus Lego 组件了！查看左侧导航栏了解各个组件的详细用法。
