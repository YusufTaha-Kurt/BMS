import {
  Activity, BatteryCharging, CircleCheck, CircleX, ClipboardCheck, Database, Gauge, Info, ParkingMeter, Thermometer,
  Waves, Zap,
} from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import { CARBON, DAYS, DEMO_RULES as R, SHOWCASE_IDS, type ScenarioId } from '../../shared/config.ts'
import type { DayRecord, DetailFile, FleetRow, HistoryFile } from '../../shared/types.ts'
import type { PanelTab } from '../../shared/view.ts'
import type { Verdict } from '../lib/feedback.ts'
import type { JsonState } from '../lib/loadJson.ts'
import { signed } from '../lib/format.ts'
import { useI18n } from '../lib/i18n.tsx'
import { explain } from '../lib/explain.ts'
import type { SiteLanguage } from '../site.ts'
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
  tab: PanelTab
  onTab: (t: PanelTab) => void
}

export type { PanelTab } from '../../shared/view.ts'


const C = { main: '#5aa9ff', base: '#a3b3cf', warn: '#ffc15a', crit: '#ff8a8a', ok: '#6ee7a0' }

function Metric({
  icon, label, value, detail, level, base,
}: {
  icon: ReactNode
  label: string
  value: string
  detail?: string
  /** Eşiği olmayan bilgi kartlarında verilmez. Normal seviyede rozet gösterilmez; yalnız sapma öne çıkar. */
  level?: Level
  base?: { text: string; diff: string } | null
}) {
  const { l } = useI18n()
  const st = PRIORITY_STYLE[LEVEL_PRIORITY[level ?? 'normal']]
  const flagged = level !== undefined && level !== 'normal'
  return (
    <div className={`rounded-lg border bg-card p-3 ${flagged ? st.line : 'border-line'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-mute">
        <span className="inline-flex items-center gap-1.5">{icon}{label}</span>
        {flagged && <LevelBadge level={level} />}
      </div>
      <div className="mt-1 break-words text-xl font-bold tabular sm:text-2xl">{value}</div>
      {detail && <div className="text-xs text-mute tabular">{detail}</div>}
      {base && (
        <div className="mt-1 text-xs text-mute tabular">
          {l('Baseline', 'Olaysız')} {base.text} · <span className="font-semibold text-ink">{base.diff}</span>
        </div>
      )}
    </div>
  )
}

function diffOf(cur: number | null, base: number | null, d: number, unit: string, language: SiteLanguage) {
  if (cur === null || base === null) return null
  return { diff: `${signed(cur - base, d, language)} ${unit}` }
}

const TABS: { id: PanelTab; label: string }[] = [
  { id: 'history', label: 'Geçmiş' },
  { id: 'telemetry', label: 'Telemetri' },
  { id: 'passport', label: 'Pasaport' },
]

export function DetailPanel(p: Props) {
  const { language, l, f: { dateTr, num, pct, withUnit }, scenarioLabel } = useI18n()
  const row = p.row.status === 'ok' && p.row.data ? explain(p.row.data, language) : null
  const base = p.baseRow?.status === 'ok' ? p.baseRow.data : null

  const baseMetric = (key: keyof DayRecord, d: number, unit: string, fmt: (n: number | null) => string) => {
    if (!p.baseRow || !row) return null
    if (p.baseRow.status !== 'ok' || !base) return null
    const df = diffOf(row[key] as number | null, base[key] as number | null, d, unit, language)
    return { text: fmt(base[key] as number | null), diff: df?.diff ?? '—' }
  }
  const kwh = row ? row.chargeWh / 1000 / CARBON.chargerEfficiency : 0

  return (
    <section aria-labelledby="panel-title" className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-panel p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="panel-title" tabIndex={-1} className="text-lg font-bold tabular">{p.batteryId}</h2>
          <p className="mt-0.5 text-sm text-mute">
            {scenarioLabel(p.scenario)} · {row ? dateTr(row.date) : l(`Day ${p.day}`, `${p.day}. gün`)}
          </p>
        </div>
        {row && <PriorityBadge priority={row.priority} size="lg" />}
      </div>

      {p.row.status === 'error' && <ErrorBox error={p.row.error} what={l('Battery day', 'Batarya günü')} onRetry={p.row.reload} />}
      {p.row.status === 'ok' && !row && (
        <div role="alert" className="rounded-lg border border-line bg-card p-4 text-sm text-mute">
          {l(`${p.batteryId} was not found in this scenario/day.`, `${p.batteryId} bu senaryo/günde filo dosyasında bulunamadı.`)}
        </div>
      )}
      {(p.row.status === 'loading' || p.row.status === 'idle') && <Loading className="py-10" label={l('Loading battery day…', 'Batarya günü yükleniyor…')} />}

      {row && (
        <>
          <div className={`rounded-lg border p-3 ${PRIORITY_STYLE[row.priority].line} ${PRIORITY_STYLE[row.priority].bg}`}>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mute">
                  <Info aria-hidden className="size-3.5" /> {l('Why', 'Neden')}
                </h3>
                <ul className="mt-1 space-y-0.5 text-sm">
                  {row.reasons.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mute">
                  <ClipboardCheck aria-hidden className="size-3.5" /> {l('Recommendation', 'Öneri')}
                </h3>
                <p className="mt-1 text-sm font-semibold">{row.action}</p>
                <p className="mt-0.5 text-xs text-mute">{l('Technical staff make the final decision.', 'Nihai karar teknik personelde.')}</p>
              </div>
            </div>
            {row.priority !== 'normal' && <FeedbackButtons verdict={p.verdict} onVerdict={p.onVerdict} />}
          </div>

          <div className="grid grid-cols-2 gap-2.5 2xl:grid-cols-4">
            <Metric
              icon={<Gauge aria-hidden className="size-3.5" />} label={l('SOH (simulated)', 'SOH (simüle)')}
              value={pct(row.soh)} level={levelSoh(row.soh)}
              base={baseMetric('soh', 2, l('pp', 'puan'), (n) => pct(n))}
            />
            <Metric
              icon={<Activity aria-hidden className="size-3.5" />} label="SOC"
              value={pct(row.socMean)} level={row.socMean === null ? 'nodata' : 'normal'}
              base={baseMetric('socMean', 1, l('pp', 'puan'), (n) => pct(n))}
            />
            <Metric
              icon={<Thermometer aria-hidden className="size-3.5" />} label={l('Temperature', 'Sıcaklık')}
              value={withUnit(row.tempMax, '°C')} level={levelTemp(row.tempMax)}
              base={baseMetric('tempMax', 1, '°C', (n) => withUnit(n, '°C'))}
            />
            <Metric
              icon={<Waves aria-hidden className="size-3.5" />} label="ΔV"
              value={withUnit(row.dvMax, 'mV', 0)} level={levelDv(row.dvMax)}
              base={baseMetric('dvMax', 0, 'mV', (n) => withUnit(n, 'mV', 0))}
            />
            <Metric
              icon={<ParkingMeter aria-hidden className="size-3.5" />} label={l('Parked drop', 'Park düşüşü')}
              value={withUnit(row.parkDropMvH, l('mV/h', 'mV/sa'))} level={levelPark(row.parkDropMvH)}
              base={baseMetric('parkDropMvH', 1, l('mV/h', 'mV/sa'), (n) => withUnit(n, l('mV/h', 'mV/sa')))}
            />
            <Metric
              icon={<Zap aria-hidden className="size-3.5" />} label={l('Internal resistance', 'İç direnç')}
              value={withUnit(row.rMohm, 'mΩ', 0)} level={levelR(row.rMohm)}
              base={baseMetric('rMohm', 0, 'mΩ', (n) => withUnit(n, 'mΩ', 0))}
            />
            <Metric
              icon={<Database aria-hidden className="size-3.5" />} label={l('Data coverage', 'Veri yeterliliği')}
              value={pct(row.coverage)} level={levelCoverage(row.coverage)}
              base={baseMetric('coverage', 1, l('pp', 'puan'), (n) => pct(n))}
            />
            <Metric
              icon={<BatteryCharging aria-hidden className="size-3.5" />} label={l('Charging energy', 'Şarj enerjisi')}
              value={withUnit(kwh, 'kWh', 2)}
              detail={`≈ ${num(kwh * CARBON.gridFactorKgPerKwh, 2)} kg CO₂e`}
            />
          </div>
          {p.baseRow && p.baseRow.status === 'loading' && <Loading label={l('Loading baseline…', 'Olaysız durum yükleniyor…')} className="justify-start" />}
          {p.baseRow && p.baseRow.status === 'error' && (
            <ErrorBox error={p.baseRow.error} what={l('Baseline comparison', 'Olaysız durum karşılaştırması')} onRetry={p.baseRow.reload} />
          )}
        </>
      )}

      <div>
        <div role="tablist" aria-label={l('Details', 'Ayrıntılar')} className="mb-3 flex gap-1 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={p.tab === t.id}
              tabIndex={p.tab === t.id ? 0 : -1}
              onKeyDown={(event) => {
                if (event.altKey || event.ctrlKey || event.metaKey) return
                const index = TABS.findIndex((item) => item.id === p.tab)
                const next = event.key === 'ArrowRight' ? (index + 1) % TABS.length
                  : event.key === 'ArrowLeft' ? (index + TABS.length - 1) % TABS.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : null
                if (next === null) return
                event.preventDefault()
                p.onTab(TABS[next].id)
                document.getElementById(`tab-${TABS[next].id}`)?.focus()
              }}
              aria-controls="tab-panel"
              onClick={() => p.onTab(t.id)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${
                p.tab === t.id ? 'border-accent text-ink' : 'border-transparent text-mute hover:text-ink'
              }`}
            >
              {l(t.id === 'history' ? 'History' : t.id === 'telemetry' ? 'Telemetry' : 'Passport', t.label)}
            </button>
          ))}
        </div>
        <div id="tab-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${p.tab}`}>
          {p.tab === 'history' && <HistorySection {...p} />}
          {p.tab === 'telemetry' && <TelemetrySection {...p} />}
          {p.tab === 'passport' && (
            p.history.status === 'ok'
              ? <Passport history={p.history.data} day={p.day} scenario={p.scenario} />
              : p.history.status === 'error'
                ? <ErrorBox error={p.history.error} what={l('Passport', 'Pasaport')} onRetry={p.history.reload} />
                : <Loading className="py-8" label={l('Loading passport…', 'Pasaport yükleniyor…')} />
          )}
        </div>
      </div>
    </section>
  )
}

function FeedbackButtons({ verdict, onVerdict }: { verdict: Verdict | null; onVerdict: (v: Verdict | null) => void }) {
  const { l } = useI18n()
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
    <div id="feedback" tabIndex={-1} className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line/60 pt-2.5">
      <span className="mr-1 text-xs font-semibold text-mute">{l('Demo feedback', 'Saha geri bildirimi')}</span>
      <div className="flex flex-wrap gap-1.5">
        {btn('confirmed', l('Finding confirmed', 'Bulgu doğrulandı'), <CircleCheck aria-hidden className="size-3.5" />, 'border-ok-line bg-ok-bg text-ok')}
        {btn('false_alarm', l('False alarm', 'Yanlış alarm'), <CircleX aria-hidden className="size-3.5" />, 'border-crit-line bg-crit-bg text-crit')}
      </div>
    </div>
  )
}

function HistorySection({ history, baseHistory, day, scenario }: Props) {
  const { l, f: { pct }, scenarioLabel } = useI18n()
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
  const mk = (key: string, label = l('This scenario', 'Bu senaryo')) => [
    { key, label, color: C.main },
    ...(showBase ? [{ key: `b_${key}`, label: l('No-event baseline', 'Olaysız durum'), color: C.base, dashed: true }] : []),
  ]
  const common = { xKey: 'day', xDomain: [1, DAYS] as [number, number], xTicks: [1, 5, 10, 15, 20, 25, 30], xLabel: l('Day', 'Gün'), markX: day, height: 150 }

  return (
    <div id="history">
      <h3 className="sr-only">{l('Daily health history', 'Günlük sağlık geçmişi')}, {scenarioLabel(scenario)}</h3>
      {history.status === 'error' && <ErrorBox error={history.error} what={l('Daily history', 'Günlük geçmiş')} onRetry={history.reload} />}
      {(history.status === 'loading' || history.status === 'idle') && <Loading className="py-8" label={l('Loading history…', 'Geçmiş yükleniyor…')} />}
      {baseHistory?.status === 'error' && <ErrorBox className="mb-2" error={baseHistory.error} what={l('Baseline history', 'Olaysız durum geçmişi')} onRetry={baseHistory.reload} />}
      {history.status === 'ok' && (
        <div className="grid gap-2.5 md:grid-cols-2">
          <MiniChart title="SOH" unit="%" data={data} series={mk('soh')} yDomain={['dataMin', 'dataMax']}
            refs={[{ y: R.sohAttentionPct, label: pct(R.sohAttentionPct, 0), color: C.warn }]} decimals={2} tickDecimals={1} {...common} />
          <MiniChart title={l('Temperature', 'Sıcaklık')} unit="°C" data={data} series={mk('tempMax')} yDomain={[20, 'auto']}
            refs={[{ y: R.tempWarnC, label: `${R.tempWarnC} °C`, color: C.warn }, { y: R.tempCritC, label: `${R.tempCritC} °C`, color: C.crit }]} {...common} />
          <MiniChart title="ΔV" unit="mV" data={data} series={mk('dvMax')} yDomain={[0, 'auto']}
            refs={[{ y: R.dvWarnMv, label: `${R.dvWarnMv} mV`, color: C.warn }, { y: R.dvCritMv, label: `${R.dvCritMv} mV`, color: C.crit }]} decimals={0} {...common} />
          <MiniChart title={l('Parked voltage drop', 'Park gerilim düşüşü')} unit={l('mV/h', 'mV/sa')} data={data} series={mk('parkDropMvH')} yDomain={[0, 'auto']}
            refs={[{ y: R.parkWarnMvH, label: `${R.parkWarnMvH}`, color: C.warn }, { y: R.parkCritMvH, label: `${R.parkCritMvH}`, color: C.crit }]} {...common} />
          <MiniChart title={l('Internal resistance', 'İç direnç')} unit="mΩ" data={data} series={mk('rMohm')} yDomain={[0, 'auto']} decimals={0}
            refs={[{ y: R.rWarnMohm, label: `${R.rWarnMohm}`, color: C.warn }, { y: R.rCritMohm, label: `${R.rCritMohm}`, color: C.crit }]} {...common} />
          <MiniChart title={l('Data coverage', 'Veri yeterliliği')} unit="%" data={data} series={mk('coverage')} yDomain={[0, 100]}
            refs={[{ y: R.coverageMinPct, label: pct(R.coverageMinPct, 0), color: C.warn }]} {...common} />
        </div>
      )}
    </div>
  )
}

const HOURS = [0, 4, 8, 12, 16, 20, 24]

function TelemetrySection({ isShowcase, detail, baseDetail, day, batteryId }: Props) {
  const { l } = useI18n()
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
          {l(`Detailed telemetry is available for ${SHOWCASE_IDS[0]}–${SHOWCASE_IDS[SHOWCASE_IDS.length - 1]} only.`, `${batteryId} için ayrıntılı telemetri yok. Örnek: ${SHOWCASE_IDS[0]}…${SHOWCASE_IDS[SHOWCASE_IDS.length - 1]}.`)}
        </p>
      </div>
    )
  }
  const showBase = baseDetail?.status === 'ok'
  const mk = (key: string) => [
    { key, label: l('This scenario', 'Bu senaryo'), color: C.main },
    ...(showBase ? [{ key: `b_${key}`, label: l('No-event baseline', 'Olaysız durum'), color: C.base, dashed: true }] : []),
  ]
  const common = { xKey: 'h', xDomain: [0, 24] as [number, number], xTicks: HOURS, xLabel: l('Time', 'Saat'), xFormat: (v: number) => `${v}:00`, height: 150 }

  return (
    <div>
      <h3 className="mb-2 text-xs text-mute">{l(`Day ${day} · 5-minute samples · missing readings remain gaps`, `${day}. gün · 5 dakikalık kayıt · eksik ölçümler boşluk olarak kalır`)}</h3>
      {detail && detail.status === 'error' && <ErrorBox error={detail.error} what={l('Telemetry detail', 'Telemetri ayrıntısı')} onRetry={detail.reload} />}
      {(!detail || detail.status === 'loading' || detail.status === 'idle') && <Loading className="py-8" label={l('Loading telemetry…', 'Telemetri yükleniyor…')} />}
      {baseDetail?.status === 'error' && <ErrorBox className="mb-2" error={baseDetail.error} what={l('Baseline telemetry', 'Olaysız durum telemetrisi')} onRetry={baseDetail.reload} />}
      {detail && detail.status === 'ok' && (
        <div className="grid gap-2.5 md:grid-cols-2">
          <MiniChart title="SOC" unit="%" data={data} series={mk('soc')} yDomain={[0, 100]} {...common} />
          <MiniChart title={l('Current (discharge +)', 'Akım (deşarj +)')} unit="A" data={data} series={mk('i')} decimals={1} {...common} />
          <MiniChart title={l('Temperature', 'Sıcaklık')} unit="°C" data={data} series={mk('temp')} yDomain={[20, 'auto']}
            refs={[{ y: R.tempWarnC, label: `${R.tempWarnC} °C`, color: C.warn }, { y: R.tempCritC, label: `${R.tempCritC} °C`, color: C.crit }]} {...common} />
          <MiniChart title="ΔV" unit="mV" data={data} series={mk('dv')} yDomain={[0, 'auto']} decimals={0}
            refs={[{ y: R.dvWarnMv, label: `${R.dvWarnMv} mV`, color: C.warn }, { y: R.dvCritMv, label: `${R.dvCritMv} mV`, color: C.crit }]} {...common} />
          <div className="md:col-span-2">
            <MiniChart title={l('Pack voltage', 'Paket gerilimi')} unit="V" data={data} series={mk('v')} yDomain={['auto', 'auto']} decimals={1} {...common} />
          </div>
        </div>
      )}
    </div>
  )
}
