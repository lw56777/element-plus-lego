<template>
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
    </el-container>
  </el-scrollbar>
</template>
