import React, { useState } from 'react';
import { Fraction } from '../utils/fractionMath';
import { FractionDisplay } from './FractionDisplay';
import { SupportedLang, translations } from '../i18n/translations';

interface VisualFractionModelProps {
  fraction1: Fraction;
  fraction2?: Fraction;
  result?: Fraction;
  operator?: string;
  lang?: SupportedLang;
}

export const VisualFractionModel: React.FC<VisualFractionModelProps> = ({
  fraction1,
  fraction2,
  result,
  operator,
  lang = 'en',
}) => {
  const t = translations[lang] || translations.en;
  const [viewType, setViewType] = useState<'tape' | 'pie'>('tape');

  const labels = {
    en: { frac1: 'Fraction 1', frac2: 'Fraction 2', res: 'Result (Simplest)', tape: 'Tape Model', pie: 'Pie Chart' },
    es: { frac1: 'Fracción 1', frac2: 'Fracción 2', res: 'Resultado (Simplificado)', tape: 'Modelo de Barra', pie: 'Gráfico Circular' },
    fr: { frac1: 'Fraction 1', frac2: 'Fraction 2', res: 'Résultat (Simplifié)', tape: 'Modèle de Barre', pie: 'Graphique Circulaire' },
    pt: { frac1: 'Fração 1', frac2: 'Fração 2', res: 'Resultado (Simplificado)', tape: 'Modelo de Barra', pie: 'Gráfico de Pizza' },
    zh: { frac1: '分数 1', frac2: '分数 2', res: '运算结果 (最简)', tape: '长条模型 (Tape)', pie: '圆盘饼图 (Pie)' },
  }[lang] || { frac1: 'Fraction 1', frac2: 'Fraction 2', res: 'Result (Simplest)', tape: 'Tape Model', pie: 'Pie Chart' };

  // Clamp denominators for clean visual rendering (if > 36, show simplified preview warning)
  const renderFraction = (f: Fraction, label: string, color: string) => {
    const isLarge = Math.abs(f.d) > 36;
    const n = Math.abs(f.n);
    const d = Math.abs(f.d);

    if (viewType === 'pie') {
      const radius = 38;
      const center = 45;
      const count = Math.min(d, 36);
      const filled = Math.min(n, count);
      const anglePerSlice = (2 * Math.PI) / count;

      const slices = [];
      for (let i = 0; i < count; i++) {
        const startAngle = i * anglePerSlice - Math.PI / 2;
        const endAngle = (i + 1) * anglePerSlice - Math.PI / 2;
        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        const isFilled = i < filled;

        // Path for slice
        const dPath = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

        slices.push(
          <path
            key={i}
            d={dPath}
            fill={isFilled ? color : '#e2e8f0'}
            stroke="#94a3b8"
            strokeWidth="0.8"
            className="transition-colors duration-200"
          />
        );
      }

      return (
        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
            {label}
          </span>
          <svg width="90" height="90" viewBox="0 0 90 90" className="drop-shadow-xs">
            <circle cx="45" cy="45" r="38" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            {slices}
          </svg>
          <div className="mt-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            <FractionDisplay n={f.n} d={f.d} size="sm" />
          </div>
          {isLarge && (
            <span className="text-[10px] text-amber-500 mt-1">
              (Preview capped at 36)
            </span>
          )}
        </div>
      );
    }

    // Tape model
    const totalSlots = Math.min(d, 36);
    const filledSlots = Math.min(n, totalSlots);

    return (
      <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 min-w-[130px] flex-1">
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
          {label}
        </span>
        <div className="w-full h-8 flex border border-slate-300 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-800">
          {Array.from({ length: totalSlots }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 border-r border-slate-300 dark:border-slate-700 last:border-r-0 transition-colors ${
                i < filledSlots ? '' : 'bg-transparent'
              }`}
              style={{
                backgroundColor: i < filledSlots ? color : undefined,
              }}
            />
          ))}
        </div>
        <div className="mt-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
          <FractionDisplay n={f.n} d={f.d} size="sm" />
        </div>
        {isLarge && (
          <span className="text-[10px] text-amber-500 mt-1">
            (Preview capped at 36)
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <span>{t.calc.geometryTitle}</span>
        </h4>

        {/* View toggle */}
        <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setViewType('tape')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              viewType === 'tape'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {labels.tape}
          </button>
          <button
            type="button"
            onClick={() => setViewType('pie')}
            className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
              viewType === 'pie'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {labels.pie}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {renderFraction(fraction1, labels.frac1, '#4f46e5')}
        {fraction2 && (
          <>
            <div className="text-lg font-bold text-slate-400 font-mono px-1">
              {operator || '+'}
            </div>
            {renderFraction(fraction2, labels.frac2, '#059669')}
          </>
        )}
        {result && (
          <>
            <div className="text-lg font-bold text-slate-400 font-mono px-1">=</div>
            {renderFraction(result, labels.res, '#d97706')}
          </>
        )}
      </div>
    </div>
  );
};
