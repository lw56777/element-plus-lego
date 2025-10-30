<script setup lang="ts">
import type { PropType } from 'vue';
import { useDynamicComponent } from '@element-plus-lego/hooks';
import type { TCompType } from '@element-plus-lego/utils';

const props = defineProps({
  prop: {
    type: String,
    default: '',
  },
  compType: {
    type: [String, Number, Function, Object] as PropType<TCompType>,
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
