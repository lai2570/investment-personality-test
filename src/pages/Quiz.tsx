import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { scoreAnimal } from '../lib/scoring';
import type { Time, Level } from '../data/questions';

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  function handleSelect(value: string) {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      // Calculate result
      const time = newAnswers[0] as Time;
      const n = newAnswers[1] as Level;
      const o = newAnswers[2] as Level;
      const animal = scoreAnimal(time, n, o);
      setTimeout(() => navigate(`/result?a=${animal}`), 300);
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
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="max-w-lg mx-auto">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-brand-dark text-sm flex items-center gap-1 mb-4 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {currentQ === 0 ? '回首頁' : '上一題'}
          </button>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-xs text-gray-400 mt-1">
            {currentQ + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div key={currentQ} className="animate-fadeIn max-w-lg w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 text-center">
            Q{question.id}.
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-brand-dark mb-8 text-center">
            {question.title}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = answers[currentQ] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'border-brand-red bg-white shadow-md'
                      : 'border-gray-200 bg-white hover:border-brand-gold hover:-translate-y-0.5 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${isSelected ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-base md:text-lg ${isSelected ? 'text-brand-dark font-medium' : 'text-gray-700'}`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
