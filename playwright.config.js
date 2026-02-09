import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 配置文件
 * 文档: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* 最大并发测试数 */
  fullyParallel: true,
  
  /* CI 环境下如果测试失败则整体失败 */
  forbidOnly: !!process.env.CI,
  
  /* CI 环境下失败重试次数 */
  retries: process.env.CI ? 2 : 0,
  
  /* 并发工作进程数 */
  workers: process.env.CI ? 1 : undefined,
  
  /* 测试报告配置 */
  reporter: [
    ['html', { outputFolder: 'tests/playwright-report' }],
    ['list'],
  ],
  
  /* 全局配置 */
  use: {
    /* 测试失败时截图 */
    screenshot: 'only-on-failure',
    
    /* 测试失败时录制视频 */
    video: 'retain-on-failure',
    
    /* 收集 trace 用于调试 */
    trace: 'on-first-retry',
    
    /* 基础 URL，方便测试中使用相对路径 */
    baseURL: 'http://localhost:3000',
  },

  /* 配置不同的浏览器项目 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 移动端浏览器测试 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* 在运行测试前启动开发服务器 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
