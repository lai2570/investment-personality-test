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
    <div className="min-h-screen flex flex-col overflow-hidden selection:bg-brand-red/10 selection:text-brand-red-dark">
      {/* ── Header ── */}
      <header className="relative z-30 px-6 py-6 md:py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img
                src={`${base}images/pocket.png`}
                alt="Logo"
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-brand-dark">口袋基金</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-bold">
              Investment Personality Test 2024
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 pt-4 pb-24 hero-gradient">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        </div>

        {/* Orbiting animals — large screens */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 hidden lg:block pointer-events-none">
          {orbitAnimals.map((a, i) => (
            <div
              key={a.name}
              className="absolute"
              style={{
                animation: `orbit-md 40s linear infinite`,
                animationDelay: `${i * -6.6}s`,
              }}
            >
              <div className="relative group">
                <img
                  src={a.img}
                  alt={a.name}
                  className="w-14 h-14 object-contain opacity-[0.08] grayscale hover:grayscale-0 hover:opacity-40 transition-all duration-700"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Center content */}
        <div className="relative z-10 max-w-2xl w-full text-center">
          {/* Animal showcase — Floating Row */}
          <div className="flex justify-center items-end gap-3 md:gap-6 mb-12">
            {[
              { img: `${base}images/animal7.png`, size: 'w-12 h-12 md:w-16 md:h-16', delay: '0.2s', rotate: '-6deg' },
              { img: `${base}images/animal4.png`, size: 'w-16 h-16 md:w-20 md:h-20', delay: '0.4s', rotate: '-3deg' },
              { img: `${base}images/animal5.png`, size: 'w-20 h-20 md:w-28 md:h-28', delay: '0s', rotate: '0deg' },
              { img: `${base}images/animal6.png`, size: 'w-16 h-16 md:w-20 md:h-20', delay: '0.3s', rotate: '3deg' },
              { img: `${base}images/animal8.png`, size: 'w-12 h-12 md:w-16 md:h-16', delay: '0.5s', rotate: '6deg' },
            ].map((a, i) => (
              <div 
                key={i} 
                className="animate-float" 
                style={{ 
                  animationDelay: a.delay,
                  transform: `rotate(${a.rotate})`
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-brand-red/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                  <img src={a.img} alt="" className={`${a.size} object-contain drop-shadow-2xl relative z-10 transition-transform duration-300 group-hover:scale-110`} />
                </div>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div
            className="animate-fadeIn inline-flex items-center gap-2.5 bg-white/60 backdrop-blur-md rounded-full px-5 py-2 mb-8 shadow-sm border border-white/50"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            <span className="text-xs font-bold text-brand-red-dark tracking-wider uppercase">Quick Quiz • 60 Seconds</span>
          </div>

          {/* Title */}
          <h1
            className="animate-fadeIn text-5xl md:text-7xl font-black text-brand-dark leading-[1.1] tracking-tight mb-6"
            style={{ animationDelay: '0.2s' }}
          >
            探索你的<br />
            <span className="shimmer-text">投資性格基因</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fadeIn text-gray-500 text-lg md:text-xl leading-relaxed max-w-md mx-auto mb-12 font-medium"
            style={{ animationDelay: '0.35s' }}
          >
            透過 3 個直覺問題，解鎖專屬於你的<br />
            <span className="text-brand-dark font-bold">投資風格動物</span> 與 成長策略
          </p>

          {/* CTA */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => navigate('/quiz')}
              className="group relative inline-flex items-center gap-4 bg-brand-red text-white font-black text-xl md:text-2xl py-5 px-16 rounded-2xl transition-all duration-500 hover:bg-brand-red-dark hover:-translate-y-1.5 btn-shadow active:translate-y-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">立即開始</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Stats / Trust signals */}
          <div
            className="animate-fadeIn mt-20 grid grid-cols-3 gap-8 md:gap-12 max-w-lg mx-auto"
            style={{ animationDelay: '0.7s' }}
          >
            {[
              { num: '3', label: '精準題目', color: 'text-brand-red' },
              { num: '10', label: '性格動物', color: 'text-brand-gold' },
              { num: '27', label: '策略組合', color: 'text-brand-dark' },
            ].map((s) => (
              <div key={s.label} className="text-center group cursor-default">
                <div className={`text-4xl md:text-5xl font-black ${s.color} leading-none mb-2 transition-transform duration-300 group-hover:scale-110`}>{s.num}</div>
                <div className="text-[12px] text-gray-400 font-bold tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 bg-white/30 backdrop-blur-sm border-t border-gray-100/50 py-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src={`${base}images/pocket.png`}
            alt="口袋基金"
            className="h-6 object-contain opacity-20 grayscale"
          />
          <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
            © 2024 Pocket Fund. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
