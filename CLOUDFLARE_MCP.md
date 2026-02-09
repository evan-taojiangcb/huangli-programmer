# Cloudflare MCP 配置指南

## 已添加 Cloudflare MCP 服务器

现在可以通过 AI 助手直接管理 Cloudflare 资源了！

## 配置步骤

### 1. 获取 Cloudflare API Token

访问：https://dash.cloudflare.com/profile/api-tokens

创建一个新的 API Token，至少需要以下权限：
- **Account** - Cloudflare Pages:Edit
- **Account** - Account Settings:Read
- **Zone** - DNS:Edit
- **Zone** - Zone:Read

### 2. 获取 Account ID

访问：https://dash.cloudflare.com/
1. 选择任意域名
2. 在右侧可以看到 **Account ID**
3. 复制该 ID

### 3. 配置环境变量

在 `mcp.json` 中填写：

```json
{
  "cloudflare": {
    "env": {
      "CLOUDFLARE_API_TOKEN": "your_api_token_here",
      "CLOUDFLARE_ACCOUNT_ID": "your_account_id_here"
    }
  }
}
```

## 可用功能

配置完成后，AI 助手可以帮你：

### 部署管理
- 🚀 部署项目到 Cloudflare Pages
- 📋 列出所有部署
- 🔍 查看部署状态
- ❌ 删除部署

### DNS 管理
- ➕ 添加 DNS 记录
- 📝 更新 DNS 记录
- 🗑️ 删除 DNS 记录
- 📋 列出所有 DNS 记录

### Workers 管理
- 📦 部署 Workers 脚本
- 📋 列出所有 Workers
- 🔍 查看 Worker 详情

### Pages 项目管理
- 📋 列出所有 Pages 项目
- 🔍 查看项目详情
- ⚙️ 配置环境变量

## 部署当前项目到 Cloudflare Pages

### 方式一：使用 AI 助手（推荐）

配置好 MCP 后，直接告诉 AI：
```
帮我将这个项目部署到 Cloudflare Pages
```

### 方式二：使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
wrangler pages deploy dist
```

### 方式三：GitHub 自动部署

1. 将代码推送到 GitHub
2. 访问 https://dash.cloudflare.com/
3. 点击 "Workers & Pages" → "Create application" → "Pages"
4. 连接 GitHub 仓库
5. 设置构建命令：`npm run build`
6. 设置输出目录：`dist`
7. 点击部署

## 示例用法

配置完成后，可以让 AI 助手执行：

```
1. 列出我的所有 Cloudflare Pages 项目
2. 部署最新版本到 huangli-programmer
3. 添加自定义域名 huangli.example.com
4. 查看最近的部署日志
```

## 安全提示

⚠️ **不要将 API Token 提交到 Git**

建议创建 `mcp.local.json`（已在 .gitignore 中）存储敏感信息：

```json
{
  "mcpServers": {
    "cloudflare": {
      "env": {
        "CLOUDFLARE_API_TOKEN": "your_real_token",
        "CLOUDFLARE_ACCOUNT_ID": "your_real_account_id"
      }
    }
  }
}
```

## 参考资料

- [Cloudflare MCP Server](https://github.com/cloudflare/mcp-server-cloudflare)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare API 文档](https://developers.cloudflare.com/api/)
