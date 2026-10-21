import React, { useState } from 'react';
import { simplifyFractionWithSteps } from '../utils/fractionMath';
import { FractionDisplay } from './FractionDisplay';
import { SupportedLang, translations } from '../i18n/translations';
import { ArrowRight, Check, Copy } from 'lucide-react';

export const FractionSimplifierTab: React.FC<{ lang?: SupportedLang }> = ({
  lang = 'en',
}) => {
  const t = translations[lang] || translations.en;
  const [numInput, setNumInput] = useState('36');
  const [denInput, setDenInput] = useState('48');
  const [copied, setCopied] = useState(false);

  const n = parseInt(numInput, 10);
  const d = parseInt(denInput, 10);

  let result = null;
  let errorMsg = '';

  if (isNaN(n) || isNaN(d)) {
    errorMsg = t.calc.inputInvalid;
  } else if (d === 0) {
    errorMsg = t.calc.divideByZero;
  } else {
    try {
      result = simplifyFractionWithSteps(n, d);
    } catch (e: any) {
      errorMsg = e.message;
    }
  }

  const getFactors = (val: number) => {
    const abs = Math.abs(val);
    const list = [];
    for (let i = 1; i <= abs; i++) {
      if (abs % i === 0) list.push(i);
    }
    return list;
  };

  const nFactors = !isNaN(n) && n !== 0 ? getFactors(n) : [];
  const dFactors = !isNaN(d) && d !== 0 ? getFactors(d) : [];
  const commonFactors = nFactors.filter((f) => dFactors.includes(f));

  const handleCopy = () => {
    if (!result) return;
    const text = `${n}/${d} = ${result.simplified.n}/${result.simplified.d} (GCD: ${result.gcd})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          {t.simplify.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          {t.simplify.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <div className="inline-flex flex-col items-center">
            <input
              type="number"
              value={numInput}
              onChange={(e) => setNumInput(e.target.value)}
              placeholder={t.calc.num}
              className="w-24 px-3 py-2 text-center text-lg font-bold font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="w-24 h-0.5 bg-slate-700 dark:bg-slate-300 my-1 rounded-full" />
            <input
              type="number"
              value={denInput}
              onChange={(e) => setDenInput(e.target.value)}
              placeholder={t.calc.den}
              className="w-24 px-3 py-2 text-center text-lg font-bold font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <ArrowRight className="w-6 h-6 text-slate-400 shrink-0" />

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-400 mr-1">{t.calc.presetsTitle}</span>
            {[
              { n: '24', d: '36' },
              { n: '45', d: '60' },
              { n: '18', d: '24' },
              { n: '105', d: '140' },
              { n: '72', d: '108' },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNumInput(item.n);
                  setDenInput(item.d);
                }}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors font-mono"
              >
                {item.n}/{item.d}
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

      {/* Result Display */}
      {result && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{t.calc.resultTitle}</span>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <FractionDisplay n={result.original.n} d={result.original.d} size="lg" />
                    <span className="text-xl font-bold text-slate-400">=</span>
                    <FractionDisplay
                      n={result.simplified.n}
                      d={result.simplified.d}
                      size="xl"
                      colorScheme="primary"
                    />
                  </div>
                  {result.mixed && (
                    <div className="flex items-center gap-2 pl-4 border-l border-slate-300 dark:border-slate-700">
                      <span className="text-xs text-slate-500">{t.calc.mixedResult}</span>
                      <FractionDisplay
                        whole={result.mixed.whole}
                        n={result.mixed.n}
                        d={result.mixed.d}
                        size="lg"
                        colorScheme="amber"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.actions.copied : t.actions.copyResult}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">{t.simplify.greatestFactor}</span>
                <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  {result.gcd}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">{t.simplify.nature}</span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {result.isInteger ? t.simplify.integerFrac : result.isProper ? t.simplify.properFrac : t.simplify.improperFrac}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">{t.calc.decimalForm}</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">
                  {result.decimal}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 block mb-1">{t.calc.reciprocalLabel}</span>
                <span className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">
                  {result.simplified.n !== 0 ? `${result.simplified.d}/${result.simplified.n}` : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Educational Factor Breakdown */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.calc.stepsTitle}
            </h4>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-white block mb-1">1. {t.simplify.factorsNum} &amp; {t.simplify.factorsDen}:</strong>
                <div>{Math.abs(n)}: [{nFactors.join(', ')}]</div>
                <div>{Math.abs(d)}: [{dFactors.join(', ')}]</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-white block mb-1">2. {t.simplify.commonFactors}:</strong>
                <div>[{commonFactors.join(', ')}]</div>
                <div className="mt-1">{t.simplify.greatestFactor} = <strong className="text-indigo-600 dark:text-indigo-400">{result.gcd}</strong></div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-white block mb-1">3. {t.actions.viewSteps}:</strong>
                <div className="font-mono">
                  ({n} ÷ {result.gcd}) / ({d} ÷ {result.gcd}) = {result.simplified.n}/{result.simplified.d}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
