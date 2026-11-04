// Demo görünümünün adres çubuğundaki karşılığı: ?battery=…&scenario=…&day=…&tab=…
// Varsayılan değerler adrese yazılmaz; böylece demo kökü (/) ve basılı QR adresi değişmez.
import { DAYS, DEFAULT_VIEW, FOCUS_DAY, normalizeBatteryId, SCENARIOS, type ScenarioId } from './config.ts'

export type PanelTab = 'history' | 'telemetry' | 'passport'

export interface DemoView {
  scenario: ScenarioId
  day: number
  batteryId: string
  tab: PanelTab
}

export const DEFAULT_DEMO_VIEW: DemoView = { ...DEFAULT_VIEW, tab: 'history' }
const TABS: readonly PanelTab[] = ['history', 'telemetry', 'passport']
const KEYS = ['battery', 'scenario', 'day', 'tab'] as const

export interface ParsedView {
  view: DemoView
  /** Adres bir görünüm istedi mi (ör. pasaport bağlantısı); mobilde doğrudan ayrıntı açılır. */
  requested: boolean
  /** Adresteki ama filoda bulunmayan kimlik; açıklayıcı bildirim için. */
  unknownBattery: string | null
}

export function readView(search: string): ParsedView {
  const params = new URLSearchParams(search)
  const rawScenario = params.get('scenario')
  const def = SCENARIOS.find((s) => s.id === rawScenario)
  const rawBattery = params.get('battery')
  const battery = normalizeBatteryId(rawBattery)
  const rawDay = Number(params.get('day'))
  const rawTab = params.get('tab') as PanelTab | null
  const view: DemoView = {
    scenario: def?.id ?? DEFAULT_DEMO_VIEW.scenario,
    day: Number.isInteger(rawDay) && rawDay >= 1 && rawDay <= DAYS ? rawDay : def ? FOCUS_DAY : DEFAULT_DEMO_VIEW.day,
    batteryId: battery ?? def?.targetId ?? DEFAULT_DEMO_VIEW.batteryId,
    tab: rawTab && TABS.includes(rawTab) ? rawTab : DEFAULT_DEMO_VIEW.tab,
  }
  return {
    view,
    requested: KEYS.some((key) => params.has(key)),
    unknownBattery: rawBattery !== null && battery === null ? rawBattery.slice(0, 40) : null,
  }
}

/** Mevcut sorgu parametrelerini (ör. lang) koruyarak görünümü yazar; varsayılanları kaldırır. */
export function writeView(params: URLSearchParams, view: DemoView): URLSearchParams {
  const next = new URLSearchParams(params)
  for (const key of KEYS) next.delete(key)
  if (view.batteryId !== DEFAULT_DEMO_VIEW.batteryId) next.set('battery', view.batteryId)
  if (view.scenario !== DEFAULT_DEMO_VIEW.scenario) next.set('scenario', view.scenario)
  if (view.day !== DEFAULT_DEMO_VIEW.day) next.set('day', String(view.day))
  if (view.tab !== DEFAULT_DEMO_VIEW.tab) next.set('tab', view.tab)
  return next
}
