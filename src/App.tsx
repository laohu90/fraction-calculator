/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  computeFractionArithmetic,
  mixedToImproper,
  CalculationResult,
  Fraction,
} from './utils/fractionMath';
import { FractionDisplay } from './components/FractionDisplay';
import { VisualFractionModel } from './components/VisualFractionModel';
import { ShortDivisionView } from './components/ShortDivisionView';
import { MultiTermCalculator } from './components/MultiTermCalculator';
import { MathKeypad } from './components/MathKeypad';
import { FractionSimplifierTab } from './components/FractionSimplifierTab';
import { FractionCompareTab } from './components/FractionCompareTab';
import { DecimalToFractionTab } from './components/DecimalToFractionTab';
import { LanguageSelector } from './components/LanguageSelector';
import { translations, SupportedLang, detectUserLanguage } from './i18n/translations';
import { PracticeQuizTab } from './components/PracticeQuizTab';
import { FractionTutorial } from './components/FractionTutorial';
import { SeoTopicHub } from './components/SeoTopicHub';
import {
  Calculator,
  RotateCcw,
  Copy,
  Check,
  Printer,
  BookOpen,
  HelpCircle,
  Sparkles,
  History,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  BookmarkPlus,
  Trash2,
} from 'lucide-react';

type Mode = 'arithmetic' | 'multiterm' | 'simplify' | 'compare' | 'decimal';

interface HistoryItem {
  id: string;
  w1: string;
  n1: string;
  d1: string;
  op: '+' | '-' | '×' | '÷';
  w2: string;
  n2: string;
  d2: string;
  isMixed: boolean;
  resN: number;
  resD: number;
  timestamp: string;
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLang>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pLang = params.get('lang') as SupportedLang;
      if (pLang && ['en', 'es', 'fr', 'pt', 'zh'].includes(pLang)) {
        return pLang;
      }
    }
    return detectUserLanguage();
  });

  const t = translations[currentLang];

  const handleSelectLang = (newLang: SupportedLang) => {
    setCurrentLang(newLang);
    localStorage.setItem('fraction_calc_lang', newLang);
    document.documentElement.lang = newLang;
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    document.title = `${t.brandTitle} - ${t.tagline}`;
    document.documentElement.lang = currentLang;
  }, [currentLang, t]);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const pLang = params.get('lang') as SupportedLang;
      if (pLang && ['en', 'es', 'fr', 'pt', 'zh'].includes(pLang)) {
        setCurrentLang(pLang);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const [activeMode, setActiveMode] = useState<Mode>('arithmetic');
  const [bottomTab, setBottomTab] = useState<'hub' | 'tutorial' | 'quiz' | 'faq'>('hub');

  // Input states
  const [isMixed, setIsMixed] = useState(false);
  const [w1, setW1] = useState('0');
  const [n1, setN1] = useState('1');
  const [d1, setD1] = useState('2');

  const [operator, setOperator] = useState<'+' | '-' | '×' | '÷'>('+');

  const [w2, setW2] = useState('0');
  const [n2, setN2] = useState('1');
  const [d2, setD2] = useState('3');

  // Active focused input for virtual keypad
  const [activeField, setActiveField] = useState<'w1' | 'n1' | 'd1' | 'w2' | 'n2' | 'd2'>('n1');
  const [showKeypad, setShowKeypad] = useState(false);

  // Copy states
  const [copied, setCopied] = useState(false);
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Calculation history
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      w1: '0',
      n1: '3',
      d1: '4',
      op: '+',
      w2: '0',
      n2: '2',
      d2: '5',
      isMixed: false,
      resN: 23,
      resD: 20,
      timestamp: '刚刚',
    },
    {
      id: 'init-2',
      w1: '0',
      n1: '5',
      d1: '6',
      op: '×',
      w2: '0',
      n2: '3',
      d2: '10',
      isMixed: false,
      resN: 1,
      resD: 4,
      timestamp: '刚刚',
    },
  ]);

  // Collapsible step view
  const [showAllSteps, setShowAllSteps] = useState(true);

  // Compute arithmetic
  let calcResult: CalculationResult | null = null;
  let calcError = '';

  const num1 = parseInt(n1, 10);
  const den1 = parseInt(d1, 10);
  const whole1 = parseInt(w1, 10) || 0;

  const num2 = parseInt(n2, 10);
  const den2 = parseInt(d2, 10);
  const whole2 = parseInt(w2, 10) || 0;

  if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) {
    calcError = t.calc.inputInvalid;
  } else if (den1 === 0 || den2 === 0) {
    calcError = t.calc.divideByZero;
  } else if (operator === '÷' && num2 === 0 && whole2 === 0) {
    calcError = t.calc.divideByZero;
  } else {
    try {
      const frac1 = isMixed ? mixedToImproper(whole1, num1, den1) : { n: num1, d: den1 };
      const frac2 = isMixed ? mixedToImproper(whole2, num2, den2) : { n: num2, d: den2 };
      calcResult = computeFractionArithmetic(frac1, operator, frac2, currentLang);
    } catch (e: any) {
      calcError = e.message || t.calc.inputInvalid;
    }
  }

  // Record history on valid calculation change
  const lastRecordedRef = useRef<string>('');
  useEffect(() => {
    if (calcResult && !calcError) {
      const key = `${w1}_${n1}_${d1}_${operator}_${w2}_${n2}_${d2}`;
      if (lastRecordedRef.current !== key) {
        lastRecordedRef.current = key;
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        setHistory((prev) => [
          {
            id: Math.random().toString(),
            w1,
            n1,
            d1,
            op: operator,
            w2,
            n2,
            d2,
            isMixed,
            resN: calcResult!.simplified.n,
            resD: calcResult!.simplified.d,
            timestamp: timeStr,
          },
          ...prev.slice(0, 9),
        ]);
      }
    }
  }, [w1, n1, d1, operator, w2, n2, d2, isMixed]);

  // Quick preset loading
  const loadPreset = (
    mixed: boolean,
    pw1: string,
    pn1: string,
    pd1: string,
    op: '+' | '-' | '×' | '÷',
    pw2: string,
    pn2: string,
    pd2: string
  ) => {
    setIsMixed(mixed);
    setW1(pw1);
    setN1(pn1);
    setD1(pd1);
    setOperator(op);
    setW2(pw2);
    setN2(pn2);
    setD2(pd2);
    setActiveMode('arithmetic');
  };

  const handleReset = () => {
    setW1('0');
    setN1('1');
    setD1('2');
    setOperator('+');
    setW2('0');
    setN2('1');
    setD2('3');
  };

  // Virtual Keypad handling
  const handleKeypadInput = (val: string) => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<string>>> = {
      w1: setW1,
      n1: setN1,
      d1: setD1,
      w2: setW2,
      n2: setN2,
      d2: setD2,
    };
    const currentValues: Record<string, string> = { w1, n1, d1, w2, n2, d2 };
    const setter = setters[activeField];
    const curr = currentValues[activeField];

    if (val === '±') {
      if (curr.startsWith('-')) {
        setter(curr.substring(1));
      } else {
        setter('-' + curr);
      }
    } else {
      if (curr === '0' || curr === '') {
        setter(val);
      } else {
        setter(curr + val);
      }
    }
  };

  const handleKeypadBackspace = () => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<string>>> = {
      w1: setW1,
      n1: setN1,
      d1: setD1,
      w2: setW2,
      n2: setN2,
      d2: setD2,
    };
    const currentValues: Record<string, string> = { w1, n1, d1, w2, n2, d2 };
    const setter = setters[activeField];
    const curr = currentValues[activeField];
    if (curr.length > 1) {
      setter(curr.slice(0, -1));
    } else {
      setter('0');
    }
  };

  const handleKeypadClear = () => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<string>>> = {
      w1: setW1,
      n1: setN1,
      d1: setD1,
      w2: setW2,
      n2: setN2,
      d2: setD2,
    };
    setters[activeField]('0');
  };

  const handleCopyResult = () => {
    if (!calcResult) return;
    const resStr = `${n1}/${d1} ${operator} ${n2}/${d2} = ${calcResult.simplified.n}/${calcResult.simplified.d}`;
    navigator.clipboard.writeText(resStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLatex = () => {
    if (!calcResult) return;
    const latexStr = `\\frac{${calcResult.input1.n}}{${calcResult.input1.d}} ${
      operator === '×' ? '\\times' : operator === '÷' ? '\\div' : operator
    } \\frac{${calcResult.input2.n}}{${calcResult.input2.d}} = \\frac{${calcResult.simplified.n}}{${calcResult.simplified.d}}`;
    navigator.clipboard.writeText(latexStr);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(true);
    setTimeout(() => setBookmarked(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Top Bar Contract: Brand zone - Nav links - Primary action */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Single text brand wordmark */}
          <div
            onClick={() => setActiveMode('arithmetic')}
            className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-indigo-700 transition-colors">
              ½
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {t.brandTitle}
            </span>
          </div>

          {/* Zone 2: 4-5 single line clean nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => {
                setActiveMode('arithmetic');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'arithmetic' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
              }`}
            >
              {t.nav.calculator}
            </button>
            <button
              onClick={() => {
                setActiveMode('multiterm');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'multiterm' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
              }`}
            >
              {t.nav.multiterm}
            </button>
            <button
              onClick={() => {
                setActiveMode('simplify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'simplify' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
              }`}
            >
              {t.nav.simplify}
            </button>
            <button
              onClick={() => {
                setActiveMode('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 ${
                activeMode === 'compare' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
              }`}
            >
              {t.nav.compare}
            </button>
            <button
              onClick={() => {
                setBottomTab('tutorial');
                document.getElementById('knowledge-zone')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.tutorial}
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Language Selector */}
          <div className="flex items-center gap-2.5 shrink-0">
            <LanguageSelector
              currentLang={currentLang}
              onSelectLang={handleSelectLang}
            />
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
              title="Print worksheet solution"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.actions.print}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main High-Density Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* Compact Mode Switcher Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'arithmetic', label: t.nav.calculator },
              { id: 'multiterm', label: t.nav.multiterm },
              { id: 'simplify', label: t.nav.simplify },
              { id: 'compare', label: t.nav.compare },
              { id: 'decimal', label: t.nav.decimal },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeMode === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 pr-2">
            <span>{t.tagline}</span>
          </div>
        </div>

        {/* 2-COLUMN HIGH-EFFICIENCY SPLIT LAYOUT */}
        {activeMode === 'arithmetic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* LEFT COLUMN (5 cols on lg): Compact Input Console + History */}
            <div className="lg:col-span-5 space-y-3">
              {/* Calculator Input Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.calc.inputTitle}</span>
                    <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px]">
                      <button
                        type="button"
                        onClick={() => setIsMixed(false)}
                        className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
                          !isMixed
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                            : 'text-slate-500'
                        }`}
                      >
                        {t.calc.pureMode}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMixed(true)}
                        className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
                          isMixed
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                            : 'text-slate-500'
                        }`}
                      >
                        {t.calc.mixedMode}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowKeypad(!showKeypad)}
                      className={`px-2 py-1 text-[11px] rounded font-medium border transition-colors ${
                        showKeypad
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 text-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {showKeypad ? t.actions.hideKeypad : t.actions.toggleKeypad}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      title={t.actions.reset}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tactile Fraction Inputs */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 py-2 bg-slate-50/70 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/60">
                  {/* Fraction 1 */}
                  <div className="flex items-center gap-1.5">
                    {isMixed && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-400">{t.calc.whole}</span>
                        <input
                          type="number"
                          value={w1}
                          onFocus={() => setActiveField('w1')}
                          onChange={(e) => setW1(e.target.value)}
                          className={`w-14 h-11 px-1.5 text-center text-lg font-bold font-mono rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            activeField === 'w1'
                              ? 'border-indigo-500 ring-1 ring-indigo-500'
                              : 'border-slate-300 dark:border-slate-700'
                          }`}
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400">{t.calc.num}</span>
                      <input
                        type="number"
                        value={n1}
                        onFocus={() => setActiveField('n1')}
                        onChange={(e) => setN1(e.target.value)}
                        className={`w-16 sm:w-20 px-2 py-1.5 text-center text-lg font-bold font-mono rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          activeField === 'n1'
                            ? 'border-indigo-500 ring-1 ring-indigo-500'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      />
                      <div className="w-16 sm:w-20 h-0.5 bg-slate-700 dark:bg-slate-300 my-1 rounded-full" />
                      <span className="text-[10px] text-slate-400">{t.calc.den}</span>
                      <input
                        type="number"
                        value={d1}
                        onFocus={() => setActiveField('d1')}
                        onChange={(e) => setD1(e.target.value)}
                        className={`w-16 sm:w-20 px-2 py-1.5 text-center text-lg font-bold font-mono rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          activeField === 'd1'
                            ? 'border-indigo-500 ring-1 ring-indigo-500'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Operator */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400">{t.calc.op}</span>
                    <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
                      {(['+', '-', '×', '÷'] as const).map((op) => (
                        <button
                          key={op}
                          type="button"
                          onClick={() => setOperator(op)}
                          className={`w-8 h-8 rounded text-sm font-bold font-mono flex items-center justify-center transition-colors ${
                            operator === op
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                          }`}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fraction 2 */}
                  <div className="flex items-center gap-1.5">
                    {isMixed && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-400">{t.calc.whole}</span>
                        <input
                          type="number"
                          value={w2}
                          onFocus={() => setActiveField('w2')}
                          onChange={(e) => setW2(e.target.value)}
                          className={`w-14 h-11 px-1.5 text-center text-lg font-bold font-mono rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            activeField === 'w2'
                              ? 'border-indigo-500 ring-1 ring-indigo-500'
                              : 'border-slate-300 dark:border-slate-700'
                          }`}
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400">{t.calc.num}</span>
                      <input
                        type="number"
                        value={n2}
                        onFocus={() => setActiveField('n2')}
                        onChange={(e) => setN2(e.target.value)}
                        className={`w-16 sm:w-20 px-2 py-1.5 text-center text-lg font-bold font-mono rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          activeField === 'n2'
                            ? 'border-indigo-500 ring-1 ring-indigo-500'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      />
                      <div className="w-16 sm:w-20 h-0.5 bg-slate-700 dark:bg-slate-300 my-1 rounded-full" />
                      <span className="text-[10px] text-slate-400">{t.calc.den}</span>
                      <input
                        type="number"
                        value={d2}
                        onFocus={() => setActiveField('d2')}
                        onChange={(e) => setD2(e.target.value)}
                        className={`w-16 sm:w-20 px-2 py-1.5 text-center text-lg font-bold font-mono rounded-lg border bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          activeField === 'd2'
                            ? 'border-indigo-500 ring-1 ring-indigo-500'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Collapsible Keypad */}
                {showKeypad && (
                  <MathKeypad
                    onInput={handleKeypadInput}
                    onBackspace={handleKeypadBackspace}
                    onClear={handleKeypadClear}
                    onPresetFrac={(pn, pd) => {
                      if (activeField === 'n1' || activeField === 'd1' || activeField === 'w1') {
                        setN1(pn);
                        setD1(pd);
                      } else {
                        setN2(pn);
                        setD2(pd);
                      }
                    }}
                  />
                )}

                {/* Quick homework presets strip */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-medium text-slate-400">{t.calc.presetsTitle}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.calc.presets.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          loadPreset(
                            item.m,
                            item.w1,
                            item.n1,
                            item.d1,
                            item.op,
                            item.w2,
                            item.n2,
                            item.d2
                          )
                        }
                        className="px-2 py-1 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {calcError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 text-xs">
                    {calcError}
                  </div>
                )}
              </div>

              {/* Homework History Deck */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                    <History className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{t.calc.historyTitle}</span>
                  </div>
                  {history.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setHistory([])}
                      className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      {t.calc.clearHistory}
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {history.map((h) => (
                    <div
                      key={h.id}
                      onClick={() =>
                        loadPreset(h.isMixed, h.w1, h.n1, h.d1, h.op, h.w2, h.n2, h.d2)
                      }
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200/50 dark:border-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors group"
                    >
                      <div className="font-mono text-slate-700 dark:text-slate-300">
                        {h.isMixed && h.w1 !== '0' ? `${h.w1} ` : ''}
                        {h.n1}/{h.d1} {h.op} {h.isMixed && h.w2 !== '0' ? `${h.w2} ` : ''}
                        {h.n2}/{h.d2} = <strong className="text-indigo-600 dark:text-indigo-400">{h.resN}/{h.resD}</strong>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {t.calc.clickToLoad}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (7 cols on lg): Live Compact Results & Visualizations */}
            <div className="lg:col-span-7 space-y-3">
              {calcResult && (
                <>
                  {/* Hero Result Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 shadow-xs space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                          {t.calc.resultTitle}
                        </span>
                        <div className="flex items-center gap-4 flex-wrap">
                          <FractionDisplay
                            n={calcResult.simplified.n}
                            d={calcResult.simplified.d}
                            size="xl"
                            colorScheme="primary"
                          />

                          {calcResult.mixed && (
                            <div className="flex items-center gap-1.5 pl-3 border-l border-indigo-200 dark:border-indigo-800">
                              <span className="text-xs text-slate-500">{t.calc.mixedResult}</span>
                              <FractionDisplay
                                whole={calcResult.mixed.whole}
                                n={calcResult.mixed.n}
                                d={calcResult.mixed.d}
                                size="lg"
                                colorScheme="amber"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 pl-3 border-l border-indigo-200 dark:border-indigo-800 text-xs text-slate-500">
                            <span>{t.calc.decimalForm}</span>
                            <strong className="font-mono text-slate-800 dark:text-slate-200 text-sm">
                              {calcResult.decimal}
                            </strong>
                            <span className="text-[11px] text-slate-400">({calcResult.percentage})</span>
                          </div>
                        </div>
                      </div>

                      {/* Fast Copy & Action Buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleCopyResult}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
                          title={t.actions.copyResult}
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copied ? t.actions.copied : t.actions.copyResult}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyLatex}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 transition-colors font-mono"
                          title="LaTeX"
                        >
                          {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : 'LaTeX'}
                        </button>
                        <button
                          type="button"
                          onClick={handleBookmark}
                          className={`p-1.5 rounded-lg border text-xs shadow-xs transition-colors ${
                            bookmarked
                              ? 'bg-amber-50 border-amber-200 text-amber-600'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-amber-500'
                          }`}
                          title={t.actions.star}
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Metric Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block">{t.calc.lcmLabel}</span>
                        <strong className="text-sm font-mono text-slate-800 dark:text-slate-200">
                          {calcResult.lcmVal || '—'}
                        </strong>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block">{t.calc.gcdLabel}</span>
                        <strong className="text-sm font-mono text-indigo-600 dark:text-indigo-400">
                          {calcResult.gcdVal}
                        </strong>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block">{t.calc.simplestStatus}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          {calcResult.gcdVal > 1 ? `÷ ${calcResult.gcdVal}` : '✓'}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block">{t.calc.reciprocalLabel}</span>
                        <strong className="text-sm font-mono text-slate-800 dark:text-slate-200">
                          {calcResult.simplified.n !== 0
                            ? `${calcResult.simplified.d}/${calcResult.simplified.n}`
                            : '—'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Short Division Ladder View (if applicable) */}
                  {calcResult.shortDivision && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {t.calc.shortDivTitle}
                        </h4>
                        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                          {t.calc.shortDivSubtitle}
                        </span>
                      </div>
                      <ShortDivisionView data={calcResult.shortDivision} lang={currentLang} />
                    </div>
                  )}

                  {/* Step-by-Step Reasoner (Compact Stepper) */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{t.calc.stepsTitle}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowAllSteps(!showAllSteps)}
                        className="text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-0.5"
                      >
                        {showAllSteps ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        <span>{showAllSteps ? t.actions.foldSteps : t.actions.expandSteps}</span>
                      </button>
                    </div>

                    {showAllSteps && (
                      <div className="space-y-2 pt-1">
                        {calcResult.steps.map((st, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl border text-xs leading-relaxed transition-colors ${
                              st.highlight
                                ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/80'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800'
                            }`}
                          >
                            <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">
                              {st.title}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                              {st.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Geometry Visual Model */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <VisualFractionModel
                      fraction1={calcResult.input1}
                      fraction2={calcResult.input2}
                      result={calcResult.simplified}
                      operator={operator}
                      lang={currentLang}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* OTHER MODES */}
        {activeMode === 'multiterm' && <MultiTermCalculator lang={currentLang} />}
        {activeMode === 'simplify' && <FractionSimplifierTab lang={currentLang} />}
        {activeMode === 'compare' && <FractionCompareTab lang={currentLang} />}
        {activeMode === 'decimal' && <DecimalToFractionTab lang={currentLang} />}

        {/* BOTTOM SECTION: KNOWLEDGE, PRACTICE & FAQ */}
        <section id="knowledge-zone" className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setBottomTab('hub')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  bottomTab === 'hub'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t.nav.seoHub}
              </button>
              <button
                type="button"
                onClick={() => setBottomTab('tutorial')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  bottomTab === 'tutorial'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t.nav.tutorial}
              </button>
              <button
                type="button"
                onClick={() => setBottomTab('quiz')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  bottomTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t.nav.quiz}
              </button>
              <button
                type="button"
                onClick={() => setBottomTab('faq')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  bottomTab === 'faq'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t.nav.faq}
              </button>
            </div>
          </div>

          {bottomTab === 'hub' && (
            <SeoTopicHub
              lang={currentLang}
              onLoadPreset={(mixed, pw1, pn1, pd1, op, pw2, pn2, pd2) => {
                loadPreset(mixed, pw1, pn1, pd1, op, pw2, pn2, pd2);
              }}
            />
          )}

          {bottomTab === 'tutorial' && (
            <FractionTutorial
              lang={currentLang}
              onLoadExample={(pw1, pn1, pd1, op, pw2, pn2, pd2) => {
                loadPreset(pw1 !== '0' || pw2 !== '0', pw1, pn1, pd1, op, pw2, pn2, pd2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {bottomTab === 'quiz' && (
            <PracticeQuizTab
              lang={currentLang}
              onInspectQuestion={(f1, op, f2) => {
                setIsMixed(false);
                setW1('0');
                setN1(`${f1.n}`);
                setD1(`${f1.d}`);
                setOperator(op);
                setW2('0');
                setN2(`${f2.n}`);
                setD2(`${f2.d}`);
                setActiveMode('arithmetic');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {bottomTab === 'faq' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {t.faq.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs"
                >
                  <strong className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                    {item.q}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 mt-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>{t.footer}</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => setActiveMode('arithmetic')} className="hover:underline">{t.nav.calculator}</button>
            <button onClick={() => setActiveMode('multiterm')} className="hover:underline">{t.nav.multiterm}</button>
            <button onClick={() => setActiveMode('simplify')} className="hover:underline">{t.nav.simplify}</button>
            <button onClick={() => setActiveMode('compare')} className="hover:underline">{t.nav.compare}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
