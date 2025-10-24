# Dialog 对话框

函数式对话框组件，通过 Hook 快速创建对话框。

## 基础用法

使用 `useElpDialog` Hook 创建对话框。

<script setup>
import { h } from 'vue';
import { ElMessage } from 'element-plus';
import { useElpDialog } from '@element-plus-pro/components';

const DialogContent = {
  setup() {
    return () => h('div', { style: { padding: '20px' } }, '这是对话框内容');
  }
};

const handleDialog = () => {
  const { instnce, createConfirm, createCancel } = useElpDialog(
    DialogContent,
    {
      value: '传给内容组件的属性'
    },
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        createConfirm({
          name: '获取实例',
          type: 'success',
          click: () => {
            console.log('我自己处理', instnce.value);
          },
        }),
        createConfirm({
          name: '示例方法名并且不关闭窗口',
          type: 'warning',
          hidden: false,
          click: 'reset',
        }),
        createConfirm(),
        createCancel(),
      ],
    },
  );
};
</script>

<Demo>
  <el-button type="primary" @click="handleDialog">打开对话框</el-button>
  
  <template #code>

```vue
<script setup lang="ts">
import { useElpDialog } from '@element-plus-pro/components';
import DialogContent from './DialogContent.vue';

const handleDialog = () => {
  const { instnce, createConfirm, createCancel } = useElpDialog(
    DialogContent,
    {
      value: '传给内容组件的属性'
    },
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        createConfirm({
          name: '获取实例',
          type: 'success',
          click: () => {
            console.log('我自己处理', instnce.value);
          },
        }),
        createConfirm({
          name: '示例方法名',
          type: 'warning',
          hidden: false,
          click: 'reset',
        }),
        createConfirm(),
        createCancel(),
      ],
    },
  );
};
<\/script>

<template>
  <el-button @click="handleDialog">弹窗</el-button>
</template>
```

  </template>
</Demo>

## API

### useElpDialog

#### 参数

| 参数名         | 说明           | 类型          |
| -------------- | -------------- | ------------- |
| component      | 对话框内容组件 | \`Component\` |
| componentProps | 组件属性       | \`object\`    |
| dialogOptions  | 对话框配置     | \`object\`    |
