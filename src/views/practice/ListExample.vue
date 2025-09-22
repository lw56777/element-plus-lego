<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useTable } from '~/hooks/useTable';
import type { TEmitsAttrs } from '~/components/BaSearch';
import { useBaDialog } from '~/components/BaDialog';
import DialogContent from '~/components/BaDialog/index.vue';

const {
  params,
  loading,
  data,
  search,
  reset,
  refresh,
  onAdd,
  onEdit,
  onDelete,
  pageProps,
  currentPage,
  pageSize,
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
    compType: 'select',
    hidden: params.value.check,
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
    type: 'input',
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
    type: 'switch',
  },
  {
    prop: 'type',
    label: '类型',
    type: 'select',
    props: {
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
    width: '120',
  },
]);

const add = () => {
  const { createConfirm, createCancel } = useBaDialog(
    DialogContent,
    {},
    {
      title: '添加数据',
      closeOnClickModal: false,
      footer: () => [
        createCancel(),
        createConfirm({
          name: '提交',
          click: async (instnce: any) => {
            await instnce.validate();
            await onAdd();
            ElMessage.success('添加成功');
            refresh();
          },
        }),
      ],
    },
  );
};

const edit = (row: any) => {
  const { instnce, createConfirm, createCancel } = useBaDialog(
    DialogContent,
    {
      row,
    },
    {
      title: '编辑数据',
      closeOnClickModal: false,
      footer: () => [
        createCancel(),
        createConfirm({
          name: '更新',
          click: async () => {
            await instnce.value.validate();
            await onEdit(row);
            ElMessage.success('更新成功');
            refresh();
          },
        }),
      ],
    },
  );
};

const del = (row: any) => {
  const { createConfirm, createCancel } = useBaDialog(
    '确定要删除吗？',
    {},
    {
      title: '删除数据',
      closeOnClickModal: false,
      width: '420px',
      footer: () => [
        createCancel(),
        createConfirm({
          click: async () => {
            await onDelete(row);
            ElMessage.success('删除成功');
            refresh();
          },
        }),
      ],
    },
  );
};
</script>

<template>
  <div>
    <el-card>
      <BaSearch v-model="params" :items="items" :emits="emits"></BaSearch>
    </el-card>

    <el-card class="mt-2">
      <template #header>
        <el-button type="primary" @click="add">添加</el-button>
      </template>

      <BaTable
        v-loading="loading"
        v-model="data"
        :columns="columns"
        border
        :pageProps="pageProps"
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
      >
        <template #date="{ row }">
          <el-tag>{{ row.date1 + ' ~~~ ' + row.date2 }}</el-tag>
        </template>

        <template #actions="{ row }">
          <el-button type="primary" link @click="edit(row)">编辑</el-button>
          <el-button type="danger" link @click="del(row)">删除</el-button>
        </template>
      </BaTable>
    </el-card>
  </div>
</template>
