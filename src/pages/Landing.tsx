import { useNavigate } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

// Show a sampling of animal images on landing
const previewAnimals = [
  { img: `${base}images/animal1.png`, name: '農夫烏龜', delay: '0s' },
  { img: `${base}images/animal4.png`, name: '背包客狐狸', delay: '0.5s' },
  { img: `${base}images/animal6.png`, name: '教授貓頭鷹', delay: '1s' },
  { img: `${base}images/animal5.png`, name: '運動員海豚', delay: '1.5s' },
  { img: `${base}images/animal8.png`, name: '創業野狼', delay: '2s' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      {/* Top bar */}
      <header className="px-6 pt-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-8 object-contain" />
          <span className="text-xs text-gray-400">投資性格測驗</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="animate-fadeIn max-w-2xl w-full text-center">
          {/* Animal preview row */}
          <div className="flex justify-center items-end gap-3 md:gap-5 mb-10">
            {previewAnimals.map((a) => (
              <div
                key={a.name}
                className="animate-float"
                style={{ animationDelay: a.delay }}
              >
                <img
                  src={a.img}
                  alt={a.name}
                  className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-md"
                />
              </div>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-5 leading-tight tracking-tight">
            3 分鐘<br />
            認識你的<span className="text-brand-red">投資性格</span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed max-w-md mx-auto">
            回答 3 個簡單問題，找到專屬於你的投資風格動物，<br className="hidden md:block" />
            以及最適合你的投資組合方向。
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/quiz')}
            className="inline-block bg-brand-red hover:bg-brand-red-dark text-white font-bold text-lg md:text-xl py-4 px-12 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 cursor-pointer"
            style={{ boxShadow: '0 8px 30px rgba(192,57,43,0.3)' }}
          >
            開始測驗
          </button>

          {/* Stats row */}
          <div className="mt-14 inline-flex items-center gap-6 md:gap-10 bg-white/70 backdrop-blur-sm rounded-full px-8 py-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-brand-red">3</div>
              <div className="text-xs text-gray-400 mt-0.5">道題目</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-brand-gold">10</div>
              <div className="text-xs text-gray-400 mt-0.5">種動物</div>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-brand-dark">60</div>
              <div className="text-xs text-gray-400 mt-0.5">秒完成</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8 text-center">
        <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 mx-auto mb-2 object-contain opacity-40" />
      </footer>
    </div>
  );
}
