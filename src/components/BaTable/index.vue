<script setup lang="ts">
import { computed, type ComponentInstance, type PropType } from 'vue';
import { ElTable } from 'element-plus';
import BaTableColumn from './BaTableColumn/index.vue';
import type { TPageProps } from '~/hooks/usePagination';
import { omit } from 'lodash-es';
import type { TTableColumn } from './BaTableColumn';

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

const columns = computed(() => {
  return props.columns.filter(column => !column.hidden);
});

const currentPage = defineModel<number>('currentPage');
const pageSize = defineModel<number>('pageSize');

const pageProps = computed(() => {
  return {
    ...omit(props.pageProps, ['pageSize', 'currentPage']),
  };
});

defineExpose({} as ComponentInstance<typeof ElTable>);
</script>

<template>
  <div class="ba-table">
    <el-table :data="tableData" v-bind="$attrs">
      <BaTableColumn :columns="columns">
        <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </BaTableColumn>
    </el-table>

    <div class="pagination-wrapper flex justify-end mt-10">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        v-bind="pageProps"
      />
    </div>
  </div>
</template>
