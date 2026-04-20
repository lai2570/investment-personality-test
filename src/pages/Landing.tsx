import { useNavigate } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

const animalGrid = [
  { img: `${base}images/animal1.png`, name: '農夫烏龜', id: '01' },
  { img: `${base}images/animal3.png`, name: '職人蜜蜂', id: '02' },
  { img: `${base}images/animal4.png`, name: '背包客狐狸', id: '03' },
  { img: `${base}images/animal6.png`, name: '教授貓頭鷹', id: '04' },
  { img: `${base}images/animal8.png`, name: '創業野狼', id: '05' },
  { img: `${base}images/animal9.png`, name: '飛行員獵豹', id: '06' },
];

const stats = [
  { num: '03', label: 'QUESTIONS', sublabel: '精準題目' },
  { num: '10', label: 'ANIMALS', sublabel: '性格動物' },
  { num: '27', label: 'STRATEGIES', sublabel: '策略組合' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-swiss-bg text-swiss-fg swiss-noise">
      {/* ════════════════════════════════════
          01. HEADER
         ════════════════════════════════════ */}
      <header className="border-b-2 border-swiss-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={`${base}images/pocket.png`}
              alt="口袋基金"
              className="h-6 md:h-7 object-contain"
            />
            <div className="w-px h-5 bg-black/20" />
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-black/40">
              Investment Personality Test
            </span>
          </div>
          <button
            onClick={() => navigate('/quiz')}
            className="hidden md:block text-[11px] font-bold tracking-[0.15em] uppercase border-2 border-swiss-border px-5 py-2.5 swiss-btn swiss-btn-secondary cursor-pointer"
          >
            Start Test
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════
          02. HERO
         ════════════════════════════════════ */}
      <section className="border-b-4 border-swiss-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[80vh]">
            {/* Left content — 7 cols */}
            <div className="md:col-span-7 flex flex-col justify-between px-6 md:px-12 pt-12 md:pt-20 pb-12 md:pb-16 md:border-r-2 border-swiss-border relative swiss-grid-pattern">
              <div>
                {/* Section label */}
                <div
                  className="animate-fadeIn flex items-center gap-3 mb-8 md:mb-12"
                  style={{ animationDelay: '0.05s' }}
                >
                  <span className="text-swiss-accent font-bold text-xs tracking-[0.2em] uppercase">01</span>
                  <div className="h-px w-12 bg-swiss-accent animate-lineGrow" style={{ animationDelay: '0.1s' }} />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/40">DISCOVER</span>
                </div>

                {/* Headline */}
                <h1
                  className="animate-fadeIn text-left"
                  style={{ animationDelay: '0.1s' }}
                >
                  <span className="block text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] tracking-tighter">
                    投資
                  </span>
                  <span className="block text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] tracking-tighter">
                    性格
                  </span>
                  <span className="block text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] tracking-tighter text-swiss-accent">
                    基因
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  className="animate-fadeIn mt-8 md:mt-12 text-base md:text-lg text-black/50 max-w-md leading-relaxed text-left font-medium"
                  style={{ animationDelay: '0.15s' }}
                >
                  透過 3 個直覺問題，<br />
                  解鎖專屬於你的<span className="text-swiss-fg font-bold">投資風格動物</span>與成長策略。
                </p>
              </div>

              {/* CTA */}
              <div className="animate-fadeIn mt-12" style={{ animationDelay: '0.2s' }}>
                <button
                  onClick={() => navigate('/quiz')}
                  className="group bg-swiss-fg text-swiss-bg font-black text-base md:text-lg tracking-[0.05em] uppercase py-5 px-12 md:px-16 cursor-pointer swiss-btn swiss-btn-primary flex items-center gap-4"
                >
                  <span>立即開始測驗</span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <p className="mt-4 text-[11px] text-black/30 font-medium tracking-wide uppercase">
                  60 seconds — No sign up required
                </p>
              </div>
            </div>

            {/* Right panel — 5 cols: Animal grid */}
            <div className="md:col-span-5 bg-swiss-muted swiss-dots relative hidden md:flex flex-col">
              {/* Geometric accent */}
              <div className="absolute top-12 right-12 w-20 h-20 border-4 border-swiss-accent" />
              <div className="absolute top-16 right-16 w-20 h-20 bg-swiss-accent/5" />

              <div className="flex-1 grid grid-cols-2 gap-0">
                {animalGrid.map((animal, i) => (
                  <div
                    key={animal.id}
                    className="animate-fadeIn group relative border-b border-r border-black/10 p-6 flex flex-col items-center justify-center swiss-card hover:bg-swiss-fg cursor-default"
                    style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                  >
                    <img
                      src={animal.img}
                      alt={animal.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-contain mb-3 transition-transform duration-150 ease-out group-hover:scale-105 group-hover:invert"
                    />
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-black/40 group-hover:text-white/60 transition-colors duration-150">
                      {animal.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile animal strip */}
      <section className="md:hidden border-b-2 border-swiss-border overflow-hidden">
        <div className="flex" style={{ animation: 'marquee 20s linear infinite', width: '200%' }}>
          {[...animalGrid, ...animalGrid].map((animal, i) => (
            <div key={i} className="flex-shrink-0 w-28 py-6 flex flex-col items-center gap-2 border-r border-black/10">
              <img src={animal.img} alt={animal.name} className="w-12 h-12 object-contain" />
              <span className="text-[9px] font-bold tracking-wider uppercase text-black/30">{animal.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          03. STATS
         ════════════════════════════════════ */}
      <section className="border-b-4 border-swiss-border">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <div className="px-6 md:px-12 pt-8 pb-4 border-b border-black/10 flex items-center gap-3">
            <span className="text-swiss-accent font-bold text-xs tracking-[0.2em] uppercase">02</span>
            <div className="h-px w-8 bg-swiss-accent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/40">METHOD</span>
          </div>

          <div className="grid grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`animate-countUp group px-6 md:px-12 py-10 md:py-16 text-left swiss-card hover:bg-swiss-fg hover:text-swiss-bg cursor-default
                  ${i < 2 ? 'border-r-2 border-swiss-border' : ''}`}
                style={{ animationDelay: `${0.25 + i * 0.05}s` }}
              >
                <div className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-3 md:mb-4">
                  {s.num}
                </div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black/40 group-hover:text-white/50 transition-colors duration-150 mb-1">
                  {s.label}
                </div>
                <div className="text-sm md:text-base font-bold group-hover:text-white/80 transition-colors duration-150">
                  {s.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          04. HOW IT WORKS
         ════════════════════════════════════ */}
      <section className="border-b-4 border-swiss-border">
        <div className="max-w-7xl mx-auto">
          <div className="px-6 md:px-12 pt-8 pb-4 border-b border-black/10 flex items-center gap-3">
            <span className="text-swiss-accent font-bold text-xs tracking-[0.2em] uppercase">03</span>
            <div className="h-px w-8 bg-swiss-accent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/40">PROCESS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { step: '01', title: '回答問題', desc: '3 個關於你投資偏好的直覺問題，不需要任何金融知識。' },
              { step: '02', title: '分析匹配', desc: '根據行為金融學模型，從 27 種組合中找到你的專屬動物。' },
              { step: '03', title: '探索結果', desc: '了解你的投資性格、擅長領域，以及最適合的組合方向。' },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`animate-fadeIn group px-6 md:px-12 py-10 md:py-16 text-left swiss-card hover:bg-swiss-accent hover:text-swiss-bg cursor-default
                  ${i < 2 ? 'md:border-r-2 border-swiss-border' : ''}
                  ${i < 2 ? 'border-b-2 md:border-b-0 border-swiss-border' : ''}`}
                style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              >
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-black/10 group-hover:text-white/30 transition-colors duration-150 mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-black/50 group-hover:text-white/70 transition-colors duration-150 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          05. BOTTOM CTA
         ════════════════════════════════════ */}
      <section className="bg-swiss-fg text-swiss-bg border-b-4 border-swiss-border swiss-diagonal">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 text-left">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-swiss-accent font-bold text-xs tracking-[0.2em] uppercase">04</span>
                <div className="h-px w-8 bg-swiss-accent" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">BEGIN</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter mb-6">
                準備好了嗎？<br />
                <span className="text-swiss-accent">找到你的投資性格。</span>
              </h2>
              <p className="text-base md:text-lg text-white/50 font-medium max-w-lg leading-relaxed">
                不需要任何金融知識。只需要 60 秒，回答 3 個問題。
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <button
                onClick={() => navigate('/quiz')}
                className="group bg-swiss-accent text-swiss-bg font-black text-base md:text-lg tracking-[0.05em] uppercase py-5 px-12 cursor-pointer transition-all duration-150 ease-out hover:bg-swiss-bg hover:text-swiss-fg flex items-center gap-4"
              >
                <span>開始測驗</span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-150 ease-out group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
         ════════════════════════════════════ */}
      <footer className="border-t-2 border-swiss-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={`${base}images/pocket.png`}
              alt="口袋基金"
              className="h-5 object-contain opacity-30 grayscale"
            />
            <span className="text-[10px] text-black/30 font-bold tracking-[0.15em] uppercase">
              Pocket Fund
            </span>
          </div>
          <p className="text-[10px] text-black/25 font-medium tracking-wider uppercase">
            &copy; 2024 All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
