# 快速开始

本节将介绍如何在项目中使用 Element Plus Pro。

## 安装

```bash
# 使用 pnpm
pnpm install element-plus-pro

# 使用 npm
npm install element-plus-pro

# 使用 yarn
yarn add element-plus-pro
```

## 完整引入

```ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import ElementPlusPro from 'element-plus-pro';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementPlusPro);
app.mount('#app');
```

## 按需引入

```vue
<script setup lang="ts">
import { ElpButton } from 'element-plus-pro';
</script>

<template>
  <ElpButton>点击</ElpButton>
</template>
```

## 开始使用

现在你可以开始使用 Element Plus Pro 组件了！查看左侧导航栏了解各个组件的详细用法。
