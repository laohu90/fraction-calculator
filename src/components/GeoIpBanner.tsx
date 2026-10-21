import React, { useEffect, useState } from 'react';
import { SupportedLang } from '../i18n/translations';
import { detectVisitorGeoIp, GeoIpInfo } from '../utils/geoIpService';
import { Globe, X, ArrowRight } from 'lucide-react';

interface GeoIpBannerProps {
  currentLang: SupportedLang;
  onSwitchLang: (lang: SupportedLang) => void;
}

const bannerMessages: Record<
  SupportedLang,
  {
    flag: string;
    text: string;
    action: string;
    dismiss: string;
  }
> = {
  zh: {
    flag: '🇨🇳',
    text: '检测到您的 IP 访问自中文地区，是否切换到中文版？',
    action: '切换为中文',
    dismiss: '保持英文',
  },
  es: {
    flag: '🇪🇸',
    text: 'Detectamos que nos visitas desde un país de habla hispana. ¿Deseas ver la versión en español?',
    action: 'Cambiar a Español',
    dismiss: 'Mantener en inglés',
  },
  fr: {
    flag: '🇫🇷',
    text: 'Nous avons détecté une visite depuis une région francophone. Passer au français ?',
    action: 'Passer en français',
    dismiss: "Garder l'anglais",
  },
  pt: {
    flag: '🇧🇷',
    text: 'Detectamos que sua visita é de um país de língua portuguesa. Mudar para português?',
    action: 'Mudar para Português',
    dismiss: 'Manter em inglês',
  },
  en: {
    flag: '🇺🇸',
    text: 'Visiting in English? You can switch anytime.',
    action: 'Switch to English',
    dismiss: 'Dismiss',
  },
};

export const GeoIpBanner: React.FC<GeoIpBannerProps> = ({
  currentLang,
  onSwitchLang,
}) => {
  const [geoInfo, setGeoInfo] = useState<GeoIpInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only check if user hasn't already dismissed it this session
    try {
      if (sessionStorage.getItem('fraction_calc_geoip_dismissed')) {
        setDismissed(true);
        return;
      }
    } catch {}

    detectVisitorGeoIp().then((info) => {
      if (info && info.suggestedLang && info.suggestedLang !== currentLang) {
        setGeoInfo(info);
      }
    });
  }, [currentLang]);

  if (dismissed || !geoInfo || !geoInfo.suggestedLang || geoInfo.suggestedLang === currentLang) {
    return null;
  }

  const targetLang = geoInfo.suggestedLang;
  const msg = bannerMessages[targetLang];
  if (!msg) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('fraction_calc_geoip_dismissed', 'true');
    } catch {}
  };

  const handleAccept = () => {
    onSwitchLang(targetLang);
    handleDismiss();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-xs py-2 px-4 shadow-sm border-b border-indigo-700/50 print:hidden animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-base leading-none">{msg.flag}</span>
          <span className="opacity-95">{msg.text}</span>
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] bg-indigo-700/60 text-indigo-200 font-mono">
            IP: {geoInfo.countryCode}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAccept}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white text-indigo-900 font-bold rounded-md hover:bg-indigo-50 active:scale-98 transition-all shadow-2xs"
          >
            <span>{msg.action}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="px-2 py-1 text-indigo-200 hover:text-white transition-colors"
            title={msg.dismiss}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
