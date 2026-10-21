import React from 'react';
import { SupportedLang } from '../i18n/translations';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: SupportedLang;
  onSelectLang: (lang: SupportedLang) => void;
}

const langOptions: { id: SupportedLang; label: string; flag: string }[] = [
  { id: 'en', label: 'English', flag: '🇺🇸' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
  { id: 'pt', label: 'Português', flag: '🇧🇷' },
  { id: 'zh', label: '中文', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onSelectLang,
}) => {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium">
        <div className="px-1.5 text-slate-400">
          <Globe className="w-3.5 h-3.5" />
        </div>
        {langOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectLang(opt.id)}
            className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
              currentLang === opt.id
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title={opt.label}
          >
            <span>{opt.flag}</span>
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
