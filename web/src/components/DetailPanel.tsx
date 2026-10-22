import {
  Activity, BatteryCharging, CircleCheck, CircleX, ClipboardCheck, Database, Gauge, Info, ParkingMeter, Thermometer,
  Waves, Zap,
} from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import { CARBON, DAYS, DEMO_RULES as R, SCENARIOS, SHOWCASE_IDS, type ScenarioId } from '../../shared/config.ts'
import type { DayRecord, DetailFile, FleetRow, HistoryFile } from '../../shared/types.ts'
import type { Verdict } from '../lib/feedback.ts'
import type { JsonState } from '../lib/loadJson.ts'
import { dateTr, num, pct, signed, withUnit } from '../lib/format.ts'
import {
  LEVEL_PRIORITY, levelCoverage, levelDv, levelPark, levelR, levelSoh, levelTemp, PRIORITY_STYLE, type Level,
} from '../lib/status.ts'
import { LevelBadge, PriorityBadge } from './Badges.tsx'
import { MiniChart } from './MiniChart.tsx'
import { Passport } from './Passport.tsx'
import { ErrorBox, Loading } from './StateBox.tsx'

type St<T> = JsonState<T> & { reload: () => void }

interface Props {
  scenario: ScenarioId
  day: number
  batteryId: string
  isShowcase: boolean
  row: St<FleetRow | null>
  baseRow: St<FleetRow | null> | null
  history: St<HistoryFile>
  baseHistory: St<HistoryFile> | null
  detail: St<DetailFile> | null
  baseDetail: St<DetailFile> | null
  verdict: Verdict | null
  onVerdict: (v: Verdict | null) => void
}

const BASE_LABEL = 'Olaysız durum'

const C = { main: '#5aa9ff', base: '#a3b3cf', warn: '#ffc15a', crit: '#ff8a8a', ok: '#6ee7a0' }

function Metric({
  icon, label, value, detail, level, base,
}: {
  icon: ReactNode
  label: string
  value: string
  detail?: string
  /** Eşiği olmayan bilgi kartlarında verilmez; rozet gösterilmez. */
  level?: Level
  base?: { text: string; diff: string } | null
}) {
  const st = PRIORITY_STYLE[LEVEL_PRIORITY[level ?? 'normal']]
  return (
    <div className={`rounded-lg border bg-card p-3 ${!level || level === 'normal' ? 'border-line' : st.line}`}>
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-mute">
        <span className="inline-flex items-center gap-1.5">{icon}{label}</span>
        {level && <LevelBadge level={level} />}
      </div>
      <div className="mt-1.5 text-2xl font-bold tabular">{value}</div>
      {detail && <div className="text-xs text-mute tabular">{detail}</div>}
      {base && (
        <div className="mt-1.5 border-t border-line pt-1.5 text-xs text-mute tabular">
          Olaysız: <span className="text-ink">{base.text}</span> · fark <span className="font-semibold text-ink">{base.diff}</span>
        </div>
      )}
    </div>
  )
}

function diffOf(cur: number | null, base: number | null, d: number, unit: string) {
  if (cur === null || base === null) return null
  return { diff: `${signed(cur - base, d)} ${unit}` }
}

export function DetailPanel(p: Props) {
  const sc = SCENARIOS.find((s) => s.id === p.scenario)!
  const row = p.row.status === 'ok' ? p.row.data : null
  const base = p.baseRow?.status === 'ok' ? p.baseRow.data : null

  const baseMetric = (key: keyof DayRecord, d: number, unit: string, fmt: (n: number | null) => string) => {
    if (!p.baseRow || !row) return null
    if (p.baseRow.status !== 'ok' || !base) return null
    const df = diffOf(row[key] as number | null, base[key] as number | null, d, unit)
    return { text: fmt(base[key] as number | null), diff: df?.diff ?? '—' }
  }

  return (
    <section aria-labelledby="panel-title" className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-panel p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="panel-title" className="text-lg font-bold">
            Batarya Operasyon Paneli: <span className="tabular">{p.batteryId}</span>
          </h2>
          <p className="mt-0.5 text-sm text-mute">
            {sc.label} · {p.day}. gün{row ? ` · ${dateTr(row.date)}` : ''}
            {p.baseRow && ' · olaysız durumla karşılaştırmalı'}
          </p>
        </div>
        {row && <PriorityBadge priority={row.priority} size="lg" />}
      </div>

      {p.row.status === 'error' && <ErrorBox error={p.row.error} what="Batarya günü" onRetry={p.row.reload} />}
      {p.row.status === 'ok' && !row && (
        <div role="alert" className="rounded-lg border border-line bg-card p-4 text-sm text-mute">
          {p.batteryId} bu senaryo/günde filo dosyasında bulunamadı.
        </div>
      )}
      {(p.row.status === 'loading' || p.row.status === 'idle') && <Loading className="py-10" label="Batarya günü yükleniyor…" />}

      {row && (
        <>
          <div className="grid grid-cols-2 gap-2.5 2xl:grid-cols-4">
            <Metric
              icon={<Gauge aria-hidden className="size-3.5" />} label="Simüle SOH"
              value={pct(row.soh)} level={levelSoh(row.soh)}
              detail={`Alt sınır %${R.sohAttentionPct}`}
              base={baseMetric('soh', 2, 'puan', (n) => pct(n))}
            />
            <Metric
              icon={<Activity aria-hidden className="size-3.5" />} label="SOC (günlük ort.)"
              value={pct(row.socMean)} level={row.socMean === null ? 'nodata' : 'normal'}
              detail={row.socMin === null ? 'Ölçüm yok' : `Aralık %${num(row.socMin)} – %${num(row.socMax)}`}
              base={baseMetric('socMean', 1, 'puan', (n) => pct(n))}
            />
            <Metric
              icon={<Thermometer aria-hidden className="size-3.5" />} label="Sıcaklık (tepe)"
              value={withUnit(row.tempMax, '°C')} level={levelTemp(row.tempMax)}
              detail={row.tempMean === null ? 'Ölçüm yok' : `Ort. ${num(row.tempMean)} °C · uyarı/kritik ${R.tempWarnC}/${R.tempCritC} °C`}
              base={baseMetric('tempMax', 1, '°C', (n) => withUnit(n, '°C'))}
            />
            <Metric
              icon={<Waves aria-hidden className="size-3.5" />} label="ΔV (tepe)"
              value={withUnit(row.dvMax, 'mV', 0)} level={levelDv(row.dvMax)}
              detail={row.dvMean === null ? 'Ölçüm yok' : `Ort. ${num(row.dvMean, 0)} mV · uyarı/kritik ${R.dvWarnMv}/${R.dvCritMv} mV`}
              base={baseMetric('dvMax', 0, 'mV', (n) => withUnit(n, 'mV', 0))}
            />
            <Metric
              icon={<ParkingMeter aria-hidden className="size-3.5" />} label="Park gerilim düşüşü"
              value={withUnit(row.parkDropMvH, 'mV/sa')} level={levelPark(row.parkDropMvH)}
              detail={`Öğle park penceresi · uyarı/kritik ${R.parkWarnMvH}/${R.parkCritMvH}`}
              base={baseMetric('parkDropMvH', 1, 'mV/sa', (n) => withUnit(n, 'mV/sa'))}
            />
            <Metric
              icon={<Zap aria-hidden className="size-3.5" />} label="Tahmini iç direnç"
              value={withUnit(row.rMohm, 'mΩ', 0)} level={levelR(row.rMohm)}
              detail={`Sürüş başlangıcı ΔV/ΔI · uyarı/kritik ${R.rWarnMohm}/${R.rCritMohm}`}
              base={baseMetric('rMohm', 0, 'mΩ', (n) => withUnit(n, 'mΩ', 0))}
            />
            <Metric
              icon={<Database aria-hidden className="size-3.5" />} label="Veri yeterliliği"
              value={pct(row.coverage)} level={levelCoverage(row.coverage)}
              detail={`Beklenen kayıtların oranı · alt sınır %${R.coverageMinPct}`}
              base={baseMetric('coverage', 1, 'puan', (n) => pct(n))}
            />
            <Metric
              icon={<BatteryCharging aria-hidden className="size-3.5" />} label="Şarj enerjisi (gün)"
              value={withUnit(row.chargeWh / 1000 / CARBON.chargerEfficiency, 'kWh', 2)}
              detail={`≈ ${num((row.chargeWh / 1000 / CARBON.chargerEfficiency) * CARBON.gridFactorKgPerKwh, 2)} kg CO₂e (demo faktörü)`}
            />
          </div>
          {p.baseRow && p.baseRow.status === 'loading' && <Loading label="Olaysız durum yükleniyor…" className="justify-start" />}
          {p.baseRow && p.baseRow.status === 'error' && (
            <ErrorBox error={p.baseRow.error} what="Olaysız durum karşılaştırması" onRetry={p.baseRow.reload} />
          )}

          <div className="grid gap-2.5 md:grid-cols-2">
            <div className={`rounded-lg border p-3 ${PRIORITY_STYLE[row.priority].line} ${PRIORITY_STYLE[row.priority].bg}`}>
              <h3 className="flex items-center gap-1.5 text-sm font-bold">
                <Info aria-hidden className="size-4" /> Bakım nedeni
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {row.reasons.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-card p-3">
              <h3 className="flex items-center gap-1.5 text-sm font-bold">
                <ClipboardCheck aria-hidden className="size-4" /> Operasyonel aksiyon planı
              </h3>
              <p className="mt-2 text-sm font-semibold">{row.action}</p>
              <p className="mt-1 text-xs text-mute">
                Baskın sinyal: {row.signal}. Kural tabanlı öneridir; nihai kararı yetkili teknik personel verir.
              </p>
              {row.priority !== 'normal' && <FeedbackButtons verdict={p.verdict} onVerdict={p.onVerdict} />}
            </div>
          </div>
        </>
      )}

      {row && p.history.status === 'ok' && <Passport history={p.history.data} day={p.day} />}
      <HistorySection {...p} />
      <TelemetrySection {...p} />
    </section>
  )
}

function FeedbackButtons({ verdict, onVerdict }: { verdict: Verdict | null; onVerdict: (v: Verdict | null) => void }) {
  const btn = (v: Verdict, label: string, icon: ReactNode, on: string) => (
    <button
      type="button"
      aria-pressed={verdict === v}
      onClick={() => onVerdict(verdict === v ? null : v)}
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold ${
        verdict === v ? on : 'border-line text-mute hover:text-ink'
      }`}
    >
      {icon}{label}
    </button>
  )
  return (
    <div id="feedback" className="mt-2.5 border-t border-line pt-2">
      <p className="mb-1.5 text-xs font-semibold text-mute">Saha geri bildirimi (kapalı döngü)</p>
      <div className="flex flex-wrap gap-1.5">
        {btn('confirmed', 'Bulgu doğrulandı', <CircleCheck aria-hidden className="size-3.5" />, 'border-ok-line bg-ok-bg text-ok')}
        {btn('false_alarm', 'Yanlış alarm', <CircleX aria-hidden className="size-3.5" />, 'border-crit-line bg-crit-bg text-crit')}
      </div>
    </div>
  )
}

function HistorySection({ history, baseHistory, day, scenario }: Props) {
  const data = useMemo(() => {
    if (history.status !== 'ok') return []
    const b = baseHistory?.status === 'ok' ? baseHistory.data.days : null
    return history.data.days.map((d, i) => ({
      day: d.day, soh: d.soh, tempMax: d.tempMax, dvMax: d.dvMax, coverage: d.coverage,
      parkDropMvH: d.parkDropMvH, rMohm: d.rMohm,
      b_soh: b?.[i]?.soh ?? null, b_tempMax: b?.[i]?.tempMax ?? null,
      b_dvMax: b?.[i]?.dvMax ?? null, b_coverage: b?.[i]?.coverage ?? null,
      b_parkDropMvH: b?.[i]?.parkDropMvH ?? null, b_rMohm: b?.[i]?.rMohm ?? null,
    }))
  }, [history, baseHistory])
  const showBase = baseHistory?.status === 'ok'
  const mk = (key: string, label = 'Bu senaryo') => [
    { key, label, color: C.main },
    ...(showBase ? [{ key: `b_${key}`, label: BASE_LABEL, color: C.base, dashed: true }] : []),
  ]
  const common = { xKey: 'day', xDomain: [1, DAYS] as [number, number], xTicks: [1, 5, 10, 15, 20, 25, 30], xLabel: 'Gün', markX: day, height: 150 }

  return (
    <div id="history">
      <h3 className="mb-2 text-sm font-bold">Günlük sağlık geçmişi <span className="font-normal text-mute">· {SCENARIOS.find((s) => s.id === scenario)!.label}, 30 gün</span></h3>
      {history.status === 'error' && <ErrorBox error={history.error} what="Günlük geçmiş" onRetry={history.reload} />}
      {(history.status === 'loading' || history.status === 'idle') && <Loading className="py-8" label="Geçmiş yükleniyor…" />}
      {baseHistory?.status === 'error' && <ErrorBox className="mb-2" error={baseHistory.error} what="Olaysız durum geçmişi" onRetry={baseHistory.reload} />}
      {history.status === 'ok' && (
        <div className="grid gap-2.5 md:grid-cols-2">
          <MiniChart title="Simüle SOH" unit="%" data={data} series={mk('soh')} yDomain={['dataMin', 'dataMax']}
            refs={[{ y: R.sohAttentionPct, label: `%${R.sohAttentionPct}`, color: C.warn }]} decimals={2} tickDecimals={1} {...common} />
          <MiniChart title="Tepe sıcaklık" unit="°C" data={data} series={mk('tempMax')} yDomain={[20, 'auto']}
            refs={[{ y: R.tempWarnC, label: `${R.tempWarnC} °C uyarı`, color: C.warn }, { y: R.tempCritC, label: `${R.tempCritC} °C kritik`, color: C.crit }]} {...common} />
          <MiniChart title="Tepe ΔV" unit="mV" data={data} series={mk('dvMax')} yDomain={[0, 'auto']}
            refs={[{ y: R.dvWarnMv, label: `${R.dvWarnMv} mV uyarı`, color: C.warn }, { y: R.dvCritMv, label: `${R.dvCritMv} mV kritik`, color: C.crit }]} decimals={0} {...common} />
          <MiniChart title="Park gerilim düşüşü" unit="mV/sa" data={data} series={mk('parkDropMvH')} yDomain={[0, 'auto']}
            refs={[{ y: R.parkWarnMvH, label: `${R.parkWarnMvH} uyarı`, color: C.warn }, { y: R.parkCritMvH, label: `${R.parkCritMvH} kritik`, color: C.crit }]} {...common} />
          <MiniChart title="Tahmini iç direnç" unit="mΩ" data={data} series={mk('rMohm')} yDomain={[0, 'auto']} decimals={0}
            refs={[{ y: R.rWarnMohm, label: `${R.rWarnMohm} uyarı`, color: C.warn }, { y: R.rCritMohm, label: `${R.rCritMohm} kritik`, color: C.crit }]} {...common} />
          <div className="md:col-span-2">
            <MiniChart title="Veri yeterliliği" unit="%" data={data} series={mk('coverage')} yDomain={[0, 100]}
              refs={[{ y: R.coverageMinPct, label: `%${R.coverageMinPct} alt sınır`, color: C.warn }]} {...common} />
          </div>
        </div>
      )}
    </div>
  )
}

const HOURS = [0, 4, 8, 12, 16, 20, 24]

function TelemetrySection({ isShowcase, detail, baseDetail, day, batteryId }: Props) {
  const data = useMemo(() => {
    if (!detail || detail.status !== 'ok') return []
    const s = detail.data.series
    const b = baseDetail?.status === 'ok' ? baseDetail.data.series : null
    return s.t.map((t, k) => ({
      h: t / 60, v: s.v[k], i: s.i[k], temp: s.temp[k], soc: s.soc[k], dv: s.dv[k],
      b_v: b?.v[k] ?? null, b_i: b?.i[k] ?? null, b_temp: b?.temp[k] ?? null, b_soc: b?.soc[k] ?? null, b_dv: b?.dv[k] ?? null,
    }))
  }, [detail, baseDetail])

  if (!isShowcase) {
    return (
      <div className="flex gap-2 rounded-lg border border-dashed border-line p-3 text-sm text-mute">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
        <p>
          {batteryId} için 5 dakikalık ayrıntılı telemetri yayımlanmadı; yalnız günlük özet ve geçmiş gösterilir.
          Ayrıntı grafikleri {SHOWCASE_IDS[0]}…{SHOWCASE_IDS[SHOWCASE_IDS.length - 1]} bataryalarında vardır.
        </p>
      </div>
    )
  }
  const showBase = baseDetail?.status === 'ok'
  const mk = (key: string) => [
    { key, label: 'Bu senaryo', color: C.main },
    ...(showBase ? [{ key: `b_${key}`, label: BASE_LABEL, color: C.base, dashed: true }] : []),
  ]
  const common = { xKey: 'h', xDomain: [0, 24] as [number, number], xTicks: HOURS, xLabel: 'Saat', xFormat: (v: number) => `${v}:00`, height: 150 }

  return (
    <div>
      <h3 className="mb-2 text-sm font-bold">Telemetri <span className="font-normal text-mute">· {day}. gün, 5 dakikalık kayıt; eksik ölçümler çizgide boşluk olarak kalır</span></h3>
      {detail && detail.status === 'error' && <ErrorBox error={detail.error} what="Telemetri ayrıntısı" onRetry={detail.reload} />}
      {(!detail || detail.status === 'loading' || detail.status === 'idle') && <Loading className="py-8" label="Telemetri yükleniyor…" />}
      {baseDetail?.status === 'error' && <ErrorBox className="mb-2" error={baseDetail.error} what="Olaysız durum telemetrisi" onRetry={baseDetail.reload} />}
      {detail && detail.status === 'ok' && (
        <div className="grid gap-2.5 md:grid-cols-2">
          <MiniChart title="SOC" unit="%" data={data} series={mk('soc')} yDomain={[0, 100]} {...common} />
          <MiniChart title="Akım (deşarj +)" unit="A" data={data} series={mk('i')} decimals={1} {...common} />
          <MiniChart title="Sıcaklık" unit="°C" data={data} series={mk('temp')} yDomain={[20, 'auto']}
            refs={[{ y: R.tempWarnC, label: `${R.tempWarnC} °C`, color: C.warn }, { y: R.tempCritC, label: `${R.tempCritC} °C`, color: C.crit }]} {...common} />
          <MiniChart title="ΔV" unit="mV" data={data} series={mk('dv')} yDomain={[0, 'auto']} decimals={0}
            refs={[{ y: R.dvWarnMv, label: `${R.dvWarnMv} mV`, color: C.warn }, { y: R.dvCritMv, label: `${R.dvCritMv} mV`, color: C.crit }]} {...common} />
          <div className="md:col-span-2">
            <MiniChart title="Paket gerilimi" unit="V" data={data} series={mk('v')} yDomain={['auto', 'auto']} decimals={1} {...common} />
          </div>
        </div>
      )}
    </div>
  )
}
