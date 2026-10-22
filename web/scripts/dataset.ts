import { createHash } from 'node:crypto'
import {
  DATA_VERSION, DAYS, EVENT_DAY, FLEET_SIZE, DEMO_RULES, NATURAL_FAULTS, SCENARIOS, SEED, SHOWCASE_IDS,
  SIM_START, STEP_MINUTES,
} from '../shared/config.ts'
import { compareRows, countPriorities, evaluate } from '../shared/rules.ts'
import type {
  BatteryProfile, DayRecord, DetailFile, FleetDayFile, FleetRow, HistoryFile, Manifest,
} from '../shared/types.ts'
import { makeParams, mulberry32, simulate, type BatteryParams, type SimResult } from './sim.ts'

export interface Dataset {
  files: Map<string, string>
  manifest: Manifest
}

export function batteryIds(): string[] {
  const ids: string[] = SHOWCASE_IDS.slice()
  for (let i = ids.length; i < FLEET_SIZE; i++) {
    ids.push(`BT-${String(10001 + i - SHOWCASE_IDS.length)}`)
  }
  return ids
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Sentetik pasaport profili: kapasite parametreden, tarihler ve seri numarası kimlikten türetilir. */
function profileOf(p: BatteryParams, index: number, seed: number): BatteryProfile {
  const r = mulberry32((seed ^ (index * 0x9e3779b1)) >>> 0)
  const nominalAh = Math.round(p.capNomAh)
  const ageDays = Math.round(60 + (100 - p.soh0) * 45 + r() * 60)
  const commissioned = new Date(`${SIM_START}T00:00:00Z`)
  commissioned.setUTCDate(commissioned.getUTCDate() - ageDays)
  const manufactured = new Date(commissioned)
  manufactured.setUTCDate(manufactured.getUTCDate() - Math.round(30 + r() * 60))
  return {
    serial: `LEV13S-${manufactured.getUTCFullYear()}-${String(100000 + index * 37 + Math.floor(r() * 30)).slice(-6)}`,
    model: `LEV-13S ${nominalAh} Ah`,
    chemistry: 'Li-ion NMC (sentetik)',
    nominalAh,
    nominalV: 48.1,
    manufactured: manufactured.toISOString().slice(0, 10),
    commissioned: commissioned.toISOString().slice(0, 10),
  }
}

export function buildDataset(seed = SEED): Dataset {
  const ids = batteryIds()
  const showcase = new Set<string>(SHOWCASE_IDS)

  // Vitrin bataryaları: parametre düzeyinde farklar (sonuçlar kurallardan gelir, elle atanmaz).
  const params = new Map(ids.map((id, i) => [id, makeParams(id, i, seed)]))
  const tune = (id: string, patch: Partial<BatteryParams>) =>
    Object.assign(params.get(id)!, patch)
  const clean = { ambBase: 21, dvBase: 38, dropStart: 0.0004, leakA: 0 }
  for (const id of ['DEMO-001', 'DEMO-002', 'DEMO-003', 'DEMO-006', 'DEMO-007']) {
    tune(id, { ...clean, soh0: id === 'DEMO-006' ? 96 : 91, rOhm: 0.08 })
  }
  tune('DEMO-008', { ...clean, soh0: 91, rOhm: 0.085 })
  tune('DEMO-004', { soh0: 79.2, ambBase: 21, dvBase: 40, dropStart: 0.0008, leakA: 0, rOhm: 0.08 })
  tune('DEMO-005', { soh0: 88, ambBase: 41, dvBase: 45, dropStart: 0.0008, leakA: 0, rOhm: 0.08 })
  // Olaysız filoda da teknik inceleme gerektiren birkaç batarya bulunur.
  tune(NATURAL_FAULTS.imbalance, { dvBase: 215, ambBase: 21, leakA: 0, rOhm: 0.08, dropStart: 0.0004 })
  tune(NATURAL_FAULTS.selfDischarge, { leakA: 0.15, ambBase: 21, dvBase: 40, rOhm: 0.08, dropStart: 0.0004 })
  tune(NATURAL_FAULTS.resistance, { rOhm: 0.21, ambBase: 20, dvBase: 40, leakA: 0, dropStart: 0.0004 })

  const profiles = new Map(ids.map((id, i) => [id, profileOf(params.get(id)!, i, seed)]))

  const baseline = new Map<string, SimResult>()
  for (const id of ids) baseline.set(id, simulate(params.get(id)!, seed, null, showcase.has(id)))

  const files = new Map<string, string>()
  const put = (path: string, obj: unknown) => files.set(path, JSON.stringify(obj))

  for (const sc of SCENARIOS) {
    const sims = new Map(baseline)
    for (const ev of sc.events) {
      sims.set(ev.id, simulate(params.get(ev.id)!, seed, ev.kind, showcase.has(ev.id)))
    }
    const prov = { seed, dataVersion: DATA_VERSION, scenario: sc.id }

    const records = new Map<string, DayRecord[]>()
    for (const id of ids) {
      records.set(
        id,
        sims.get(id)!.days.map((s) => ({ ...s, ...evaluate(s) })),
      )
    }

    for (let d = 1; d <= DAYS; d++) {
      const rows: FleetRow[] = ids.map((id) => ({ id, ...records.get(id)![d - 1] }))
      rows.sort(compareRows)
      const file: FleetDayFile = {
        ...prov, day: d, date: rows[0].date, counts: countPriorities(rows), rows,
      }
      put(`fleet/${sc.id}/day-${pad(d)}.json`, file)
    }

    for (const id of ids) {
      const h: HistoryFile = { ...prov, batteryId: id, profile: profiles.get(id)!, days: records.get(id)! }
      put(`history/${sc.id}/${id}.json`, h)
    }

    for (const id of SHOWCASE_IDS) {
      const raw = sims.get(id)!.raw!
      raw.forEach((r, i) => {
        const f: DetailFile = {
          ...prov, batteryId: id, day: i + 1, date: records.get(id)![i].date,
          intervalMin: STEP_MINUTES, series: r,
        }
        put(`detail/${sc.id}/${id}/day-${pad(i + 1)}.json`, f)
      })
    }
  }

  const hash = createHash('sha256')
  for (const path of [...files.keys()].sort()) hash.update(path).update('\0').update(files.get(path)!).update('\0')

  const manifest: Manifest = {
    seed, dataVersion: DATA_VERSION, simStart: SIM_START, days: DAYS, fleetSize: FLEET_SIZE,
    eventDay: EVENT_DAY, stepMinutes: STEP_MINUTES,
    scenarios: SCENARIOS.map((s) => ({ ...s, events: s.events.map((e) => ({ ...e })) })),
    showcaseIds: [...SHOWCASE_IDS],
    rules: { ...DEMO_RULES },
    contentHash: hash.digest('hex'),
    fileCount: files.size,
  }
  return { files, manifest }
}
