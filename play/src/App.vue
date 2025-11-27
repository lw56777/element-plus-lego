<script setup lang="ts">
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import Background from './components/Background/index.vue';

const language = useStorage('language', 'zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
</script>

<template>
  <div class="app">
    <ElConfigProvider :locale="locale">
      <RouterView />
    </ElConfigProvider>
    <Background />
  </div>
</template>
