import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Element Plus Pro',
  description: '基于 Element Plus 的高级组件库',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '说明', link: '/guide/' },
            { text: '快速开始', link: '/guide/quickstart' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Search 搜索', link: '/components/search' },
            { text: 'Descriptions 描述列表', link: '/components/descriptions' },
            { text: 'Dialog 对话框', link: '/components/dialog' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lw56777/element-plus-pro',
      },
    ],
  },
});
