<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { Sunrise, MoonNight } from '@element-plus/icons-vue';

const isDark = useDark({ disableTransition: false });
const color = '#2c2c2c';
// @ts-ignore
const hasTranstion = document.startViewTransition || false;

const themeToggle = (e: MouseEvent) => {
  if (!hasTranstion) {
    isDark.value = !isDark.value;
    return;
  }

  const x = e.clientX;
  const y = e.clientY;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  const cliPatch = [
    `circle(0% at ${x}px ${y}px)`,
    `circle(${radius}px at ${x}px ${y}px)`,
  ];
  // @ts-ignore
  const transition = document.startViewTransition(() => {
    isDark.value = !isDark.value;
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: isDark.value ? cliPatch.reverse() : cliPatch,
      },
      {
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
        duration: 500,
      },
    );
  });
};
</script>

<template>
  <div class="theme">
    <el-switch
      :modelValue="isDark"
      :style="`--el-switch-on-color: ${color};`"
      @click="themeToggle($event)"
    >
      <template #active-action>
        <el-icon color="#fff">
          <MoonNight />
        </el-icon>
      </template>
      <template #inactive-action>
        <el-icon :color="color">
          <Sunrise />
        </el-icon>
      </template>
    </el-switch>
  </div>
</template>

<style lang="scss">
.theme {
  .el-switch {
    .el-switch__core .el-switch__action {
      background-color: var(--switch-action-color);
    }
  }

  ::view-transition-new(root) {
    background-color: red;
  }
}
</style>
