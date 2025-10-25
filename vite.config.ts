import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'ElementPlusLego',
      fileName: format => `element-plus-lego.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue',
        'lodash-es',
        'vue-router',
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          'lodash-es': '_',
          'vue-router': 'VueRouter',
        },
        exports: 'named',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages', import.meta.url)),
    },
  },
});
