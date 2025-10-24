<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useDark } from '@vueuse/core';
import { useSignIn, useSignUp } from '~/hooks/useSign';

useDark({ disableTransition: false });

// 登陆
const { SignInFormComp, onSignIn } = useSignIn();

// 注册
const { SignUpFormComp, validateSignUpForm } = useSignUp();

const onSignUp = () => {
  validateSignUpForm()?.then(() => {
    ElMessage.success('注册成功');
    switchToSignIn();
  });
};

// 控制面板状态
const isRightPanelActive = ref(false);

// 切换到注册面板
const switchToSignUp = () => {
  isRightPanelActive.value = true;
};

// 切换到登录面板
const switchToSignIn = () => {
  isRightPanelActive.value = false;
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div
      class="rounded-xl relative overflow-hidden w-192 max-w-full min-h-120 transition-all duration-600"
      :class="{
        'right-panel-active': isRightPanelActive,
      }"
      :style="{
        filter: `drop-shadow(2px 2px 4px ${
          isRightPanelActive ? '#8b5cf6' : '#5aabf8'
        })`,
      }"
    >
      <!-- 注册表单容器 -->
      <div
        class="sign-up-container absolute top-0 left-0 w-1/2 h-full transition-all duration-600 z-1 opacity-0"
      >
        <div
          class="flex flex-col px-12 h-full justify-center items-center text-center bg-[var(--el-bg-color)]"
        >
          <h1 class="font-bold text-2xl mb-5">注册</h1>

          <p class="text-sm text-gray-500">随便输点</p>

          <SignUpFormComp />

          <el-button
            class="mt-4"
            style="padding: 0 42px"
            color="#626aef"
            size="large"
            round
            @click="onSignUp"
          >
            注册
          </el-button>
        </div>
      </div>

      <!-- 登录表单容器 -->
      <div
        class="sign-in-container absolute top-0 left-0 w-1/2 h-full transition-all duration-600 z-2"
      >
        <div
          class="flex flex-col px-12 h-full justify-center items-center text-center bg-[var(--el-bg-color)]"
        >
          <h1 class="font-bold text-2xl mb-5">登录</h1>

          <p class="text-sm text-gray-500">随便输点</p>

          <SignInFormComp />

          <el-button
            class="mt-4"
            style="padding: 0 42px"
            type="primary"
            size="large"
            round
            @click="onSignIn"
          >
            登陆
          </el-button>
        </div>
      </div>

      <!-- 覆盖层容器 -->
      <div
        class="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 z-100"
      >
        <div
          class="overlay text-white relative left--100% h-full w-200% transition-transform duration-600"
          :class="
            isRightPanelActive
              ? 'bg-gradient-to-r from-hex-6366f1 to-hex-8b5cf6'
              : 'bg-gradient-to-r from-hex-60a5fa to-hex-2563eb'
          "
        >
          <!-- 左侧覆盖面板 -->
          <div
            class="overlay-left absolute top-0 flex flex-col justify-center items-center px-10 h-full w-1/2 text-center transform translate-y--20% transition-transform duration-600"
          >
            <h1 class="font-bold text-2xl mb-4">已有帐号？</h1>
            <el-button type="info" plain @click="switchToSignIn">
              去登陆
            </el-button>
          </div>

          <!-- 右侧覆盖面板 -->
          <div
            class="overlay-right absolute top-0 right-0 flex flex-col justify-center items-center px-10 h-full w-1/2 text-center transition-transform duration-600"
          >
            <h1 class="font-bold text-2xl mb-4">没有帐号？</h1>
            <el-button type="info" plain @click="switchToSignUp">
              去注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 针对无法直接用UnoCSS表达的复杂动画效果 */
.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.right-panel-active .overlay {
  transform: translateX(50%);
}

.right-panel-active .overlay-left {
  transform: translateY(0);
}

.right-panel-active .overlay-right {
  transform: translateY(20%);
}
</style>
