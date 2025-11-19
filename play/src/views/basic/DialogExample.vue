<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { useEplDialog } from '@element-plus-lego/components';
import DialogContent from '~/components/DialogContent.vue';

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
