# 时序花园｜AI 思维训练产品原型

时序花园是一个面向 8–12 岁孩子及家长的 AI 思维训练产品原型。
它通过“条件变化实验、方法分流、错因回放和家长报告”，把抽象的数理训练转化为可操作、可反馈、可迁移的互动任务。

这个项目当前定位为一个可上线展示的 AI 教育作品站，而不是完整商业产品。它的核心价值在于：
- 让孩子通过交互训练理解“变化过程”和“方法差异”
- 让系统基于行为给出错因反馈与轻量提示
- 让家长通过简洁报告看见孩子具体卡点与迁移情况

## 产品定位

面向对象：
- 8–12 岁孩子
- 关注学习过程的家长

要解决的问题：
- 孩子“听懂但不会做”
- 孩子“会做但不会迁移”
- 家长“看不懂具体卡点”

当前产品原型的对外表达重点：
- 可讲：首页能说明它是什么、解决什么问题
- 可看：有统一导航、评测页、家长报告页
- 可体验：可直接进入训练页面完成交互

## 页面结构

```text
/                  首页 Landing Page
/rose-growth       蔷薇花墙（核心训练关）
/tulip-growth      郁金香花海（迁移小关）
/parent-report     家长报告中心
/evaluation        评测与 Bad Case
```

### 页面说明

#### 1. 首页
首页不再自动跳转，而是作为作品站 Landing Page，包含：
- Hero 区
- 平台定位
- 模块导航
- 优势与局限
- 页脚说明

#### 2. 蔷薇花墙
核心训练关卡。
孩子通过调节起点、增长方式、增长速率等参数，观察第 7 天的结果，建立对增长节奏的直觉。

#### 3. 郁金香花海
迁移小关。
换了新场景，但复用同一套增长逻辑，用于验证是否真的理解方法，而不是只记住一个案例。

#### 4. 家长报告中心
以最小可读报告的形式展示：
- 尝试次数
- 行为标签
- 自动总结
- 迁移表现

#### 5. 评测与 Bad Case
使用静态 mock 数据展示：
- 常见误解分类
- 失败案例示例
- 提示有效性
- 后续迭代方向

## 技术实现概览

- Next.js 14 App Router
- React 18
- TypeScript
- Zustand
- localStorage 本地持久化

当前版本不包含：
- 后端
- 数据库
- 登录 / 鉴权
- 支付系统

这使得它更适合作为轻量作品站直接运行和部署。

## 本地启动方式

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

### 3. 打开浏览器

默认访问：
- [http://localhost:3000](http://localhost:3000)

## Cloudflare 部署方式

本项目保持为纯前端交互原型，适合部署到 Cloudflare。

### 方案一：通过 GitHub 连接 Cloudflare Pages

1. 将项目推送到 GitHub 仓库
2. 登录 Cloudflare Dashboard
3. 进入 `Workers & Pages`
4. 点击 `Create application`
5. 选择 `Pages` → `Connect to Git`
6. 选择你的 GitHub 仓库 `temporal-garden`
7. 构建配置填写：

```text
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
```

8. 完成首次部署

说明：
- 如果你的 Cloudflare Pages 项目使用 Next.js 官方适配流程，请按 Cloudflare 当前控制台提示完成配置。
- 由于本项目没有后端和数据库，部署重点是保证静态资源与前端路由正常工作。

### 方案二：先本地构建再接入 Cloudflare 工作流

```bash
npm install
npm run build
```

如果你后续接入 Cloudflare 的 Next.js 适配器，请以 Cloudflare 官方文档的最新流程为准。

## 当前局限

这是一个 AI 教育作品站原型，不是完整商业产品。

当前局限包括：
- 仍处于 MVP 阶段
- 训练内容覆盖有限
- AI 主要用于提示生成、错因解释和结果总结
- 评测页使用的是静态 mock 数据
- 家长报告仍是最小 vertical slice

## 后续规划

下一阶段可继续扩展：
- 增加更多训练世界
- 增加更细的错因分类与 AI 追问
- 增加长期学习档案
- 增加更完整的作品化展示内容
- 优化 Cloudflare 上的正式部署配置

## 仓库发布建议

建议推送到 GitHub 的内容：
- `app/`
- `components/`
- `lib/`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `.eslintrc.json`
- `next.config.mjs`
- `README.md`
- `.gitignore`

不建议提交：
- `.next/`
- `node_modules/`

## GitHub 关联 Cloudflare 后的常用命令

本地开发：

```bash
npm install
npm run dev
```

本地构建检查：

```bash
npm run build
```

推送到 GitHub：

```bash
git add .
git commit -m "feat: upgrade temporal-garden into showcase site"
git push origin main
```

当 GitHub 已关联 Cloudflare Pages 后，通常不需要额外手动部署命令：
- 只要向默认分支（如 `main`）推送，Cloudflare 就会自动触发构建部署。

如果你要概括成一句话：
- GitHub 侧的“部署命令”本质上就是 `git push origin main`
- Cloudflare 侧执行的构建命令填写为 `npm run build`
