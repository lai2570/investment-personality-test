export type Time = 'short' | 'mid' | 'long';
export type Level = 'low' | 'mid' | 'high';

export interface Option {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  title: string;
  dimension: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: '如果你現在要買一檔基金，你願意讓它陪你走多遠？',
    dimension: 'time',
    options: [
      { label: '一年左右，我們到下個路口就好', value: 'short' },
      { label: '三到五年，我們有一段路要走', value: 'mid' },
      { label: '五年以上，我們爬到下一個山頭', value: 'long' },
    ],
  },
  {
    id: 2,
    title: '你最怕什麼？',
    dimension: 'neuroticism',
    options: [
      { label: '看著自己的錢變少', value: 'high' },
      { label: '錯過該上車的機會', value: 'mid' },
      { label: '什麼都不做，錢被通膨吃掉', value: 'low' },
    ],
  },
  {
    id: 3,
    title: '你現在的投資狀態？',
    dimension: 'openness',
    options: [
      { label: '還沒開始，或只有定存', value: 'low' },
      { label: '有在投資，但偏穩', value: 'mid' },
      { label: '喜歡嘗試新標的、追趨勢', value: 'high' },
    ],
  },
];
