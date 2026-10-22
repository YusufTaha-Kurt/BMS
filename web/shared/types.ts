import type { ScenarioDef, ScenarioId } from './config.ts'

export type Priority = 'critical' | 'data_review' | 'attention' | 'normal'

/** Bir bataryanın bir güne ait ölçüm özeti. Ölçüm yoksa null (sıfır değil). */
export interface DaySummary {
  day: number
  date: string
  soh: number // Simüle SOH, %
  socMin: number | null
  socMean: number | null
  socMax: number | null
  tempMean: number | null
  tempMax: number | null
  dvMean: number | null
  dvMax: number | null
  /** Öğle park penceresinde paket gerilim düşüş hızı, mV/saat (düşüş pozitif). */
  parkDropMvH: number | null
  /** Sürüş başlangıcındaki gerilim/akım sıçramasından tahmini iç direnç, mΩ. */
  rMohm: number | null
  /** Şarj sırasında bataryaya giren enerji, Wh (şarj cihazı sayacı; telemetri kaybından etkilenmez). */
  chargeWh: number
  coverage: number // %
}

export interface Evaluation {
  priority: Priority
  signal: string
  action: string
  reasons: string[]
}

export type DayRecord = DaySummary & Evaluation

export interface FleetRow extends DayRecord {
  id: string
}

export interface Provenance {
  seed: number
  dataVersion: string
  scenario: ScenarioId
}

export type PriorityCounts = Record<Priority, number> & { total: number }

export interface FleetDayFile extends Provenance {
  day: number
  date: string
  counts: PriorityCounts
  rows: FleetRow[]
}

/** Pasaportun statik (model/tekil kimlik) bilgileri; tamamı sentetiktir. */
export interface BatteryProfile {
  serial: string
  model: string
  chemistry: string
  nominalAh: number
  nominalV: number
  manufactured: string
  commissioned: string
}

export interface HistoryFile extends Provenance {
  batteryId: string
  profile: BatteryProfile
  days: DayRecord[]
}

export interface DetailFile extends Provenance {
  batteryId: string
  day: number
  date: string
  intervalMin: number
  /** Dakika ofseti; diğer diziler aynı uzunlukta, eksik ölçüm null. */
  series: {
    t: number[]
    v: (number | null)[]
    i: (number | null)[]
    temp: (number | null)[]
    soc: (number | null)[]
    dv: (number | null)[]
  }
}

export interface Manifest {
  seed: number
  dataVersion: string
  simStart: string
  days: number
  fleetSize: number
  eventDay: number
  stepMinutes: number
  scenarios: ScenarioDef[]
  showcaseIds: string[]
  rules: Record<string, number>
  contentHash: string
  fileCount: number
}
