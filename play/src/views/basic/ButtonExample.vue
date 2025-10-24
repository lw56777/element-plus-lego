<script setup lang="ts">
import { ElpButton } from '@element-plus-pro/components';

const onClick = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
</script>

<template>
  <div>
    <ElpButton @click="onClick">Default</ElpButton>
    <ElpButton type="primary" @click="onClick">Primary</ElpButton>
    <ElpButton type="success" @click="onClick">Success</ElpButton>
    <ElpButton type="info" @click="onClick">Info</ElpButton>
    <ElpButton type="warning" @click="onClick">Warning</ElpButton>
    <ElpButton type="danger" @click="onClick">Danger</ElpButton>
  </div>
</template>
