import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { EVENT_DAY, SCENARIOS, type ScenarioId } from '../../shared/config.ts'
import { PRIORITY_LABEL } from '../../shared/rules.ts'
import type { Priority } from '../../shared/types.ts'
import type { SiteLanguage } from '../site.ts'
import { formatters } from './format.ts'
import type { Level } from './status.ts'

const LANGUAGE_KEY = 'battery-intelligence-language'
export function initialLanguage(): SiteLanguage {
  const query = new URLSearchParams(window.location.search).get('lang')
  if (query === 'en' || query === 'tr') return query
  try { const saved = localStorage.getItem(LANGUAGE_KEY); if (saved === 'en' || saved === 'tr') return saved } catch { /* Preference is optional. */ }
  return 'en'
}
export const withLanguage = (path: string, language: SiteLanguage) => `${path}${path.includes('?') ? '&' : '?'}lang=${language}`
const EN_PRIORITIES: Record<Priority, string> = { critical: 'Technical review', data_review: 'Data review', attention: 'Monitor', normal: 'Normal' }
const EN_LEVELS: Record<Level, string> = { critical: 'Critical threshold', warning: 'Warning', normal: 'Normal', nodata: 'No data' }
const TR_LEVELS: Record<Level, string> = { critical: 'Kritik eşik', warning: 'Uyarı', normal: 'Normal', nodata: 'Veri yok' }
const EN_SCENARIOS: Record<ScenarioId, string> = {
  baseline: 'Normal fleet', 'temp-drift': 'Temperature drift', 'cell-imbalance': 'Cell imbalance', 'data-loss': 'Data loss',
  'self-discharge': 'Parked voltage drop', 'resistance-rise': 'Rising internal resistance', 'fleet-day': 'Mixed fleet day',
}
function useLanguageValue() {
  const [language, updateLanguage] = useState<SiteLanguage>(initialLanguage)
  const setLanguage = useCallback((next: SiteLanguage) => {
    updateLanguage(next)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState(window.history.state, '', url)
    try { localStorage.setItem(LANGUAGE_KEY, next) } catch { /* Works without storage. */ }
  }, [])
  useEffect(() => { document.documentElement.lang = language }, [language])
  return useMemo(() => ({
    language, setLanguage,
    l: (en: string, tr: string) => language === 'en' ? en : tr,
    f: formatters(language),
    priorityLabel: (p: Priority) => language === 'en' ? EN_PRIORITIES[p] : PRIORITY_LABEL[p],
    levelLabel: (level: Level) => language === 'en' ? EN_LEVELS[level] : TR_LEVELS[level],
    scenarioLabel: (id: ScenarioId) => language === 'en' ? EN_SCENARIOS[id] : SCENARIOS.find((s) => s.id === id)!.label,
    scenarioDescription: (id: ScenarioId) => {
      const def = SCENARIOS.find((s) => s.id === id)!
      if (language === 'tr') return def.description
      if (id === 'baseline') return 'No injected events; natural variation is evaluated using the demo thresholds.'
      return id === 'fleet-day' ? `Five event types across ${def.events.length} batteries from day ${EVENT_DAY}.` : `${EN_SCENARIOS[id]} for ${def.targetId} from day ${EVENT_DAY}.`
    },
  }), [language, setLanguage])
}
const I18nContext = createContext<ReturnType<typeof useLanguageValue> | null>(null)
export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useLanguageValue()
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('I18nProvider is required')
  return value
}
