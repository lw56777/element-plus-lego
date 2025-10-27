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

#### 返回值

| 属性名        | 说明           | 类型                         |
| ------------- | -------------- | ---------------------------- |
| instnce       | 内容组件实例   | \`Ref\<ComponentInstance\>\` |
| close         | 关闭对话框方法 | \`() => void\`               |
| createConfirm | 创建确认按钮   | \`(props?) => VNode\`        |
| createCancel  | 创建取消按钮   | \`(name?, props?) => VNode\` |

#### TFooterBtnProps

| 属性名 | 说明                     | 类型                               | 默认值        |
| ------ | ------------------------ | ---------------------------------- | ------------- |
| name   | 按钮名称                 | \`string\`                         | \`'确认'\`    |
| hidden | 执行完毕后是否关闭对话框 | \`boolean\`                        | \`true\`      |
| click  | 点击事件处理             | \`string \| ((instance) => void)\` | \`'confirm'\` |

#### 触发方式

:::tip 多种触发方式
`createConfirm` 支持三种触发方式：

1. **默认触发**：不传 `click` 参数时，默认触发实例上的 `confirm` 方法
2. **指定函数**：传入函数作为 `click` 参数，直接执行该函数
3. **实例方法**：传入字符串作为 `click` 参数，调用实例上对应名称的方法

```javascript
// 默认触发实例的 confirm 方法
createConfirm();

// 传入自定义函数
createConfirm({
  click: instance => {
    console.log('自定义处理', instance);
  },
});

// 调用实例上的 reset 方法
createConfirm({
  click: 'reset',
});
```

:::
