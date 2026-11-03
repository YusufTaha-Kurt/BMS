import { useCallback, useEffect, useMemo, useState } from 'react'
import { DAYS, DEFAULT_VIEW, FOCUS_DAY, SCENARIOS, type ScenarioId } from '../shared/config.ts'
import type { DetailFile, FleetDayFile, FleetRow, HistoryFile, Manifest } from '../shared/types.ts'
import { DetailPanel, type PanelTab } from './components/DetailPanel.tsx'
import { FleetList, type Filter } from './components/FleetList.tsx'
import { Guide, GUIDE_STEPS } from './components/Guide.tsx'
import { ErrorBox, Loading } from './components/StateBox.tsx'
import { QrCode } from './components/QrCode.tsx'
import { QrDialog } from './components/QrDialog.tsx'
import { TopBar } from './components/TopBar.tsx'
import { feedbackKey, useFeedback } from './lib/feedback.ts'
import { dataUrl, pad2, useJson, type JsonState } from './lib/loadJson.ts'
import { aboutUrl } from './site.ts'

type St<T> = JsonState<T> & { reload: () => void }

const FOCUS_ID = { top: null, panel: 'panel-title', passport: 'passport', feedback: 'feedback', history: 'history' } as const

export default function App() {
  const [scenario, setScenario] = useState<ScenarioId>(DEFAULT_VIEW.scenario)
  const [day, setDay] = useState(DEFAULT_VIEW.day)
  const [batteryId, setBatteryId] = useState(DEFAULT_VIEW.batteryId)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [page, setPage] = useState(1)
  const [compareOn, setCompareOn] = useState(false)
  const [guideStep, setGuideStep] = useState<number | null>(null)
  const [tab, setTab] = useState<PanelTab>('history')
  const [qrOpen, setQrOpen] = useState(false)
  const feedback = useFeedback()

  const compare = compareOn && scenario !== 'baseline'
  const manifest = useJson<Manifest>(dataUrl('manifest.json'))
  const showcase = manifest.status === 'ok' && manifest.data.showcaseIds.includes(batteryId)

  const dayFile = (sc: string) => dataUrl(`fleet/${sc}/day-${pad2(day)}.json`)
  const ready = manifest.status === 'ok'
  const fleet = useJson<FleetDayFile>(ready ? dayFile(scenario) : null)
  const baseFleet = useJson<FleetDayFile>(ready && compare ? dayFile('baseline') : null)
  const history = useJson<HistoryFile>(ready ? dataUrl(`history/${scenario}/${batteryId}.json`) : null)
  const baseHistory = useJson<HistoryFile>(ready && compare ? dataUrl(`history/baseline/${batteryId}.json`) : null)
  const detail = useJson<DetailFile>(ready && showcase ? dataUrl(`detail/${scenario}/${batteryId}/day-${pad2(day)}.json`) : null)
  const baseDetail = useJson<DetailFile>(ready && showcase && compare ? dataUrl(`detail/baseline/${batteryId}/day-${pad2(day)}.json`) : null)

  // Dosyanın kendi kimliği istenen duruma uymuyorsa gösterilmez; kartlar/tablo/grafikler aynı duruma ait kalır.
  const fleetOk = fleet.status === 'ok' && fleet.data.scenario === scenario && fleet.data.day === day
  const rowsState = useMemo<St<FleetRow[]>>(() => {
    if (fleet.status === 'ok') {
      return fleetOk
        ? { status: 'ok', data: fleet.data.rows, reload: fleet.reload }
        : { status: 'loading', reload: fleet.reload }
    }
    return fleet as St<FleetRow[]>
  }, [fleet, fleetOk])

  const pick = <T extends { scenario: ScenarioId; batteryId?: string; day?: number }>(
    s: St<T>, sc: ScenarioId, id?: string, d?: number,
  ): St<T> =>
    s.status === 'ok' && (s.data.scenario !== sc || (id !== undefined && s.data.batteryId !== id) || (d !== undefined && s.data.day !== d))
      ? { status: 'loading', reload: s.reload }
      : s

  const rowOf = (f: St<FleetDayFile>, sc: ScenarioId): St<FleetRow | null> => {
    if (f.status !== 'ok') return f as St<FleetRow | null>
    if (f.data.scenario !== sc || f.data.day !== day) return { status: 'loading', reload: f.reload }
    return { status: 'ok', data: f.data.rows.find((r) => r.id === batteryId) ?? null, reload: f.reload }
  }

  // Senaryo seçilince olayın teknik inceleme seviyesine ulaştığı gün ve olaysız karşılaştırma açılır.
  const onScenario = (s: ScenarioId) => {
    const def = SCENARIOS.find((x) => x.id === s)!
    setScenario(s)
    setBatteryId(def.targetId ?? DEFAULT_VIEW.batteryId)
    setDay(FOCUS_DAY)
    setCompareOn(def.targetId !== null)
  }
  const onSelect = (id: string) => {
    setBatteryId(id)
    // Tek sütunlu düzende panel listenin altında kalır; seçimde görünür yap.
    if (window.matchMedia('(max-width: 1279px)').matches) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const onReset = () => {
    setScenario(DEFAULT_VIEW.scenario)
    setDay(DEFAULT_VIEW.day)
    setBatteryId(DEFAULT_VIEW.batteryId)
    setQuery('')
    setFilter('all')
    setPage(1)
    setCompareOn(false)
    setTab('history')
    feedback.clear()
  }

  const goStep = useCallback((i: number) => {
    const v = GUIDE_STEPS[i].view
    setGuideStep(i)
    setScenario(v.scenario)
    setDay(v.day)
    setBatteryId(v.batteryId)
    setCompareOn(v.compare)
    setFilter(v.filter)
    setQuery('')
    setPage(1)
    setTab(v.focus === 'passport' ? 'passport' : v.tab ?? 'history')
    const id = v.focus ? FOCUS_ID[v.focus] : null
    // Yeni görünüm çizildikten sonra ilgili bölüme kaydır.
    window.setTimeout(() => {
      const el = id ? document.getElementById(id) : null
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 350)
  }, [])
  const closeGuide = useCallback(() => setGuideStep(null), [])

  useEffect(() => {
    document.title = `${batteryId} · BinBin Battery Intelligence`
  }, [batteryId])

  if (manifest.status === 'error') {
    return (
      <main className="mx-auto max-w-xl p-6">
        <ErrorBox error={manifest.error} what="Veri bildirimi (manifest)" onRetry={manifest.reload} />
      </main>
    )
  }
  if (manifest.status !== 'ok') {
    return <Loading className="min-h-screen" label="Veri bildirimi yükleniyor…" />
  }

  const fbKey = feedbackKey(scenario, batteryId)

  return (
    <div className={`min-h-screen ${guideStep !== null ? 'pb-72 sm:pb-0' : ''}`}>
      <TopBar
        scenario={scenario} onScenario={onScenario}
        day={day} onDay={(d) => setDay(Math.min(DAYS, Math.max(1, d)))}
        date={fleetOk ? fleet.data.date : null}
        compare={compare} onCompare={setCompareOn} onReset={onReset}
        counts={fleetOk ? fleet.data.counts : null}
        guideOpen={guideStep !== null}
        onGuide={() => (guideStep === null ? goStep(0) : closeGuide())}
        onQr={() => setQrOpen(true)}
        tally={feedback.tally}
      />
      <main className="mx-auto grid max-w-[1600px] gap-4 px-4 py-4 lg:px-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <FleetList
          rows={rowsState}
          query={query} onQuery={(q) => { setQuery(q); setPage(1) }}
          filter={filter} onFilter={(f) => { setFilter(f); setPage(1) }}
          page={page} onPage={setPage}
          selectedId={batteryId} onSelect={onSelect}
        />
        <DetailPanel
          scenario={scenario} day={day} batteryId={batteryId} isShowcase={showcase}
          row={rowOf(fleet, scenario)}
          baseRow={compare ? rowOf(baseFleet, 'baseline') : null}
          history={pick(history, scenario, batteryId)}
          baseHistory={compare ? pick(baseHistory, 'baseline', batteryId) : null}
          detail={showcase ? pick(detail, scenario, batteryId, day) : null}
          baseDetail={showcase && compare ? pick(baseDetail, 'baseline', batteryId, day) : null}
          verdict={feedback.map[fbKey] ?? null}
          onVerdict={(v) => feedback.set(fbKey, v)}
          tab={tab} onTab={setTab}
        />
      </main>
      <footer className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 pb-8 pt-2 lg:px-6">
        <p className="max-w-xl text-xs text-mute">
          Sentetik veri ve demo eşikleri; BinBin filosu için performans iddiası değildir.
          OSTİM Teknik Üniversitesi proje ekibi.
        </p>
        <a
          href={aboutUrl()}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl border border-line bg-panel p-2.5 pr-4 hover:border-accent"
        >
          <QrCode value={aboutUrl()} size={72} label="Hakkımızda sayfası QR kodu" />
          <span>
            <span className="block text-sm font-bold">Bizi tanıyın</span>
            <span className="block text-xs text-mute">QR'ı okutun · Hakkımızda</span>
          </span>
        </a>
      </footer>
      {guideStep !== null && <Guide step={guideStep} onStep={goStep} onClose={closeGuide} />}
      {qrOpen && <QrDialog onClose={() => setQrOpen(false)} />}
    </div>
  )
}
