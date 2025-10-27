<script setup lang="ts">
import { ref, useAttrs } from 'vue';
import { omit } from 'lodash-es';
import { isFunction } from '@element-plus-lego/utils';

const loading = ref(false);
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});
const attrs = useAttrs();
const onClick = async () => {
  try {
    if (props.isLoading) {
      loading.value = true;
    }

    if (isFunction(attrs.onClick)) {
      await (attrs.onClick as Function)();
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <el-button
    :loading="loading"
    v-bind="omit(attrs, 'onClick')"
    @click="onClick"
  >
    <slot />
  </el-button>
</template>
