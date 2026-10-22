// Demo yapılandırması. Eşikler üretici sınırı değil, gösterim için başlangıç değerleridir.

export const DATA_VERSION = '2.0.0'
export const SEED = 20261023
export const SIM_START = '2026-09-01'
export const FLEET_SIZE = 500
export const DAYS = 30
export const STEP_MINUTES = 5
export const STEPS_PER_DAY = (24 * 60) / STEP_MINUTES
export const EVENT_DAY = 8
/** Senaryo seçildiğinde açılan gün: olayın teknik inceleme seviyesine ulaştığı gün. */
export const FOCUS_DAY = 14

export const DEMO_RULES = {
  tempWarnC: 45,
  tempCritC: 55,
  dvWarnMv: 100,
  dvCritMv: 200,
  parkWarnMvH: 25,
  parkCritMvH: 50,
  rWarnMohm: 150,
  rCritMohm: 200,
  coverageMinPct: 95,
  sohAttentionPct: 80,
} as const

/** Operasyonel karbon için demo varsayımları; resmî değer pilotta ETKB-EVÇED faktörüyle değiştirilir. */
export const CARBON = {
  chargerEfficiency: 0.9,
  gridFactorKgPerKwh: 0.45,
} as const

export type EventKind = 'temp-drift' | 'cell-imbalance' | 'data-loss' | 'self-discharge' | 'resistance-rise'

export type ScenarioId = 'baseline' | EventKind | 'fleet-day'

export interface ScenarioEvent {
  id: string
  kind: EventKind
}

export interface ScenarioDef {
  id: ScenarioId
  label: string
  description: string
  /** Senaryo seçildiğinde açılan batarya. */
  targetId: string | null
  events: ScenarioEvent[]
}

const SINGLE: { kind: EventKind; id: string; label: string; what: string }[] = [
  { kind: 'temp-drift', id: 'DEMO-001', label: 'Sıcaklık sapması', what: 'soğuma kaybı ve ısınma' },
  { kind: 'cell-imbalance', id: 'DEMO-002', label: 'Hücre dengesizliği', what: 'hücre/grup ΔV artışı' },
  { kind: 'data-loss', id: 'DEMO-003', label: 'Veri kaybı', what: 'telemetri kesintileri' },
  { kind: 'self-discharge', id: 'DEMO-007', label: 'Park gerilim düşüşü', what: 'park halinde gerilim kaybı (mikro kısa devre şüphesi)' },
  { kind: 'resistance-rise', id: 'DEMO-008', label: 'İç direnç artışı', what: 'iç direnç artışı (güç/şarj kabulü düşüyor)' },
]

/** Karma filo gününde vitrin dışındaki bataryalara da olay eklenir; sayaçlar filo ölçeğinde değişir. */
const FLEET_DAY_EXTRA: ScenarioEvent[] = [
  { id: 'BT-10042', kind: 'temp-drift' },
  { id: 'BT-10118', kind: 'cell-imbalance' },
  { id: 'BT-10163', kind: 'self-discharge' },
  { id: 'BT-10207', kind: 'data-loss' },
  { id: 'BT-10251', kind: 'resistance-rise' },
  { id: 'BT-10296', kind: 'temp-drift' },
  { id: 'BT-10334', kind: 'cell-imbalance' },
  { id: 'BT-10372', kind: 'data-loss' },
  { id: 'BT-10415', kind: 'self-discharge' },
  { id: 'BT-10458', kind: 'resistance-rise' },
]

export const SCENARIOS: readonly ScenarioDef[] = [
  { id: 'baseline', label: 'Normal filo', description: 'Olay eklenmemiş filo; doğal sapmalar kurallardan gelir', targetId: null, events: [] },
  ...SINGLE.map((s) => ({
    id: s.kind,
    label: s.label,
    description: `${EVENT_DAY}. günden itibaren ${s.id}: ${s.what}`,
    targetId: s.id,
    events: [{ id: s.id, kind: s.kind }],
  })),
  {
    id: 'fleet-day',
    label: 'Karma filo günü',
    description: `${EVENT_DAY}. günden itibaren beş olay türü ${SINGLE.length + FLEET_DAY_EXTRA.length} bataryada aynı anda`,
    targetId: 'DEMO-001',
    events: [...SINGLE.map((s) => ({ id: s.id, kind: s.kind })), ...FLEET_DAY_EXTRA],
  },
]

export const SHOWCASE_IDS = [
  'DEMO-001',
  'DEMO-002',
  'DEMO-003',
  'DEMO-004',
  'DEMO-005',
  'DEMO-006',
  'DEMO-007',
  'DEMO-008',
] as const

/** Olay eklenmeden de teknik inceleme gerektiren filo bataryaları (parametre düzeyinde ayarlanır). */
export const NATURAL_FAULTS = {
  imbalance: 'BT-10087',
  selfDischarge: 'BT-10213',
  resistance: 'BT-10379',
} as const

export const DEFAULT_VIEW = {
  scenario: 'baseline' as ScenarioId,
  day: FOCUS_DAY,
  batteryId: NATURAL_FAULTS.imbalance as string,
}
