import { useState, useEffect } from 'react';
import { InkBackground } from './components/InkBackground';
import { AlmanacScroll } from './components/AlmanacScroll';
import { BTCTicker } from './components/BTCTicker';
import { UserInputForm } from './components/UserInputForm';
import { ChineseNewYearDecorations } from './components/ChineseNewYearDecorations';
import { motion, AnimatePresence } from 'motion/react';

export interface UserInfo {
  name?: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
}

export interface Fortune {
  suitable: string[];
  unsuitable: string[];
  codeQuality: number;
  btcPrediction: 'bullish' | 'bearish' | 'neutral';
  mysticMessage: string;
  luckyColor: string;
  luckyLanguage: string;
}

export default function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showScroll, setShowScroll] = useState(false);
  const [fortune, setFortune] = useState<Fortune | null>(null);

  useEffect(() => {
    if (userInfo) {
      // 触发水墨晕染动画
      setTimeout(() => {
        const generatedFortune = generateFortune(userInfo);
        setFortune(generatedFortune);
        setShowScroll(true);
      }, 800);
    }
  }, [userInfo]);

  const handleReset = () => {
    setUserInfo(null);
    setShowScroll(false);
    setFortune(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50">
      {/* 春节装饰 */}
      <ChineseNewYearDecorations />
      
      {/* 水墨背景 */}
      <InkBackground isActive={!!userInfo} />
      
      {/* BTC行情 */}
      <BTCTicker />

      {/* 主内容区 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {!userInfo ? (
            <UserInputForm key="form" onSubmit={setUserInfo} />
          ) : (
            showScroll && fortune && (
              <AlmanacScroll 
                key="scroll" 
                userInfo={userInfo} 
                fortune={fortune}
                onReset={handleReset}
              />
            )
          )}
        </AnimatePresence>
      </div>

      {/* 页脚 */}
      <motion.footer 
        className="fixed bottom-4 left-0 right-0 text-center text-sm z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-mono text-red-700 font-semibold">墨色修仙 · 程序员黄历 🧧 祝您新春快乐，代码无Bug！</p>
      </motion.footer>
    </div>
  );
}

// 运势生成算法
function generateFortune(userInfo: UserInfo): Fortune {
  const seed = generateSeed(userInfo.birthDate);
  const today = new Date();
  const daySeed = today.getDate() + today.getMonth() * 31 + today.getFullYear();
  const combinedSeed = seed + daySeed;

  // 程序员宜忌库
  const suitableActivities = [
    '写单元测试', 'Code Review', '重构遗留代码', '学习新技术',
    '优化性能', '写文档', '结对编程', 'Merge PR',
    '修复 Bug', '部署到生产环境', '更新依赖', '画架构图',
    '喝咖啡思考', '午休充电', '整理代码风格', '写技术博客',
    // 春节特色
    '给同事发红包', '拜年（远程）', '写新年总结', '立新年Flag',
    '清理代码垃圾', '祭拜服务器', '给项目贴福字', '喝茶摸鱼'
  ];

  const unsuitableActivities = [
    '周五上线', '直接推送到 main', '删除数据库', '忽略警告',
    '不写注释', '复制粘贴代码', '跳过测试', '硬编码密码',
    '使用 var', '深层嵌套回调', '过度优化', '重写整个项目',
    '在生产环境调试', '忽视 Code Review', '随意改配置', '熬夜写代码',
    // 春节特色
    '被催婚', '被问工资', '比较年终奖', '春节值班上线',
    '回复工作消息', '讨论技术选型', '答应做私活', '承诺上线时间'
  ];

  const mysticMessages = [
    '今日五行利多，代码运行如丝般顺滑，建议持仓观望',
    '水逆期将至，合约慎入，建议多写防御性代码',
    '紫气东来，今日适合突破技术难关，财运亨通',
    '诸事不宜，建议今日摸鱼，保护发际线',
    '天时地利人和，今日 Deploy 无阻，币价看涨',
    '代码灾星高照，建议备份三次再操作，止损为上',
    // 春节特色
    '新春吉兆，今日写代码如有神助，年终奖可期',
    '财神爷眷顾，适合发布新版本，用户量暴涨在即',
    '龙腾虎跃之日，宜攻克技术难题，忌处理琐碎Bug',
    '喜气洋洋，今日代码无Bug，测试一次通过',
    '春风得意，适合向老板提涨薪，成功率极高',
    '红包运旺盛，多刷LeetCode，有望跳槽成功'
  ];

  const luckyLanguages = [
    'TypeScript', 'Rust', 'Go', 'Python', 'JavaScript',
    'Kotlin', 'Swift', 'C++', 'Java', 'Elixir'
  ];

  // 使用种子随机选择
  const suitable = getRandomItems(suitableActivities, 3, combinedSeed);
  const unsuitable = getRandomItems(unsuitableActivities, 3, combinedSeed + 1);
  const codeQuality = Math.floor((seededRandom(combinedSeed + 2) * 50) + 50); // 50-100
  const btcPredictionValue = seededRandom(combinedSeed + 3);
  const btcPrediction: Fortune['btcPrediction'] = 
    btcPredictionValue > 0.6 ? 'bullish' : 
    btcPredictionValue < 0.4 ? 'bearish' : 'neutral';
  const mysticMessage = mysticMessages[Math.floor(seededRandom(combinedSeed + 4) * mysticMessages.length)];
  const luckyColor = `hsl(${Math.floor(seededRandom(combinedSeed + 5) * 360)}, 70%, 60%)`;
  const luckyLanguage = luckyLanguages[Math.floor(seededRandom(combinedSeed + 6) * luckyLanguages.length)];

  return {
    suitable,
    unsuitable,
    codeQuality,
    btcPrediction,
    mysticMessage,
    luckyColor,
    luckyLanguage
  };
}

// 从生日生成种子
function generateSeed(birthDate: string): number {
  const date = new Date(birthDate);
  return date.getDate() + date.getMonth() * 31 + date.getFullYear();
}

// 基于种子的伪随机数生成器
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 基于种子随机选择多个不重复的项
function getRandomItems<T>(array: T[], count: number, seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}