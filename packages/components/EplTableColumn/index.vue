<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { ElTableColumn as ElColumn } from 'element-plus';
import { useDynamicComponent } from '@element-plus-lego/hooks';
import BaTableColumn from './index.vue';
import type { TTableColumn } from '.';

defineOptions({
  name: 'ElTableColumn',
});

const props = defineProps({
  columns: {
    type: Array as PropType<TTableColumn[]>,
    default: () => [],
  },
});

const columns = computed(() => {
  return props.columns.filter(column => !column.hidden);
});

const { getComponent } = useDynamicComponent();
</script>

<template>
  <ElColumn
    v-for="column in columns"
    :key="column.prop || column.label"
    v-bind="column"
  >
    <!-- 如果有子列 -->
    <BaTableColumn v-if="column.child" :columns="column.child" />

    <!-- 自定义表头 -->
    <template v-if="column.header" #header="scope">
      <slot :name="column.header" v-bind="scope">
        <component :is="getComponent(column.header, scope)" />
      </slot>
    </template>

    <!-- 自定义内容 -->
    <template v-if="column.compType || $slots[column.prop!]" #default="scope">
      <slot :name="column.prop" v-bind="scope">
        <component
          :is="getComponent(column.compType, scope)"
          v-model="scope.row[column.prop]"
          v-bind="(column.compProps as Record<string, any>) || {}"
        />
      </slot>
    </template>
  </ElColumn>
</template>
