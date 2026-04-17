import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-brand-cream">
      <div className="animate-fadeIn max-w-lg w-full text-center">
        {/* Logo area */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-red text-white text-3xl font-bold shadow-lg mb-4">
            口
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 leading-tight">
          3 分鐘，認識你的<br />
          <span className="text-brand-red">投資性格</span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg mb-2 leading-relaxed">
          回答 3 個簡單問題，找到最適合你的投資風格
        </p>
        <p className="text-gray-400 text-sm mb-10">
          測驗結果僅供參考，不構成投資建議
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/quiz')}
          className="w-full max-w-xs mx-auto block bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-lg py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 cursor-pointer"
        >
          開始測驗
        </button>

        {/* Features */}
        <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">3</span>
            <span>道題目</span>
          </div>
          <div className="w-px bg-gray-300" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">10</span>
            <span>種動物</span>
          </div>
          <div className="w-px bg-gray-300" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">1</span>
            <span>分鐘完成</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-12 pb-6 text-center text-xs text-gray-400">
        by 口袋基金
      </footer>
    </div>
  );
}
