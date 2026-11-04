import { ArrowLeft, ChevronLeft, ChevronRight, Presentation, RotateCcw } from 'lucide-react'
import { DAYS, SCENARIOS, type ScenarioId } from '../../shared/config.ts'
import type { Priority, PriorityCounts } from '../../shared/types.ts'
import { useI18n, withLanguage } from '../lib/i18n.tsx'
import { PROJECT_NAME } from '../site.ts'
import { PRIORITY_STYLE } from '../lib/status.ts'
import { PRIORITY_ICON } from './Badges.tsx'
import { ThemeToggle } from './ThemeToggle.tsx'

interface Props {
  scenario: ScenarioId; onScenario: (s: ScenarioId) => void
  day: number; onDay: (d: number) => void; date: string | null
  compare: boolean; onCompare: (c: boolean) => void; onReset: () => void
  counts: PriorityCounts | null; guideOpen: boolean; onGuide: () => void
  tally: { confirmed: number; falseAlarm: number }
}
const ORDER: Priority[] = ['critical', 'data_review', 'attention', 'normal']

export function TopBar({ scenario, onScenario, day, onDay, date, compare, onCompare, onReset, counts, guideOpen, onGuide, tally }: Props) {
  const { language, setLanguage, l, f, priorityLabel, scenarioLabel, scenarioDescription } = useI18n()
  const reviewed = tally.confirmed + tally.falseAlarm
  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 pt-3 lg:px-6">
        <a className="min-w-0" href={withLanguage(`${import.meta.env.BASE_URL}hakkimizda/`, language)} aria-label={l('Project and team', 'Proje ve ekip')}>
          <p className="mb-1 text-[11px] font-semibold text-accent">{l('OSTİM Technical University', 'OSTİM Teknik Üniversitesi')} · COP31</p>
          <h1 className="text-base font-bold sm:text-lg">{PROJECT_NAME}</h1>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex gap-0.5" role="group" aria-label={l('Language', 'Dil')}>
            {(['en', 'tr'] as const).map((lang) => <button key={lang} type="button" lang={lang} aria-label={lang === 'en' ? 'English' : 'Türkçe'} aria-pressed={language === lang} onClick={() => setLanguage(lang)} className={`rounded px-2 py-2 text-xs font-bold ${language === lang ? 'bg-accent text-bg' : 'text-mute hover:text-ink'}`}>{lang.toUpperCase()}</button>)}
          </div>
          <ThemeToggle className="inline-grid place-items-center rounded-md border border-line bg-card px-2.5 py-2 text-mute hover:text-ink" />
          <a href={withLanguage(`${import.meta.env.BASE_URL}hakkimizda/`, language)} title={l('Project and team', 'Proje ve ekip')} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2.5 py-2 text-xs font-semibold hover:border-accent"><ArrowLeft size={15} aria-hidden="true" /><span className="max-sm:sr-only">{l('Project & team', 'Proje ve ekip')}</span></a>
          <button id="guide-trigger" type="button" onClick={onGuide} aria-pressed={guideOpen} title={l('Guided demo', 'Demo rehberi')} className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs font-semibold ${guideOpen ? 'border-accent bg-accent/20' : 'border-accent/60 bg-accent/10 hover:bg-accent/20'}`}><Presentation size={16} aria-hidden="true" /><span className="max-sm:sr-only">{l('Guided demo', 'Demo rehberi')}</span></button>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-4 py-3 lg:px-6">
        <p className="mb-3 max-w-4xl text-xs leading-relaxed text-mute"><strong className="font-semibold text-ink">{l('Synthetic demo.', 'Sentetik demo.')}</strong> {l('The data is not real. It is not BinBin fleet data or the final interface.', 'Veriler gerçek değildir. BinBin filosunun verisi ve nihai arayüz değildir.')}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <div className="col-span-2 rounded-lg border border-line bg-card px-3 py-2 sm:col-span-1"><div className="text-xs font-semibold text-mute">{l('Fleet', 'Filo')}</div><div className="text-xl font-bold tabular">{counts ? counts.total : '—'}</div>{reviewed > 0 && <div className="text-[11px] text-mute tabular">{l('Demo feedback', 'Demo geri bildirimi')} {tally.confirmed} {l('confirmed', 'doğru')} · {tally.falseAlarm} {l('false alarms', 'yanlış')}</div>}</div>
          {ORDER.map((p) => { const st = PRIORITY_STYLE[p]; const Icon = PRIORITY_ICON[p]; return <div key={p} className={`rounded-lg border px-3 py-2 ${st.bg} ${st.line}`}><div className={`flex items-center gap-1.5 text-xs font-semibold ${st.text}`}><Icon aria-hidden className="size-3.5" />{priorityLabel(p)}</div><div className="text-xl font-bold tabular">{counts ? counts[p] : '—'}</div></div> })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <label className="flex min-w-0 items-center gap-2 text-xs font-semibold text-mute"><span className="sr-only">{l('Scenario', 'Senaryo')}</span><select id="scenario-select" value={scenario} title={scenarioDescription(scenario)} onChange={(e) => onScenario(e.target.value as ScenarioId)} className="max-w-full rounded-md border border-line bg-bg px-3 py-2 text-sm font-medium text-ink">{SCENARIOS.map((s) => <option key={s.id} value={s.id}>{scenarioLabel(s.id)}</option>)}</select></label>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span id="day-label" className="sr-only">{l('Day', 'Gün')}</span>
            <button type="button" aria-label={l('Previous day', 'Önceki gün')} disabled={day <= 1} onClick={() => onDay(day - 1)} className="rounded-md border border-line p-2 enabled:hover:border-accent disabled:opacity-40"><ChevronLeft className="size-4" aria-hidden /></button>
            <input type="range" min={1} max={DAYS} value={day} aria-labelledby="day-label" aria-valuetext={l(`Day ${day}`, `${day}. gün`)} onChange={(e) => onDay(Number(e.target.value))} className="w-24 accent-accent sm:w-48" />
            <button type="button" aria-label={l('Next day', 'Sonraki gün')} disabled={day >= DAYS} onClick={() => onDay(day + 1)} className="rounded-md border border-line p-2 enabled:hover:border-accent disabled:opacity-40"><ChevronRight className="size-4" aria-hidden /></button>
            <span className="whitespace-nowrap text-sm font-semibold tabular">{l(`Day ${day}`, `${day}. gün`)}{date && <span className="font-normal text-mute"> · {f.dateShort(date)}</span>}</span>
          </div>
          {scenario !== 'baseline' && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={compare} onChange={(e) => onCompare(e.target.checked)} className="size-4 accent-accent" />{l('Compare with no-event baseline', 'Olaysız durumla karşılaştır')}</label>}
          <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-2 text-sm font-semibold hover:border-accent sm:ml-auto"><RotateCcw className="size-4" aria-hidden />{l('Reset', 'Sıfırla')}</button>
        </div>
        <details className="mt-3 text-xs text-mute">
          <summary className="w-fit cursor-pointer py-1 font-semibold text-accent">{l('Understand the indicators', 'Göstergeleri tanıyın')}</summary>
          <dl className="mt-2 grid gap-3 rounded-lg border border-line bg-card p-3 sm:grid-cols-2">
            {[
              ['SOH', l('Estimated remaining capacity relative to a new battery. Simulated in this demo.', 'Yeni bataryaya göre tahmini kalan kapasite. Bu demoda simüle edilir.')],
              ['SOC', l('The battery’s current state of charge.', 'Bataryanın mevcut doluluk oranı.')],
              ['ΔV', l('Voltage difference between cell groups. Larger differences can indicate imbalance.', 'Hücre grupları arasındaki gerilim farkı. Büyüyen fark dengesizliğe işaret edebilir.')],
              [l('Data coverage', 'Veri yeterliliği'), l('The share of expected measurements that are available. Missing data is reviewed separately.', 'Beklenen ölçümlerin mevcut olan kısmı. Eksik veri ayrıca incelemeye alınır.')],
            ].map(([term, description]) => <div key={term}><dt className="font-bold text-ink">{term}</dt><dd className="mt-1 leading-relaxed">{description}</dd></div>)}
          </dl>
        </details>
      </div>
    </header>
  )
}
