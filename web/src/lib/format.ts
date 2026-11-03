import type { SiteLanguage } from '../../shared/types.ts'

export const num = (n: number | null | undefined, d = 1, language: SiteLanguage = 'en') =>
  n === null || n === undefined ? '—' : n.toLocaleString(language === 'en' ? 'en-GB' : 'tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d })

export const withUnit = (n: number | null | undefined, unit: string, d = 1, language: SiteLanguage = 'en') =>
  n === null || n === undefined ? (language === 'en' ? 'No measurement' : 'Ölçüm yok') : `${num(n, d, language)} ${unit}`

export const pct = (n: number | null | undefined, d = 1, language: SiteLanguage = 'en') =>
  n === null || n === undefined ? (language === 'en' ? 'No measurement' : 'Ölçüm yok') : language === 'en' ? `${num(n, d, language)}%` : `%${num(n, d, language)}`

export const signed = (n: number, d = 1, language: SiteLanguage = 'en') => `${n > 0 ? '+' : n < 0 ? '−' : ''}${num(Math.abs(n), d, language)}`

export const dateShort = (iso: string, language: SiteLanguage = 'en') =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(language === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'short', timeZone: 'UTC' })

export const dateTr = (iso: string, language: SiteLanguage = 'en') =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(language === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function formatters(language: SiteLanguage) {
  return {
    num: (n: number | null | undefined, d = 1) => num(n, d, language),
    withUnit: (n: number | null | undefined, unit: string, d = 1) => withUnit(n, unit, d, language),
    pct: (n: number | null | undefined, d = 1) => pct(n, d, language),
    signed: (n: number, d = 1) => signed(n, d, language),
    dateShort: (iso: string) => dateShort(iso, language),
    dateTr: (iso: string) => dateTr(iso, language),
  }
}
