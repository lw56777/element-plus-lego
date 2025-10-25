# 🚀 快速开始指南

## ✅ 配置已完成

恭喜！你的 `element-plus-pro` 包已经完全配置好，可以发布到 npm 了！

### 📊 构建结果

构建成功，生成以下文件：

- ✅ `element-plus-pro.es.js` (22KB) - ES Module 格式
- ✅ `element-plus-pro.cjs.js` (16KB) - CommonJS 格式
- ✅ `element-plus-pro.umd.js` (16KB) - UMD 格式
- ✅ `element-plus-pro.css` (158B) - 样式文件
- ✅ `index.d.ts` + 完整的类型声明文件

## 🎯 立即发布 3 步走

### 1️⃣ 更新包信息（必须）

编辑 `package.json`，替换以下占位符：

```json
{
  "author": "你的名字", // 👈 改成你的名字
  "repository": {
    "url": "https://github.com/你的用户名/element-plus-pro" // 👈 改成你的 GitHub 地址
  }
}
```

### 2️⃣ 登录 npm

```bash
npm login
# 输入你的 npm 用户名、密码、邮箱
```

> 💡 没有账号？去 [npmjs.com](https://www.npmjs.com/) 注册一个

### 3️⃣ 发布

```bash
# 直接发布（会自动构建）
npm publish

# ⚠️ 如果包名 element-plus-pro 已被占用，需要改名或使用 scope：
# 方案 1: 修改 package.json 中的 name 为其他名称
# 方案 2: 使用 scope 包名：@your-username/element-plus-pro
npm publish --access public
```

## ✨ 用户使用方式

发布成功后，用户可以这样使用：

### 安装

```bash
pnpm install element-plus-lego
# 或
npm install element-plus-lego
# 或
yarn add element-plus-lego
```

### 完整引入

```typescript
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ElementPlusLego from 'element-plus-lego';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ElementPlusLego);
app.mount('#app');
```

### 按需引入

```typescript
// 组件
import { EplTable, EplForm, EplSearch } from 'element-plus-lego';

// Hooks
import { usePagination, useRequest } from 'element-plus-lego';

// 工具函数
import { isObject, getTextWidth } from 'element-plus-lego';

// 类型
import type { Optional, Compulsory } from 'element-plus-lego';
```

## 📦 包含内容

### 🧩 组件（7 个）

- `EplTable` - 增强型表格
- `EplForm` - 增强型表单
- `EplSearch` - 搜索表单
- `EplDialog` - 增强型对话框
- `EplButton` - 增强型按钮
- `EplDescriptions` - 描述列表
- `EplTableColumn` - 表格列

### 🎣 Hooks（4 个）

- `usePagination` - 分页管理
- `useRequest` - 请求管理
- `useDynamicComponent` - 动态组件
- `useShortcuts` - 快捷键管理

### 🛠️ 工具函数（15+个）

- 类型判断：`isObject`、`isArray`、`isString`、`isNumber`、`isFunction`
- 工具函数：`hasChanged`、`getLocalStorage`、`getRandomInt`
- 数组操作：`arrayToStrategy`、`shuffleArray`、`isEqualArray`
- 颜色转换：`hexToRgba`
- DOM 操作：`getTextWidth`
- 等等...

### 📘 TypeScript 类型

- `Optional<T, K>` - 将指定属性变为可选
- `Compulsory<T, K>` - 将指定属性变为必选
- `TCompType` - 组件类型

## 🔄 更新版本

当需要发布新版本时：

```bash
# 修改代码后...

# 更新版本号
npm version patch  # 1.0.0 -> 1.0.1 (bug修复)
npm version minor  # 1.0.0 -> 1.1.0 (新功能)
npm version major  # 1.0.0 -> 2.0.0 (破坏性更改)

# 提交并发布
git push
git push --tags
npm publish
```

## 📚 更多文档

- 📖 **NPM_SETUP_COMPLETE.md** - 完整的配置说明
- 📖 **PUBLISH.md** - 详细的发布指南和常见问题
- 📖 **USAGE_EXAMPLES.md** - 所有功能的详细使用示例
- 📖 **README.md** - 项目说明文档

## ⚠️ 发布前检查清单

- [ ] 已更新 `package.json` 中的 `author` 和 `repository`
- [ ] 已运行 `pnpm run build:lib` 且构建成功
- [ ] 包名在 npm 上可用（或使用 scope 包名）
- [ ] 已登录 npm (`npm login`)
- [ ] 已测试构建的包能正常工作

## 🎉 就这么简单！

你现在可以：

1. ✅ 立即发布你的第一个版本
2. ✅ 让全世界的开发者使用你的组件库
3. ✅ 在 README 中添加 npm 徽章展示安装量

```markdown
![npm](https://img.shields.io/npm/v/element-plus-pro)
![npm](https://img.shields.io/npm/dm/element-plus-pro)
```

## 💪 下一步

发布成功后，可以考虑：

1. 📝 完善文档和示例
2. 🧪 添加单元测试
3. 📊 添加 CI/CD 自动化发布
4. 🌟 在 GitHub 上添加 Star 和 Watch
5. 🚀 推广你的组件库

## ❓ 需要帮助？

- 查看 `PUBLISH.md` 了解详细的发布流程
- 查看 `USAGE_EXAMPLES.md` 了解如何使用各个功能
- 查看 `NPM_SETUP_COMPLETE.md` 了解完整的技术细节

祝你发布顺利！🎊
