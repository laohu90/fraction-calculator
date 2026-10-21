import React, { useState, useRef, useEffect } from 'react';
import { SupportedLang, getBrowserLanguageInfo } from '../i18n/translations';
import { Globe, ChevronDown, Check, Sparkles, Monitor } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: SupportedLang;
  isAuto: boolean;
  onSelectLang: (lang: SupportedLang) => void;
  onResetAuto: () => void;
}

interface LangOption {
  id: SupportedLang;
  nativeName: string;
  englishName: string;
  flag: string;
  tag: string;
}

const languages: LangOption[] = [
  { id: 'en', nativeName: 'English', englishName: 'Default / US & Global', flag: '🇺🇸', tag: 'EN' },
  { id: 'es', nativeName: 'Español', englishName: 'Spanish / España & LatAm', flag: '🇪🇸', tag: 'ES' },
  { id: 'fr', nativeName: 'Français', englishName: 'French / France & Canada', flag: '🇫🇷', tag: 'FR' },
  { id: 'pt', nativeName: 'Português', englishName: 'Portuguese / Brasil & Portugal', flag: '🇵🇹', tag: 'PT' },
  { id: 'zh', nativeName: '中文', englishName: 'Simplified Chinese / 简体中文', flag: '🇨🇳', tag: 'ZH' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  isAuto,
  onSelectLang,
  onResetAuto,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.id === currentLang) || languages[0];
  const browserInfo = getBrowserLanguageInfo();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Sleek, polished trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-medium rounded-lg border transition-all duration-150 select-none ${
          isOpen
            ? 'bg-indigo-50/80 border-indigo-400 dark:bg-indigo-950/60 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/15'
            : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 shadow-xs'
        }`}
      >
        <span className="text-sm leading-none">{activeLang.flag}</span>
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs tracking-tight">
          {activeLang.nativeName}
        </span>
        {isAuto && (
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider rounded bg-indigo-100/80 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
            Auto
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
          }`}
        />
      </button>

      {/* Floating refined dropdown menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 py-1.5 z-50 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-150"
        >
          {/* Header indicator */}
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>Language / 语言设置</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {isAuto ? '● Auto' : '● Manual'}
            </span>
          </div>

          {/* Options list */}
          <div className="p-1 space-y-0.5">
            {languages.map((lang) => {
              const isSelected = lang.id === currentLang;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => {
                    onSelectLang(lang.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none select-none">{lang.flag}</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold">{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        {lang.englishName}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Auto-detect Reset Action */}
          <div className="p-1.5 border-t border-slate-100 dark:border-slate-800/80 mt-1 bg-slate-50/70 dark:bg-slate-800/40 rounded-b-lg">
            <button
              type="button"
              onClick={() => {
                onResetAuto();
                setIsOpen(false);
              }}
              className={`w-full flex items-start gap-2 p-1.5 rounded-lg text-left transition-colors ${
                isAuto
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xs'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-tight">
                <div className="font-semibold flex items-center gap-1">
                  <span>Browser Auto-Detect</span>
                  {isAuto && <span className="text-[9px] text-indigo-600 font-bold">(Active)</span>}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                  Detected: <span className="font-mono text-slate-600 dark:text-slate-300">{browserInfo.rawLocale}</span> →{' '}
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">{browserInfo.detected}</span> (Default: EN)
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
