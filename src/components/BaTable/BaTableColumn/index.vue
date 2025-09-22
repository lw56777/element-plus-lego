<script setup lang="ts">
import type { PropType } from 'vue';
import { ElTableColumn as ElColumn } from 'element-plus';
import { useDynamicComponent } from '~/hooks/useDynamicComponent';
import BaTableColumn from './index.vue';
import type { TTableColumn } from '.';

defineOptions({
  name: 'ElTableColumn',
});

defineProps({
  columns: {
    type: Array as PropType<TTableColumn[]>,
    default: () => [],
  },
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

    <!-- 如果没有子列且需要自定义内容 -->
    <template
      v-if="column.type || $slots[column.prop!]"
      #default="{ row, $index }"
    >
      <slot :name="column.prop" :row="row" :$index="$index">
        <component
          :is="getComponent(column.type)"
          v-model="row[column.prop as typeof row]"
          v-bind="column.compProps || {}"
        />
      </slot>
    </template>
  </ElColumn>
</template>
