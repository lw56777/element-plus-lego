# Element Plus Lego 文档

本文档使用 VitePress 构建，展示 Element Plus Lego 组件库的所有组件示例和 API 文档。

## 快速开始

### 安装依赖

```bash
# 在项目根目录执行
pnpm install
```

### 启动开发服务器

```bash
# 进入 docs 目录
cd docs

# 启动文档开发服务器
pnpm dev
```

文档将在 `http://localhost:5173` 上运行。

### 构建文档

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 文档结构

```
docs/
├── .vitepress/          # VitePress 配置
│   ├── config.ts        # 站点配置
│   └── theme/           # 主题配置
│       └── index.ts     # 主题入口
├── components/          # 组件文档
│   ├── button.md
│   ├── form.md
│   ├── table.md
│   ├── search.md
│   ├── descriptions.md
│   └── dialog.md
├── guide/               # 指南
│   ├── index.md         # 介绍
│   └── quickstart.md    # 快速开始
├── index.md             # 首页
└── package.json
```

## 组件列表

- **Button 按钮** - 支持异步加载的按钮组件
- **Form 表单** - 动态配置式表单组件
- **Table 表格** - 高级表格组件，支持多级表头和自定义列
- **Search 搜索** - 搜索表单组件
- **Descriptions 描述列表** - 描述列表展示组件
- **Dialog 对话框** - 函数式对话框组件

## 特性

- ✅ 基于 VitePress 默认主题
- ✅ 完整的组件示例代码
- ✅ 实时预览组件效果
- ✅ 完整的 API 文档
- ✅ TypeScript 类型定义
- ✅ 响应式布局

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- **Element Plus Lego** - 基于 Element Plus 的高级组件库
