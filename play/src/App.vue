<script setup lang="ts">
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import Background from './components/Background/index.vue';
import { useRequest } from '../../packages/hooks/useRequest';

const loaddata1 = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          list: [1, 2, 3],
        },
        msg: 'success',
      });
    }, 1000);
  });
};

const loaddata2 = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          data: [7, 8, 9],
        },
        msg: 'success',
      });
    }, 1000);
  });
};

const { result: result1, data: data1 } = useRequest(loaddata1);
console.log('result1', result1);
console.log('data1', data1);

const { result: result2, data: data2 } = useRequest([loaddata1, loaddata2]);
console.log('result2', result2);
console.log('data2', data2);

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
