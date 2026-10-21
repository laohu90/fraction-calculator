import React from 'react';
import { ShortDivisionData } from '../utils/fractionMath';
import { SupportedLang, translations } from '../i18n/translations';

interface ShortDivisionViewProps {
  data: ShortDivisionData;
  lang?: SupportedLang;
}

export const ShortDivisionView: React.FC<ShortDivisionViewProps> = ({
  data,
  lang = 'en',
}) => {
  const t = translations[lang] || translations.en;

  if (data.rows.length === 0) {
    return (
      <div className="p-3 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
        {t.calc.shortDivCoprime}
      </div>
    );
  }

  const divisors = data.rows.map((r) => r.divisor);
  const bottomQuotients = data.finalQuotients;

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-500 font-sans">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {t.calc.shortDivTitle}
        </span>
        <span>
          {data.rows.length} {t.calc.shortDivRounds}
        </span>
      </div>

      {/* Short division ladder rendering */}
      <div className="inline-block p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 min-w-[220px]">
        {data.rows.map((row, idx) => (
          <div key={idx} className="flex items-center leading-none my-1">
            {/* Divisor */}
            <span className="w-8 text-right font-bold text-indigo-600 dark:text-indigo-400 pr-1">
              {row.divisor}
            </span>
            {/* Short division bracket |_ */}
            <div className="border-l-2 border-b-2 border-slate-700 dark:border-slate-300 pl-3 pr-2 py-1 flex items-center gap-6">
              <span className="w-10 text-center font-bold text-slate-800 dark:text-slate-200">
                {row.quotients[0]}
              </span>
              <span className="w-10 text-center font-bold text-slate-800 dark:text-slate-200">
                {row.quotients[1]}
              </span>
            </div>
          </div>
        ))}

        {/* Bottom Quotients */}
        <div className="flex items-center leading-none pl-9 py-1 text-slate-700 dark:text-slate-300 font-bold">
          <div className="pl-3 pr-2 flex items-center gap-6">
            <span className="w-10 text-center text-emerald-600 dark:text-emerald-400">
              {bottomQuotients[0]}
            </span>
            <span className="w-10 text-center text-emerald-600 dark:text-emerald-400">
              {bottomQuotients[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Mathematical deduction notes */}
      <div className="space-y-1.5 font-sans text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-2.5">
        <div>
          <strong className="text-indigo-600 dark:text-indigo-400">{t.calc.shortDivGcdNotes} </strong>
          <span className="font-mono text-slate-900 dark:text-white font-bold">
            {divisors.join(' × ')} = {data.gcd}
          </span>
        </div>
        <div>
          <strong className="text-emerald-600 dark:text-emerald-400">{t.calc.shortDivLcmNotes} </strong>
          <span className="font-mono text-slate-900 dark:text-white font-bold">
            {[...divisors, ...bottomQuotients].join(' × ')} = {data.lcm}
          </span>
        </div>
      </div>
    </div>
  );
};
