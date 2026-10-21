import React, { useState } from 'react';
import { commonDenominatorFractions, Fraction } from '../utils/fractionMath';
import { FractionDisplay } from './FractionDisplay';
import { SupportedLang, translations } from '../i18n/translations';
import { Plus, Trash2, ArrowUpDown } from 'lucide-react';

export const FractionCompareTab: React.FC<{ lang?: SupportedLang }> = ({
  lang = 'en',
}) => {
  const t = translations[lang] || translations.en;
  const [fractions, setFractions] = useState<{ n: string; d: string }[]>([
    { n: '1', d: '2' },
    { n: '2', d: '3' },
    { n: '3', d: '4' },
  ]);

  const handleUpdate = (index: number, field: 'n' | 'd', val: string) => {
    const next = [...fractions];
    next[index][field] = val;
    setFractions(next);
  };

  const handleAdd = () => {
    if (fractions.length < 5) {
      setFractions([...fractions, { n: '1', d: '5' }]);
    }
  };

  const handleRemove = (index: number) => {
    if (fractions.length > 2) {
      setFractions(fractions.filter((_, i) => i !== index));
    }
  };

  const parsed: Fraction[] = fractions.map((f) => ({
    n: parseInt(f.n, 10) || 0,
    d: parseInt(f.d, 10) || 1,
  }));

  const hasInvalidDenom = parsed.some((f) => f.d === 0);
  const result = !hasInvalidDenom ? commonDenominatorFractions(parsed) : null;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.compare.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.compare.subtitle}
            </p>
          </div>

          {fractions.length < 5 && (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-medium hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {t.compare.addFrac}
            </button>
          )}
        </div>

        {/* Input items list */}
        <div className="flex flex-wrap items-center gap-4">
          {fractions.map((f, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 relative group"
            >
              <div className="text-[10px] font-semibold text-slate-400 mb-1">#{idx + 1}</div>
              <div className="inline-flex flex-col items-center">
                <input
                  type="number"
                  value={f.n}
                  onChange={(e) => handleUpdate(idx, 'n', e.target.value)}
                  placeholder={t.calc.num}
                  className="w-16 px-2 py-1 text-center font-mono font-bold text-base rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <div className="w-16 h-0.5 bg-slate-700 dark:bg-slate-300 my-1 rounded-full" />
                <input
                  type="number"
                  value={f.d}
                  onChange={(e) => handleUpdate(idx, 'd', e.target.value)}
                  placeholder={t.calc.den}
                  className="w-16 px-2 py-1 text-center font-mono font-bold text-base rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {fractions.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 shadow-xs"
                  title="Remove"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {hasInvalidDenom && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 text-xs">
            {t.calc.divideByZero}
          </div>
        )}
      </div>

      {/* Results and Comparison Breakdown */}
      {result && (
        <div className="space-y-6">
          {/* Common Denominator Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-indigo-500" />
                {t.compare.commonDenomTitle}
              </h4>
              <span className="text-xs text-slate-400">
                LCM = <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{result.commonD}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {result.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
                >
                  <div className="text-xs text-slate-400">#{idx + 1}</div>
                  <div className="flex items-center gap-2.5">
                    <FractionDisplay n={item.original.n} d={item.original.d} size="md" />
                    <span className="text-slate-400 text-xs">×{item.factor} →</span>
                    <FractionDisplay
                      n={item.scaled.n}
                      d={item.scaled.d}
                      size="md"
                      colorScheme="primary"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 tabular-nums">
                    {t.calc.decimalForm} {item.decimal.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking & Chain */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-4">
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
              {t.compare.sortedTitle}
            </h4>

            <div className="flex flex-wrap items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              {result.sorted.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2">
                    <FractionDisplay n={item.original.n} d={item.original.d} size="lg" />
                    <span className="text-xs text-slate-400 font-mono">
                      ({item.scaled.n}/{item.scaled.d})
                    </span>
                  </div>
                  {idx < result.sorted.length - 1 && (
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 px-1 font-mono">
                      &lt;
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Visual Number Line representation */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t.compare.numberLineTitle}
              </div>
              <div className="relative pt-6 pb-2 px-4">
                <div className="h-1 bg-slate-300 dark:bg-slate-700 rounded-full relative">
                  {result.sorted.map((item, idx) => {
                    const maxVal = Math.max(...result.sorted.map((s) => s.decimal), 1);
                    const percent = Math.min(Math.max((item.decimal / maxVal) * 90 + 5, 5), 95);
                    return (
                      <div
                        key={idx}
                        className="absolute -top-3 transform -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                        style={{ left: `${percent}%` }}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-xs" />
                        <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 mt-1 whitespace-nowrap">
                          {item.original.n}/{item.original.d}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
