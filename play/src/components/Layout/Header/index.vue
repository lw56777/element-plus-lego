<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import avatar1 from '../../../assets/567_1.jpg';
import avatar2 from '../../../assets/567_2.jpg';

const router = useRouter();

const signOut = () => {
  router.push({
    name: 'Login',
  });
};

const avatar = computed(() => {
  return Math.random() > 0.5 ? avatar1 : avatar2;
});
</script>

<template>
  <div class="header flex items-center justify-end h-full">
    <ul class="menu flex items-center justify-end">
      <li>
        <Theme />
      </li>

      <li>
        <Setting />
      </li>

      <li>
        <el-dropdown trigger="click">
          <el-avatar class="avatar" :size="30" :src="avatar" cursor-pointer />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="signOut">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);

  .menu {
    li {
      cursor: pointer;
      padding: 0 0.5rem;
    }
  }

  .avatar {
    animation: rotate 6s linear infinite;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
