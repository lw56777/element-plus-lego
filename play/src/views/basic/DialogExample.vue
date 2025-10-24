<script setup lang="ts">
import { useElpDialog } from '@element-plus-pro/components';
import DialogContent from '~/components/DialogContent.vue';

const handleDialog = () => {
  const { createConfirm, createCancel } = useElpDialog(
    DialogContent,
    {},
    {
      title: '弹窗标题',
      closeOnClickModal: false,
      footer: () => [
        // 自定义确认按钮名称和属性
        createConfirm({
          name: '保存',
          type: 'success',
          click: () => {
            console.log('我自己处理保存');
          },
        }),
        // 自定义确认按钮名称
        createConfirm('审核'),
        createConfirm({
          name: '重置',
          hidden: false,
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
