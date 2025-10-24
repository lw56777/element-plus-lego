<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import Background from './components/Background/index.vue';
</script>

<template>
  <div class="app">
    <ElConfigProvider :locale="zhCn">
      <RouterView />
    </ElConfigProvider>
    <Background />
  </div>
</template>
