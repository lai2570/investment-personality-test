import { useNavigate } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

const heroAnimals = [
  { img: `${base}images/animal1.png`, label: '農夫烏龜', y: 'animate-float', delay: '0s' },
  { img: `${base}images/animal5.png`, label: '運動員海豚', y: 'animate-floatAlt', delay: '0.8s' },
  { img: `${base}images/animal9.png`, label: '飛行員獵豹', y: 'animate-float', delay: '1.6s' },
];

const steps = [
  { num: '01', title: '回答 3 個直覺問題', desc: '不需要任何金融知識，只要憑你的第一反應選擇。' },
  { num: '02', title: 'AI 分析你的性格', desc: '根據行為金融學模型，從 27 種組合中匹配你的動物。' },
  { num: '03', title: '探索你的投資風格', desc: '了解你的投資性格、擅長領域，以及最適合的組合方向。' },
];

const animalShowcase = [
  { img: `${base}images/animal1.png`, name: '農夫烏龜' },
  { img: `${base}images/animal3.png`, name: '職人蜜蜂' },
  { img: `${base}images/animal4.png`, name: '背包客狐狸' },
  { img: `${base}images/animal6.png`, name: '教授貓頭鷹' },
  { img: `${base}images/animal8.png`, name: '創業野狼' },
  { img: `${base}images/animal9.png`, name: '飛行員獵豹' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mm-bg text-mm-fg">
      {/* ════════════════════════════════════
          HEADER
         ════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-mm-bg/80 backdrop-blur-xl border-b border-mm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 object-contain" />
            <span className="text-sm font-semibold tracking-tight text-mm-fg">口袋基金</span>
          </div>
          <button
            onClick={() => navigate('/quiz')}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-mm-accent hover:text-mm-accent-secondary transition-colors duration-200 cursor-pointer"
          >
            開始測驗
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════
          HERO
         ════════════════════════════════════ */}
      <section className="relative pt-16 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]" style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04]" style={{ background: 'radial-gradient(circle, #E74C3C, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div>
              {/* Section label */}
              <div className="animate-fadeInUp inline-flex items-center gap-3 rounded-full border border-mm-accent/30 bg-mm-accent/5 px-5 py-2 mb-8" style={{ animationDelay: '0.1s' }}>
                <span className="h-2 w-2 rounded-full bg-mm-accent animate-pulseDot" />
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-mm-accent">Investment Personality</span>
              </div>

              {/* Headline */}
              <h1
                className="animate-fadeInUp font-display text-[2.75rem] md:text-6xl lg:text-[5.25rem] leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ animationDelay: '0.2s' }}
              >
                找到你的<br />
                投資<span className="gradient-text">性格基因</span>
              </h1>

              {/* Subtitle */}
              <p
                className="animate-fadeInUp text-mm-muted-fg text-base md:text-lg leading-[1.7] max-w-lg mb-10"
                style={{ animationDelay: '0.3s' }}
              >
                透過 3 個直覺問題，解鎖專屬於你的投資風格動物與成長策略。<br className="hidden md:block" />
                不需要任何金融知識，60 秒即可完成。
              </p>

              {/* CTA */}
              <div className="animate-fadeInUp flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => navigate('/quiz')}
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-mm-accent to-mm-accent-secondary text-white font-semibold text-base h-14 px-10 rounded-xl shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>立即開始測驗</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <div className="flex items-center gap-3 text-sm text-mm-muted-fg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  60 秒完成，無需註冊
                </div>
              </div>
            </div>

            {/* Mobile — Hero Graphic */}
            <div className="relative flex lg:hidden items-center justify-center h-[220px] sm:h-[260px]">
              {/* Rotating rings */}
              <div className="absolute w-40 h-40 rounded-full border border-mm-border/40" style={{ animation: 'rotateRing 60s linear infinite' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-mm-accent" />
              </div>
              <div className="absolute w-32 h-32 rounded-full border border-dashed border-mm-border/25" style={{ animation: 'rotateRing 45s linear infinite reverse' }} />

              {/* Floating animal circles */}
              {heroAnimals.map((animal, i) => {
                const mobilePositions = [
                  'top-0 left-4 sm:left-10',
                  'bottom-0 left-8 sm:left-16',
                  'top-2 right-4 sm:right-10',
                ];
                return (
                  <div
                    key={`mobile-${animal.label}`}
                    className={`absolute ${mobilePositions[i]} ${animal.y}`}
                    style={{ animationDelay: animal.delay }}
                  >
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-mm-card border border-mm-border shadow-md overflow-hidden flex items-center justify-center">
                      <img src={animal.img} alt={animal.label} className="w-16 h-16 sm:w-18 sm:h-18 object-cover" />
                    </div>
                  </div>
                );
              })}

              {/* Center gradient circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mm-accent to-mm-accent-secondary opacity-10" />

              {/* Dot grid */}
              <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-mm-accent/15" />
                ))}
              </div>
            </div>

            {/* Desktop — Hero Graphic */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[420px]">
              {/* Rotating ring */}
              <div className="absolute w-80 h-80 rounded-full border border-mm-border/50" style={{ animation: 'rotateRing 60s linear infinite' }}>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-mm-accent" />
              </div>
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-mm-border/30" style={{ animation: 'rotateRing 45s linear infinite reverse' }} />

              {/* Floating animal circles */}
              {heroAnimals.map((animal, i) => {
                const positions = [
                  'top-4 left-8',
                  'bottom-8 left-4',
                  'top-12 right-4',
                ];
                return (
                  <div
                    key={animal.label}
                    className={`absolute ${positions[i]} ${animal.y}`}
                    style={{ animationDelay: animal.delay }}
                  >
                    <div className="w-20 h-20 rounded-full bg-mm-card border border-mm-border shadow-lg overflow-hidden flex items-center justify-center">
                      <img src={animal.img} alt={animal.label} className="w-20 h-20 object-cover" />
                    </div>
                  </div>
                );
              })}

              {/* Center gradient circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mm-accent to-mm-accent-secondary opacity-10" />

              {/* 3x3 dot grid */}
              <div className="absolute bottom-4 right-16 grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-mm-accent/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS — Inverted Section
         ════════════════════════════════════ */}
      <section className="bg-mm-fg text-white dot-texture relative">
        {/* Radial glow */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.06]" style={{ background: 'radial-gradient(circle, #E74C3C, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
          {/* Label */}
          <div className="animate-fadeInUp inline-flex items-center gap-3 rounded-full border border-mm-accent/40 bg-mm-accent/10 px-5 py-2 mb-10" style={{ animationDelay: '0.1s' }}>
            <span className="h-2 w-2 rounded-full bg-mm-accent animate-pulseDot" />
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-mm-accent">Why This Test</span>
          </div>

          <h2 className="animate-fadeInUp font-display text-3xl md:text-[3.25rem] leading-[1.15] mb-16" style={{ animationDelay: '0.15s' }}>
            科學模型，精準<span className="gradient-text">匹配</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { num: '3', label: '精準題目' },
              { num: '10', label: '性格動物' },
              { num: '27', label: '策略組合' },
              { num: '60s', label: '即可完成' },
            ].map((s, i) => (
              <div
                key={s.label}
                className="animate-fadeInUp group bg-white/[0.04] hover:bg-mm-accent border border-white/[0.08] hover:border-mm-accent rounded-2xl p-6 md:p-8 transition-all duration-200 cursor-default"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 group-hover:scale-105 transition-transform duration-200">
                  {s.num}
                </div>
                <div className="text-sm text-white/50 group-hover:text-white/90 font-medium transition-colors duration-200">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          HOW IT WORKS
         ════════════════════════════════════ */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
          {/* Label */}
          <div className="animate-fadeInUp inline-flex items-center gap-3 rounded-full border border-mm-accent/30 bg-mm-accent/5 px-5 py-2 mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-mm-accent">How It Works</span>
          </div>

          <h2 className="animate-fadeInUp font-display text-3xl md:text-[3.25rem] leading-[1.15] mb-16 max-w-2xl" style={{ animationDelay: '0.15s' }}>
            三個簡單步驟，<br />找到你的<span className="gradient-text">投資性格</span>
          </h2>

          {/* Steps — horizontal timeline on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="animate-fadeInUp group relative"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                {/* Connector line (md+) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+24px)] right-[-16px] h-px bg-mm-border" />
                )}

                <div className="bg-mm-card border border-mm-border rounded-2xl p-8 md:p-10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 h-full">
                  {/* Step number badge */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mm-accent to-mm-accent-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white font-bold text-sm">{step.num}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] mb-3">{step.title}</h3>
                  <p className="text-mm-muted-fg text-sm md:text-base leading-[1.7]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ANIMAL SHOWCASE
         ════════════════════════════════════ */}
      <section className="bg-mm-muted relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36">
          <div className="text-center mb-16">
            <div className="animate-fadeInUp inline-flex items-center gap-3 rounded-full border border-mm-accent/30 bg-mm-accent/5 px-5 py-2 mb-8" style={{ animationDelay: '0.1s' }}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-mm-accent">10 Animals</span>
            </div>
            <h2 className="animate-fadeInUp font-display text-3xl md:text-[3.25rem] leading-[1.15]" style={{ animationDelay: '0.15s' }}>
              10 種<span className="gradient-text">投資性格</span>動物
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {animalShowcase.map((animal, i) => (
              <div
                key={animal.name}
                className="animate-fadeInUp group bg-mm-card border border-mm-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mm-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={animal.img}
                  alt={animal.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-3 relative z-10 group-hover:scale-110 transition-transform duration-200"
                />
                <p className="text-xs md:text-sm font-semibold text-mm-fg relative z-10">{animal.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FINAL CTA — Inverted
         ════════════════════════════════════ */}
      <section className="bg-mm-fg text-white dot-texture relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]" style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-36 text-center relative z-10">
          <div className="animate-fadeInUp inline-flex items-center gap-3 rounded-full border border-mm-accent/40 bg-mm-accent/10 px-5 py-2 mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="h-2 w-2 rounded-full bg-mm-accent animate-pulseDot" />
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-mm-accent">Start Now</span>
          </div>

          <h2 className="animate-fadeInUp font-display text-4xl md:text-6xl lg:text-[5.25rem] leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl mx-auto" style={{ animationDelay: '0.15s' }}>
            準備好了嗎？<br />
            找到你的<span className="gradient-text">投資性格</span>
          </h2>

          <p className="animate-fadeInUp text-white/50 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
            不需要任何金融知識，只需要 60 秒。
          </p>

          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/quiz')}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-mm-accent to-mm-accent-secondary text-white font-semibold text-lg h-14 px-12 rounded-xl shadow-accent-lg hover:shadow-accent hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>開始測驗</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
         ════════════════════════════════════ */}
      <footer className="bg-mm-bg border-t border-mm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-5 object-contain opacity-40" />
            <span className="text-xs text-mm-muted-fg font-medium">口袋基金</span>
          </div>
          <p className="text-xs text-mm-muted-fg/60">&copy; 2024 Pocket Fund. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
