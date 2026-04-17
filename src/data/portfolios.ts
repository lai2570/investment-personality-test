export interface Portfolio {
  key: string;
  name: string;
  tagline: string;
  description: string;
}

export const portfolios: Record<string, Portfolio> = {
  stable_sleep: {
    key: 'stable_sleep',
    name: '穩穩睡組合',
    tagline: '讓你安心入睡的投資配置',
    description: '以債券型基金為核心，搭配少量穩定配息股票型基金。追求波動最小化，適合重視本金安全、不想每天看盤的你。',
  },
  anti_inflation: {
    key: 'anti_inflation',
    name: '錢不變薄組合',
    tagline: '對抗通膨，讓購買力不縮水',
    description: '結合抗通膨債券、REITs 與原物料相關基金。目標是讓資產成長速度跑贏通膨，守住你的實質購買力。',
  },
  monthly_income: {
    key: 'monthly_income',
    name: '每月領錢組合',
    tagline: '每個月都有現金流進帳',
    description: '聚焦高配息債券與配息股票型基金。適合喜歡定期看到「錢進來」的你，讓投資成果看得見、領得到。',
  },
  global_growth: {
    key: 'global_growth',
    name: '懶人全球成長組合',
    tagline: '一次佈局全世界的成長機會',
    description: '透過全球股票型基金分散配置，涵蓋成熟市場與新興市場。不選邊站，讓全世界幫你賺錢。',
  },
  set_forget: {
    key: 'set_forget',
    name: '放著就好組合',
    tagline: '設定好就忘了它，讓時間幫你工作',
    description: '以目標日期基金或平衡型基金為主。設定好投資目標後，基金會自動調整配置，不需要你常常操心。',
  },
  theme_research: {
    key: 'theme_research',
    name: '主題研究組合',
    tagline: '深入研究，精準佈局你看好的領域',
    description: '集中投資特定產業主題，如科技、醫療、綠能等。適合願意花時間做功課、對特定領域有獨到見解的你。',
  },
  aggressive: {
    key: 'aggressive',
    name: '進攻型組合',
    tagline: '追求高成長，勇敢承擔波動',
    description: '以高成長股票型基金為主，包含中小型股與新興市場。波動較大但潛在報酬也高，適合心臟夠強的你。',
  },
  value_contrarian: {
    key: 'value_contrarian',
    name: '價值型組合',
    tagline: '在別人不看好的地方找到被低估的寶藏',
    description: '聚焦價值型股票基金，尋找本益比偏低、基本面良好但被市場忽略的標的。適合願意逆勢佈局、耐心等待的你。',
  },
  trend: {
    key: 'trend',
    name: '趨勢型組合',
    tagline: '緊跟市場脈動，順勢而為',
    description: '根據市場趨勢動態調整配置，強勢時加碼、弱勢時減碼。適合願意密切關注市場、積極操作的你。',
  },
  hot_theme: {
    key: 'hot_theme',
    name: '熱門主題組合',
    tagline: '跟上潮流，參與當下最夯的投資話題',
    description: '配置在當前市場最熱門的主題基金，如 AI、電動車、元宇宙等。適合喜歡追蹤趨勢、勇於嘗試新事物的你。',
  },
};
