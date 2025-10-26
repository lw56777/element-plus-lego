# Dialog 对话框

函数式对话框组件，通过 Hook 快速创建对话框。

## 基础用法

使用 `useEplDialog` Hook 创建对话框。

<script setup>
import { h } from 'vue';
import { useEplDialog } from '@element-plus-lego/components';

const DialogContent = {
  props: {
    text: String
  },
  setup(props) {
    return () => h('div', {}, `对话框内容：${props.text}`);
  }
};

const handleDialog = () => {
  const { instnce, createConfirm, createCancel } = useEplDialog(
    DialogContent,
    {
      text: '传给内容组件的属性'
    },
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        createConfirm({
          name: '获取实例',
          type: 'success',
          click: () => {
            console.log('实例', instnce.value);
          },
        }),
        createConfirm({
          name: '不关闭窗口',
          type: 'warning',
          hidden: false,
          click: 'reset', // 实例上的方法名
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
import { useEplDialog } from '@element-plus-lego/components';

const DialogContent = {
  props: {
    text: String
  },
  setup(props) {
    return () => h('div', {}, `对话框内容：${props.text}`);
  }
};

const handleDialog = () => {
  const { instnce, createConfirm, createCancel } = useEplDialog(
    DialogContent,
    {
      text: '传给内容组件的属性'
    },
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        createConfirm({
          name: '获取实例',
          type: 'success',
          click: () => {
            console.log('实例', instnce.value);
          },
        }),
        createConfirm({
          name: '不关闭窗口',
          type: 'warning',
          hidden: false,
          click: 'reset', // 实例上的方法名
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

### useEplDialog

#### 参数

| 参数名         | 说明           | 类型          |
| -------------- | -------------- | ------------- |
| component      | 对话框内容组件 | \`Component\` |
| componentProps | 组件属性       | \`object\`    |
| dialogOptions  | 对话框配置     | \`object\`    |
