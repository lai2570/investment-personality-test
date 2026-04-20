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
    <div className="min-h-screen flex flex-col bg-mm-bg">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-mm-bg/80 backdrop-blur-xl border-b border-mm-border">
        <div className="max-w-2xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-sm text-mm-muted-fg hover:text-mm-fg transition-colors duration-200 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">{currentQ === 0 ? '回首頁' : '上一題'}</span>
          </button>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300
                  ${i === currentQ
                    ? 'w-8 h-2.5 bg-gradient-to-r from-mm-accent to-mm-accent-secondary'
                    : i < currentQ
                      ? 'w-2.5 h-2.5 bg-mm-accent/40'
                      : 'w-2.5 h-2.5 bg-mm-border'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-mm-border">
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #C0392B, #E74C3C)',
            }}
          />
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-10 py-12 md:py-16">
        <div key={currentQ} className="animate-fadeInUp max-w-xl w-full">
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full scale-[2] opacity-5" style={{ background: 'radial-gradient(circle, #C0392B, transparent 70%)' }} />
              <img
                src={questionIllustrations[currentQ]}
                alt=""
                className="relative w-20 h-20 md:w-24 md:h-24 object-contain opacity-[0.12]"
              />
            </div>
          </div>

          {/* Question label */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-mm-accent/30 bg-mm-accent/5 px-4 py-1.5 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mm-accent">
                Question {question.id} of {questions.length}
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-[2rem] text-mm-fg leading-snug tracking-[-0.01em]">
              {question.title}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQ] === option.value;
              const letters = ['A', 'B', 'C'];
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`group w-full text-left rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden
                    ${isSelected
                      ? 'border-mm-accent bg-gradient-to-r from-mm-accent to-mm-accent-secondary shadow-accent scale-[1.02]'
                      : 'border-mm-border bg-mm-card hover:border-mm-accent/30 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                >
                  <div className="flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
                    <span className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200
                      ${isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-mm-muted text-mm-accent group-hover:bg-mm-accent/5'
                      }`}>
                      {letters[idx]}
                    </span>
                    <span className={`text-[15px] md:text-base font-medium leading-snug transition-colors duration-200
                      ${isSelected ? 'text-white' : 'text-mm-fg'}`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-5 text-center border-t border-mm-border">
        <img src={`${base}images/pocket.png`} alt="口袋基金" className="h-4 mx-auto object-contain opacity-20" />
      </footer>
    </div>
  );
}
