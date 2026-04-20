import { useNavigate } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

const orbitAnimals = [
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
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* ── Header ── */}
      <header className="relative z-20 px-6 pt-5 pb-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <img
            src={`${base}images/pocket.png`}
            alt="口袋基金"
            className="h-7 md:h-8 object-contain"
          />
          <span className="text-[11px] tracking-widest text-gray-400 uppercase font-medium">
            Investment Personality Test
          </span>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 pt-4 pb-20 hero-gradient">
        {/* Decorative radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.05) 0%, transparent 70%)' }}
        />

        {/* Orbiting animals — large screens */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 hidden md:block pointer-events-none">
          {orbitAnimals.map((a, i) => (
            <div
              key={a.name}
              className="absolute"
              style={{
                animation: `orbit-md 30s linear infinite`,
                animationDelay: `${i * -5}s`,
              }}
            >
              <img
                src={a.img}
                alt={a.name}
                className="w-16 h-16 object-contain opacity-[0.13] drop-shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* Center content */}
        <div className="relative z-10 max-w-xl w-full text-center">
          {/* Animal showcase — mobile-friendly row */}
          <div className="flex justify-center items-end gap-2 md:gap-4 mb-8">
            {[
              { img: `${base}images/animal7.png`, size: 'w-11 h-11 md:w-14 md:h-14', delay: '0.1s' },
              { img: `${base}images/animal4.png`, size: 'w-14 h-14 md:w-18 md:h-18', delay: '0.3s' },
              { img: `${base}images/animal5.png`, size: 'w-18 h-18 md:w-24 md:h-24', delay: '0s' },
              { img: `${base}images/animal6.png`, size: 'w-14 h-14 md:w-18 md:h-18', delay: '0.2s' },
              { img: `${base}images/animal8.png`, size: 'w-11 h-11 md:w-14 md:h-14', delay: '0.4s' },
            ].map((a, i) => (
              <div key={i} className="animate-float" style={{ animationDelay: a.delay }}>
                <img src={a.img} alt="" className={`${a.size} object-contain drop-shadow-lg`} />
              </div>
            ))}
          </div>

          {/* Eyebrow */}
          <div
            className="animate-fadeIn inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs font-medium text-gray-500 tracking-wide">3 題測驗，60 秒完成</span>
          </div>

          {/* Title */}
          <h1
            className="animate-fadeIn text-[2.5rem] md:text-6xl font-extrabold text-brand-dark leading-[1.15] tracking-tight mb-5"
            style={{ animationDelay: '0.2s' }}
          >
            認識你的<br />
            <span className="text-brand-red">投資性格</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fadeIn text-gray-500 text-base md:text-lg leading-relaxed max-w-sm mx-auto mb-10"
            style={{ animationDelay: '0.35s' }}
          >
            回答 3 個簡單問題<br />
            找到專屬於你的投資風格動物
          </p>

          {/* CTA */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => navigate('/quiz')}
              className="group relative inline-flex items-center gap-3 bg-brand-red text-white font-bold text-lg md:text-xl py-4 px-14 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:bg-brand-red-dark hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
              style={{ boxShadow: '0 10px 40px rgba(192,57,43,0.35)' }}
            >
              開始測驗
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Trust signals */}
          <div
            className="animate-fadeIn mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto"
            style={{ animationDelay: '0.7s' }}
          >
            {[
              { num: '3', label: '道題目', color: 'text-brand-red' },
              { num: '10', label: '種動物人格', color: 'text-brand-gold' },
              { num: '27', label: '種組合', color: 'text-brand-dark' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl md:text-4xl font-extrabold ${s.color} leading-none`}>{s.num}</div>
                <div className="text-[11px] text-gray-400 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 bg-brand-cream border-t border-gray-100 py-6 text-center">
        <img
          src={`${base}images/pocket.png`}
          alt="口袋基金"
          className="h-5 mx-auto object-contain opacity-30"
        />
      </footer>
    </div>
  );
}
