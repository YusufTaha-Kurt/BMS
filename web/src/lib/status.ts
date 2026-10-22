import { DEMO_RULES as R } from '../../shared/config.ts'
import type { Priority } from '../../shared/types.ts'

export type Level = 'critical' | 'warning' | 'normal' | 'nodata'

export const levelTemp = (v: number | null): Level =>
  v === null ? 'nodata' : v >= R.tempCritC ? 'critical' : v >= R.tempWarnC ? 'warning' : 'normal'
export const levelDv = (v: number | null): Level =>
  v === null ? 'nodata' : v >= R.dvCritMv ? 'critical' : v >= R.dvWarnMv ? 'warning' : 'normal'
export const levelPark = (v: number | null): Level =>
  v === null ? 'nodata' : v >= R.parkCritMvH ? 'critical' : v >= R.parkWarnMvH ? 'warning' : 'normal'
export const levelR = (v: number | null): Level =>
  v === null ? 'nodata' : v >= R.rCritMohm ? 'critical' : v >= R.rWarnMohm ? 'warning' : 'normal'
export const levelCoverage = (v: number): Level => (v < R.coverageMinPct ? 'warning' : 'normal')
export const levelSoh = (v: number): Level => (v < R.sohAttentionPct ? 'warning' : 'normal')

export const LEVEL_LABEL: Record<Level, string> = {
  critical: 'Kritik eşik',
  warning: 'Uyarı',
  normal: 'Normal',
  nodata: 'Veri yok',
}

export const PRIORITY_STYLE: Record<Priority, { text: string; bg: string; line: string; bar: string; edge: string }> = {
  critical: { text: 'text-crit', bg: 'bg-crit-bg', line: 'border-crit-line', bar: 'bg-crit', edge: 'border-crit' },
  data_review: { text: 'text-data', bg: 'bg-data-bg', line: 'border-data-line', bar: 'bg-data', edge: 'border-data' },
  attention: { text: 'text-warn', bg: 'bg-warn-bg', line: 'border-warn-line', bar: 'bg-warn', edge: 'border-warn' },
  normal: { text: 'text-ok', bg: 'bg-ok-bg', line: 'border-ok-line', bar: 'bg-ok', edge: 'border-ok' },
}

export const LEVEL_PRIORITY: Record<Level, Priority> = {
  critical: 'critical',
  warning: 'attention',
  normal: 'normal',
  nodata: 'data_review',
}
