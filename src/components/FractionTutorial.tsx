import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, ArrowRight, Lightbulb, Bookmark } from 'lucide-react';
import { FractionDisplay } from './FractionDisplay';
import { SupportedLang, translations } from '../i18n/translations';
import { tutorialData } from '../i18n/tutorialData';

interface FractionTutorialProps {
  lang?: SupportedLang;
  onLoadExample?: (w1: string, n1: string, d1: string, op: '+' | '-' | '×' | '÷', w2: string, n2: string, d2: string) => void;
}

export const FractionTutorial: React.FC<FractionTutorialProps> = ({
  lang = 'en',
  onLoadExample,
}) => {
  const t = translations[lang] || translations.en;
  const content = tutorialData[lang] || tutorialData.en;
  const [activeCategory, setActiveCategory] = useState<'concepts' | 'reduction' | 'addition' | 'multiplication' | 'pitfalls'>('concepts');

  const handleApply = (w1: string, n1: string, d1: string, op: '+' | '-' | '×' | '÷', w2: string, n2: string, d2: string) => {
    if (onLoadExample) {
      onLoadExample(w1, n1, d1, op, w2, n2, d2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        {content.categories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Concepts */}
      {activeCategory === 'concepts' && (
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              {content.concepts.title}
            </h3>
            <p className="text-sm leading-relaxed">
              {content.concepts.whatIsFraction}
              <br />
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                {content.concepts.pizzaExample}
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                  {content.concepts.properTitle}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {content.concepts.properDesc}
                </p>
                <div className="flex items-center gap-3">
                  <FractionDisplay n={2} d={5} size="sm" />
                  <FractionDisplay n={3} d={7} size="sm" />
                  <FractionDisplay n={5} d={9} size="sm" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                  {content.concepts.improperTitle}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {content.concepts.improperDesc}
                </p>
                <div className="flex items-center gap-3">
                  <FractionDisplay n={5} d={3} size="sm" />
                  <FractionDisplay n={7} d={4} size="sm" />
                  <FractionDisplay n={9} d={9} size="sm" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                  {content.concepts.mixedTitle}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {content.concepts.mixedDesc}
                </p>
                <div className="flex items-center gap-3">
                  <FractionDisplay whole={1} n={2} d={3} size="sm" />
                  <FractionDisplay whole={3} n={1} d={4} size="sm" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-indigo-900 dark:text-indigo-300 font-semibold block mb-0.5">
                  {content.concepts.conversionTitle}
                </strong>
                <span className="text-indigo-700 dark:text-indigo-400">
                  {content.concepts.conversionDesc}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleApply('0', '7', '3', '+', '0', '1', '3')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shrink-0 shadow-xs"
              >
                {t.tutorial.tryInCalc}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Reduction & Common Denominator */}
      {activeCategory === 'reduction' && (
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              {content.reduction.title}
            </h3>
            <p className="text-sm leading-relaxed">
              {content.reduction.desc}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {content.reduction.exampleTitle}
              </span>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-300 space-y-1">
                {content.reduction.exampleSteps.map((step, idx) => (
                  <div key={idx}>{step}</div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {content.reduction.lcmTitle}
              </h4>
              <p className="text-sm leading-relaxed mb-3">
                {content.reduction.lcmDesc}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {content.reduction.lcmExampleTitle}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {content.reduction.lcmExampleSteps}
                </p>
                <button
                  type="button"
                  onClick={() => handleApply('0', '1', '4', '+', '0', '5', '6')}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  <span>1/4 + 5/6</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Addition and Subtraction */}
      {activeCategory === 'addition' && (
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-500" />
              {content.addition.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {content.addition.rule1Title}
                  </span>
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {content.addition.rule1Chant}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {content.addition.rule1Desc}
                </p>
                <button
                  type="button"
                  onClick={() => handleApply('0', '2', '7', '+', '0', '3', '7')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline pt-1 inline-flex items-center gap-1"
                >
                  {t.tutorial.loadThisExample} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {content.addition.rule2Title}
                  </span>
                </div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {content.addition.rule2Chant}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {content.addition.rule2Desc}
                </p>
                <button
                  type="button"
                  onClick={() => handleApply('0', '1', '2', '-', '0', '1', '3')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline pt-1 inline-flex items-center gap-1"
                >
                  {t.tutorial.loadThisExample} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 text-xs space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-300">
                {content.addition.mixedTipsTitle}
              </span>
              <p className="text-amber-800 dark:text-amber-400 leading-relaxed">
                {content.addition.mixedTipsDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Multiplication and Division */}
      {activeCategory === 'multiplication' && (
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              {content.multiplication.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {content.multiplication.mulTitle}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {content.multiplication.mulChant}
                </p>
                <div className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  {content.multiplication.mulExample}
                </div>
                <button
                  type="button"
                  onClick={() => handleApply('0', '2', '3', '×', '0', '9', '10')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline pt-1 inline-flex items-center gap-1"
                >
                  {t.tutorial.loadThisExample} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {content.multiplication.divTitle}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {content.multiplication.divChant}
                </p>
                <div className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  {content.multiplication.divExample}
                </div>
                <button
                  type="button"
                  onClick={() => handleApply('0', '3', '4', '÷', '0', '5', '8')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline pt-1 inline-flex items-center gap-1"
                >
                  {t.tutorial.loadThisExample} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">
                {content.multiplication.mixedWarningTitle}
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {content.multiplication.mixedWarningDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Pitfalls & Traps */}
      {activeCategory === 'pitfalls' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {content.pitfalls.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {content.pitfalls.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-1"
                >
                  <strong className="text-rose-700 dark:text-rose-400 block mb-1">
                    {item.title}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                    {item.wrong}
                    <br />
                    {item.correct}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
