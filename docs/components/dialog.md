# Dialog 对话框

函数式对话框组件，通过 Hook 快速创建对话框。

## 基础用法

使用 `useEplDialog` Hook 创建对话框。

<script setup>
import { h, ref } from 'vue';
import { ElMessage, ElSwitch } from 'element-plus';
import { useEplDialog } from '@element-plus-lego/components';

const DialogContent = {
  setup(props, { expose }) {
    const delivery = ref(false);
    const getFormData = () => ({ delivery: delivery.value });
    const reset = () => { delivery.value = false; };
    const confirm = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      ElMessage.success('提交成功');
    }

    expose({
      getFormData,
      reset,
      confirm,
    });
    
    return () => h('div', [
      h('p', '对话框内容'),
      h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
        h('span', 'Delivery'),
        h(ElSwitch, {
          modelValue: delivery.value,
          'onUpdate:modelValue': (val) => { delivery.value = val; }
        })
      ])
    ]);
  }
};

const handleDialog = () => {
  const { instance, createConfirm, createCancel } = useEplDialog(
    DialogContent,
    {},
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        // 动态显示/隐藏
        createConfirm({
          name: '修改Delivery字段控制显示/隐藏',
          type: 'danger',
          hidden: instance.value?.getFormData()?.delivery,
          click: 'reset',
        }),

        // 自定义确认按钮名称和属性
        createConfirm({
          name: '不关闭弹窗',
          type: 'success',
          autoClose: false,
          click: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            ElMessage.success('提交成功，但我不关闭');
          },
        }),

        // 自定义确认按钮名称
        createConfirm('只想改个名字而已'),

        // 指定触发实例方法名
        createConfirm({
          name: '重置',
          type: 'warning',
          plain: true,
          autoClose: false,
          click: 'reset',
        }),

        // 默认确认按钮
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
import { h, ref } from 'vue';
import { ElMessage, ElSwitch } from 'element-plus';
import { useEplDialog } from '@element-plus-lego/components';

const DialogContent = {
  setup(props, { expose }) {
    const delivery = ref(false);
    const getFormData = () => ({ delivery: delivery.value });
    const reset = () => {
      delivery.value = false;
    };
    const confirm = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      ElMessage.success('提交成功');
    };

    expose({
      getFormData,
      reset,
      confirm,
    });

    return () =>
      h('div', [
        h('p', '对话框内容'),
        h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
          h('span', 'Delivery'),
          h(ElSwitch, {
            modelValue: delivery.value,
            'onUpdate:modelValue': val => {
              delivery.value = val;
            },
          }),
        ]),
      ]);
  },
};

const handleDialog = () => {
  const { instance, createConfirm, createCancel } = useEplDialog(
    DialogContent,
    {},
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        // 动态显示/隐藏
        createConfirm({
          name: '修改Delivery字段控制显示/隐藏',
          type: 'danger',
          hidden: instance.value?.getFormData()?.delivery,
          click: 'reset',
        }),

        // 自定义确认按钮名称和属性
        createConfirm({
          name: '不关闭弹窗',
          type: 'success',
          autoClose: false,
          click: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            ElMessage.success('提交成功，但我不关闭');
          },
        }),

        // 自定义确认按钮名称
        createConfirm('只想改个名字而已'),

        // 指定触发实例方法名
        createConfirm({
          name: '重置',
          type: 'warning',
          plain: true,
          autoClose: false,
          click: 'reset',
        }),

        // 默认确认按钮
        createConfirm(),
        createCancel(),
      ],
    },
  );
};
</script>

<template>
  <el-button @click="handleDialog">弹窗</el-button>
</template>
```

  </template>
</Demo>

## API

### useEplDialog

:::tip 如何获取内容组件实例
可以通过以下两种方式获取内容组件实例：

1. **直接解构 `instance`**：`useEplDialog` 返回的 `instance` 是一个 `Ref<ComponentInstance>`，可以在调用 Hook 的作用域中读取 `instance.value`。
2. **按钮回调参数**：`createConfirm` 在执行自定义 `click` 回调时，会把同一个 `instance` 作为参数传入（即 `click(instance)`），无需手动引入外部作用域即可访问。
   :::

#### 参数

| 参数名         | 说明           | 类型                                     |
| -------------- | -------------- | ---------------------------------------- |
| component      | 对话框内容组件 | \`Component \| (() => VNode) \| string\` |
| componentProps | 组件属性       | \`object\`                               |
| dialogOptions  | 对话框配置     | \`TDialogProps\`                         |

#### TDialogProps

| 属性名 | 说明                     | 类型                                              |
| ------ | ------------------------ | ------------------------------------------------- |
| footer | 自定义底部内容           | \`(() => VNode) \| (() => VNode[]) \| Component\` |
| cb     | 确认按钮执行完毕后的回调 | \`null \| (() => void)\`                          |

#### 返回值

| 属性名        | 说明           | 类型                                                         |
| ------------- | -------------- | ------------------------------------------------------------ |
| instance      | 内容组件实例   | \`Ref\<ComponentInstance\>\`                                 |
| close         | 关闭对话框方法 | \`() => void\`                                               |
| createConfirm | 创建确认按钮   | \`(props?: string \| TFooterBtnProps) => VNode\`             |
| createCancel  | 创建取消按钮   | \`(name?: string, props?: Partial\<ButtonProps\>) => VNode\` |

#### TFooterBtnProps

| 属性名    | 说明                         | 类型                                     | 默认值        |
| --------- | ---------------------------- | ---------------------------------------- | ------------- |
| name      | 按钮名称                     | \`string\`                               | \`'确认'\`    |
| hidden    | 是否隐藏按钮                 | \`boolean\`                              | \`false\`     |
| autoClose | 执行完毕后是否自动关闭对话框 | \`boolean\`                              | \`true\`      |
| click     | 点击事件处理                 | \`string \| ((...args: any[]) => void)\` | \`'confirm'\` |

:::tip 扩展属性
`TFooterBtnProps` 继承自 Element Plus 的 `ButtonProps`，因此支持所有 `el-button` 的原生属性，如 `type`、`size`、`plain`、`round`、`circle`、`loading`、`disabled` 等。

更多属性请参考 [Element Plus Button 组件文档](https://element-plus.org/zh-CN/component/button.html)。
:::

:::tip createConfirm 参数说明
`createConfirm` 支持两种传参方式：

1. **传入字符串**：直接作为按钮名称，使用默认配置

   ```javascript
   createConfirm('提交'); // 按钮名称为"提交"，其他使用默认值
   ```

2. **传入配置对象**：完整配置按钮属性
   ```javascript
   createConfirm({
     name: '提交',
     autoClose: false,
     click: 'submit',
   });
   ```
   :::

#### 触发方式

:::tip 多种触发方式
`createConfirm` 支持三种触发方式：

1. **默认触发**：不传 `click` 参数时，默认触发实例上的 `confirm` 方法
2. **指定函数**：传入函数作为 `click` 参数，直接执行该函数（函数会接收 `instance` 作为参数）
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

#### autoClose 属性

:::tip 控制对话框自动关闭
通过 `autoClose` 属性可以控制按钮执行完毕后是否自动关闭对话框：

```javascript
// 执行完毕后自动关闭（默认行为）
createConfirm({
  name: '提交',
  autoClose: true, // 默认值
});

// 执行完毕后不关闭对话框
createConfirm({
  name: '保存草稿',
  autoClose: false,
  click: async () => {
    // 执行保存操作
    await saveDraft();
  },
});
```

:::
