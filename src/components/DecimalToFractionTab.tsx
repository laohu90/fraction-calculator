import React, { useState } from 'react';
import { decimalToFraction } from '../utils/fractionMath';
import { FractionDisplay } from './FractionDisplay';
import { SupportedLang, translations } from '../i18n/translations';
import { ArrowRight, Calculator } from 'lucide-react';

export const DecimalToFractionTab: React.FC<{ lang?: SupportedLang }> = ({
  lang = 'en',
}) => {
  const t = translations[lang] || translations.en;
  const [inputVal, setInputVal] = useState('0.75');

  let result = null;
  let errorMsg = '';

  try {
    if (inputVal.trim()) {
      result = decimalToFraction(inputVal);
    }
  } catch (e: any) {
    errorMsg = e.message;
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          {t.decimal.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          {t.decimal.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.decimal.placeholder}
              className="w-64 px-4 py-2 text-base font-mono font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-400 mr-1">{t.calc.presetsTitle}</span>
            {[
              { label: '0.25 (1/4)', val: '0.25' },
              { label: '0.75 (3/4)', val: '0.75' },
              { label: '0.125 (1/8)', val: '0.125' },
              { label: '0.[3] (1/3)', val: '0.[3]' },
              { label: '0.1[6] (1/6)', val: '0.1[6]' },
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputVal(preset.val)}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 font-mono transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-4">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {t.calc.resultTitle}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">
                {result.input}
              </span>
              <ArrowRight className="w-5 h-5 text-slate-400" />
              <FractionDisplay
                n={result.simplified.n}
                d={result.simplified.d}
                size="xl"
                colorScheme="primary"
              />
            </div>
            <div className="text-xs text-slate-500">
              {result.type === 'terminating'
                ? t.decimal.typeTerminating
                : result.type === 'pure_repeating'
                ? t.decimal.typePureRepeating
                : t.decimal.typeMixedRepeating}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-500" />
              {t.decimal.derivationTitle}
            </h4>

            <div className="space-y-2">
              {result.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  <span className="text-slate-400 mr-2 font-sans font-medium">#{idx + 1}:</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
