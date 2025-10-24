<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElpSearch } from '@element-plus-pro/components';

const params = ref({
  keywords: '',
  region: '北京',
  date: [],
});

const items = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
  },
  {
    label: '地区',
    prop: 'region',
    compType: 'select',
    compProps: {
      placeholder: '请选择地区',
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
  },
  {
    label: '时间',
    prop: 'date',
    compType: 'date',
  },
]);

const onSearch = () => {
  console.log('onSearch');
};

const onReset = () => {
  console.log('onReset');
};

const onRefresh = () => {
  console.log('onRefresh');
};
</script>

<template>
  <ElpSearch
    v-model="params"
    :items="items"
    @reset="onReset"
    @refresh="onRefresh"
    @search="onSearch"
  ></ElpSearch>
</template>
