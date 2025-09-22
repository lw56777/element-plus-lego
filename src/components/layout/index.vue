<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <el-scrollbar height="100vh">
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>

        <el-container>
          <el-header style="border-bottom: var(--el-border)">
            <Header />
          </el-header>
          <el-main>
            <router-view />
          </el-main>
        </el-container>

        <Background />
      </el-container>
    </el-scrollbar>
  </ElConfigProvider>
</template>
