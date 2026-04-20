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

const relationTypeStyle: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  symbiosis: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  complement: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700' },
};

const rarityConfig = {
  common: { label: '', gradient: '' },
  rare: { label: '稀有型', gradient: 'from-mm-gold to-yellow-500' },
  superrare: { label: '超稀有型', gradient: 'from-mm-accent to-mm-accent-secondary' },
} as const;

export default function Result() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);

  const animalKey = (searchParams.get('a') || 'turtle') as AnimalKey;
  const animal = animals[animalKey];

  if (!animal) {
    return (
      <div className="min-h-screen bg-mm-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-mm-muted-fg mb-4">找不到這個結果</p>
          <button onClick={() => navigate('/')} className="text-mm-accent font-medium hover:underline cursor-pointer">重新測驗</button>
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
    <div className="min-h-screen bg-mm-bg text-mm-fg">
      {/* ── Toast ── */}
      {toastVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-mm-fg text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            已複製連結
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
           HERO — Inverted
         ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-mm-fg text-white dot-texture">
        {/* Radial glows */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]" style={{ background: 'radial-gradient(circle, #E74C3C, transparent 70%)' }} />
        <div className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.05]" style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />

        {/* Header */}
        <header className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 pt-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            首頁
          </button>
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-5 object-contain brightness-0 invert opacity-40" />
        </header>

        {/* Animal showcase */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 pt-12 pb-20 md:pb-24 text-center">
          {/* Avatar */}
          <div className="animate-scaleIn relative inline-block mb-6">
            {/* Rotating ring */}
            <div className="absolute inset-[-16px] rounded-full border border-white/10" style={{ animation: 'rotateRing 60s linear infinite' }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-mm-accent" />
            </div>

            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-white/[0.06] backdrop-blur-sm flex items-center justify-center border border-white/10 overflow-hidden">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-52 h-52 md:w-64 md:h-64 object-cover drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Badges */}
          {isRare && (
            <div className="animate-fadeIn flex justify-center gap-2 mb-4" style={{ animationDelay: '0.3s' }}>
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${rarity.gradient} shadow-md`}>
                {rarity.label}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/10 text-white/80 backdrop-blur-sm">
                佔比 {animal.percentage}
              </span>
            </div>
          )}

          {/* Name */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-mm-accent/40 bg-mm-accent/10 px-4 py-1.5 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mm-accent">Your Result</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white tracking-[-0.02em] leading-tight">
              你是{animal.name}
            </h1>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
           CONTENT
         ══════════════════════════════════ */}
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* ── Personality ── */}
        <div className="animate-slideUp mb-12" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-3 rounded-full border border-mm-accent/30 bg-mm-accent/5 px-4 py-1.5 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mm-accent">Personality</span>
          </div>

          <div className="space-y-4">
            {[
              { title: '性格描述', content: animal.personality },
              { title: '擅長領域', content: animal.strength },
            ].map((section, i) => (
              <div
                key={i}
                className="bg-mm-card border border-mm-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="text-sm font-bold text-mm-accent tracking-wide mb-3 uppercase">{section.title}</h3>
                <p className="text-mm-muted-fg leading-[1.8] text-[15px]">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Portfolio CTA ── */}
        {portfolio && (
          <div className="animate-slideUp mb-12" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-mm-gold/30 bg-mm-gold/5 px-4 py-1.5 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mm-gold">Portfolio</span>
            </div>

            {/* Gradient border card */}
            <div className="rounded-2xl bg-gradient-to-br from-mm-accent via-mm-accent-secondary to-mm-accent p-[2px]">
              <a
                href="https://my.cmoneyfund.com.tw/account-opening"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-[calc(1rem-2px)] bg-mm-card p-7 md:p-8 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-display text-2xl md:text-3xl text-mm-fg mb-2 tracking-[-0.01em]">{portfolio.name}</h3>
                <p className="text-mm-accent font-semibold text-base md:text-lg mb-4">{portfolio.tagline}</p>
                <p className="text-mm-muted-fg text-[15px] leading-relaxed mb-8">{portfolio.description}</p>

                <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-mm-accent to-mm-accent-secondary text-white font-semibold py-3.5 px-7 rounded-xl shadow-accent group-hover:shadow-accent-lg group-hover:-translate-y-0.5 transition-all duration-200 text-sm">
                  立即前往口袋證券開戶
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* ── Relations ── */}
        {animalRelations.length > 0 && (
          <div className="animate-slideUp mb-12" style={{ animationDelay: '0.6s' }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-mm-accent/30 bg-mm-accent/5 px-4 py-1.5 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mm-accent">Partners</span>
            </div>

            <div className="space-y-3">
              {animalRelations.map((rel) => {
                const partner = animals[rel.partner];
                const style = relationTypeStyle[rel.type];
                return (
                  <div
                    key={`${rel.type}-${rel.partner}`}
                    className={`rounded-2xl p-5 md:p-6 ${style.bg} border ${style.border} flex items-center gap-4`}
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img src={partner.image} alt={partner.name} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${style.badge} mb-1 tracking-wide uppercase`}>
                        {relationTypeLabel[rel.type]}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-mm-fg block">{partner.name}</span>
                      <p className="text-xs text-mm-muted-fg mt-0.5 leading-relaxed">{rel.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Share ── */}
        <div className="animate-slideUp mb-12" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-3 rounded-full border border-mm-border bg-mm-muted px-4 py-1.5 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mm-muted-fg">Share</span>
          </div>

          <div className="bg-mm-card border border-mm-border rounded-2xl p-6 md:p-8">
            <p className="text-sm text-mm-muted-fg mb-5 text-center font-medium">邀請朋友一起來測測看吧！</p>
            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 bg-mm-muted border border-mm-border text-mm-fg font-semibold py-3.5 px-4 rounded-xl hover:border-mm-accent/30 hover:shadow-md transition-all duration-200 cursor-pointer text-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                複製連結
              </button>
              <button
                onClick={handleShareLine}
                className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] text-white font-semibold py-3.5 px-4 rounded-xl hover:brightness-110 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                分享到 Line
              </button>
            </div>
          </div>
        </div>

        {/* ── Retake ── */}
        <div className="text-center mb-12 animate-slideUp" style={{ animationDelay: '0.9s' }}>
          <button
            onClick={() => navigate('/quiz')}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-mm-accent to-mm-accent-secondary text-white font-semibold py-3.5 px-10 rounded-xl shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            重新測驗
          </button>
        </div>

        {/* ── Footer ── */}
        <footer className="text-center pb-10 pt-6 border-t border-mm-border">
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-5 mx-auto object-contain opacity-30" />
          <p className="text-[10px] text-mm-muted-fg/50 mt-2">&copy; 2024 Pocket Fund</p>
        </footer>
      </div>
    </div>
  );
}
