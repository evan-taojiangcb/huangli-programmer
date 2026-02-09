# API 集成说明

## Binance API 集成

当前应用使用模拟数据展示BTC行情。要集成真实的Binance API，请按以下步骤操作：

### 方法一：直接调用 Binance 公开 API

修改 `/components/BTCTicker.tsx` 文件中的 `fetchBTCPrice` 函数：

```typescript
const fetchBTCPrice = async () => {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    const data = await response.json();
    
    setBtcData({
      price: parseFloat(data.lastPrice),
      change24h: parseFloat(data.priceChangePercent),
      isLoading: false
    });
  } catch (error) {
    console.error('Failed to fetch BTC price:', error);
    // 使用备用数据
    setBtcData({
      price: 48500,
      change24h: 2.5,
      isLoading: false
    });
  }
};
```

### 方法二：使用 WebSocket 实时更新

如需实时更新价格，可以使用 Binance WebSocket API：

```typescript
useEffect(() => {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setBtcData({
      price: parseFloat(data.c), // 最新价格
      change24h: parseFloat(data.P), // 24h涨跌幅
      isLoading: false
    });
  };

  return () => ws.close();
}, []);
```

### 方法三：通过代理服务器（推荐用于生产环境）

为避免CORS问题和提高稳定性，建议使用服务器端代理：

1. 创建 API 路由（如果使用 Next.js）
2. 在服务器端调用 Binance API
3. 前端调用自己的 API 路由

## 多币种支持

要添加更多加密货币，可以扩展 `BTCTicker` 组件：

```typescript
// 支持的交易对
const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

// 批量获取价格
const response = await fetch(
  `https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(symbols)}`
);
```

## 注意事项

- Binance API 有调用频率限制，请注意控制请求频率
- 建议缓存数据，避免频繁请求
- 在生产环境中使用环境变量存储 API 配置
- 考虑添加错误重试机制和降级方案

## 其他数据源

除了 Binance，还可以使用：
- CoinGecko API
- CoinMarketCap API
- Kraken API
- 聚合数据服务（如 CryptoCompare）
