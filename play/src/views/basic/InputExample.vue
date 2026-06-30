<script setup lang="ts">
import { ref } from 'vue';
import { ElSpace } from 'element-plus';
import { EplInputNumber } from '@element-plus-lego/components';

const value = ref();
</script>

<template>
  <el-space>
    <EplInputNumber
      v-model="value"
      :min="0"
      :step="1"
      placeholder="请输入数字"
      size="large"
    />

    <EplInputNumber
      v-model="value"
      :min="0"
      :step="1"
      placeholder="请输入数字"
    />

    <EplInputNumber
      v-model="value"
      :min="0"
      :step="1"
      placeholder="请输入数字"
      size="small"
    />
  </el-space>
</template>
