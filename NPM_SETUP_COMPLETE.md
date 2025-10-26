# ✅ NPM 包配置完成

恭喜！你的 Element Plus Lego 已经配置好可以发布到 npm 了。

## 📋 已完成的配置

### 1. ✅ 创建了统一的入口文件

- **文件：** `index.ts`
- **功能：**
  - 导出所有组件、hooks 和 utils
  - 提供 Vue 插件安装函数
  - 支持按需引入和完整引入

### 2. ✅ 配置了 Vite 构建

- **文件：** `vite.config.ts`
- **功能：**
  - 支持 ES Module、CommonJS 和 UMD 三种格式
  - 正确外部化 vue、element-plus 等依赖
  - 配置了全局变量映射

### 3. ✅ 更新了 package.json

- **主要配置：**
  - ✅ 移除了 `"private": true`（允许发布）
  - ✅ 添加了 `main`、`module`、`types` 入口
  - ✅ 配置了 `exports` 字段（支持现代模块系统）
  - ✅ 设置了 `files` 字段（只发布 dist 目录）
  - ✅ 配置了 `peerDependencies`（vue、element-plus）
  - ✅ 添加了 `build:lib` 脚本
  - ✅ 添加了 `prepublishOnly` 钩子（发布前自动构建）
  - ✅ 完善了 keywords、description 等元信息

### 4. ✅ 配置了 TypeScript

- **文件：** `tsconfig.json`
- **功能：**
  - 启用声明文件生成
  - 配置了正确的 include 和 exclude
  - 优化了编译选项

### 5. ✅ 创建了 .npmignore

- **功能：** 控制发布到 npm 的文件，排除不必要的文件和目录

### 6. ✅ 完善了文档

- **README.md** - 添加了安装和使用说明
- **PUBLISH.md** - 详细的发布指南
- **USAGE_EXAMPLES.md** - 完整的使用示例
- **NPM_SETUP_COMPLETE.md** - 本文档

## 📦 包结构说明

```
element-plus-lego/
├── dist/                          # 构建输出目录（发布到 npm）
│   ├── element-plus-lego.es.js     # ES Module 格式
│   ├── element-plus-lego.cjs.js    # CommonJS 格式
│   ├── element-plus-lego.umd.js    # UMD 格式
│   ├── index.d.ts                 # TypeScript 类型声明
│   └── style.css                  # 样式文件（如果有）
├── packages/                      # 源代码
│   ├── components/                # 组件
│   ├── hooks/                     # Hooks
│   └── utils/                     # 工具函数
├── index.ts                       # 统一入口文件
├── vite.config.ts                 # Vite 构建配置
├── tsconfig.json                  # TypeScript 配置
├── package.json                   # 包配置文件
├── .npmignore                     # npm 发布忽略文件
├── README.md                      # 使用文档
├── PUBLISH.md                     # 发布指南
└── USAGE_EXAMPLES.md              # 使用示例
```

## 🚀 如何发布

### 第一步：更新包信息

编辑 `package.json`，更新以下信息：

```json
{
  "name": "element-plus-lego", // 如果包名被占用，改为 @your-username/element-plus-lego
  "version": "1.0.0",
  "author": "你的名字",
  "repository": {
    "type": "git",
    "url": "https://github.com/你的用户名/element-plus-lego"
  }
}
```

### 第二步：构建项目

```bash
# 安装依赖（如果还没有安装）
pnpm install

# 构建库文件
pnpm run build:lib
```

构建成功后，`dist` 目录会包含所有需要发布的文件。

### 第三步：测试构建结果

建议先在本地测试构建结果：

```bash
# 在项目目录下
npm link

# 在测试项目中
cd /path/to/test-project
npm link element-plus-lego

# 测试引入
import { EplTable } from 'element-plus-lego'
```

### 第四步：发布到 npm

```bash
# 登录 npm（首次发布需要）
npm login

# 检查哪些文件会被发布
npm pack --dry-run

# 发布
npm publish

# 如果使用 scope 包名（@your-username/element-plus-lego）
npm publish --access public
```

### 第五步：验证发布

```bash
# 查看包信息
npm view element-plus-lego

# 在新项目中安装测试
pnpm install element-plus-lego
```

## 📝 使用方式

用户安装后可以通过以下方式使用：

### 引入

```typescript
import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { ElInput } from 'element-plus';
import ElementPlusLego from 'element-plus-lego';
import App from './App.vue';

const app = createApp(App);

// 动态组件映射
const componentMap = {
  input: ElInput,
  // ...
};

// 动态组件配置
app.use(ElementPlusLego, componentMap);

// 分页配置
// const pagination = { ... }

// 多项配置
// app.use(ElementPlusLego, { componentMap, pagination });

app.mount('#app');
```

## 🔄 版本更新流程

当需要发布新版本时：

```bash
# 1. 修改代码
# 2. 更新版本号
npm version patch  # 1.0.0 -> 1.0.1（bug 修复）
npm version minor  # 1.0.0 -> 1.1.0（新功能）
npm version major  # 1.0.0 -> 2.0.0（破坏性更改）

# 3. 提交代码
git add .
git commit -m "chore: bump version to x.x.x"
git push

# 4. 打标签
git tag vx.x.x
git push origin vx.x.x

# 5. 发布（会自动执行 build:lib）
npm publish
```

## ⚠️ 重要提示

1. **包名唯一性**：发布前确保包名在 npm 上可用

   ```bash
   npm view element-plus-lego
   ```

   如果包名已被占用，需要改名或使用 scope 包名

2. **版本号管理**：严格遵循[语义化版本规范](https://semver.org/lang/zh-CN/)

3. **依赖管理**：

   - `peerDependencies`：vue、element-plus（用户需要自行安装）
   - `dependencies`：lodash-es（会打包进去）
   - `devDependencies`：开发时依赖（不会发布）

4. **文件大小**：发布前检查包大小

   ```bash
   npm pack
   # 查看生成的 .tgz 文件大小
   ```

5. **测试充分**：发布前在实际项目中充分测试

6. **文档完善**：确保 README.md 包含清晰的使用说明

## 📚 相关文档

- 📖 [PUBLISH.md](./PUBLISH.md) - 详细的发布指南
- 📖 [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) - 完整的使用示例
- 📖 [README.md](./README.md) - 项目说明文档

## ⚡ 快速命令参考

```bash
# 开发
pnpm dev                    # 启动开发服务器
pnpm docs:dev               # 启动文档服务器

# 构建
pnpm build:lib              # 构建库文件

# 发布
npm login                   # 登录 npm
npm version patch           # 更新版本号
npm publish                 # 发布到 npm
npm publish --access public # 发布 scope 包

# 测试
npm link                    # 本地链接测试
npm pack --dry-run         # 查看将要发布的文件
```

## 🎉 恭喜

你已经完成了所有配置！现在可以开始发布你的 npm 包了。

如有问题，请查看 [PUBLISH.md](./PUBLISH.md) 获取更详细的说明。
