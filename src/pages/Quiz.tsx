import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { scoreAnimal } from '../lib/scoring';
import type { Time, Level } from '../data/questions';

const base = import.meta.env.BASE_URL;

// Show different animal hint per question
const questionAnimals = [
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
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Header with progress */}
      <header className="sticky top-0 z-10 bg-brand-cream/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-brand-dark text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {currentQ === 0 ? '回首頁' : '上一題'}
            </button>
            <span className="text-sm font-semibold text-brand-dark">
              {currentQ + 1} <span className="text-gray-300">/</span> {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #C0392B, #E74C3C)',
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, white, transparent)',
                  animation: 'progress-shine 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Question area */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div key={currentQ} className="animate-fadeIn max-w-xl w-full">
          {/* Decorative animal */}
          <div className="flex justify-center mb-6">
            <img
              src={questionAnimals[currentQ]}
              alt=""
              className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-20"
            />
          </div>

          {/* Question text */}
          <div className="text-center mb-10">
            <span className="inline-block text-brand-red font-bold text-sm tracking-widest mb-2">
              QUESTION {question.id}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark leading-snug">
              {question.title}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQ] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`group w-full text-left px-5 py-4 md:px-6 md:py-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                    ${isSelected
                      ? 'border-brand-red bg-brand-red text-white shadow-lg scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-brand-red/40 hover:-translate-y-0.5 hover:shadow-lg'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-brand-cream text-brand-red group-hover:bg-brand-red/10'
                      }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-base md:text-lg font-medium transition-colors
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
    </div>
  );
}
