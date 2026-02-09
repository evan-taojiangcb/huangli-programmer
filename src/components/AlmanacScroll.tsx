import { motion } from 'motion/react';
import { Calendar, Code2, TrendingUp, Sparkles, RefreshCw, Share2 } from 'lucide-react';
import type { UserInfo, Fortune } from '../App';

interface AlmanacScrollProps {
  userInfo: UserInfo;
  fortune: Fortune;
  onReset: () => void;
}

export function AlmanacScroll({ userInfo, fortune, onReset }: AlmanacScrollProps) {
  // 获取当前日期信息
  const today = new Date();
  const dateStr = today.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  // 农历日期（简化版）
  const lunarDate = getLunarDate(today);

  const handleShare = () => {
    // 简化的分享功能
    if (navigator.share) {
      navigator.share({
        title: '我的程序员黄历',
        text: `今日代码质量: ${fortune.codeQuality}/100\n宜: ${fortune.suitable.join('、')}\n忌: ${fortune.unsuitable.join('、')}`,
      }).catch(() => {});
    } else {
      alert('分享功能需要在移动设备或支持的浏览器中使用');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-2xl relative"
    >
      {/* 卷轴背景 */}
      <div className="relative bg-gradient-to-b from-red-50 via-yellow-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-red-600/30 overflow-hidden">
        {/* 顶部装饰 */}
        <div className="h-6 bg-gradient-to-r from-red-700 via-red-600 to-red-700 flex items-center justify-center">
          <span className="text-yellow-300 text-sm font-bold">🎊 新春大吉 🎊</span>
        </div>
        
        {/* 主内容区 */}
        <div className="p-8 md:p-12">
          {/* 标题区 */}
          <div className="text-center mb-8 border-b-2 border-amber-900/20 pb-6">
            <motion.h1 
              className="text-4xl md:text-5xl mb-2 text-amber-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              程序员黄历
            </motion.h1>
            <motion.div
              className="text-gray-600 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm">{dateStr}</p>
              <p className="text-xs text-gray-500">{lunarDate}</p>
              {userInfo.name && (
                <p className="text-sm mt-2 font-medium">道号：{userInfo.name}</p>
              )}
            </motion.div>
          </div>

          {/* 代码质量指数 */}
          <motion.div
            className="mb-8 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 border-2 border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="w-6 h-6 text-amber-600" />
                <span className="text-sm text-gray-600">今日代码质量</span>
              </div>
              <div className="flex items-baseline gap-2 justify-center">
                <span className="text-5xl font-bold text-amber-700">
                  {fortune.codeQuality}
                </span>
                <span className="text-2xl text-gray-500">/100</span>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${fortune.codeQuality}%` }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* 宜忌 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 宜 */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border-2 border-red-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">
                  宜
                </div>
                <Sparkles className="w-5 h-5 text-red-600" />
              </div>
              <ul className="space-y-2">
                {fortune.suitable.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-red-600 mt-1">●</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 忌 */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gray-700 text-white rounded-lg flex items-center justify-center text-xl font-bold">
                  忌
                </div>
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
              <ul className="space-y-2">
                {fortune.unsuitable.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-gray-500 mt-1">●</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* 玄学预测 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">玄学预言</span>
            </div>
            <p className="text-gray-700 leading-relaxed italic">
              "{fortune.mysticMessage}"
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">BTC 趋势：</span>
                <span className={`font-mono font-semibold ${
                  fortune.btcPrediction === 'bullish' ? 'text-red-600' : 
                  fortune.btcPrediction === 'bearish' ? 'text-green-600' : 
                  'text-gray-600'
                }`}>
                  {fortune.btcPrediction === 'bullish' ? '📈 看涨' : 
                   fortune.btcPrediction === 'bearish' ? '📉 看跌' : 
                   '➡️ 震荡'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 幸运属性 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div className="bg-white rounded-lg p-4 shadow text-center border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">幸运颜色</div>
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: fortune.luckyColor }}
                />
                <span className="text-sm font-mono text-gray-700">
                  {fortune.luckyColor}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">幸运语言</div>
              <div className="text-sm font-mono font-semibold text-gray-700">
                {fortune.luckyLanguage}
              </div>
            </div>
          </motion.div>

          {/* 操作按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-3"
          >
            <button
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>重新卜算</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>分享运势</span>
            </button>
          </motion.div>
        </div>

        {/* 底部装饰 */}
        <div className="h-4 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800" />
      </div>

      {/* 印章装饰 */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform rotate-12 border-4 border-red-700 seal-stamp"
      >
        <div className="text-center font-bold">
          <div className="text-base">墨色</div>
          <div className="text-base">修仙</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 简化的农历转换（示例）
function getLunarDate(date: Date): string {
  // 这里是简化版本，实际应用可以使用更精确的农历库
  const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', 
                       '七月', '八月', '九月', '十月', '冬月', '腊月'];
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                     '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                     '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
  
  // 简单模拟（实际应该用农历转换库）
  const monthIndex = date.getMonth();
  const dayIndex = (date.getDate() - 1) % 30;
  
  return `农历${lunarMonths[monthIndex]}${lunarDays[dayIndex]}`;
}