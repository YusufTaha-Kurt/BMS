// Veri hattı kontrolleri: `npm run verify:data` (önce `npm run data` ile üretilmiş public/data gerekir).
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  DAYS, DATA_VERSION, DEFAULT_VIEW, DEMO_RULES, EVENT_DAY, FLEET_SIZE, FOCUS_DAY, NATURAL_FAULTS, SCENARIOS, SEED,
  SHOWCASE_IDS, STEPS_PER_DAY,
} from '../shared/config.ts'
import { compareRows, evaluate } from '../shared/rules.ts'
import type { DetailFile, FleetDayFile, HistoryFile, Manifest } from '../shared/types.ts'
import { buildDataset } from './dataset.ts'

const root = fileURLToPath(new URL('../public/data/', import.meta.url))
const read = <T>(p: string) => JSON.parse(readFileSync(root + p, 'utf8')) as T
const pad = (n: number) => String(n).padStart(2, '0')
const fleet = (sc: string, d: number) => read<FleetDayFile>(`fleet/${sc}/day-${pad(d)}.json`)
const history = (sc: string, id: string) => read<HistoryFile>(`history/${sc}/${id}.json`)
const detail = (sc: string, id: string, d: number) => read<DetailFile>(`detail/${sc}/${id}/day-${pad(d)}.json`)
const days = Array.from({ length: DAYS }, (_, i) => i + 1)
const targeted = SCENARIOS.filter((s) => s.targetId)

test('manifest ve 500 benzersiz kimlik', () => {
  const m = read<Manifest>('manifest.json')
  assert.equal(m.seed, SEED)
  assert.equal(m.dataVersion, DATA_VERSION)
  for (const sc of SCENARIOS) {
    for (const d of days) {
      const f = fleet(sc.id, d)
      assert.equal(f.rows.length, FLEET_SIZE)
      assert.equal(new Set(f.rows.map((r) => r.id)).size, FLEET_SIZE)
      assert.equal(f.counts.total, FLEET_SIZE)
      assert.equal(f.counts.critical + f.counts.data_review + f.counts.attention + f.counts.normal, FLEET_SIZE)
    }
  }
})

test('senaryo/gün/seed/sürüm alanları dosyalarla eşleşir', () => {
  for (const sc of SCENARIOS) {
    for (const d of days) {
      const f = fleet(sc.id, d)
      assert.deepEqual([f.scenario, f.day, f.seed, f.dataVersion], [sc.id, d, SEED, DATA_VERSION])
      for (const r of f.rows) assert.equal(r.day, d)
    }
    for (const id of SHOWCASE_IDS) {
      const h = history(sc.id, id)
      assert.deepEqual([h.scenario, h.batteryId, h.days.length], [sc.id, id, DAYS])
      for (const d of [1, 8, 30]) {
        const x = detail(sc.id, id, d)
        assert.deepEqual([x.scenario, x.batteryId, x.day, x.seed], [sc.id, id, d, SEED])
        assert.equal(x.series.t.length, STEPS_PER_DAY)
      }
    }
  }
})

test('aynı seed aynı içeriği üretir; diskteki dosyalar üretimle eşleşir', () => {
  const a = buildDataset()
  const b = buildDataset()
  assert.equal(a.manifest.contentHash, b.manifest.contentHash)
  const disk = read<Manifest>('manifest.json')
  assert.equal(disk.contentHash, a.manifest.contentHash)
  const h = createHash('sha256')
  for (const p of [...a.files.keys()].sort()) h.update(p).update('\0').update(readFileSync(root + p, 'utf8')).update('\0')
  assert.equal(h.digest('hex'), disk.contentHash)
})

test('olay öncesi kayıtlar baseline ile birebir aynı; olay dışı bataryalar hiç değişmez', () => {
  for (const sc of targeted) {
    const evIds = new Set(sc.events.map((e) => e.id))
    for (const d of days) {
      const base = fleet('baseline', d).rows
      const cur = fleet(sc.id, d).rows
      const byId = new Map(base.map((r) => [r.id, r]))
      for (const r of cur) {
        if (evIds.has(r.id) && d >= EVENT_DAY) continue
        assert.deepEqual(r, byId.get(r.id), `${sc.id} gün ${d} ${r.id}`)
      }
    }
    for (const ev of sc.events.filter((e) => (SHOWCASE_IDS as readonly string[]).includes(e.id))) {
      for (let d = 1; d < EVENT_DAY; d++) {
        assert.deepEqual(detail(sc.id, ev.id, d).series, detail('baseline', ev.id, d).series)
      }
    }
  }
})

test('olay sonrası beklenen değişim telemetriden türer', () => {
  const row = (sc: string, id: string, d: number) => fleet(sc, d).rows.find((r) => r.id === id)!
  const { tempWarnC, tempCritC, dvWarnMv, dvCritMv, parkWarnMvH, parkCritMvH, rWarnMohm, rCritMohm, coverageMinPct } = DEMO_RULES
  assert.ok(row('temp-drift', 'DEMO-001', EVENT_DAY).tempMax! >= tempWarnC)
  assert.equal(row('temp-drift', 'DEMO-001', EVENT_DAY).priority, 'attention')
  assert.ok(row('temp-drift', 'DEMO-001', FOCUS_DAY).tempMax! >= tempCritC)
  assert.ok(row('cell-imbalance', 'DEMO-002', EVENT_DAY).dvMax! >= dvWarnMv)
  assert.ok(row('cell-imbalance', 'DEMO-002', FOCUS_DAY).dvMax! >= dvCritMv)
  assert.ok(row('self-discharge', 'DEMO-007', EVENT_DAY).parkDropMvH! >= parkWarnMvH)
  assert.equal(row('self-discharge', 'DEMO-007', EVENT_DAY).priority, 'attention')
  assert.ok(row('self-discharge', 'DEMO-007', FOCUS_DAY).parkDropMvH! >= parkCritMvH)
  assert.ok(row('resistance-rise', 'DEMO-008', EVENT_DAY).rMohm! >= rWarnMohm)
  assert.equal(row('resistance-rise', 'DEMO-008', EVENT_DAY).priority, 'attention')
  assert.ok(row('resistance-rise', 'DEMO-008', FOCUS_DAY).rMohm! >= rCritMohm)
  for (let d = EVENT_DAY; d <= DAYS; d++) {
    const r = row('data-loss', 'DEMO-003', d)
    assert.ok(r.coverage < coverageMinPct)
    assert.equal(r.priority, 'data_review')
  }
  // Senaryo seçildiğinde açılan gün: hedef batarya inceleme durumunda (veri kaybında veri incelemesi).
  for (const sc of targeted) {
    for (let d = FOCUS_DAY; d <= DAYS; d++) {
      const p = row(sc.id, sc.targetId!, d).priority
      assert.equal(p, sc.id === 'data-loss' ? 'data_review' : 'critical', `${sc.id} gün ${d}`)
    }
  }
  // Baseline'da vitrin hedefleri olay günlerinde de normal
  for (const id of ['DEMO-001', 'DEMO-002', 'DEMO-003', 'DEMO-006', 'DEMO-007', 'DEMO-008']) {
    for (const d of days) assert.equal(row('baseline', id, d).priority, 'normal', `${id} gün ${d}`)
  }
  // Olaysız filoda da teknik inceleme gerektiren bataryalar var; açılış bataryası bunlardan biri.
  for (const d of days) {
    assert.ok(fleet('baseline', d).counts.critical >= 3, `baseline gün ${d}`)
    for (const id of Object.values(NATURAL_FAULTS)) assert.equal(row('baseline', id, d).priority, 'critical', `${id} gün ${d}`)
  }
  assert.equal(row(DEFAULT_VIEW.scenario, DEFAULT_VIEW.batteryId, DEFAULT_VIEW.day).priority, 'critical')
  // Karma filo günü filo sayaçlarını belirgin biçimde değiştirir.
  assert.ok(fleet('fleet-day', FOCUS_DAY).counts.critical >= fleet('baseline', FOCUS_DAY).counts.critical + 8)
  // Vitrin dışı örnek: elle atanmış değil, kurallardan geliyor
  assert.equal(row('baseline', 'DEMO-004', 1).priority, 'attention')
  for (const d of days) {
    const r = row('baseline', 'DEMO-005', d)
    assert.ok(r.tempMax! >= tempWarnC, `DEMO-005 gün ${d}`)
    assert.ok(r.priority === 'attention' || r.priority === 'data_review', `DEMO-005 gün ${d}`)
  }
})

test('kapsam ve null: eksik ölçüm sıfırlanmaz, kapsam özetle tutarlı', () => {
  for (const sc of SCENARIOS) {
    for (const id of SHOWCASE_IDS) {
      const h = history(sc.id, id)
      for (const d of days) {
        const x = detail(sc.id, id, d)
        const s = x.series
        const valid = s.v.filter((v) => v !== null).length
        assert.equal(Math.round((valid / STEPS_PER_DAY) * 1000) / 10, h.days[d - 1].coverage)
        for (let k = 0; k < s.t.length; k++) {
          const nulls = [s.v[k], s.i[k], s.temp[k], s.soc[k], s.dv[k]].filter((v) => v === null).length
          assert.ok(nulls === 0 || nulls === 5, 'null kayıt tüm alanlarda null olmalı')
        }
      }
    }
  }
  const lossy = detail('data-loss', 'DEMO-003', 10).series
  assert.ok(lossy.temp.some((v) => v === null))
  assert.ok(!lossy.temp.some((v) => v === 0))
})

test('V/I/T/SOC/ΔV tutarlılığı: işaret, sınırlar ve sanal kapasite', () => {
  for (const id of SHOWCASE_IDS) {
    const hist = history('baseline', id).days
    for (const d of [1, 10, 20, 30]) {
      const s = detail('baseline', id, d).series
      let dot = 0, ah = 0, dsocSum = 0
      for (let k = 0; k < s.t.length; k++) {
        if (s.soc[k] === null) continue
        assert.ok(s.soc[k]! >= 0 && s.soc[k]! <= 100)
        assert.ok(s.v[k]! > 35 && s.v[k]! < 56, `V ${s.v[k]}`)
        assert.ok(s.dv[k]! > 0)
        if (k + 1 < s.t.length && s.soc[k + 1] !== null) {
          const dsoc = s.soc[k + 1]! - s.soc[k]!
          dot += s.i[k]! * dsoc
          ah += Math.abs(s.i[k]!) * (5 / 60)
          dsocSum += Math.abs(dsoc)
        }
      }
      assert.ok(dot < 0, 'deşarj (I>0) SOC’yi düşürmeli')
      const impliedCap = ah / (dsocSum / 100)
      const expected = hist[d - 1].soh
      assert.ok(impliedCap > 15 && impliedCap < 35, `örtük kapasite ${impliedCap} (SOH ${expected})`)
    }
  }
})

test('Simüle SOH tek günde ani düşmez (geçici ısınma dahil)', () => {
  for (const sc of SCENARIOS) {
    const id = sc.targetId ?? 'DEMO-001'
    const h = history(sc.id, id).days
    for (let i = 1; i < h.length; i++) assert.ok(h[i - 1].soh - h[i].soh <= 0.2, `${sc.id} gün ${i + 1}`)
  }
})

test('öncelik kuralları ve sıralama', () => {
  const ok = { soh: 90, tempMax: 30, dvMax: 50, parkDropMvH: 10, rMohm: 90, coverage: 100 }
  assert.equal(evaluate(ok).priority, 'normal')
  assert.equal(evaluate({ ...ok, parkDropMvH: 25 }).priority, 'attention')
  assert.equal(evaluate({ ...ok, parkDropMvH: 50 }).priority, 'critical')
  assert.equal(evaluate({ ...ok, rMohm: 150 }).priority, 'attention')
  assert.equal(evaluate({ ...ok, rMohm: 200 }).priority, 'critical')
  assert.equal(evaluate({ ...ok, parkDropMvH: null, rMohm: null }).priority, 'normal')
  assert.equal(evaluate({ ...ok, soh: 79.9 }).priority, 'attention')
  assert.equal(evaluate({ ...ok, tempMax: 45 }).priority, 'attention')
  assert.equal(evaluate({ ...ok, dvMax: 100 }).priority, 'attention')
  assert.equal(evaluate({ ...ok, coverage: 94.9 }).priority, 'data_review')
  assert.equal(evaluate({ ...ok, coverage: 94.9, soh: 70, tempMax: 50 }).priority, 'data_review')
  assert.equal(evaluate({ ...ok, tempMax: 55 }).priority, 'critical')
  const crit = evaluate({ ...ok, dvMax: 210, coverage: 40 })
  assert.equal(crit.priority, 'critical', 'kritik ihlal eksik veri yüzünden kaybolmamalı')
  assert.ok(crit.reasons.some((r) => r.includes('Veri yeterliliği')))
  assert.equal(evaluate({ ...ok, tempMax: null, dvMax: null, parkDropMvH: null, rMohm: null, coverage: 0 }).priority, 'data_review')

  for (const sc of SCENARIOS) {
    for (const d of [1, 8, 30]) {
      const rows = fleet(sc.id, d).rows
      for (let i = 1; i < rows.length; i++) assert.ok(compareRows(rows[i - 1], rows[i]) < 0)
      for (const r of rows) {
        assert.ok(r.reasons.length > 0 && r.action && r.signal)
        assert.deepEqual(evaluate(r).priority, r.priority)
      }
    }
  }
})

test('English explanations preserve every recorded priority and cover all scenario findings', () => {
  const seen = new Set<string>()
  for (const sc of SCENARIOS) {
    for (const d of days) {
      for (const row of fleet(sc.id, d).rows) {
        const english = evaluate(row, DEMO_RULES, 'en')
        const turkish = evaluate(row, DEMO_RULES, 'tr')
        assert.equal(english.priority, row.priority)
        assert.deepEqual(turkish, { priority: row.priority, signal: row.signal, action: row.action, reasons: row.reasons })
        assert.ok(english.signal && english.action && english.reasons.length)
        assert.ok(!/[ğüşöçıİĞÜŞÖÇ]/.test([english.signal, english.action, ...english.reasons].join(' ')))
        seen.add(english.signal)
      }
    }
  }
  for (const signal of ['No deviation', 'Temperature drift', 'Cell imbalance (ΔV)', 'Parked voltage drop', 'Rising internal resistance', 'Low data coverage', 'Temperature increasing', 'Increasing ΔV', 'Parked voltage decreasing', 'Internal resistance increasing', 'Near the capacity threshold']) {
    assert.ok(seen.has(signal), `English finding not exercised: ${signal}`)
  }
})

test('EN/TR numbers, dates, percentages and missing readings use the chosen locale', async () => {
  const { formatters } = await import('../src/lib/format.ts')
  const en = formatters('en'), tr = formatters('tr')
  assert.equal(en.num(1234.5), '1,234.5')
  assert.equal(tr.num(1234.5), '1.234,5')
  assert.equal(en.pct(84.8), '84.8%')
  assert.equal(tr.pct(84.8), '%84,8')
  assert.equal(en.withUnit(null, '°C'), 'No measurement')
  assert.equal(tr.withUnit(null, '°C'), 'Ölçüm yok')
  assert.equal(en.dateTr('2026-09-14'), '14 September 2026')
  assert.equal(tr.dateTr('2026-09-14'), '14 Eylül 2026')
})
