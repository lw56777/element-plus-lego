# Button 按钮

支持异步加载的按钮组件。

## 基础用法

ElpButton 在原生 Button 基础上增加了异步加载功能，点击按钮时会自动显示加载状态。

<script setup>
const onClick = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
</script>

<Demo>
  <ElpButton @click="onClick">Default</ElpButton>
  <ElpButton type="primary" @click="onClick">Primary</ElpButton>
  <ElpButton type="success" @click="onClick">Success</ElpButton>
  <ElpButton type="info" @click="onClick">Info</ElpButton>
  <ElpButton type="warning" @click="onClick">Warning</ElpButton>
  <ElpButton type="danger" @click="onClick">Danger</ElpButton>
  
  <template #code>

```vue
<script setup lang="ts">
const onClick = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
<\/script>

<template>
  <ElpButton @click="onClick">Default</ElpButton>
  <ElpButton type="primary" @click="onClick">Primary</ElpButton>
  <ElpButton type="success" @click="onClick">Success</ElpButton>
  <ElpButton type="info" @click="onClick">Info</ElpButton>
  <ElpButton type="warning" @click="onClick">Warning</ElpButton>
  <ElpButton type="danger" @click="onClick">Danger</ElpButton>
</template>
```

  </template>
</Demo>

## 特性

- 自动处理异步加载状态
- 加载时自动禁用按钮防止重复点击
- 完全兼容 Element Plus Button 的所有属性

## API

### 属性

继承 Element Plus Button 的所有属性。

### 事件

| 事件名 | 说明                       | 类型                          |
| ------ | -------------------------- | ----------------------------- |
| click  | 点击事件，支持返回 Promise | `() => void \| Promise<void>` |
