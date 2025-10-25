<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { getLocalStorage } from '@element-plus-lego/utils';
import CLightning from '../../classes/lightning';

const bgEffectValue = useStorage(
  'bgEffectValue',
  getLocalStorage('bgEffectValue'),
);
const canvasRef = ref<HTMLCanvasElement>();

const setBgEffect = () => {
  switch (bgEffectValue.value) {
    case 1:
      const branch = new CLightning(canvasRef.value!);
      branch.play();
      break;

    default:
      break;
  }
};

onMounted(() => {
  setBgEffect();
});

watch(bgEffectValue, () => {
  nextTick(() => {
    setBgEffect();
  });
});
</script>

<template>
  <div class="background w-screen h-screen pos-fixed inset-0">
    <canvas v-if="bgEffectValue == 1" ref="canvasRef" />
  </div>
</template>

<style scoped lang="scss">
.background {
  z-index: -1000;

  .fade-out {
    animation: fadeOut 3s linear forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
}
</style>
