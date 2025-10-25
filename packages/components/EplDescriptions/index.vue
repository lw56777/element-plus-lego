<script setup lang="ts">
import { h, computed, type ComponentInstance, type PropType } from 'vue';
import { ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { isObject } from '@element-plus-lego/utils';
import type { TDescriptionsItem } from '.';
import Comp from './comp.vue';

const props = defineProps({
  items: {
    type: Array as PropType<TDescriptionsItem[]>,
    default: () => [],
  },
});

const items = computed(() => {
  return props.items.reduce((prev, item) => {
    if (item.hidden) {
      return prev;
    }

    prev.push({
      ...item,
      label: isObject(item.label)
        ? item.label
        : {
            compType: item.label,
          },
      value: isObject(item.value)
        ? item.value
        : {
            compType: item.value,
          },
    });

    return prev;
  }, []);
});

const descriptionsData = defineModel('modelValue');

defineExpose({} as ComponentInstance<typeof ElDescriptions>);
</script>

<template>
  <div class="ba-descriptions">
    <el-descriptions v-bind="$attrs">
      <el-descriptions-item
        v-for="item in items"
        :key="item.label"
        v-bind="item"
      >
        <template #label>
          <component
            :is="
              h(
                Comp,
                {
                  modelValue: descriptionsData,
                  ...item.label,
                },
                $slots,
              )
            "
          ></component>
        </template>

        <template #default>
          <component
            :is="
              h(
                Comp,
                {
                  modelValue: descriptionsData,
                  ...item.value,
                },
                $slots,
              )
            "
          ></component>
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
