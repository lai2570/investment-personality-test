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
    title: '投資時，最讓你睡不著的是哪一件事？',
    dimension: 'neuroticism',
    options: [
      { label: '帳面數字忽高忽低', value: 'high' },
      { label: '看別人都在賺，只有我沒跟上', value: 'mid' },
      { label: '錢放著沒動，被通貨膨脹慢慢吃掉', value: 'low' },
    ],
  },
  {
    id: 3,
    title: '以下哪個最符合你現在的投資狀態？',
    dimension: 'openness',
    options: [
      { label: '我做我熟悉的投資就好', value: 'low' },
      { label: '偶爾聽聽新東西，不一定會跟', value: 'mid' },
      { label: '有新題材一定要研究看看', value: 'high' },
    ],
  },
];
