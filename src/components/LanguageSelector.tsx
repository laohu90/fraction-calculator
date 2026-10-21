import React, { useState, useRef, useEffect } from 'react';
import { SupportedLang } from '../i18n/translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: SupportedLang;
  onSelectLang: (lang: SupportedLang) => void;
}

interface LangItem {
  id: SupportedLang;
  nativeName: string;
  subName: string;
}

const languages: LangItem[] = [
  { id: 'en', nativeName: 'English', subName: 'US / UK' },
  { id: 'es', nativeName: 'Español', subName: 'Spanish' },
  { id: 'fr', nativeName: 'Français', subName: 'French' },
  { id: 'pt', nativeName: 'Português', subName: 'Portuguese' },
  { id: 'zh', nativeName: '中文', subName: 'Simplified' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onSelectLang,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.id === currentLang) || languages[0];

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
      {/* Sleek, professional trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-xl border transition-all duration-150 shadow-2xs select-none ${
          isOpen
            ? 'bg-indigo-50/70 border-indigo-400 dark:bg-indigo-950/40 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/15'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
        }`}
      >
        <Globe className={`w-3.5 h-3.5 transition-colors ${isOpen ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
        <span className="font-semibold tracking-tight">{activeLang.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-500' : ''
          }`}
        />
      </button>

      {/* Floating elegant menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 py-1.5 z-50 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-150"
        >
          <div className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            Language / 语言
          </div>
          <div className="space-y-0.5 px-1">
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
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs font-medium">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                      {lang.subName}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
