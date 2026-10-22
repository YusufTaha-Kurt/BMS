import { ChevronLeft, ChevronRight, Presentation, RotateCcw } from 'lucide-react'
import { DAYS, SCENARIOS, type ScenarioId } from '../../shared/config.ts'
import { PRIORITY_LABEL, PRIORITY_LEVEL } from '../../shared/rules.ts'
import type { Priority, PriorityCounts } from '../../shared/types.ts'
import { PRIORITY_STYLE } from '../lib/status.ts'
import { PRIORITY_ICON } from './Badges.tsx'

interface Props {
  scenario: ScenarioId
  onScenario: (s: ScenarioId) => void
  day: number
  onDay: (d: number) => void
  date: string | null
  compare: boolean
  onCompare: (c: boolean) => void
  onReset: () => void
  counts: PriorityCounts | null
  guideOpen: boolean
  onGuide: () => void
  tally: { confirmed: number; falseAlarm: number }
}

const ORDER: Priority[] = ['critical', 'data_review', 'attention', 'normal']

export function TopBar({
  scenario, onScenario, day, onDay, date, compare, onCompare, onReset, counts, guideOpen, onGuide, tally,
}: Props) {
  const sc = SCENARIOS.find((s) => s.id === scenario)!
  const reviewed = tally.confirmed + tally.falseAlarm
  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pt-3 lg:px-6">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-extrabold tracking-wide">BINBIN</span>
          <span className="text-sm text-mute">| Battery Intelligence</span>
          <span className="text-xs text-mute">· OSTİM Teknik Üniversitesi proje önerisi</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="rounded-md border border-line bg-card px-2.5 py-1 text-xs font-semibold text-mute">
            Sentetik demo · Kural tabanlı değerlendirme
          </p>
          <button
            type="button"
            onClick={onGuide}
            aria-pressed={guideOpen}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-semibold ${
              guideOpen ? 'border-accent bg-accent/20 text-ink' : 'border-accent/60 bg-accent/10 text-ink hover:bg-accent/20'
            }`}
          >
            <Presentation aria-hidden className="size-4" /> Sunum rehberi
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-3 lg:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <div className="rounded-lg border border-line bg-card px-3 py-2">
            <div className="text-xs text-mute">Filo</div>
            <div className="text-xl font-bold tabular">{counts ? counts.total : '—'} <span className="text-xs font-medium text-mute">batarya</span></div>
            <div className="text-[11px] text-mute">
              {reviewed > 0 ? `Saha geri bildirimi: ${tally.confirmed} doğru · ${tally.falseAlarm} yanlış alarm` : 'Günlük bakım öncelik özeti'}
            </div>
          </div>
          {ORDER.map((p) => {
            const st = PRIORITY_STYLE[p]
            const Icon = PRIORITY_ICON[p]
            return (
              <div key={p} className={`rounded-lg border px-3 py-2 ${st.bg} ${st.line}`}>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${st.text}`}>
                  <Icon aria-hidden className="size-3.5" />
                  {PRIORITY_LABEL[p]}
                </div>
                <div className="text-xl font-bold tabular">{counts ? counts[p] : '—'}</div>
                <div className="text-[11px] text-mute">{PRIORITY_LEVEL[p]}</div>
              </div>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-3">
          <label className="flex flex-col gap-1 text-xs font-semibold text-mute">
            Senaryo
            <select
              id="scenario-select"
              value={scenario}
              onChange={(e) => onScenario(e.target.value as ScenarioId)}
              className="rounded-md border border-line bg-bg px-3 py-2 text-sm font-medium text-ink"
            >
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-1 text-xs font-semibold text-mute">
            <span id="day-label">Gün{date ? ` · ${new Date(`${date}T00:00:00Z`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', timeZone: 'UTC' })}` : ''}</span>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Önceki gün" disabled={day <= 1} onClick={() => onDay(day - 1)}
                className="rounded-md border border-line p-2 enabled:hover:border-accent disabled:opacity-40">
                <ChevronLeft aria-hidden className="size-4" />
              </button>
              <input
                type="range" min={1} max={DAYS} value={day} aria-labelledby="day-label"
                aria-valuetext={`${day}. gün`}
                onChange={(e) => onDay(Number(e.target.value))}
                className="w-36 accent-[#5aa9ff] sm:w-52"
              />
              <button type="button" aria-label="Sonraki gün" disabled={day >= DAYS} onClick={() => onDay(day + 1)}
                className="rounded-md border border-line p-2 enabled:hover:border-accent disabled:opacity-40">
                <ChevronRight aria-hidden className="size-4" />
              </button>
              <span className="w-14 text-sm font-semibold tabular text-ink">{day} / {DAYS}</span>
            </div>
          </div>

          {scenario !== 'baseline' && (
            <label className="flex items-center gap-2 pb-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={compare}
                onChange={(e) => onCompare(e.target.checked)}
                className="size-4 accent-[#5aa9ff]"
              />
              Olaysız durumla karşılaştır
            </label>
          )}

          <button
            type="button"
            onClick={onReset}
            className="mb-0.5 inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-2 text-sm font-semibold hover:border-accent"
          >
            <RotateCcw aria-hidden className="size-4" /> Sıfırla
          </button>
        </div>
        <p className="mt-2 text-xs text-mute">{sc.description}</p>
      </div>
    </header>
  )
}
