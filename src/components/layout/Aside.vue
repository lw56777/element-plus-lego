<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeFilled, Menu, Money } from '@element-plus/icons-vue';
import type { Component } from 'vue';

const router = useRouter();
const route = useRoute();

// 图标映射对象，将字符串名称映射到实际的图标组件
const iconMap: Record<string, Component> = {
  HomeFilled,
  Menu,
  Money,
};

// 直接从路由配置中获取顶级路由，避免重复渲染
const menuRoutes = computed(() => {
  // 直接使用路由器的options获取原始路由配置，避免获取到展开后的所有路由
  return router.options.routes.filter(route => {
    // 过滤掉不需要在菜单中显示的路由
    return !route.meta?.hideInMenu && route.meta?.title;
  });
});

// 获取当前激活的菜单项
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
          <!-- 如果有子路由，渲染子菜单 -->
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

          <!-- 普通菜单项 -->
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
