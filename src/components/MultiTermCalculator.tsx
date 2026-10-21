import React, { useState } from 'react';
import { evaluateMultiFractionExpression, MultiTermStep } from '../utils/fractionMath';
import { FractionDisplay } from './FractionDisplay';
import { SupportedLang, translations } from '../i18n/translations';
import { ArrowRight, Calculator, Check, Copy } from 'lucide-react';

export const MultiTermCalculator: React.FC<{ lang?: SupportedLang }> = ({
  lang = 'en',
}) => {
  const t = translations[lang] || translations.en;
  const [expr, setExpr] = useState('1/2 + 2/3 * 3/4 - 1/6');
  const [copied, setCopied] = useState(false);

  let result = null;
  let errorMsg = '';

  try {
    if (expr.trim()) {
      result = evaluateMultiFractionExpression(expr);
    }
  } catch (e: any) {
    errorMsg = e.message;
  }

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${expr} = ${result.finalResult.n}/${result.finalResult.d}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>{t.multiterm.title}:</span>
          <span className="text-[11px] text-slate-400 font-normal">{t.multiterm.subtitle}</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            placeholder={t.multiterm.placeholder}
            className="flex-1 px-3.5 py-2 text-sm font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5 items-center text-xs">
          <span className="text-slate-400 text-[11px]">{t.multiterm.classicPresets}</span>
          {[
            '1/2 + 2/3 * 3/4 - 1/6',
            '(3/4 - 1/2) * 2/3',
            '5/6 / (1/2 + 1/3)',
            '2/3 + 3/4 - 5/6',
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setExpr(item)}
              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 font-mono text-[11px] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {result && (
        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                {t.calc.resultTitle}
              </span>
              <div className="flex items-center gap-3">
                <FractionDisplay
                  n={result.finalResult.n}
                  d={result.finalResult.d}
                  size="lg"
                  colorScheme="primary"
                />
                {result.mixed && (
                  <div className="flex items-center gap-1.5 pl-3 border-l border-indigo-200 dark:border-indigo-800 text-xs text-slate-500">
                    <span>{t.calc.mixedResult}</span>
                    <FractionDisplay
                      whole={result.mixed.whole}
                      n={result.mixed.n}
                      d={result.mixed.d}
                      size="md"
                      colorScheme="amber"
                    />
                  </div>
                )}
                <span className="text-xs text-slate-500 font-mono">
                  (≈ {(result.finalResult.n / result.finalResult.d).toFixed(4)})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? t.actions.copied : t.actions.copyResult}</span>
            </button>
          </div>

          {/* Sequential operation breakdown */}
          <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
              {t.multiterm.stepOrder}
            </span>
            {result.steps.map((st: MultiTermStep, idx: number) => (
              <div
                key={idx}
                className="text-xs font-mono text-slate-600 dark:text-slate-300 p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-1">
                  #{idx + 1}:
                </span>
                {st.desc}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
