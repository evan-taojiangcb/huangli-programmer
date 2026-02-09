/**
 * 黄历运势卜算自动化测试
 * 使用 Playwright 进行 E2E 测试
 * 
 * 安装依赖：
 * npm install -D @playwright/test
 * npx playwright install
 * 
 * 运行测试：
 * npx playwright test tests/fortune-test.spec.js
 * 
 * 运行测试并查看浏览器：
 * npx playwright test tests/fortune-test.spec.js --headed
 * 
 * 调试模式：
 * npx playwright test tests/fortune-test.spec.js --debug
 */

const { test, expect } = require('@playwright/test');

test.describe('程序员黄历运势卜算', () => {
  
  test.beforeEach(async ({ page }) => {
    // 访问本地开发服务器
    await page.goto('http://localhost:3000/');
    
    // 等待页面加载完成（检查"墨色修仙"标题）
    await expect(page.locator('h1')).toContainText('墨色修仙');
  });

  test('应该能够成功卜算运势 - 老黄（1999-09-09）', async ({ page }) => {
    // 填写道号
    await page.fill('input[placeholder*="老黄"]', '老黄');
    
    // 填写出生日期（使用 type="date" 输入框）
    await page.fill('input[type="date"]', '1999-09-09');
    
    // 确保日期已正确填写
    await expect(page.locator('input[type="date"]')).toHaveValue('1999-09-09');
    
    // 点击卜算按钮
    await page.click('button:has-text("卜算新春运势")');
    
    // 等待运势结果显示
    await page.waitForSelector('text=今日代码质量', { timeout: 5000 });
    
    // 验证结果包含必要的元素
    await expect(page.locator('text=今日代码质量')).toBeVisible();
    await expect(page.locator('text=宜')).toBeVisible();
    await expect(page.locator('text=忌')).toBeVisible();
    await expect(page.locator('text=玄学预言')).toBeVisible();
    await expect(page.locator('text=幸运颜色')).toBeVisible();
    await expect(page.locator('text=幸运语言')).toBeVisible();
    
    // 验证道号显示正确
    await expect(page.locator('text=老黄')).toBeVisible();
    
    // 截图保存结果
    await page.screenshot({ 
      path: 'tests/screenshots/fortune-result.png',
      fullPage: true 
    });
  });

  test('应该能够填写日期', async ({ page }) => {
    // 填写道号
    await page.fill('input[placeholder*="老黄"]', '测试用户');
    
    // 填写日期
    await page.fill('input[type="date"]', '2000-06-15');
    
    // 点击卜算按钮
    await page.click('button:has-text("卜算新春运势")');
    
    // 验证结果显示
    await expect(page.locator('text=今日代码质量')).toBeVisible({ timeout: 5000 });
  });

  test('应该能够选择不同性别', async ({ page }) => {
    // 填写基本信息
    await page.fill('input[placeholder*="老黄"]', '小红');
    await page.fill('input[type="date"]', '1995-05-20');
    
    // 选择女性
    await page.click('input[value="female"] + label, label:has-text("女")');
    
    // 点击卜算
    await page.click('button:has-text("卜算新春运势")');
    
    // 验证结果
    await expect(page.locator('text=今日代码质量')).toBeVisible({ timeout: 5000 });
  });

  test('应该能够重新卜算', async ({ page }) => {
    // 第一次卜算
    await page.fill('input[placeholder*="老黄"]', '测试1');
    await page.fill('input[type="date"]', '2000-01-01');
    
    await page.click('button:has-text("卜算新春运势")');
    await page.waitForSelector('text=今日代码质量', { timeout: 5000 });
    
    // 点击重新卜算按钮
    const resetButton = page.locator('button:has-text("重新卜算")');
    await expect(resetButton).toBeVisible();
    await resetButton.click();
    
    // 验证返回到表单页面
    await expect(page.locator('button:has-text("卜算新春运势")')).toBeVisible();
  });

  test('应该显示 BTC 价格行情', async ({ page }) => {
    // 验证 BTC 行情组件存在
    await expect(page.locator('text=BTC/USDT')).toBeVisible();
    
    // 验证价格显示（应该是数字）
    const priceElement = page.locator('text=/\\$[\\d,]+\\.\\d+/');
    await expect(priceElement).toBeVisible();
    
    // 验证涨跌幅显示
    await expect(page.locator('text=24h 涨跌')).toBeVisible();
  });

  test('应该显示新春装饰元素', async ({ page }) => {
    // 验证春节元素（有多个"福"和"新春"，选择第一个）
    await expect(page.locator('text=福').first()).toBeVisible();
    await expect(page.locator('text=/春节|新春/').first()).toBeVisible();
  });

  test('边界测试 - 不同年份的运势', async ({ page }) => {
    const testCases = [
      { name: '80后', year: '1988', month: '8', day: '8' },
      { name: '90后', year: '1995', month: '5', day: '15' },
      { name: '00后', year: '2000', month: '1', day: '1' },
      { name: '10后', year: '2010', month: '10', day: '10' },
    ];

    for (const testCase of testCases) {
      // 填写信息
      await page.fill('input[placeholder*="老黄"]', testCase.name);
      await page.fill('input[type="date"]', `${testCase.year}-${testCase.month.padStart(2, '0')}-${testCase.day.padStart(2, '0')}`);
      
      // 卜算
      await page.click('button:has-text("卜算新春运势")');
      
      // 验证结果
      await expect(page.locator('text=今日代码质量')).toBeVisible({ timeout: 5000 });
      
      // 截图
      await page.screenshot({ 
        path: `tests/screenshots/fortune-${testCase.name}.png` 
      });
      
      // 重新卜算以进行下一个测试
      await page.click('button:has-text("重新卜算")');
      await page.waitForSelector('button:has-text("卜算新春运势")');
    }
  });

  test('性能测试 - 页面加载时间', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('h1:has-text("墨色修仙")');
    
    const loadTime = Date.now() - startTime;
    
    console.log(`页面加载时间: ${loadTime}ms`);
    
    // 页面应该在 3 秒内加载完成
    expect(loadTime).toBeLessThan(3000);
  });

  test('响应式测试 - 移动端视图', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 填写并提交表单
    await page.fill('input[placeholder*="老黄"]', '移动端测试');
    await page.fill('input[type="date"]', '1999-09-09');
    
    await page.click('button:has-text("卜算新春运势")');
    
    // 验证移动端显示正常
    await expect(page.locator('text=今日代码质量')).toBeVisible({ timeout: 5000 });
    
    // 移动端截图
    await page.screenshot({ 
      path: 'tests/screenshots/fortune-mobile.png',
      fullPage: true 
    });
  });
});
