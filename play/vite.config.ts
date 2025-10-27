import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import UnoCSS from 'unocss/vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '~',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components', '../../packages/components'],
      dts: true,
    }),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    UnoCSS(),
  ],
});
