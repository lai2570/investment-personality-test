import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { animals, rarityLabel, type AnimalKey } from '../data/animals';
import { portfolios } from '../data/portfolios';
import { relations } from '../data/relations';

const relationTypeLabel = {
  symbiosis: '共生',
  complement: '互補',
  mirror: '鏡像',
} as const;

const relationTypeColor = {
  symbiosis: 'bg-green-100 text-green-800 border-green-200',
  complement: 'bg-blue-100 text-blue-800 border-blue-200',
  mirror: 'bg-purple-100 text-purple-800 border-purple-200',
} as const;

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);

  const animalKey = (searchParams.get('a') || 'turtle') as AnimalKey;
  const animal = animals[animalKey];

  if (!animal) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">找不到這個結果</p>
          <button onClick={() => navigate('/')} className="text-brand-red underline cursor-pointer">
            重新測驗
          </button>
        </div>
      </div>
    );
  }

  const portfolio = portfolios[animal.portfolio];
  const animalRelations = relations[animalKey] || [];

  function handleCopyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    });
  }

  function handleShareLine() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank');
  }

  const rarityBgColor = {
    common: 'bg-gray-600',
    rare: 'bg-brand-gold',
    superrare: 'bg-brand-red',
  }[animal.rarity];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Toast */}
      {toastVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-brand-dark text-white px-6 py-3 rounded-xl shadow-lg text-sm">
            已複製連結
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Animal Card - Hero */}
        <div className="animate-scaleIn text-center mb-8">
          <div className="relative inline-block">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-48 h-48 md:w-56 md:h-56 object-contain mx-auto drop-shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#f3f4f6" width="200" height="200" rx="16"/><text x="100" y="110" text-anchor="middle" font-size="60">${animal.name[0]}</text></svg>`
                )}`;
              }}
            />
          </div>

          <div className="mt-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${rarityBgColor} mb-2`}>
              {rarityLabel[animal.rarity]}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100 mb-2 ml-2">
              佔比 {animal.percentage}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
            你是<span className="text-brand-red">{animal.name}</span>
          </h1>
        </div>

        {/* Personality Section */}
        <div className="animate-slideUp space-y-4 mb-8" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-brand-gold mb-2 uppercase tracking-wider">性格描述</h3>
            <p className="text-gray-700 leading-relaxed">{animal.personality}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-brand-gold mb-2 uppercase tracking-wider">擅長領域</h3>
            <p className="text-gray-700 leading-relaxed">{animal.strength}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-brand-gold mb-2 uppercase tracking-wider">投資哲學</h3>
            <p className="text-gray-700 leading-relaxed">{animal.philosophy}</p>
          </div>
        </div>

        {/* Portfolio Card */}
        {portfolio && (
          <div className="animate-slideUp mb-8" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg font-bold text-brand-dark mb-3">最適合你的投資組合方向</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-brand-gold">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <h3 className="text-xl font-bold text-brand-dark">{portfolio.name}</h3>
              </div>
              <p className="text-brand-red font-medium text-sm mb-3">{portfolio.tagline}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{portfolio.description}</p>
            </div>
          </div>
        )}

        {/* Relations */}
        {animalRelations.length > 0 && (
          <div className="animate-slideUp mb-8" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-lg font-bold text-brand-dark mb-3">你的投資夥伴</h2>
            <div className="grid gap-3">
              {animalRelations.map((rel) => {
                const partner = animals[rel.partner];
                return (
                  <div
                    key={`${rel.type}-${rel.partner}`}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/result?a=${rel.partner}`)}
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-14 h-14 object-contain flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${relationTypeColor[rel.type]}`}>
                          {relationTypeLabel[rel.type]}
                        </span>
                        <span className="text-sm font-semibold text-brand-dark truncate">{partner.name}</span>
                      </div>
                      <p className="text-xs text-gray-500">{rel.description}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="animate-slideUp mb-8" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-lg font-bold text-brand-dark mb-3">分享你的結果</h2>
          <div className="flex gap-3">
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-white border-2 border-gray-200 text-brand-dark font-medium py-3 px-4 rounded-2xl hover:border-brand-gold hover:shadow-md transition-all cursor-pointer text-sm"
            >
              複製連結
            </button>
            <button
              onClick={handleShareLine}
              className="flex-1 bg-[#06C755] text-white font-medium py-3 px-4 rounded-2xl hover:brightness-110 hover:shadow-md transition-all cursor-pointer text-sm"
            >
              分享到 Line
            </button>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/quiz')}
            className="text-brand-red font-medium hover:underline cursor-pointer"
          >
            重新測驗
          </button>
        </div>

        {/* Disclaimer */}
        <div className="animate-slideUp border-t border-gray-200 pt-6 mb-4" style={{ animationDelay: '1s' }}>
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            本測驗結果僅供參考，不構成投資建議。投資有風險，申購前請詳閱公開說明書。
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center pb-8">
          <p className="text-xs text-gray-400">by 口袋基金</p>
        </footer>
      </div>
    </div>
  );
}
