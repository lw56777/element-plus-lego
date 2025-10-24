<script setup lang="ts">
import { useDynamicComponent } from '@element-plus-pro/hooks';
import type { TCompType } from '@element-plus-pro/utils';
import type { PropType } from 'vue';

const props = defineProps({
  prop: {
    type: String,
    default: '',
  },
  compType: {
    type: [String, Function, Object] as PropType<TCompType>,
    default: '',
  },
  compProps: {
    type: Object,
    default: () => ({}),
  },
});

const descriptionsData = defineModel('modelValue');

const { getComponent } = useDynamicComponent();
</script>

<template>
  <slot :name="compType">
    <component
      v-if="prop"
      :is="getComponent(compType, descriptionsData)"
      v-model="descriptionsData[prop]"
      v-bind="compProps"
    />

    <component v-else :is="getComponent(compType)" v-bind="compProps" />
  </slot>
</template>
