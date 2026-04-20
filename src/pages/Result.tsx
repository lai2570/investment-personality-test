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

const rarityConfig = {
  common: { label: '', color: '' },
  rare: { label: '稀有型', color: 'from-brand-gold/80 to-brand-gold' },
  superrare: { label: '超稀有型', color: 'from-brand-red/80 to-brand-red' },
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
          <button onClick={() => navigate('/')} className="text-brand-red font-medium hover:underline cursor-pointer">重新測驗</button>
        </div>
      </div>
    );
  }

  const portfolio = portfolios[animal.portfolio];
  const animalRelations = (relations[animalKey] || []).filter(r => r.type !== 'mirror');
  const rarity = rarityConfig[animal.rarity];
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
    <div className="min-h-screen bg-brand-cream">
      {/* ── Toast ── */}
      {toastVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-brand-dark text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            已複製連結
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
           HERO SECTION
         ══════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(170deg, #7A2119 0%, #C0392B 35%, #D4785A 70%, #F0E0D0 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/[0.04] rounded-full blur-xl" />
        <div className="absolute top-1/3 -left-16 w-48 h-48 bg-white/[0.03] rounded-full blur-lg" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-gold/[0.06] rounded-full blur-lg" />

        {/* Header */}
        <header className="relative z-10 px-6 pt-5 pb-0">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors cursor-pointer group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              首頁
            </button>
            <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-5 object-contain brightness-0 invert opacity-50" />
          </div>
        </header>

        {/* Animal showcase */}
        <div className="relative z-10 pt-10 pb-24 md:pb-28 text-center px-6">
          {/* Pulsing ring behind avatar */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" style={{ animation: 'pulse-ring 2.5s ease-out infinite' }} />
            <div className="animate-scaleIn w-56 h-56 md:w-68 md:h-68 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/10"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }}
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="w-44 h-44 md:w-56 md:h-56 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Badges */}
          {isRare && (
            <div className="animate-fadeIn flex justify-center gap-2 mb-4" style={{ animationDelay: '0.3s' }}>
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${rarity.color} shadow-md`}>
                {rarity.label}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white/90 backdrop-blur-sm">
                佔比 {animal.percentage}
              </span>
            </div>
          )}

          {/* Name */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <p className="text-white/60 text-sm font-medium mb-1 tracking-wider">你的投資性格是</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {animal.name}
            </h1>
          </div>
        </div>

        {/* Curved edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 60h1440V0c-240 45-480 60-720 60S240 45 0 0v60z" fill="#FAF6F0"/>
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════
           CONTENT
         ══════════════════════════════════ */}
      <div className="max-w-lg mx-auto px-6 -mt-1">

        {/* ── Personality ── */}
        <div className="animate-slideUp mb-10" style={{ animationDelay: '0.3s' }}>
          {[
            { title: '性格描述', content: animal.personality, icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z' },
            { title: '擅長領域', content: animal.strength, icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
          ].map((section, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100/80 mb-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-red/10 to-brand-gold/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={section.icon}/>
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-brand-dark tracking-wide">{section.title}</h3>
              </div>
              <p className="text-gray-600 leading-[1.8] text-[15px]">{section.content}</p>
            </div>
          ))}
        </div>

        {/* ── Portfolio CTA ── */}
        {portfolio && (
          <div className="animate-slideUp mb-10" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/30" />
              <h2 className="text-base font-bold text-brand-dark tracking-wide whitespace-nowrap">最適合你的投資組合方向</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/30" />
            </div>

            <a
              href="https://my.cmoneyfund.com.tw/account-opening"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(212,160,76,0.12)' }}
            >
              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-brand-gold via-brand-red to-brand-gold" />

              <div className="p-7 md:p-8">
                <h3 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-2 tracking-tight">{portfolio.name}</h3>
                <p className="text-brand-red font-semibold text-base md:text-lg mb-4">{portfolio.tagline}</p>
                <p className="text-gray-500 text-[15px] leading-relaxed mb-8">{portfolio.description}</p>

                <div className="inline-flex items-center gap-2.5 bg-brand-red text-white font-bold py-3.5 px-7 rounded-full shadow-lg group-hover:bg-brand-red-dark group-hover:shadow-xl transition-all duration-300 text-sm"
                  style={{ boxShadow: '0 6px 20px rgba(192,57,43,0.3)' }}
                >
                  立即前往口袋證券開戶
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* ── Relations ── */}
        {animalRelations.length > 0 && (
          <div className="animate-slideUp mb-10" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-red/20" />
              <h2 className="text-base font-bold text-brand-dark tracking-wide whitespace-nowrap">你的投資夥伴</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-red/20" />
            </div>

            <div className="grid gap-3">
              {animalRelations.map((rel) => {
                const partner = animals[rel.partner];
                const style = relationTypeStyle[rel.type];
                return (
                  <div
                    key={`${rel.type}-${rel.partner}`}
                    className={`rounded-2xl p-4 md:p-5 ${style.bg} border ${style.border} flex items-center gap-4`}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/90 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img src={partner.image} alt={partner.name} className="w-11 h-11 md:w-13 md:h-13 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[11px] font-bold ${style.text} flex items-center gap-1 mb-0.5 tracking-wide uppercase`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {relationTypeLabel[rel.type]}
                      </span>
                      <span className="text-sm md:text-base font-bold text-brand-dark block">{partner.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{rel.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Share ── */}
        <div className="animate-slideUp mb-10" style={{ animationDelay: '0.9s' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
            <h2 className="text-base font-bold text-brand-dark tracking-wide whitespace-nowrap">分享你的結果</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
            <p className="text-sm text-gray-400 mb-5 text-center">邀請朋友一起來測測看吧！</p>
            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-cream border-2 border-gray-200 text-brand-dark font-semibold py-3.5 px-4 rounded-xl hover:border-brand-gold hover:shadow-md transition-all cursor-pointer text-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                複製連結
              </button>
              <button
                onClick={handleShareLine}
                className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] text-white font-semibold py-3.5 px-4 rounded-xl hover:brightness-110 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                分享到 Line
              </button>
            </div>
          </div>
        </div>

        {/* ── Retake ── */}
        <div className="text-center mb-10 animate-slideUp" style={{ animationDelay: '1s' }}>
          <button
            onClick={() => navigate('/quiz')}
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3.5 px-10 rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all cursor-pointer"
            style={{ boxShadow: '0 8px 30px rgba(192,57,43,0.3)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            重新測驗
          </button>
        </div>

        {/* ── Footer ── */}
        <footer className="text-center pb-10 pt-6 border-t border-gray-200/60">
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-5 mx-auto object-contain opacity-30" />
        </footer>
      </div>
    </div>
  );
}
