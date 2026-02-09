# 自动化测试指南

## 测试工具

本项目使用 **Playwright** 进行 E2E（端到端）自动化测试。

## 快速开始

### 1. 安装依赖

```bash
npm install -D @playwright/test
# 或
yarn add -D @playwright/test

# 安装浏览器
npx playwright install
```

### 2. 运行测试

```bash
# 运行所有测试
npx playwright test

# 运行单个测试文件
npx playwright test tests/fortune-test.spec.js

# 以可视化模式运行（查看浏览器操作过程）
npx playwright test --headed

# 运行特定测试用例
npx playwright test -g "应该能够成功卜算运势"

# 调试模式（逐步执行）
npx playwright test --debug

# 仅在 Chromium 浏览器运行
npx playwright test --project=chromium

# 生成代码（录制操作自动生成测试代码）
npx playwright codegen http://localhost:3000
```

### 3. 查看测试报告

```bash
# 查看 HTML 测试报告
npx playwright show-report tests/playwright-report
```

## 测试文件说明

### `tests/fortune-test.spec.js`

包含以下测试用例：

1. **基础功能测试**
   - ✅ 填写表单并卜算运势
   - ✅ 使用日期选择器
   - ✅ 选择不同性别
   - ✅ 重新卜算功能

2. **UI 组件测试**
   - ✅ BTC 价格行情显示
   - ✅ 新春装饰元素

3. **边界测试**
   - ✅ 不同年龄段（80后、90后、00后、10后）

4. **性能测试**
   - ✅ 页面加载时间

5. **响应式测试**
   - ✅ 移动端视图

## 测试输出

测试运行后会生成以下内容：

- `tests/screenshots/` - 测试截图
  - `fortune-result.png` - 运势结果截图
  - `fortune-80后.png` - 不同年龄段测试截图
  - `fortune-mobile.png` - 移动端截图
  
- `tests/playwright-report/` - HTML 测试报告

- `test-results/` - 测试失败时的视频和 trace 文件

## 常用命令

```bash
# 更新 Playwright
npm install -D @playwright/test@latest

# 查看 Playwright 版本
npx playwright --version

# 清理测试缓存
npx playwright clean

# UI 模式（可视化测试运行器）
npx playwright test --ui

# 查看测试覆盖率（需要配置）
npx playwright test --coverage
```

## 调试技巧

### 1. 使用 Playwright Inspector

```bash
npx playwright test --debug
```

在代码中添加断点：
```javascript
await page.pause(); // 暂停执行，打开 Playwright Inspector
```

### 2. 查看页面快照

```javascript
await page.screenshot({ path: 'debug.png' });
```

### 3. 打印控制台日志

```javascript
page.on('console', msg => console.log('浏览器日志:', msg.text()));
```

### 4. 查看网络请求

```javascript
page.on('request', request => console.log('请求:', request.url()));
page.on('response', response => console.log('响应:', response.url(), response.status()));
```

## CI/CD 集成

### GitHub Actions 示例

创建 `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: 18
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
      
    - name: Run Playwright tests
      run: npx playwright test
      
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: tests/playwright-report/
        retention-days: 30
```

## 最佳实践

1. **使用 data-testid**：为关键元素添加 `data-testid` 属性，避免依赖易变的类名
2. **等待机制**：使用 Playwright 的自动等待，避免手动 `setTimeout`
3. **独立测试**：每个测试用例应该独立，不依赖其他测试的状态
4. **清理数据**：测试后清理创建的数据，保持测试环境干净
5. **有意义的断言**：使用清晰的断言消息，方便调试

## 故障排查

### 测试超时

```javascript
test('测试名称', async ({ page }) => {
  test.setTimeout(60000); // 设置超时时间为 60 秒
  // ...
});
```

### 元素找不到

使用更宽松的选择器或等待元素：

```javascript
await page.waitForSelector('text=运势', { timeout: 10000 });
```

### 调试失败的测试

```bash
# 查看失败测试的 trace
npx playwright show-trace test-results/.../trace.zip
```

## 参考资源

- [Playwright 官方文档](https://playwright.dev)
- [Playwright API 参考](https://playwright.dev/docs/api/class-playwright)
- [选择器指南](https://playwright.dev/docs/selectors)
- [最佳实践](https://playwright.dev/docs/best-practices)
