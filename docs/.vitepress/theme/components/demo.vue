<template>
  <ClientOnly>
    <div class="example">
      <div class="example-showcase">
        <slot></slot>
      </div>
      <ElDivider class="m-0" />
      <div class="op-btns">
        <ElTooltip content="查看源代码" :show-arrow="false">
          <ElIcon :size="16" class="op-btn" @click="toggleCode">
            <component :is="sourceCodeVisible ? 'View' : 'Hide'" />
          </ElIcon>
        </ElTooltip>
      </div>
      <ElCollapseTransition>
        <div v-show="sourceCodeVisible" class="example-source-wrapper">
          <div class="language-vue">
            <slot name="code"></slot>
          </div>
        </div>
      </ElCollapseTransition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  ElIcon,
  ElTooltip,
  ElDivider,
  ElCollapseTransition,
} from 'element-plus';
import { View, Hide } from '@element-plus/icons-vue';

const sourceCodeVisible = ref(false);

const toggleCode = () => {
  sourceCodeVisible.value = !sourceCodeVisible.value;
};
</script>

<style scoped>
.example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  margin: 20px 0;
}

.example-showcase {
  padding: 1.5rem;
  background-color: var(--vp-c-bg);
}

.op-btns {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
  gap: 0.5rem;
}

.op-btn {
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.op-btn:hover {
  color: var(--vp-c-brand);
}

.example-source-wrapper {
  border-top: 1px solid var(--vp-c-divider);
}

.example-source {
  margin: 0;
}

.example-source :deep(pre) {
  margin: 0;
  border-radius: 0;
}

.example-source :deep(code) {
  background-color: transparent;
}

.m-0 {
  margin: 0 !important;
}
</style>
