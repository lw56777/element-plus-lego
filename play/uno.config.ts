import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(), // 基础预设
    presetAttributify(), // 属性化模式
    presetIcons({
      collections: {
        // 可以根据需要添加图标集合
      },
    }),
  ],
  theme: {
    // 自定义主题变量
    colors: {
      primary: '#409eff',
      success: '#67c23a',
      warning: '#e6a23c',
      danger: '#f56c6c',
      info: '#909399',
    },
    spacing: {
      // 自定义间距
    },
  },
  shortcuts: [
    // 创建一些常用的快捷类
    ['flex-center', 'flex justify-center items-center'],
    ['flex-between', 'flex justify-between items-center'],
    ['flex-end', 'flex justify-end items-center'],
    [
      'absolute-center',
      'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    ],
  ],
  rules: [
    // 自定义规则
    [/^z-(\d+)$/, ([, d]) => ({ 'z-index': d })],
    [/^left-(-?\d+)%$/, ([, d]) => ({ left: `${d}%` })],
    [/^w-(\d+)%$/, ([, d]) => ({ width: `${d}%` })],
    [
      /^translate-([xy])-(-?\d+)%$/,
      ([, axis, d]) => ({
        transform: `translate${axis.toUpperCase()}(${d}%)`,
      }),
    ],
    [
      /^translate-([xy])--(\d+)%$/,
      ([, axis, d]) => ({
        transform: `translate${axis.toUpperCase()}(-${d}%)`,
      }),
    ],
    // 支持16进制颜色
    [
      /^bg-hex-([a-fA-F0-9]{6})$/,
      ([, hex]) => ({ 'background-color': `#${hex}` }),
    ],
    [/^text-hex-([a-fA-F0-9]{3,6})$/, ([, hex]) => ({ color: `#${hex}` })],
    [
      /^border-hex-([a-fA-F0-9]{3,6})$/,
      ([, hex]) => ({ 'border-color': `#${hex}` }),
    ],
  ],
});
