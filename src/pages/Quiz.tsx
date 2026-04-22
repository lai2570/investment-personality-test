import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { scoreAnimal } from '../lib/scoring';
import type { Time, Level } from '../data/questions';

const base = import.meta.env.BASE_URL;

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  function handleSelect(value: string) {
    if (isTransitioning) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);
    setIsTransitioning(true);

    if (currentQ < questions.length - 1) {
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setIsTransitioning(false);
      }, 350);
    } else {
      const time = newAnswers[0] as Time;
      const n = newAnswers[1] as Level;
      const o = newAnswers[2] as Level;
      const animal = scoreAnimal(time, n, o);
      setTimeout(() => navigate(`/result?a=${animal}`), 450);
    }
  }

  function handleBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* ── Header ── */}
      <header className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-6 object-contain" />
          <span className="text-xs md:text-sm text-ink-mute">
            投資性格測驗
          </span>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleBack}
              className="text-sm text-ink-mute hover:text-ink transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              {currentQ === 0 ? '回首頁' : '上一題'}
            </button>
            <span className="text-sm text-ink-mute font-medium">
              第 {currentQ + 1} 題 / 共 {questions.length} 題
            </span>
          </div>
          <div className="h-1 bg-line-soft overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Question ── */}
      <main className="flex-1 flex items-center justify-center px-5 md:px-8 py-12 md:py-16">
        <div key={currentQ} className="animate-fadeIn max-w-2xl w-full">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-wider uppercase mb-4">
            Question {question.id}
          </p>
          <h2 className="text-2xl md:text-[28px] font-bold leading-snug text-ink mb-10">
            {question.title}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQ] === option.value;
              const letters = ['A', 'B', 'C'];
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`group w-full text-left border transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'border-accent bg-accent-soft'
                      : 'border-line bg-paper hover:border-ink hover:bg-paper-off'
                    }`}
                >
                  <div className="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
                    <span className={`flex-shrink-0 w-9 h-9 border flex items-center justify-center text-sm font-bold transition-colors duration-200
                      ${isSelected
                        ? 'border-accent bg-accent text-white'
                        : 'border-line text-ink-mute group-hover:border-ink group-hover:text-ink'
                      }`}>
                      {letters[idx]}
                    </span>
                    <span className={`text-base md:text-lg leading-snug transition-colors
                      ${isSelected ? 'text-accent-dark font-semibold' : 'text-ink'}`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-ink-mute mt-8 text-center">
            憑你的第一直覺作答。沒有標準答案。
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-line">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 text-xs text-ink-mute text-center">
          本測驗結果僅供參考，不構成投資建議。
        </div>
      </footer>
    </div>
  );
}
