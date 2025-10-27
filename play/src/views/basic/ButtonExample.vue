<script setup lang="ts">
import { EplButton } from '@element-plus-lego/components';

const onClick = async () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
</script>

<template>
  <div>
    <EplButton @click="onClick">Default</EplButton>
    <EplButton type="primary" @click="onClick">Primary</EplButton>
    <EplButton type="success" @click="onClick">Success</EplButton>
    <EplButton type="info" @click="onClick">Info</EplButton>
    <EplButton type="warning" @click="onClick">Warning</EplButton>
    <EplButton type="danger" @click="onClick">Danger</EplButton>
    <EplButton type="danger" @click="onClick" :is-loading="false">
      没有loading
    </EplButton>
  </div>
</template>
