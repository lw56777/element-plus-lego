<script setup lang="ts">
import { computed } from 'vue';
import {
  EplSearch,
  EplTable,
  type TEmitsAttrs,
} from '@element-plus-lego/components';
import { useTable } from '~/hooks/useTable';

const {
  loading,
  params,
  data,
  search,
  reset,
  refresh,
  onAdd,
  onEdit,
  onDelete,
  pageProps,
  pageSize,
  currentPage,
} = useTable();

const items = computed(() => [
  {
    label: '关键词',
    prop: 'keywords',
    compType: 'input',
    compProps: {
      placeholder: '请输入关键词',
    },
  },
  {
    label: '地区',
    prop: 'region',
    hidden: params.value.check,
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

const emits: TEmitsAttrs[] = [
  {
    type: 'primary',
    name: '搜索',
    nativeType: 'submit',
    onClick: search,
  },
  {
    name: '重置',
    onClick: reset,
  },
  {
    name: '刷新',
    onClick: refresh,
  },
  {
    prop: 'check',
    compType: 'switch',
    onChange: (val: boolean) => {
      console.log('onCheck', val);
    },
  },
];

const columns = computed(() => [
  {
    prop: 'name',
    label: '姓名',
    width: '180',
    compType: 'input',
  },
  {
    prop: 'region',
    label: '地区',
  },
  {
    prop: 'date',
    label: '时间区间',
    hidden: params.value.check,
  },
  {
    prop: 'delivery',
    label: '是否立即配送',
    compType: 'switch',
  },
  {
    prop: 'type',
    label: '类型',
    compType: 'select',
    compProps: {
      placeholder: '请选择类型',
      options: [
        { label: 'Online activities', value: 'Online activities' },
        { label: 'Promotion activities', value: 'Promotion activities' },
        { label: 'Offline activities', value: 'Offline activities' },
        { label: 'Simple brand exposure', value: 'Simple brand exposure' },
      ],
    },
  },
  {
    label: '一级表头',
    child: [
      {
        label: '二级表头',
        width: '180',
        child: [
          {
            prop: 'resource',
            label: '资源',
            width: '180',
          },
          {
            prop: 'desc',
            label: '描述',
          },
        ],
      },
    ],
  },
  {
    label: '操作',
    prop: 'actions',
    width: '140',
  },
]);
</script>

<template>
  <div>
    <el-card>
      <EplSearch v-model="params" :items="items" :emits="emits"></EplSearch>
    </el-card>

    <el-card class="mt-2">
      <template #header>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </template>

      <EplTable
        v-loading="loading"
        v-model="data"
        :columns="columns"
        border
        :pageProps="pageProps"
        v-model:pageSize="pageSize"
        v-model:currentPage="currentPage"
      >
        <template #date="{ row }">
          <el-tag>{{ row.date1 + ' ~~~ ' + row.date2 }}</el-tag>
        </template>

        <template #actions-header="{ column }">
          自定义表头: {{ column.label }}
        </template>
        <template #actions="{ row }">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row)">删除</el-button>
        </template>
      </EplTable>
    </el-card>
  </div>
</template>
