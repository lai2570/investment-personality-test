import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { scoreAnimal } from '../lib/scoring';
import type { Time, Level } from '../data/questions';

const base = import.meta.env.BASE_URL;

const questionIllustrations = [
  `${base}images/animal1.png`,
  `${base}images/animal5.png`,
  `${base}images/animal9.png`,
];

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
      }, 400);
    } else {
      const time = newAnswers[0] as Time;
      const n = newAnswers[1] as Level;
      const o = newAnswers[2] as Level;
      const animal = scoreAnimal(time, n, o);
      setTimeout(() => navigate(`/result?a=${animal}`), 500);
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
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #FAF6F0 0%, #F3ECE2 100%)' }}>
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-brand-cream/80 border-b border-black/5">
        <div className="max-w-xl mx-auto px-6 pt-4 pb-3">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-dark transition-colors cursor-pointer group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">{currentQ === 0 ? '回首頁' : '上一題'}</span>
            </button>

            {/* Step dots */}
            <div className="flex items-center gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500
                    ${i === currentQ
                      ? 'w-7 h-2.5 bg-brand-red'
                      : i < currentQ
                        ? 'w-2.5 h-2.5 bg-brand-red/40'
                        : 'w-2.5 h-2.5 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #C0392B, #E74C3C)',
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 md:py-12">
        <div key={currentQ} className="animate-fadeIn max-w-xl w-full">

          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-red/5 scale-150" />
              <img
                src={questionIllustrations[currentQ]}
                alt=""
                className="relative w-20 h-20 md:w-24 md:h-24 object-contain opacity-15"
              />
            </div>
          </div>

          {/* Question header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-brand-red/30" />
              <span className="text-brand-red font-bold text-xs tracking-[0.2em] uppercase">
                Question {question.id} of {questions.length}
              </span>
              <div className="h-px w-6 bg-brand-red/30" />
            </div>
            <h2 className="text-2xl md:text-[2rem] font-bold text-brand-dark leading-snug tracking-tight">
              {question.title}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 md:space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQ] === option.value;
              const letters = ['A', 'B', 'C'];
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`group w-full text-left rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                    ${isSelected
                      ? 'border-brand-red bg-brand-red shadow-xl scale-[1.02]'
                      : 'border-transparent bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-brand-red/20'
                    }`}
                >
                  <div className="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
                    <span className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold tracking-wide transition-all duration-300
                      ${isSelected
                        ? 'bg-white/25 text-white'
                        : 'bg-brand-cream text-brand-red group-hover:bg-brand-red/5'
                      }`}>
                      {letters[idx]}
                    </span>
                    <span className={`text-[15px] md:text-base font-medium leading-snug transition-colors
                      ${isSelected ? 'text-white' : 'text-brand-dark'}`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Subtle footer ── */}
      <footer className="py-4 text-center">
        <img
          src={`${base}images/pocket.png`}
          alt="口袋基金"
          className="h-4 mx-auto object-contain opacity-20"
        />
      </footer>
    </div>
  );
}
