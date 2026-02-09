# Chrome DevTools MCP 自动化测试脚本

## 测试场景：黄历运势卜算

本文档记录了使用 Chrome DevTools MCP 服务器自动化测试黄历网站的操作步骤。

## 前置条件

1. 确保 `mcp.json` 中已配置 chrome-dev 服务器：
```json
{
  "mcpServers": {
    "chrome-dev": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-chrome-dev"
      ],
      "env": {}
    }
  }
}
```

2. 确保本地服务已启动：`http://localhost:3000/`

## 测试步骤

### 1. 列出并选择浏览器页面

```javascript
// 列出所有打开的页面
mcp_io_github_chr_list_pages()

// 如果需要，选择特定页面
mcp_io_github_chr_select_page({ pageId: 1, bringToFront: true })
```

### 2. 导航到目标页面

```javascript
mcp_io_github_chr_navigate_page({
  type: "url",
  url: "http://localhost:3000/",
  timeout: 10000
})
```

### 3. 获取页面快照

```javascript
// 获取页面结构快照（推荐使用，比截图更轻量）
mcp_io_github_chr_take_snapshot()

// 或者获取页面截图
mcp_io_github_chr_take_screenshot({ format: "png" })
```

### 4. 填写表单

#### 方式一：批量填写表单（推荐）

```javascript
mcp_io_github_chr_fill_form({
  elements: [
    { uid: "1_36", value: "老黄" }  // 道号输入框
  ]
})
```

#### 方式二：使用键盘输入日期

```javascript
// Tab 到年份输入框并输入
mcp_io_github_chr_press_key({ key: "Tab" })
mcp_io_github_chr_press_key({ key: "1" })
mcp_io_github_chr_press_key({ key: "9" })
mcp_io_github_chr_press_key({ key: "9" })
mcp_io_github_chr_press_key({ key: "9" })

// Tab 到月份输入框并输入
mcp_io_github_chr_press_key({ key: "Tab" })
mcp_io_github_chr_press_key({ key: "0" })
mcp_io_github_chr_press_key({ key: "9" })

// Tab 到日期输入框并输入
mcp_io_github_chr_press_key({ key: "Tab" })
mcp_io_github_chr_press_key({ key: "0" })
mcp_io_github_chr_press_key({ key: "9" })
```

#### 方式三：使用 JavaScript 脚本设置值

```javascript
mcp_io_github_chr_evaluate_script({
  args: [{ uid: "1_44" }],  // 日期输入框的 uid
  function: `(el) => {
    el.focus();
    el.value = 9;
    ['input', 'change', 'blur'].forEach(eventType => {
      el.dispatchEvent(new Event(eventType, { bubbles: true }));
    });
    return el.value;
  }`
})
```

### 5. 点击按钮提交

```javascript
mcp_io_github_chr_evaluate_script({
  args: [{ uid: "1_53" }],  // 卜算按钮的 uid
  function: "(el) => { el.click(); }"
})
```

### 6. 等待结果加载

```javascript
mcp_io_github_chr_wait_for({
  text: "运势",
  timeout: 5000
})
```

### 7. 获取结果

```javascript
// 重新获取页面快照以查看运势结果
mcp_io_github_chr_take_snapshot()
```

## 完整测试用例

### 测试用例：老黄（1999-09-09）的运势卜算

**输入数据：**
- 道号：老黄
- 出生日期：1999-09-09
- 性别：男（默认）

**预期输出：**
- 今日代码质量分数
- 宜做的事项（3项）
- 忌做的事项（3项）
- 玄学预言
- BTC 趋势
- 幸运颜色
- 幸运语言

**执行结果示例：**
```
今日代码质量：83/100

宜：
● 学习新技术
● 整理代码风格
● 结对编程

忌：
● 删除数据库
● 答应做私活
● 忽视 Code Review

玄学预言："春风得意，适合向老板提涨薪，成功率极高"
BTC 趋势：📉 看跌
幸运颜色：hsl(334, 70%, 60%)
幸运语言：Python
```

## 常用技巧

### 1. 处理日期选择器

如果遇到复杂的日期选择器组件，可以：
- 使用 `Escape` 键关闭弹出的选择器
- 直接聚焦到输入框用键盘输入数字
- 使用 JavaScript 直接操作 DOM

### 2. 调试元素查找

```javascript
// 查看页面中所有输入框
mcp_io_github_chr_evaluate_script({
  function: `() => {
    const inputs = document.querySelectorAll('input');
    return Array.from(inputs).map(input => ({
      type: input.type,
      name: input.name,
      id: input.id,
      ariaLabel: input.getAttribute('aria-label'),
      value: input.value
    }));
  }`
})
```

### 3. 截图保存

```javascript
mcp_io_github_chr_take_screenshot({
  filePath: "./tests/screenshots/fortune-result.png",
  format: "png",
  quality: 90
})
```

### 4. 监控网络请求

```javascript
// 列出所有网络请求
mcp_io_github_chr_list_network_requests({
  pageIdx: 0,
  pageSize: 50
})

// 获取特定请求详情
mcp_io_github_chr_get_network_request({
  reqid: 123
})
```

### 5. 查看控制台消息

```javascript
mcp_io_github_chr_list_console_messages({
  types: ["error", "warn", "log"]
})
```

## 注意事项

1. **UID 会变化**：页面刷新或重新渲染后，元素的 uid 会改变，需要重新获取快照
2. **等待元素**：某些操作后需要等待页面更新，使用 `wait_for` 或 `setTimeout`
3. **React 组件**：对于 React 应用，直接修改 input.value 可能不会触发状态更新，需要触发 input、change、blur 事件
4. **异步操作**：点击按钮后如果有网络请求，记得等待响应完成

## 扩展测试场景

可以基于此脚本扩展更多测试用例：

1. **边界值测试**：测试不同年份、月份、日期的组合
2. **性别测试**：测试选择不同性别的运势差异
3. **UI 测试**：验证页面元素、布局、样式是否正确
4. **性能测试**：使用 `performance_start_trace` 监控页面性能
5. **多浏览器测试**：在不同浏览器中执行相同操作

## 参考资料

- [MCP Chrome DevTools Server 文档](https://github.com/modelcontextprotocol/servers/tree/main/src/chrome-dev)
- Chrome DevTools Protocol API
