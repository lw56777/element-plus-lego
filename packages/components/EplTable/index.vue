<script setup lang="ts">
import { computed, type ComponentInstance, type PropType } from 'vue';
import { ElTable } from 'element-plus';
import { omit } from 'lodash-es';
import type { TPageProps } from '@element-plus-lego/hooks';
import { EplTableColumn, type TTableColumn } from '../EplTableColumn';

const props = defineProps({
  columns: {
    type: Array as PropType<TTableColumn[]>,
    default: () => [],
  },
  pageProps: {
    type: Object as PropType<TPageProps>,
    default: () => ({}),
  },
});

const emits = defineEmits(['current-change', 'size-change']);

const tableData = defineModel<any[]>('modelValue');

const currentPage = defineModel<number>('currentPage');
const pageSize = defineModel<number>('pageSize');
const pageProps = computed(() =>
  omit(props.pageProps, ['pageSize', 'currentPage']),
);

defineExpose({} as ComponentInstance<typeof ElTable>);
</script>

<template>
  <div class="elp-table">
    <el-table :data="tableData" v-bind="$attrs">
      <EplTableColumn :columns="columns">
        <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </EplTableColumn>
    </el-table>

    <div class="flex justify-end mt-10">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        v-bind="pageProps"
      />
    </div>
  </div>
</template>
