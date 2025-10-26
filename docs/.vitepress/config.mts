import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Element Plus Lego',
  description: '基于 Element Plus 的高级组件库',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      { text: 'Hooks', link: '/hooks/usePagination' },
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
          text: '高阶组件',
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
      '/hooks/': [
        {
          text: 'Hooks 使用指南',
          items: [
            { text: 'usePagination', link: '/hooks/usePagination' },
            { text: 'useRequest', link: '/hooks/useRequest' },
            { text: 'useDynamicComponent', link: '/hooks/useDynamicComponent' },
            { text: 'useShortcuts', link: '/hooks/useShortcuts' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lw56777/element-plus-lego',
      },
    ],
  },
});
