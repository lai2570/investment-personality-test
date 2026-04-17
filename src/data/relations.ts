import type { AnimalKey } from './animals';

export interface Relation {
  type: 'symbiosis' | 'complement' | 'mirror';
  label: string;
  partner: AnimalKey;
  description: string;
}

// 共生：高頻共現，性格相近
// 互補：組成平衡，核心行為策略互補
// 鏡像：（此處作為額外配對參考）

export const relations: Record<AnimalKey, Relation[]> = {
  turtle: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'beaver', description: '穩健進守 + 有計畫的建設' },
    { type: 'complement', label: '互補夥伴', partner: 'eagle', description: '70% 穩健 + 30% 進攻，攻守兼備' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'cheetah', description: '一慢一快，截然不同的節奏感' },
  ],
  beaver: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'turtle', description: '穩健進守 + 有計畫的建設' },
    { type: 'complement', label: '互補夥伴', partner: 'fox', description: '安穩基底 + 機動加碼' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'wolf', description: '系統建構 vs 逆勢破壞' },
  ],
  bee: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'beaver', description: '現金流 + 安穩基底' },
    { type: 'complement', label: '互補夥伴', partner: 'wolf', description: '現金流 + 團隊佈局' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'eagle', description: '穩定領息 vs 積極進攻' },
  ],
  fox: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'dolphin', description: '分散配置 + 平衡標的' },
    { type: 'complement', label: '互補夥伴', partner: 'beaver', description: '機動加碼 + 安穩基底' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'owl', description: '廣泛探索 vs 深度鑽研' },
  ],
  dolphin: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'fox', description: '分散配置 + 平衡標的' },
    { type: 'complement', label: '互補夥伴', partner: 'owl', description: '主題研究 + 平衡配置' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'sheep', description: '設定即忘 vs 時時關注' },
  ],
  owl: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'wolf', description: '深度研究 + 團隊投資' },
    { type: 'complement', label: '互補夥伴', partner: 'dolphin', description: '主題研究 + 平衡配置' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'bee', description: '長期主題 vs 短期現金流' },
  ],
  eagle: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'cheetah', description: '進攻組合 + 趨勢操作' },
    { type: 'complement', label: '互補夥伴', partner: 'turtle', description: '30% 進攻 + 70% 穩健' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'bee', description: '高風險高報酬 vs 穩定領息' },
  ],
  wolf: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'owl', description: '深度研究 + 團隊投資' },
    { type: 'complement', label: '互補夥伴', partner: 'bee', description: '逆勢佈局 + 現金流收入' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'sheep', description: '逆勢獨行 vs 跟隨潮流' },
  ],
  cheetah: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'eagle', description: '趨勢操作 + 進攻組合' },
    { type: 'complement', label: '互補夥伴', partner: 'turtle', description: '短線機動 + 長期穩健' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'dolphin', description: '頻繁操作 vs 放著就好' },
  ],
  sheep: [
    { type: 'symbiosis', label: '共生夥伴', partner: 'fox', description: '主題輪動 + 機動加碼' },
    { type: 'complement', label: '互補夥伴', partner: 'owl', description: '熱門主題 + 深度研究' },
    { type: 'mirror', label: '鏡像夥伴', partner: 'wolf', description: '跟隨潮流 vs 逆勢獨行' },
  ],
};
