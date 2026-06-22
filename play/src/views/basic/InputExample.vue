<script setup lang="ts">
import { ref } from 'vue';
import { EplInputNumber } from '@element-plus-lego/components';

const value = ref();
</script>

<template>
  <div>
    <EplInputNumber
      v-model="value"
      :min="0"
      :step="1"
      placeholder="请输入正整数"
    />
  </div>
</template>
