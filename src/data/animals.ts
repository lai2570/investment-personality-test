export type AnimalKey = 'turtle' | 'beaver' | 'bee' | 'fox' | 'dolphin' | 'owl' | 'eagle' | 'wolf' | 'cheetah' | 'sheep';
export type Rarity = 'common' | 'rare' | 'superrare';

export interface Animal {
  id: number;
  key: AnimalKey;
  name: string;
  image: string;
  rarity: Rarity;
  portfolio: string;
  personality: string;
  strength: string;
  philosophy: string;
  percentage: string;
}

export const rarityLabel: Record<Rarity, string> = {
  common: '常見',
  rare: '稀有',
  superrare: '超稀有',
};

export const rarityColor: Record<Rarity, string> = {
  common: 'bg-gray-500',
  rare: 'bg-brand-gold',
  superrare: 'bg-brand-red',
};

export const animals: Record<AnimalKey, Animal> = {
  turtle: {
    id: 1,
    key: 'turtle',
    name: '農夫烏龜',
    image: '/images/animal1.png',
    rarity: 'common',
    portfolio: 'stable_sleep',
    personality: '你是穩健踏實的代表，不追求短期暴利，而是相信時間的力量。你知道慢慢來反而比較快，耐心是你最大的資產。',
    strength: '長期持有不動搖、紀律性強、不受市場情緒影響',
    philosophy: '投資是一場馬拉松，不是百米衝刺。穩穩地走，才能走得遠。',
    percentage: '~33%',
  },
  beaver: {
    id: 2,
    key: 'beaver',
    name: '建築師河狸',
    image: '/images/animal2.png',
    rarity: 'common',
    portfolio: 'anti_inflation',
    personality: '你擅長規劃與建構，喜歡有系統地累積財富。你不害怕花時間研究，但也不會衝動行事。',
    strength: '資產配置規劃、定期再平衡、抗通膨意識強',
    philosophy: '好的投資組合像好的建築，需要穩固的地基和合理的結構。',
    percentage: '~11%',
  },
  bee: {
    id: 3,
    key: 'bee',
    name: '職人蜜蜂',
    image: '/images/animal3.png',
    rarity: 'common',
    portfolio: 'monthly_income',
    personality: '你勤勞務實，喜歡看到具體的成果。比起帳面上的數字增長，你更喜歡能實際「領到錢」的感覺。',
    strength: '重視現金流、執行力強、善於日常理財',
    philosophy: '投資不一定要追求翻倍，每個月穩穩領到收益，就是最踏實的幸福。',
    percentage: '~19%',
  },
  fox: {
    id: 4,
    key: 'fox',
    name: '背包客狐狸',
    image: '/images/animal4.png',
    rarity: 'rare',
    portfolio: 'global_growth',
    personality: '你機靈、適應力強，喜歡探索不同的投資機會。不會把所有雞蛋放在同一個籃子裡，分散風險是你的本能。',
    strength: '全球視野、靈活調整、善於發現機會',
    philosophy: '世界這麼大，好的投資機會不會只在一個地方。保持好奇，保持分散。',
    percentage: '~7%',
  },
  dolphin: {
    id: 5,
    key: 'dolphin',
    name: '運動員海豚',
    image: '/images/animal5.png',
    rarity: 'rare',
    portfolio: 'set_forget',
    personality: '你追求效率與平衡，不想花太多時間在投資上，但也不想錯過市場成長。你相信簡單的策略往往最有效。',
    strength: '行動力強、目標明確、不過度糾結',
    philosophy: '設定好目標，選好工具，然後放手讓時間去工作。',
    percentage: '~7%',
  },
  owl: {
    id: 6,
    key: 'owl',
    name: '教授貓頭鷹',
    image: '/images/animal6.png',
    rarity: 'superrare',
    portfolio: 'theme_research',
    personality: '你是深度研究型投資人，喜歡在下手前把功課做足。你對特定產業或主題有獨到見解，願意為了信念長期持有。',
    strength: '深度分析、主題投資專注、獨立思考',
    philosophy: '真正的投資優勢來自於比別人更深入地理解一個領域。',
    percentage: '~4%',
  },
  eagle: {
    id: 7,
    key: 'eagle',
    name: '獵人老鷹',
    image: '/images/animal7.png',
    rarity: 'superrare',
    portfolio: 'aggressive',
    personality: '你目光銳利、果斷行動，追求高報酬。你能承受較大的波動，因為你知道高風險伴隨著高機會。',
    strength: '精準判斷、果斷進出、高風險承受力',
    philosophy: '機會稍縱即逝，看準了就要果斷出擊。',
    percentage: '~4%',
  },
  wolf: {
    id: 8,
    key: 'wolf',
    name: '創業野狼',
    image: '/images/animal8.png',
    rarity: 'rare',
    portfolio: 'value_contrarian',
    personality: '你有創業家精神，喜歡在別人恐懼時貪婪。你相信被低估的價值終會被市場發現，願意逆勢而行。',
    strength: '逆向思維、價值發掘、團隊佈局',
    philosophy: '最好的投資機會，往往出現在大多數人不敢看的地方。',
    percentage: '~7%',
  },
  cheetah: {
    id: 9,
    key: 'cheetah',
    name: '飛行員獵豹',
    image: '/images/animal9.png',
    rarity: 'superrare',
    portfolio: 'trend',
    personality: '你速度快、反應靈敏，擅長追蹤市場趨勢。你不怕頻繁操作，因為你相信趨勢的力量。',
    strength: '趨勢判斷、快速反應、動態調整',
    philosophy: '順勢而為，趨勢是你最好的朋友。',
    percentage: '~4%',
  },
  sheep: {
    id: 10,
    key: 'sheep',
    name: '網紅綿羊',
    image: '/images/animal10.png',
    rarity: 'superrare',
    portfolio: 'hot_theme',
    personality: '你善於接收資訊、跟上潮流，喜歡投資當下最熱門的話題。你的社交圈就是你的資訊來源。',
    strength: '資訊敏感度高、社群影響力、主題輪動',
    philosophy: '跟對趨勢、選對主題，就能在風口上飛起來。',
    percentage: '~4%',
  },
};
