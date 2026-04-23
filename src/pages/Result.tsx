import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { animals, type AnimalKey } from '../data/animals';
import { portfolios } from '../data/portfolios';
import { fundsByPortfolio } from '../data/funds';

const base = import.meta.env.BASE_URL;

const rarityText = {
  common: '',
  rare: '稀有型',
  superrare: '超稀有型',
} as const;

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);

  const animalKey = (searchParams.get('a') || 'turtle') as AnimalKey;
  const animal = animals[animalKey];

  if (!animal) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-soft mb-4">找不到這個結果</p>
          <button onClick={() => navigate('/')} className="text-accent font-medium hover:underline cursor-pointer">重新測驗</button>
        </div>
      </div>
    );
  }

  const portfolio = portfolios[animal.portfolio];
  const recommendedFunds = fundsByPortfolio[animal.portfolio] || [];
  const rarityLabel = rarityText[animal.rarity];
  const isRare = animal.rarity !== 'common';

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    });
  }

  function handleShareLine() {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      {toastVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-ink text-white px-5 py-2.5 text-sm font-medium flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            已複製連結
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-ink-mute hover:text-ink transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            返回首頁
          </button>
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 object-contain" />
        </div>
      </header>

      {/* ── Hero / Profile ── */}
      <section className="border-b border-line bg-paper-off">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
            你的投資性格
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Animal image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-paper border border-line overflow-hidden flex items-center justify-center">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                {animal.name}
              </h1>
              {isRare && (
                <div className="flex items-center gap-3 text-sm mb-4">
                  <span className="text-accent font-semibold">{rarityLabel}</span>
                  <span className="text-ink-mute">・</span>
                  <span className="text-ink-mute">佔比 {animal.percentage}</span>
                </div>
              )}
              <p className="text-ink-soft leading-relaxed text-[15px] md:text-base">
                {animal.personality}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strength ── */}
      <section className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <h2 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-ink-mute mb-3">
            擅長領域
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-ink">
            {animal.strength}
          </p>
        </div>
      </section>

      {/* ── Portfolio ── */}
      {portfolio && (
        <section className="border-b border-line bg-paper-off">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
            <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
              適合你的投資組合方向
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              {portfolio.name}
            </h2>
            <p className="text-ink-soft font-medium text-base md:text-lg mb-4">
              {portfolio.tagline}
            </p>
            <p className="text-ink-soft leading-relaxed text-[15px] md:text-base mb-8">
              {portfolio.description}
            </p>

            <a
              href="https://my.cmoneyfund.com.tw/account-opening"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-base h-12 px-7 hover:bg-accent-dark transition-colors"
            >
              前往口袋證券開戶
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <p className="text-xs text-ink-mute mt-4">
              本內容僅供參考，不構成投資建議。投資有風險，申購前請詳閱公開說明書。
            </p>
          </div>
        </section>
      )}

      {/* ── Recommended Funds ── */}
      {recommendedFunds.length > 0 && (
        <section className="border-b border-line">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
            <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
              參考基金
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              {recommendedFunds.length} 檔符合你風格的基金
            </h2>
            <p className="text-ink-soft text-sm md:text-base mb-8">
              以下基金由口袋基金研究團隊從市場篩選，皆與你的投資性格方向吻合。實際申購前，請詳閱公開說明書並評估自身狀況。
            </p>

            <div className="divide-y divide-line border-t border-b border-line">
              {recommendedFunds.map((fund) => (
                <div key={fund.code} className="py-5 md:py-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base md:text-lg font-semibold text-ink leading-snug">
                      {fund.name}
                    </h3>
                    <span className="flex-shrink-0 text-xs text-ink-mute font-mono mt-1">
                      {fund.code}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {fund.suggest}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-ink-mute mt-6">
              本清單僅供參考，不構成投資建議。基金價格可能因市場因素波動，投資人應自行判斷並承擔投資風險。
            </p>
          </div>
        </section>
      )}

      {/* ── Share & Retake ── */}
      <section className="border-b border-line bg-paper-off">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 border border-line bg-paper text-ink font-medium py-3 px-5 hover:border-ink transition-colors cursor-pointer text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              複製連結分享
            </button>
            <button
              onClick={handleShareLine}
              className="flex items-center justify-center gap-2 bg-[#06C755] text-white font-medium py-3 px-5 hover:brightness-95 transition-all cursor-pointer text-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
              分享到 Line
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/quiz')}
              className="text-sm text-ink-soft hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-1.5 link-underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              重新測驗
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-6 text-center text-xs text-ink-mute">
          <p>&copy; 2026 口袋基金 Pocket Fund</p>
        </div>
      </footer>
    </div>
  );
}
