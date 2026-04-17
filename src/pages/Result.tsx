import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { animals, type AnimalKey } from '../data/animals';
import { portfolios } from '../data/portfolios';
import { relations } from '../data/relations';

const base = import.meta.env.BASE_URL;

const relationTypeLabel: Record<string, string> = {
  symbiosis: '共生夥伴',
  complement: '互補夥伴',
};

const relationTypeStyle: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  symbiosis: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  complement: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', dot: 'bg-sky-400' },
};

const rarityStyle = {
  common: { bg: 'bg-gray-100', text: 'text-gray-600', label: '常見型' },
  rare: { bg: 'bg-brand-gold-light', text: 'text-brand-gold', label: '稀有型' },
  superrare: { bg: 'bg-red-50', text: 'text-brand-red', label: '超稀有型' },
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
          <button onClick={() => navigate('/')} className="text-brand-red font-medium hover:underline cursor-pointer">
            重新測驗
          </button>
        </div>
      </div>
    );
  }

  const portfolio = portfolios[animal.portfolio];
  const animalRelations = (relations[animalKey] || []).filter(r => r.type !== 'mirror');
  const rarity = rarityStyle[animal.rarity];

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

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Toast */}
      {toastVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-brand-dark text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium">
            已複製連結
          </div>
        </div>
      )}

      {/* Hero Section - Gradient Banner */}
      <div
        className="relative overflow-hidden pt-8 pb-16"
        style={{
          background: 'linear-gradient(180deg, #962D22 0%, #C0392B 40%, #E8D5C4 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-lg mx-auto px-6 text-center">
          {/* Back to home */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              首頁
            </button>
            <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 object-contain opacity-70 invert" />
          </div>

          {/* Animal image */}
          <div className="animate-scaleIn mb-4">
            <div className="relative inline-block">
              <div className="w-60 h-60 md:w-72 md:h-72 mx-auto rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center p-4">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-48 h-48 md:w-60 md:h-60 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Name & badges */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            {animal.rarity !== 'common' && (
              <div className="flex justify-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${rarity.bg} ${rarity.text}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {rarity.label}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                  佔比 {animal.percentage}
                </span>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              你是{animal.name}
            </h1>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48h1440V0C1200 40 960 48 720 48S240 40 0 0v48z" fill="#FAF6F0" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 -mt-2">
        {/* Personality Cards */}
        <div className="animate-slideUp space-y-4 mb-8" style={{ animationDelay: '0.3s' }}>
          {[
            { icon: '性格描述', content: animal.personality },
            { icon: '擅長領域', content: animal.strength },
          ].map((section, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-brand-gold" />
                <h3 className="text-sm font-bold text-brand-dark tracking-wider">{section.icon}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-[15px]">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Card */}
        {portfolio && (
          <div className="animate-slideUp mb-8" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold text-base">$</span>
              最適合你的投資組合方向
            </h2>
            <a
              href="https://my.cmoneyfund.com.tw/account-opening"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden rounded-2xl p-8 bg-white shadow-md border-2 border-brand-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Gold accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold/60 via-brand-gold to-brand-gold/60" />

              <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">{portfolio.name}</h3>
              <p className="text-brand-red font-semibold text-base md:text-lg mb-4">{portfolio.tagline}</p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">{portfolio.description}</p>

              <div className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold py-3 px-6 rounded-full group-hover:bg-brand-red-dark transition-colors text-sm">
                立即前往口袋證券開戶
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          </div>
        )}

        {/* Relations */}
        {animalRelations.length > 0 && (
          <div className="animate-slideUp mb-8" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </span>
              你的投資夥伴
            </h2>
            <div className="grid gap-3">
              {animalRelations.map((rel) => {
                const partner = animals[rel.partner];
                const style = relationTypeStyle[rel.type];
                return (
                  <div
                    key={`${rel.type}-${rel.partner}`}
                    className={`rounded-2xl p-4 ${style.bg} border ${style.border} flex items-center gap-4`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-11 h-11 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-bold ${style.text} flex items-center gap-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                          {relationTypeLabel[rel.type]}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-brand-dark block">{partner.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{rel.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="animate-slideUp mb-8" style={{ animationDelay: '0.9s' }}>
          <h2 className="text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-brand-dark/10 flex items-center justify-center text-brand-dark text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </span>
            分享你的結果
          </h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
            <p className="text-sm text-gray-500 mb-4 text-center">讓朋友也來測測看！</p>
            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-cream border-2 border-gray-200 text-brand-dark font-semibold py-3 px-4 rounded-xl hover:border-brand-gold hover:shadow-md transition-all cursor-pointer text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                複製連結
              </button>
              <button
                onClick={handleShareLine}
                className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] text-white font-semibold py-3 px-4 rounded-xl hover:brightness-110 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                分享到 Line
              </button>
            </div>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center mb-10">
          <button
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            重新測驗
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center pb-8 pt-4 border-t border-gray-200">
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 mx-auto mb-2 object-contain opacity-40" />
        </footer>
      </div>
    </div>
  );
}
