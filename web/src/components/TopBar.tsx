import { ChevronLeft, ChevronRight, Presentation, QrCode as QrIcon, RotateCcw } from 'lucide-react'
import { DAYS, SCENARIOS, type ScenarioId } from '../../shared/config.ts'
import { PRIORITY_LABEL } from '../../shared/rules.ts'
import type { Priority, PriorityCounts } from '../../shared/types.ts'
import { dateShort } from '../lib/format.ts'
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
  onQr: () => void
  tally: { confirmed: number; falseAlarm: number }
}

const ORDER: Priority[] = ['critical', 'data_review', 'attention', 'normal']

export function TopBar({
  scenario, onScenario, day, onDay, date, compare, onCompare, onReset, counts, guideOpen, onGuide, onQr, tally,
}: Props) {
  const sc = SCENARIOS.find((s) => s.id === scenario)!
  const reviewed = tally.confirmed + tally.falseAlarm
  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 pt-3 lg:px-6">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-wide">BINBIN</span>
          <span className="truncate text-sm text-mute">Battery Intelligence</span>
          <span className="hidden rounded border border-line px-1.5 py-0.5 text-[11px] font-semibold text-mute sm:inline">
            Sentetik demo
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onQr}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-1.5 text-sm font-semibold hover:border-accent"
          >
            <QrIcon aria-hidden className="size-4" /> <span className="max-sm:sr-only">Hakkımızda</span>
          </button>
          <button
            type="button"
            onClick={onGuide}
            aria-pressed={guideOpen}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-semibold ${
              guideOpen ? 'border-accent bg-accent/20 text-ink' : 'border-accent/60 bg-accent/10 text-ink hover:bg-accent/20'
            }`}
          >
            <Presentation aria-hidden className="size-4" /> <span className="max-sm:sr-only">Sunum rehberi</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-3 lg:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <div className="col-span-2 rounded-lg border border-line bg-card px-3 py-2 sm:col-span-1">
            <div className="text-xs font-semibold text-mute">Filo</div>
            <div className="text-xl font-bold tabular">{counts ? counts.total : '—'}</div>
            {reviewed > 0 && (
              <div className="text-[11px] text-mute tabular" title="Saha geri bildirimi">
                Geri bildirim: {tally.confirmed} doğru · {tally.falseAlarm} yanlış
              </div>
            )}
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
              </div>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-mute">
            <span className="sr-only">Senaryo</span>
            <select
              id="scenario-select"
              value={scenario}
              title={sc.description}
              onChange={(e) => onScenario(e.target.value as ScenarioId)}
              className="rounded-md border border-line bg-bg px-3 py-2 text-sm font-medium text-ink"
            >
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-2">
            <span id="day-label" className="sr-only">Gün</span>
            <button type="button" aria-label="Önceki gün" disabled={day <= 1} onClick={() => onDay(day - 1)}
              className="rounded-md border border-line p-2 enabled:hover:border-accent disabled:opacity-40">
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <input
              type="range" min={1} max={DAYS} value={day} aria-labelledby="day-label"
              aria-valuetext={`${day}. gün`}
              onChange={(e) => onDay(Number(e.target.value))}
              className="w-28 accent-[#5aa9ff] sm:w-48"
            />
            <button type="button" aria-label="Sonraki gün" disabled={day >= DAYS} onClick={() => onDay(day + 1)}
              className="rounded-md border border-line p-2 enabled:hover:border-accent disabled:opacity-40">
              <ChevronRight aria-hidden className="size-4" />
            </button>
            <span className="whitespace-nowrap text-sm font-semibold tabular">
              {day}. gün{date && <span className="font-normal text-mute"> · {dateShort(date)}</span>}
            </span>
          </div>

          {scenario !== 'baseline' && (
            <label className="flex items-center gap-2 text-sm text-ink">
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
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-2 text-sm font-semibold hover:border-accent sm:ml-auto"
          >
            <RotateCcw aria-hidden className="size-4" /> Sıfırla
          </button>
        </div>
      </div>
    </header>
  )
}
