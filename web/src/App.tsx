import { ArrowLeft, Info, QrCode as QrIcon, X } from 'lucide-react'
import { useI18n, withLanguage } from './lib/i18n.tsx'
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { DAYS, DEFAULT_VIEW, FLEET_SIZE, FOCUS_DAY, SCENARIOS, SHOWCASE_IDS, type ScenarioId } from '../shared/config.ts'
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
import { aboutUrl, PROJECT_NAME } from './site.ts'
import { DEFAULT_DEMO_VIEW, readView, writeView } from './lib/viewUrl.ts'

type St<T> = JsonState<T> & { reload: () => void }


const desktopQuery = '(min-width: 1280px)'
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches
const subscribeDesktop = (notify: () => void) => {
  const media = window.matchMedia(desktopQuery)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}

export default function App() {
  const { language, l } = useI18n()
  const isDesktop = useSyncExternalStore(subscribeDesktop, desktopSnapshot)
  // Adresteki görünüm (ör. pasaport QR'ı) yalnız ilk açılışta okunur; sonra durum adrese yazılır.
  const [initial] = useState(() => readView(window.location.search))
  const [unknownBattery, setUnknownBattery] = useState(initial.unknownBattery)
  const [mobileView, setMobileView] = useState<'fleet' | 'detail'>(initial.requested ? 'detail' : 'fleet')
  const [scenario, setScenario] = useState<ScenarioId>(initial.view.scenario)
  const [day, setDay] = useState(initial.view.day)
  const [batteryId, setBatteryId] = useState(initial.view.batteryId)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [page, setPage] = useState(1)
  const [compareOn, setCompareOn] = useState(() => SCENARIOS.find((s) => s.id === initial.view.scenario)?.targetId != null)
  const [guideStep, setGuideStep] = useState<number | null>(null)
  const [tab, setTab] = useState<PanelTab>(initial.view.tab)
  const [qrOpen, setQrOpen] = useState(false)
  const feedback = useFeedback()
  const viewFrame = useRef<number | null>(null)
  useEffect(() => () => { if (viewFrame.current !== null) cancelAnimationFrame(viewFrame.current) }, [])

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

  const showMobileView = (view: 'fleet' | 'detail') => {
    setMobileView(view)
    if (!isDesktop) {
      if (viewFrame.current !== null) cancelAnimationFrame(viewFrame.current)
      viewFrame.current = requestAnimationFrame(() => {
        const target = view === 'detail'
          ? document.getElementById('panel-title')
          : document.querySelector<HTMLElement>(`[data-battery-id="${batteryId}"]`) ?? document.getElementById('list-title')
        target?.focus({ preventScroll: true })
        target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
        viewFrame.current = null
      })
    }
  }

  // Senaryo seçilince olayın teknik inceleme seviyesine ulaştığı gün ve olaysız karşılaştırma açılır.
  const onScenario = (s: ScenarioId) => {
    const def = SCENARIOS.find((x) => x.id === s)!
    setScenario(s)
    setBatteryId(def.targetId ?? DEFAULT_VIEW.batteryId)
    setDay(FOCUS_DAY)
    setCompareOn(def.targetId !== null)
    showMobileView('detail')
  }
  const onSelect = (id: string) => {
    setBatteryId(id)
    showMobileView('detail')
  }
  const onReset = () => {
    setScenario(DEFAULT_VIEW.scenario)
    setDay(DEFAULT_VIEW.day)
    setBatteryId(DEFAULT_VIEW.batteryId)
    setQuery('')
    setFilter('all')
    setPage(1)
    setCompareOn(false)
    setTab(DEFAULT_DEMO_VIEW.tab)
    setMobileView('fleet')
    setUnknownBattery(null)
    feedback.clear()
  }

  const goStep = useCallback((i: number) => {
    const v = GUIDE_STEPS[i].view
    setGuideStep(i)
    setMobileView(v.focus === 'top' ? 'fleet' : 'detail')
    setScenario(v.scenario)
    setDay(v.day)
    setBatteryId(v.batteryId)
    setCompareOn(v.compare)
    setFilter(v.filter)
    setQuery('')
    setPage(1)
    setTab(v.focus === 'passport' ? 'passport' : v.tab ?? 'history')

  }, [])
  const closeGuide = useCallback(() => {
    setGuideStep(null)
    requestAnimationFrame(() => document.getElementById('guide-trigger')?.focus())
  }, [])

  // Görünüm paylaşılabilir kalsın: lang gibi diğer parametreler korunur, varsayılanlar yazılmaz.
  useEffect(() => {
    const url = new URL(window.location.href)
    const next = writeView(url.searchParams, { scenario, day, batteryId, tab }).toString()
    if (next === url.searchParams.toString()) return
    url.search = next
    window.history.replaceState(window.history.state, '', url)
  }, [scenario, day, batteryId, tab])

  useEffect(() => {
    document.title = `${batteryId} · ${PROJECT_NAME}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', l('Interactive battery health, maintenance priorities and Digital Battery Passport demo using synthetic data · OSTİM Technical University', 'Sentetik veriyle batarya sağlığı, bakım öncelikleri ve Dijital Batarya Pasaportu demosu · OSTİM Teknik Üniversitesi'))
  }, [batteryId, l])

  if (manifest.status === 'error') {
    return (
      <main className="mx-auto max-w-xl p-6">
        <ErrorBox error={manifest.error} what={l('Dataset manifest', 'Veri bildirimi (manifest)')} onRetry={manifest.reload} />
      </main>
    )
  }
  if (manifest.status !== 'ok') {
    return <Loading className="min-h-screen" label={l('Loading demo data…', 'Demo verisi yükleniyor…')} />
  }

  const fbKey = feedbackKey(scenario, batteryId)

  return (
    <div className="min-h-screen">
      <a className="demo-skip" href="#demo-main">{l('Skip to demo content', 'Demo içeriğine geç')}</a>
      <TopBar
        scenario={scenario} onScenario={onScenario}
        day={day} onDay={(d) => setDay(Math.min(DAYS, Math.max(1, d)))}
        date={fleetOk ? fleet.data.date : null}
        compare={compare} onCompare={setCompareOn} onReset={onReset}
        counts={fleetOk ? fleet.data.counts : null}
        guideOpen={guideStep !== null}
        onGuide={() => (guideStep === null ? goStep(0) : closeGuide())}
        tally={feedback.tally}
      />
      {guideStep !== null && <Guide step={guideStep} onStep={goStep} onClose={closeGuide} />}
      <nav id="demo-workspace" aria-label={l('Demo views', 'Demo görünümleri')} className="mx-auto flex max-w-[1600px] gap-2 px-4 pt-4 xl:hidden">
        <button type="button" aria-pressed={mobileView === 'fleet'} aria-controls="fleet-view" onClick={() => showMobileView('fleet')} className={`flex-1 rounded-md border px-3 py-2.5 text-sm font-semibold ${mobileView === 'fleet' ? 'border-accent bg-accent/15' : 'border-line text-mute'}`}>{l('Fleet', 'Filo')}</button>
        <button type="button" aria-pressed={mobileView === 'detail'} aria-controls="detail-view" onClick={() => showMobileView('detail')} className={`flex-1 rounded-md border px-3 py-2.5 text-sm font-semibold ${mobileView === 'detail' ? 'border-accent bg-accent/15' : 'border-line text-mute'}`}>{l('Battery details', 'Batarya ayrıntısı')}</button>
      </nav>
      {unknownBattery !== null && (
        <div role="status" className="mx-auto mt-4 flex max-w-[1600px] items-start gap-2 px-4 lg:px-6">
          <div className="flex w-full items-start gap-2 rounded-lg border border-warn-line bg-warn-bg p-3 text-sm">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-warn" />
            <p className="flex-1">
              {l(
                `Battery “${unknownBattery}” is not part of this synthetic demo fleet. Valid IDs: ${SHOWCASE_IDS[0]}…${SHOWCASE_IDS[SHOWCASE_IDS.length - 1]} and BT-10001…BT-${10000 + FLEET_SIZE - SHOWCASE_IDS.length}. Showing ${initial.view.batteryId} instead.`,
                `“${unknownBattery}” kimlikli batarya bu sentetik demo filosunda yok. Geçerli kimlikler: ${SHOWCASE_IDS[0]}…${SHOWCASE_IDS[SHOWCASE_IDS.length - 1]} ve BT-10001…BT-${10000 + FLEET_SIZE - SHOWCASE_IDS.length}. Yerine ${initial.view.batteryId} gösteriliyor.`,
              )}
            </p>
            <button type="button" onClick={() => setUnknownBattery(null)} aria-label={l('Dismiss notice', 'Bildirimi kapat')} className="-m-1 rounded-md p-2 text-mute hover:text-ink"><X aria-hidden className="size-4" /></button>
          </div>
        </div>
      )}
      <main id="demo-main" tabIndex={-1} className="mx-auto grid max-w-[1600px] gap-4 px-4 py-4 lg:px-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div id="fleet-view" className={`${mobileView === 'fleet' ? '' : 'hidden'} min-w-0 xl:block`}>
        <FleetList
          rows={rowsState}
          query={query} onQuery={(q) => { setQuery(q); setPage(1) }}
          filter={filter} onFilter={(f) => { setFilter(f); setPage(1) }}
          page={page} onPage={setPage}
          selectedId={batteryId} onSelect={onSelect}
        />
        </div>
        <div id="detail-view" className={`${mobileView === 'detail' ? '' : 'hidden'} min-w-0 xl:block`}>
        <button type="button" onClick={() => showMobileView('fleet')} className="mb-3 inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold xl:hidden"><ArrowLeft size={16} aria-hidden />{l('Back to fleet', 'Filoya dön')}</button>
        {(isDesktop || mobileView === 'detail') && <DetailPanel
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
        />}
        </div>
      </main>
      <footer className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 pb-8 pt-2 lg:px-6">
        <p className="max-w-xl text-xs text-mute">
          {l('Synthetic data and illustrative thresholds. No live fleet performance claims. An OSTİM Technical University project.', 'Sentetik veri ve örnek eşikler kullanılır. Gerçek filo performansı gösterilmez. OSTİM Teknik Üniversitesi proje ekibi.')}
        </p>
        <a
          href={withLanguage(`${import.meta.env.BASE_URL}hakkimizda/`, language)}
          className="flex items-center gap-3 rounded-xl border border-line bg-panel p-2.5 pr-4 hover:border-accent"
        >
          <QrCode value={aboutUrl()} size={72} label={l('Project page QR code', 'Proje sayfası QR kodu')} />
          <span>
            <span className="block text-sm font-bold">{l('Project and team', 'Proje ve ekip')}</span>
            <span className="block text-xs text-mute">{l('Meet the people behind the project', 'Projenin arkasındaki ekiple tanışın')}</span>
          </span>
        </a>
        <button type="button" onClick={() => setQrOpen(true)} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-xs font-semibold hover:border-accent"><QrIcon size={16} aria-hidden />{l('Share project QR', 'Proje QR’ını paylaş')}</button>
      </footer>
      {qrOpen && <QrDialog onClose={() => setQrOpen(false)} />}
    </div>
  )
}
