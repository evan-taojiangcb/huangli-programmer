import { motion } from 'motion/react';

export function ChineseNewYearDecorations() {
  return (
    <>
      {/* 左上角灯笼 */}
      <motion.div
        className="fixed top-0 left-8 z-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Lantern />
        </motion.div>
      </motion.div>

      {/* 右上角灯笼 */}
      <motion.div
        className="fixed top-0 right-8 z-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [2, -2, 2]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Lantern />
        </motion.div>
      </motion.div>

      {/* 顶部春联 */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <div className="bg-red-600 text-yellow-400 px-6 py-2 rounded-lg shadow-lg border-4 border-yellow-500">
          <span className="text-xl font-bold calligraphy">春节大吉 · 代码无Bug</span>
        </div>
      </motion.div>

      {/* 左侧对联 */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="bg-red-700 text-yellow-300 px-3 py-8 rounded-lg shadow-xl border-4 border-yellow-600 writing-mode-vertical">
          <div className="text-lg font-bold calligraphy space-y-2">
            <div>上</div>
            <div>联</div>
            <div>：</div>
            <div>写</div>
            <div>代</div>
            <div>码</div>
            <div>迎</div>
            <div>新</div>
            <div>春</div>
          </div>
        </div>
      </motion.div>

      {/* 右侧对联 */}
      <motion.div
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="bg-red-700 text-yellow-300 px-3 py-8 rounded-lg shadow-xl border-4 border-yellow-600 writing-mode-vertical">
          <div className="text-lg font-bold calligraphy space-y-2">
            <div>下</div>
            <div>联</div>
            <div>：</div>
            <div>修</div>
            <div>B</div>
            <div>u</div>
            <div>g</div>
            <div>庆</div>
            <div>佳</div>
            <div>节</div>
          </div>
        </div>
      </motion.div>

      {/* 飘动的福字 */}
      <motion.div
        className="fixed bottom-20 right-20 z-10 hidden lg:block"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center border-4 border-yellow-500 shadow-2xl">
          <span className="text-5xl font-bold text-yellow-400">福</span>
        </div>
      </motion.div>

      {/* 中国结 */}
      <motion.div
        className="fixed bottom-20 left-20 z-10 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          rotate: [-3, 3, -3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChineseKnot />
      </motion.div>
    </>
  );
}

// 灯笼组件
function Lantern() {
  return (
    <div className="relative">
      {/* 绳子 */}
      <div className="w-1 h-8 bg-yellow-700 mx-auto" />
      
      {/* 灯笼主体 */}
      <div className="relative w-16 h-20 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-2xl">
        {/* 顶部装饰 */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-yellow-600 rounded-t-lg" />
        
        {/* 中间装饰带 */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-yellow-500" />
        
        {/* 福字 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-yellow-400">福</span>
        </div>
        
        {/* 底部装饰 */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-yellow-600 rounded-b-lg" />
      </div>
      
      {/* 流苏 */}
      <div className="flex justify-center gap-1 mt-1">
        <div className="w-1 h-6 bg-yellow-600 rounded-full" />
        <div className="w-1 h-8 bg-yellow-600 rounded-full" />
        <div className="w-1 h-6 bg-yellow-600 rounded-full" />
      </div>
    </div>
  );
}

// 中国结组件
function ChineseKnot() {
  return (
    <div className="relative">
      <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
        {/* 绳子 */}
        <line x1="40" y1="0" x2="40" y2="15" stroke="#DC2626" strokeWidth="3" />
        
        {/* 中国结主体 */}
        <circle cx="40" cy="35" r="18" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
        <circle cx="40" cy="35" r="12" fill="#991B1B" />
        <circle cx="40" cy="35" r="6" fill="#DC2626" />
        
        {/* 装饰线条 */}
        <path d="M 40 17 L 40 53" stroke="#FDE047" strokeWidth="2" />
        <path d="M 22 35 L 58 35" stroke="#FDE047" strokeWidth="2" />
        <path d="M 27 24 L 53 46" stroke="#FDE047" strokeWidth="1.5" />
        <path d="M 53 24 L 27 46" stroke="#FDE047" strokeWidth="1.5" />
        
        {/* 流苏 */}
        <line x1="35" y1="53" x2="32" y2="90" stroke="#DC2626" strokeWidth="2" />
        <line x1="40" y1="53" x2="40" y2="95" stroke="#DC2626" strokeWidth="2" />
        <line x1="45" y1="53" x2="48" y2="90" stroke="#DC2626" strokeWidth="2" />
        
        {/* 流苏装饰 */}
        <circle cx="32" cy="90" r="3" fill="#FDE047" />
        <circle cx="40" cy="95" r="3" fill="#FDE047" />
        <circle cx="48" cy="90" r="3" fill="#FDE047" />
      </svg>
    </div>
  );
}
