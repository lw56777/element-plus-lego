<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import type { Ref, ComponentInstance } from 'vue';
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
@use 'sass:map';
@use 'element-plus/theme-chalk/src/common/var.scss' as *;

@mixin input-padding($size) {
  padding: $border-width map.get($input-padding-horizontal, $size) -
    $border-width;
}

.epl-input-number {
  &.is-without-controls {
    .el-input {
      .el-input__wrapper {
        @include input-padding('default');
      }

      &--large {
        .el-input__wrapper {
          @include input-padding('large');
        }
      }

      &--small {
        .el-input__wrapper {
          @include input-padding('small');
        }
      }
    }
  }
}
</style>
