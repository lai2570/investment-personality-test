import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const base = import.meta.env.BASE_URL;
const POCKET_URL = 'https://my.cmoneyfund.com.tw/account-opening';

const animals = [
  { img: `${base}images/animal1.png`, name: '農夫烏龜', trait: '穩健踏實，相信時間的力量' },
  { img: `${base}images/animal2.png`, name: '建築師河狸', trait: '系統規劃，抗通膨意識強' },
  { img: `${base}images/animal3.png`, name: '職人蜜蜂', trait: '務實勤勞，重視現金流' },
  { img: `${base}images/animal4.png`, name: '背包客狐狸', trait: '全球視野，分散佈局' },
  { img: `${base}images/animal5.png`, name: '運動員海豚', trait: '目標導向，追求效率' },
  { img: `${base}images/animal6.png`, name: '教授貓頭鷹', trait: '深度研究，長期持有' },
  { img: `${base}images/animal7.png`, name: '獵人老鷹', trait: '精準判斷，果斷進出' },
  { img: `${base}images/animal8.png`, name: '創業野狼', trait: '逆向思維，價值發掘' },
  { img: `${base}images/animal9.png`, name: '飛行員獵豹', trait: '趨勢判斷，快速反應' },
  { img: `${base}images/animal10.png`, name: '網紅綿羊', trait: '資訊敏感，主題輪動' },
];

const heroFloatAnimals = [
  { img: `${base}images/animal1.png`, y: 'animate-float',    delay: '0s',   pos: 'top-4 left-2 sm:left-6 lg:left-8' },
  { img: `${base}images/animal4.png`, y: 'animate-floatAlt', delay: '0.6s', pos: 'bottom-2 left-6 sm:left-12 lg:left-6' },
  { img: `${base}images/animal9.png`, y: 'animate-float',    delay: '1.2s', pos: 'top-8 right-2 sm:right-6 lg:right-4' },
];

// Scroll-reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Reveal wrapper component
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [animalIndex, setAnimalIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentAnimal = animals[animalIndex];

  function goToAnimal(newIndex: number) {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setAnimalIndex((newIndex + animals.length) % animals.length);
      setIsTransitioning(false);
    }, 200);
  }

  // Auto-rotate animal showcase
  useEffect(() => {
    const timer = setInterval(() => {
      goToAnimal(animalIndex + 1);
    }, 4000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalIndex]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* ═════════ Header ═════════ */}
      <header className="border-b border-line sticky top-0 bg-paper/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="h-14 md:h-16 flex items-center justify-between">
            <div className="flex items-center gap-6 md:gap-8">
              <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 md:h-7 object-contain" />
              <nav className="hidden md:flex items-center gap-6 text-sm text-ink-soft">
                <a href="#how" className="link-underline">如何進行</a>
                <a href="#about" className="link-underline">關於測驗</a>
              </nav>
            </div>
            <button
              onClick={() => navigate('/quiz')}
              className="text-sm font-medium bg-accent text-white px-4 py-2 hover:bg-accent-dark transition-colors cursor-pointer"
            >
              開始測驗
            </button>
          </div>
        </div>
      </header>

      {/* ═════════ Hero ═════════ */}
      <section className="relative overflow-hidden section-soft-warm">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
            {/* Left — Text */}
            <div className="animate-fadeIn">
              <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
                投資性格測驗
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
                3 分鐘，<br className="hidden md:block" />
                找到你的<span className="shimmer-text">第一筆投資</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold text-base h-12 px-8 hover:bg-accent-dark transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  開始測驗
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* Right — Hero Graphic */}
            <div className="relative flex items-center justify-center h-[260px] md:h-[380px] mt-4 md:mt-0">
              <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-line" style={{ animation: 'rotateRing 60s linear infinite' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent" />
              </div>
              <div className="absolute w-36 h-36 md:w-56 md:h-56 rounded-full border border-dashed border-line" style={{ animation: 'rotateRing 45s linear infinite reverse' }} />

              {heroFloatAnimals.map((a, i) => (
                <div
                  key={i}
                  className={`absolute ${a.pos} ${a.y}`}
                  style={{ animationDelay: a.delay }}
                >
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-paper border border-line overflow-hidden flex items-center justify-center shadow-sm">
                    <img src={a.img} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}

              <div className="w-16 h-16 md:w-28 md:h-28 rounded-full bg-accent opacity-10" />

              {/* Owl — same size as other floating animals */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 animate-floatAlt" style={{ animationDelay: '1.8s' }}>
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-paper border border-line overflow-hidden flex items-center justify-center shadow-sm">
                  <img src={`${base}images/animal6.png`} alt="教授貓頭鷹" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ How it works ═════════ */}
      <section id="how" className="border-y border-line section-gradient-down">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Reveal>
            <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
              如何進行
            </p>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-10">
              三個步驟，3 分鐘完成
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              { step: '1', title: '回答 3 個問題', desc: '題目涵蓋時間規劃、風險偏好、投資開放度。不需要任何金融知識，憑直覺作答即可。' },
              { step: '2', title: '取得你的性格動物', desc: '系統依據你的答案組合，從 10 種典型投資性格中，找到最符合你的那一型。' },
              { step: '3', title: '直接申購組合', desc: '閱讀組合說明、看推薦的基金清單，決定好就直接到口袋證券一鍵完成申購。' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 100}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-ink-soft leading-relaxed text-[15px]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ About / Narrative ═════════ */}
      <section id="about" className="border-b border-line section-gradient-up">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Reveal className="max-w-3xl">
            <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
              關於這個測驗
            </p>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
              每個人都說你應該投資，<br className="hidden md:block" />
              但沒人告訴你怎麼開始
            </h2>
            <div className="space-y-5 text-base text-ink-soft leading-relaxed">
              <p>
                台灣有超過 <strong className="text-ink">600 萬人</strong>開過證券戶，但基金的持有人數長期停滯。
                不是人們不想投資，而是基金的購買體驗出了問題。
                打開一個基金平台，看到的是幾千檔基金、繁複的篩選條件、看不懂的專業術語。
                你的反應不是「太好了我可以自己選」，而是「我根本不知道要選什麼」。
              </p>
              <p>
                口袋基金的核心設計哲學是：
                <strong className="text-ink">行動比搞懂重要</strong>。
                整個平台的起點不是一個基金列表，而是三個關於「你自己」的問題。
                回答完三題，系統就會呈現你的「投資性格」，
                並直接給出一個已經配置好的投資組合。
              </p>
              <p>
                你不需要知道什麼是「全球投資級債券基金」，
                你只需要知道「我怕虧錢，所以穩穩睡組合適合我」。
                我們把基金包裝成 10 個情境組合，每個組合都有一個人人聽得懂的名字——
                「穩穩睡組合」投資不該讓你失眠、「錢不變薄組合」對抗通膨這個敵人、
                「每月領錢組合」每個月都有錢進來才叫投資。
              </p>
              <p>
                你看到的不是基金代碼和淨值，
                而是<strong className="text-ink">「我現在應該怎麼做」</strong>的答案。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════ Animal Showcase — Single with Carousel ═════════ */}
      <section className="border-b border-line section-soft-warm relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.04] -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
          <Reveal>
            <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
              10 種投資性格動物
            </p>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              你會是哪一種？
            </h2>
            <p className="text-ink-soft text-base mb-10 max-w-2xl">
              每一種動物代表一種典型的投資風格傾向。測驗完成後，你會收到專屬於你的那一型。
            </p>
          </Reveal>

          <Reveal className="max-w-xl mx-auto" delay={100}>
            <div className="relative">
              <div
                className={`text-center transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-paper border border-line overflow-hidden flex items-center justify-center">
                    <img
                      src={currentAnimal.img}
                      alt={currentAnimal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentAnimal.name}</h3>
                <p className="text-ink-soft text-base">{currentAnimal.trait}</p>
              </div>

              <button
                onClick={() => goToAnimal(animalIndex - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 md:-translate-x-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-paper border border-line hover:border-ink hover:bg-ink hover:text-white transition-all cursor-pointer"
                aria-label="上一個"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                onClick={() => goToAnimal(animalIndex + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 md:translate-x-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-paper border border-line hover:border-ink hover:bg-ink hover:text-white transition-all cursor-pointer"
                aria-label="下一個"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {animals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToAnimal(i)}
                  className={`transition-all duration-200 cursor-pointer ${
                    i === animalIndex
                      ? 'w-6 h-2 bg-accent'
                      : 'w-2 h-2 bg-line-soft hover:bg-ink-mute'
                  }`}
                  aria-label={`查看 ${animals[i].name}`}
                />
              ))}
            </div>

            <p className="text-center text-xs text-ink-mute mt-5">
              {animalIndex + 1} / {animals.length}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═════════ Bottom CTA ═════════ */}
      <section className="border-b border-line section-gradient-down">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
              準備好認識自己的投資性格了嗎？
            </h2>
            <p className="text-ink-soft text-base mb-8 max-w-lg mx-auto">
              回答三個問題，我們幫你把答案配置好。
            </p>
            <button
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold text-base h-12 px-10 hover:bg-accent-dark transition-all cursor-pointer hover:-translate-y-0.5"
            >
              開始測驗
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═════════ Footer ═════════ */}
      <footer className="bg-paper text-ink-soft text-sm">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 object-contain mb-3 opacity-80" />
              <p className="text-xs text-ink-mute leading-relaxed">
                讓每一個人都能做出更好的財務決策
              </p>
            </div>
            <div>
              <h4 className="text-ink font-semibold mb-3 text-sm">測驗</h4>
              <ul className="space-y-2 text-xs">
                <li><a href={POCKET_URL} target="_blank" rel="noopener noreferrer" className="link-underline">關於測驗</a></li>
                <li><a href={POCKET_URL} target="_blank" rel="noopener noreferrer" className="link-underline">如何進行</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-ink font-semibold mb-3 text-sm">口袋基金</h4>
              <ul className="space-y-2 text-xs">
                <li><a href={POCKET_URL} target="_blank" rel="noopener noreferrer" className="link-underline">官方網站</a></li>
                <li><a href={POCKET_URL} target="_blank" rel="noopener noreferrer" className="link-underline">立即開戶</a></li>
                <li><a href={POCKET_URL} target="_blank" rel="noopener noreferrer" className="link-underline">基金總覽</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-line pt-6 text-xs text-ink-mute">
            <p>&copy; 2026 口袋基金 Pocket Fund. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
