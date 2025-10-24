<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeFilled, Menu, Money } from '@element-plus/icons-vue';
import type { Component } from 'vue';

const router = useRouter();
const route = useRoute();

const iconMap: Record<string, Component> = {
  HomeFilled,
  Menu,
  Money,
};

const menuRoutes = computed(() => {
  const homeRoute = router.options.routes.find(route => route.path === '/home');

  if (homeRoute && homeRoute.children) {
    return homeRoute.children.filter(route => {
      return !route.meta?.hideInMenu && route.meta?.title;
    });
  }

  return [];
});

const activeMenu = computed(() => route.path);
</script>

<template>
  <div class="aside-container h-full flex flex-col">
    <el-scrollbar class="aside-scrollbar flex-1 h-full">
      <el-menu
        :default-active="activeMenu"
        router
        class="border-none h-full min-h-screen bg-transparent!"
      >
        <template v-for="routeItem in menuRoutes" :key="routeItem.path">
          <el-sub-menu
            v-if="
              routeItem.children &&
              routeItem.children.filter(child => !child.meta?.hideInMenu)
                .length > 0
            "
            :index="routeItem.path"
          >
            <template #title>
              <el-icon
                v-if="routeItem.meta?.icon && iconMap[routeItem.meta.icon]"
              >
                <component :is="iconMap[routeItem.meta.icon]" />
              </el-icon>
              <span>{{ routeItem.meta?.title }}</span>
            </template>

            <el-menu-item
              v-for="child in routeItem.children.filter(
                child => !child.meta?.hideInMenu,
              )"
              :key="child.path"
              :index="child.path"
            >
              <el-icon v-if="child.meta?.icon && iconMap[child.meta.icon]">
                <component :is="iconMap[child.meta.icon]" />
              </el-icon>
              <span>{{ child.meta?.title }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="routeItem.path">
            <el-icon
              v-if="routeItem.meta?.icon && iconMap[routeItem.meta.icon]"
            >
              <component :is="iconMap[routeItem.meta.icon]" />
            </el-icon>
            <span>{{ routeItem.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.aside-scrollbar {
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}
</style>
