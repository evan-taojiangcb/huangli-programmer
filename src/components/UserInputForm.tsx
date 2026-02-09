import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { UserInfo } from '../App';

interface UserInputFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

export function UserInputForm({ onSubmit }: UserInputFormProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      onSubmit({
        name: name || undefined,
        birthDate,
        gender
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md"
    >
      <div className="bg-gradient-to-br from-red-50 to-yellow-50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-4 border-red-300">
        {/* 标题 */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="inline-block mb-4"
          >
            <div className="text-6xl">🧧</div>
          </motion.div>
          <h1 className="text-3xl mb-2 text-red-700 font-bold">
            墨色修仙
          </h1>
          <p className="text-xl text-red-600 font-mono font-bold">程序员黄历</p>
          <div className="mt-4 px-4 py-2 bg-red-600 text-yellow-300 rounded-lg inline-block">
            <p className="text-lg font-bold">🎊 新春特别版 🎊</p>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            请输入你的出生信息，获取新春运势
          </div>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 姓名（可选） */}
          <div>
            <label className="block text-sm mb-2 text-red-800 font-semibold">
              道号（可选）
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="如：老黄"
              className="w-full px-4 py-3 rounded-lg border-2 border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
            />
          </div>

          {/* 生日 */}
          <div>
            <label className="block text-sm mb-2 text-red-800 font-semibold">
              出生年月日 <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
            />
          </div>

          {/* 性别 */}
          <div>
            <label className="block text-sm mb-2 text-red-800 font-semibold">
              性别
            </label>
            <div className="flex gap-3">
              {[
                { value: 'male', label: '男' },
                { value: 'female', label: '女' },
                { value: 'other', label: '其他' }
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex-1 relative cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={gender === option.value}
                    onChange={(e) => setGender(e.target.value as typeof gender)}
                    className="peer sr-only"
                  />
                  <div className="px-4 py-3 rounded-lg border-2 border-red-300 text-center transition-all peer-checked:border-red-600 peer-checked:bg-red-100 peer-checked:text-red-700 hover:border-red-500 bg-white font-medium">
                    {option.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 提交按钮 */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-yellow-300 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all text-lg border-2 border-yellow-400"
          >
            🔮 卜算新春运势 🧧
          </motion.button>
        </form>

        {/* 底部说明 */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p className="font-semibold text-red-700">🎉 新春特惠：运势免费，祝福加倍 🎉</p>
          <p className="mt-1">Code with fate, debug with wisdom</p>
        </div>
      </div>
    </motion.div>
  );
}