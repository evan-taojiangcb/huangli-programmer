import { Calendar } from 'lucide-react';

interface DateDisplayProps {
  className?: string;
}

export function DateDisplay({ className = '' }: DateDisplayProps) {
  const today = new Date();
  
  // 阳历日期
  const solarDate = today.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  // 程序员节气
  const coderSolarTerms = getCoderSolarTerm(today);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Calendar className="w-4 h-4 text-gray-500" />
      <div className="text-sm">
        <span>{solarDate}</span>
        {coderSolarTerms && (
          <span className="ml-2 text-amber-600 font-medium">
            · {coderSolarTerms}
          </span>
        )}
      </div>
    </div>
  );
}

// 程序员特色节气
function getCoderSolarTerm(date: Date): string | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 程序员特殊日期
  const coderDates: Record<string, string> = {
    '1-1': '元旦部署日',
    '2-14': '情人节加班日',
    '4-1': '愚人节Bug日',
    '5-1': '劳动节摸鱼日',
    '6-18': '电商大促备战日',
    '9-9': '重阳节重构日',
    '10-1': '国庆长假备份日',
    '10-24': '程序员节',
    '11-11': '双十一值守日',
    '12-24': '平安夜上线日',
    '12-31': '跨年部署日'
  };

  const key = `${month}-${day}`;
  return coderDates[key] || null;
}
