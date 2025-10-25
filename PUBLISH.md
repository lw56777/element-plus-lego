# 📦 发布指南

本文档说明如何将 element-plus-pro 发布到 npm。

## 📋 发布前准备

### 1. 确保已登录 npm

```bash
npm login
```

如果没有 npm 账号，请先到 [npmjs.com](https://www.npmjs.com/) 注册。

### 2. 检查包名是否可用

在发布之前，确保包名 `element-plus-pro` 在 npm 上可用。如果已被占用，需要在 `package.json` 中修改包名。

你可以在 npm 官网搜索或使用命令：

```bash
npm view element-plus-pro
```

如果包名不可用，可以使用带 scope 的包名，例如：`@your-username/element-plus-pro`

### 3. 更新版本号

根据语义化版本规范更新 `package.json` 中的版本号：

```bash
# 补丁版本（bug 修复）
npm version patch

# 次版本（新功能）
npm version minor

# 主版本（破坏性更改）
npm version major
```

### 4. 更新必要信息

编辑 `package.json`，确保以下信息正确：

```json
{
  "name": "element-plus-pro",
  "version": "1.0.0",
  "description": "Element Plus 二次封装组件库，提供更强大和易用的企业级组件",
  "author": "你的名字",
  "repository": {
    "type": "git",
    "url": "https://github.com/你的用户名/element-plus-pro"
  },
  "bugs": {
    "url": "https://github.com/你的用户名/element-plus-pro/issues"
  },
  "homepage": "https://github.com/你的用户名/element-plus-pro#readme"
}
```

## 🔨 构建项目

在发布之前，需要先构建项目：

```bash
# 安装依赖
pnpm install

# 构建库文件
pnpm run build:lib
```

构建完成后会在 `dist` 目录生成以下文件：

- `element-plus-pro.es.js` - ES Module 格式
- `element-plus-pro.cjs.js` - CommonJS 格式
- `element-plus-pro.umd.js` - UMD 格式
- `index.d.ts` - TypeScript 类型声明文件
- `style.css` - 样式文件（如果有）

## 🚀 发布到 npm

### 方式一：使用 npm publish

```bash
# 发布到 npm（首次发布）
npm publish

# 如果使用 scope 包名，首次发布需要加上 --access public
npm publish --access public
```

### 方式二：使用 pnpm publish

```bash
# 发布到 npm
pnpm publish

# 如果使用 scope 包名
pnpm publish --access public
```

> **注意：** `package.json` 中配置了 `prepublishOnly` 脚本，会在发布前自动执行 `build:lib`。

## 📝 发布后验证

### 1. 检查包是否发布成功

```bash
npm view element-plus-pro
```

### 2. 在新项目中测试安装

```bash
# 创建测试项目
npm init vue@latest test-project
cd test-project

# 安装你的包
pnpm install element-plus-pro

# 测试引入
```

### 3. 测试代码

在测试项目的 `main.ts` 中：

```typescript
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import ElementPlusLego from 'element-plus-lego';
import 'element-plus-lego/dist/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);
app.use(ElementPlusLego);
app.mount('#app');
```

## 🔄 更新发布

当需要发布新版本时：

1. 修改代码
2. 更新版本号：`npm version [patch|minor|major]`
3. 提交代码到 Git
4. 发布：`npm publish`

## 🏷️ 发布 Beta 版本

如果想发布测试版本：

```bash
# 更新版本为 beta
npm version 1.0.0-beta.0

# 发布 beta 版本
npm publish --tag beta

# 用户安装 beta 版本
npm install element-plus-pro@beta
```

## ⚠️ 注意事项

1. **首次发布**：确保包名在 npm 上唯一
2. **版本管理**：遵循语义化版本规范
3. **文档完善**：确保 README.md 包含清晰的使用说明
4. **测试充分**：发布前在本地充分测试
5. **Git 标签**：发布后给当前版本打上 Git 标签
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## 🛠️ 常见问题

### 1. 包名已被占用

修改 `package.json` 中的包名，使用带 scope 的包名：

```json
{
  "name": "@your-username/element-plus-pro"
}
```

### 2. 发布失败：403 Forbidden

可能的原因：

- 未登录 npm：执行 `npm login`
- 包名已存在且无权限：更换包名或联系原作者
- 使用 scope 包名但未添加 `--access public`

### 3. 类型声明文件未生成

确保：

- `tsconfig.json` 中 `declaration` 设置为 `true`
- 执行了 `vue-tsc --declaration --emitDeclarationOnly --outDir dist`

### 4. 用户安装后无法使用

检查：

- `package.json` 中的 `main`、`module`、`types` 路径是否正确
- `exports` 字段配置是否正确
- `peerDependencies` 是否正确设置

## 📚 相关资源

- [npm 官方文档](https://docs.npmjs.com/)
- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [发布 npm 包教程](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
