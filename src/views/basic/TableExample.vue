<script setup lang="ts">
import { ref, computed, type ComputedRef } from 'vue';
import type { TTableColumn } from '~/components/BaTable/BaTableColumn';

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
]);

const columns: ComputedRef<TTableColumn[]> = computed(() => [
  {
    prop: 'name',
    label: 'Name',
    width: '180',
    type: 'input',
  },
  {
    label: 'Zip',
    prop: 'zip',
    hidden: tableData.value[0]?.name === 'Tom123',
  },
  {
    prop: 'date',
    label: 'Date',
    width: '180',
  },
  {
    prop: 'city',
    label: 'City',
    width: '180',
    type: 'select',
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
    label: 'Address',
    child: [
      {
        label: 'City',
        width: '180',
        child: [
          {
            prop: 'tag',
            label: 'Tag',
            width: '180',
          },
          {
            prop: 'state',
            label: 'State',
            width: '180',
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <BaTable v-model="tableData" :columns="columns" border>
    <template #date="{ row, $index }">
      <el-button>{{ row.date + '~' + $index }}</el-button>
    </template>
  </BaTable>
</template>
