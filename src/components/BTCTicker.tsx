import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'motion/react';

interface BTCData {
  price: number;
  change24h: number;
  isLoading: boolean;
}

export function BTCTicker() {
  const [btcData, setBtcData] = useState<BTCData>({
    price: 0,
    change24h: 0,
    isLoading: true
  });

  useEffect(() => {
    // 模拟BTC行情数据
    // 在实际部署时，可以使用：https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
    const fetchBTCPrice = async () => {
      try {
        // Mock数据 - 用户可以替换为真实API
        const mockPrice = 45000 + Math.random() * 5000;
        const mockChange = (Math.random() - 0.5) * 10;
        
        setBtcData({
          price: mockPrice,
          change24h: mockChange,
          isLoading: false
        });
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
        setBtcData({
          price: 48500,
          change24h: 2.5,
          isLoading: false
        });
      }
    };

    fetchBTCPrice();
    
    // 每30秒更新一次
    const interval = setInterval(fetchBTCPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const isPositive = btcData.change24h > 0;
  const isNeutral = Math.abs(btcData.change24h) < 0.1;

  const getTrendIcon = () => {
    if (isNeutral) return <Minus className="w-4 h-4" />;
    return isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getAccentColor = () => {
    if (isNeutral) return 'text-gray-600';
    return isPositive ? 'text-red-600' : 'text-green-600'; // 中国习惯：红涨绿跌
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-30"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-mono text-gray-500">BTC/USDT</span>
          </div>
          
          <div className="h-4 w-px bg-gray-300" />
          
          <div className="flex items-center gap-2">
            {btcData.isLoading ? (
              <div className="text-sm text-gray-400 font-mono">加载中...</div>
            ) : (
              <>
                <span className="text-lg font-mono font-semibold">
                  ${btcData.price.toLocaleString('en-US', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </span>
                
                <div className={`flex items-center gap-1 ${getAccentColor()}`}>
                  {getTrendIcon()}
                  <span className="text-sm font-mono font-semibold">
                    {isPositive ? '+' : ''}{btcData.change24h.toFixed(2)}%
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-1 text-xs text-gray-500 text-center font-mono">
          24h 涨跌
        </div>
      </div>
    </motion.div>
  );
}
