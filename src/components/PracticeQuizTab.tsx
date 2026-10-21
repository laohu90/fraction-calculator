import React, { useState, useEffect } from 'react';
import { FractionDisplay } from './FractionDisplay';
import { computeFractionArithmetic, simplifyFractionWithSteps, Fraction } from '../utils/fractionMath';
import { SupportedLang, translations } from '../i18n/translations';
import { CheckCircle2, XCircle, RotateCcw, Award, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: string;
  type: 'arithmetic' | 'simplify';
  f1: Fraction;
  f2?: Fraction;
  op?: '+' | '-' | '×' | '÷';
  targetAnswer: Fraction;
  title: string;
}

export const PracticeQuizTab: React.FC<{
  lang?: SupportedLang;
  onInspectQuestion?: (f1: Fraction, op: '+' | '-' | '×' | '÷', f2: Fraction) => void;
}> = ({ lang = 'en', onInspectQuestion }) => {
  const t = translations[lang] || translations.en;
  const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [currentQ, setCurrentQ] = useState<QuizQuestion | null>(null);
  const [userN, setUserN] = useState('');
  const [userD, setUserD] = useState('');
  const [status, setStatus] = useState<'unanswered' | 'correct' | 'wrong'>('unanswered');
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  const generateNewQuestion = () => {
    setStatus('unanswered');
    setUserN('');
    setUserD('');

    const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    let f1: Fraction = { n: 1, d: 2 };
    let f2: Fraction = { n: 1, d: 3 };
    let op: '+' | '-' | '×' | '÷' = '+';

    if (level === 'easy') {
      const d = randInt(3, 9);
      const n1 = randInt(1, d - 1);
      const n2 = randInt(1, d - 1);
      op = Math.random() > 0.5 ? '+' : '-';
      f1 = { n: Math.max(n1, n2), d };
      f2 = { n: Math.min(n1, n2), d };
    } else if (level === 'medium') {
      const d1 = randInt(2, 8);
      const d2 = randInt(2, 8);
      const n1 = randInt(1, d1);
      const n2 = randInt(1, d2);
      const ops: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
      op = ops[randInt(0, 3)];
      f1 = { n: n1, d: d1 };
      f2 = { n: n2, d: d2 };
    } else {
      const d1 = randInt(3, 12);
      const d2 = randInt(3, 12);
      const n1 = randInt(2, 10);
      const n2 = randInt(2, 10);
      const ops: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
      op = ops[randInt(0, 3)];
      f1 = { n: n1, d: d1 };
      f2 = { n: n2, d: d2 };
    }

    try {
      const calc = computeFractionArithmetic(f1, op, f2, lang);
      setCurrentQ({
        id: Math.random().toString(),
        type: 'arithmetic',
        f1,
        f2,
        op,
        targetAnswer: calc.simplified,
        title: t.quiz.prompt,
      });
    } catch {
      setCurrentQ({
        id: Math.random().toString(),
        type: 'arithmetic',
        f1: { n: 1, d: 2 },
        f2: { n: 1, d: 4 },
        op: '+',
        targetAnswer: { n: 3, d: 4 },
        title: t.quiz.prompt,
      });
    }
  };

  useEffect(() => {
    generateNewQuestion();
  }, [level, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQ || status !== 'unanswered') return;

    const n = parseInt(userN, 10);
    const d = parseInt(userD, 10) || 1;

    if (isNaN(n)) return;

    setTotalAttempted((prev) => prev + 1);

    if (n === currentQ.targetAnswer.n && d === currentQ.targetAnswer.d) {
      setStatus('correct');
      setScore((prev) => prev + 1);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    } else {
      setStatus('wrong');
    }
  };

  const handleInspect = () => {
    if (currentQ && currentQ.f2 && currentQ.op && onInspectQuestion) {
      onInspectQuestion(currentQ.f1, currentQ.op, currentQ.f2);
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selection & Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {t.quiz.selectDifficulty}
          </span>
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            {[
              { id: 'easy', label: t.quiz.easy },
              { id: 'medium', label: t.quiz.medium },
              { id: 'hard', label: t.quiz.hard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLevel(tab.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  level === tab.id
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{t.quiz.score}</span>
            <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
              {score} / {totalAttempted}
            </strong>
          </div>
        </div>
      </div>

      {/* Main Card */}
      {currentQ && (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{currentQ.title}</span>
          </div>

          {/* Equation Display */}
          <div className="flex items-center justify-center gap-4 py-4">
            <FractionDisplay n={currentQ.f1.n} d={currentQ.f1.d} size="xl" />
            <span className="text-2xl font-bold font-mono text-slate-400 px-2">{currentQ.op}</span>
            {currentQ.f2 && <FractionDisplay n={currentQ.f2.n} d={currentQ.f2.d} size="xl" />}
            <span className="text-2xl font-bold font-mono text-slate-400 px-2">=</span>

            {/* Answer Input */}
            <form onSubmit={handleSubmit} className="inline-flex items-center">
              <div className="inline-flex flex-col items-center">
                <input
                  type="number"
                  value={userN}
                  onChange={(e) => setUserN(e.target.value)}
                  placeholder={t.calc.num}
                  disabled={status !== 'unanswered'}
                  className="w-20 px-2 py-1.5 text-center text-lg font-bold font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-80"
                  autoFocus
                />
                <div className="w-20 h-0.5 bg-slate-700 dark:bg-slate-300 my-1 rounded-full" />
                <input
                  type="number"
                  value={userD}
                  onChange={(e) => setUserD(e.target.value)}
                  placeholder={t.calc.den}
                  disabled={status !== 'unanswered'}
                  className="w-20 px-2 py-1.5 text-center text-lg font-bold font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-80"
                />
              </div>
            </form>
          </div>

          {/* Feedback section */}
          {status === 'unanswered' ? (
            <div>
              <button
                type="button"
                onClick={handleSubmit as any}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors shadow-xs"
              >
                {t.actions.submitCheck}
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-md mx-auto pt-2">
              {status === 'correct' ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold text-sm">{t.quiz.correctMsg}</span>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 flex flex-col items-center gap-2 text-rose-700 dark:text-rose-300">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    <span className="font-bold text-sm">{t.quiz.wrongMsg}</span>
                  </div>
                  <div className="text-xs">
                    {t.quiz.correctAnswerIs}
                    <FractionDisplay
                      n={currentQ.targetAnswer.n}
                      d={currentQ.targetAnswer.d}
                      size="sm"
                      className="ml-1"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={generateNewQuestion}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t.actions.nextQuestion}
                </button>

                {onInspectQuestion && (
                  <button
                    type="button"
                    onClick={handleInspect}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-medium hover:bg-indigo-100 transition-colors"
                  >
                    {t.actions.viewSteps} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
