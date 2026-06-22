<script setup lang="ts">
import { Ref, getCurrentInstance, onMounted } from 'vue';
import type { ComponentInstance } from 'vue';
import { ElInputNumber } from 'element-plus';
import { isNumber } from '@element-plus-lego/utils';

const inputNumberRef = exposed => {
  inputNumberInstance.exposed = exposed;
};
const inputNumberInstance = getCurrentInstance();
const modelValue: Ref<number | null> = defineModel({
  required: true,
});

onMounted(() => {
  if (!isNumber(modelValue.value) && modelValue.value !== null) {
    modelValue.value = Number(modelValue.value) || null;
  }
});

defineExpose({} as ComponentInstance<typeof ElInputNumber>);
</script>

<template>
  <el-input-number
    :ref="inputNumberRef"
    v-model="modelValue"
    :controls="false"
    align="left"
    v-bind="$attrs"
    class="epl-input-number"
  />
</template>

<style lang="scss">
.epl-input-number {
  &.is-without-controls {
    .el-input__wrapper {
      padding: 1px 11px;
    }
  }
}
</style>
