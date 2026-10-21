import React from 'react';
import { Delete } from 'lucide-react';

interface MathKeypadProps {
  onInput: (val: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onPresetFrac?: (n: string, d: string) => void;
}

export const MathKeypad: React.FC<MathKeypadProps> = ({
  onInput,
  onBackspace,
  onClear,
  onPresetFrac,
}) => {
  return (
    <div className="p-3 bg-slate-100 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
        <span>极速输入小键盘</span>
        <button
          type="button"
          onClick={onClear}
          className="text-rose-500 hover:text-rose-600 transition-colors"
        >
          全部清空
        </button>
      </div>

      {/* Quick fractions strip */}
      {onPresetFrac && (
        <div className="grid grid-cols-5 gap-1 text-xs">
          {[
            { n: '1', d: '2', label: '1/2' },
            { n: '1', d: '3', label: '1/3' },
            { n: '1', d: '4', label: '1/4' },
            { n: '2', d: '3', label: '2/3' },
            { n: '3', d: '4', label: '3/4' },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPresetFrac(item.n, item.d)}
              className="py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Numeric and basic keypad */}
      <div className="grid grid-cols-4 gap-1">
        {['7', '8', '9', 'C'].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => (k === 'C' ? onClear() : onInput(k))}
            className={`py-2 rounded-lg font-mono font-bold text-sm transition-colors ${
              k === 'C'
                ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {k}
          </button>
        ))}

        {['4', '5', '6', '±'].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onInput(k)}
            className="py-2 rounded-lg font-mono font-bold text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {k}
          </button>
        ))}

        {['1', '2', '3', '⌫'].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => (k === '⌫' ? onBackspace() : onInput(k))}
            className={`py-2 rounded-lg font-mono font-bold text-sm flex items-center justify-center transition-colors ${
              k === '⌫'
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {k === '⌫' ? <Delete className="w-4 h-4" /> : k}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onInput('0')}
          className="col-span-2 py-2 rounded-lg font-mono font-bold text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => onInput('00')}
          className="py-2 rounded-lg font-mono font-bold text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          00
        </button>
        <button
          type="button"
          onClick={() => onInput('.')}
          className="py-2 rounded-lg font-mono font-bold text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          .
        </button>
      </div>
    </div>
  );
};
