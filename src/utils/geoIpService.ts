/**
 * Lightweight, privacy-friendly Client-side GeoIP Service.
 * Detects visitor country via IP without blocking page rendering or SEO crawlers.
 */

import { SupportedLang } from '../i18n/translations';

export interface GeoIpInfo {
  countryCode: string;
  suggestedLang: SupportedLang | null;
  countryName?: string;
}

const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PR', 'PA', 'UY', 'GQ',
]);

const FRENCH_COUNTRIES = new Set([
  'FR', 'MC', 'BE', 'LU', 'CH', 'SN', 'CI', 'CD', 'MG', 'CM',
  'BF', 'ML', 'NE', 'TD', 'GN', 'RW', 'BI', 'DJ', 'TG', 'CF', 'CG', 'GA',
]);

const PORTUGUESE_COUNTRIES = new Set([
  'BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL', 'MO',
]);

const CHINESE_COUNTRIES = new Set([
  'CN', 'TW', 'HK',
]);

export async function detectVisitorGeoIp(): Promise<GeoIpInfo | null> {
  if (typeof window === 'undefined') return null;

  try {
    // Controller with 1800ms timeout to avoid hanging if network is slow/blocked
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    // Free, fast SSL GeoIP API that returns {"country":"ES", "ip":"..."}
    const res = await fetch('https://api.country.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data = await res.json();
    const code = (data.country || '').toUpperCase();

    if (!code) return null;

    let suggestedLang: SupportedLang | null = null;

    if (SPANISH_COUNTRIES.has(code)) {
      suggestedLang = 'es';
    } else if (FRENCH_COUNTRIES.has(code)) {
      suggestedLang = 'fr';
    } else if (PORTUGUESE_COUNTRIES.has(code)) {
      suggestedLang = 'pt';
    } else if (CHINESE_COUNTRIES.has(code)) {
      suggestedLang = 'zh';
    } else {
      suggestedLang = 'en'; // default for all other countries
    }

    return {
      countryCode: code,
      suggestedLang,
    };
  } catch {
    // Silently fallback if offline, blocked by adblocker, or timed out
    return null;
  }
}
