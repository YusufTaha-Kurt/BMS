import { ChevronLeft, ChevronRight, Search, SearchX } from 'lucide-react'
import type { FleetRow, Priority } from '../../shared/types.ts'
import type { JsonState } from '../lib/loadJson.ts'
import { useI18n } from '../lib/i18n.tsx'
import { explain } from '../lib/explain.ts'
import { levelSoh, PRIORITY_STYLE } from '../lib/status.ts'
import { PriorityBadge } from './Badges.tsx'
import { ErrorBox } from './StateBox.tsx'

export const PAGE_SIZE = 15
export type Filter = 'all' | Priority
const FILTERS: Filter[] = ['all', 'critical', 'data_review', 'attention', 'normal']

interface Props {
  rows: JsonState<FleetRow[]> & { reload: () => void }
  query: string
  onQuery: (q: string) => void
  filter: Filter
  onFilter: (f: Filter) => void
  page: number
  onPage: (p: number) => void
  selectedId: string
  onSelect: (id: string) => void
}

export function FleetList({ rows, query, onQuery, filter, onFilter, page, onPage, selectedId, onSelect }: Props) {
  const { language, l, f: { pct }, priorityLabel } = useI18n()
  const all = rows.status === 'ok' ? rows.data.map((row) => explain(row, language)) : []
  const q = query.trim().toLowerCase()
  const filtered = all.filter((r) => (filter === 'all' || r.priority === filter) && (!q || r.id.toLowerCase().includes(q)))
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const cur = Math.min(page, pages)
  const slice = filtered.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)

  return (
    <section aria-labelledby="list-title" className="flex min-w-0 flex-col rounded-xl border border-line bg-panel">
      <div className="border-b border-line p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 id="list-title" tabIndex={-1} className="text-lg font-bold">{l('Maintenance priorities', 'Bakım öncelik listesi')}</h2>
          <span className="text-xs text-mute tabular" aria-live="polite">
            {rows.status === 'ok' ? (filtered.length === all.length ? l(`${all.length} batteries`, `${all.length} batarya`) : `${filtered.length} / ${all.length}`) : ''}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="relative min-w-40 flex-1">
            <span className="sr-only">{l('Search battery ID', 'Batarya kimliği ara')}</span>
            <Search aria-hidden className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-mute" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={l('Search batteries', 'Batarya ara')}
              className="w-full rounded-md border border-line bg-bg py-2 pl-8 pr-3 text-sm placeholder:text-mute"
            />
          </label>
        </div>
        <div role="group" aria-label={l('Priority filter', 'Öncelik filtresi')} className="mt-2 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => onFilter(f)}
              className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
                filter === f ? 'border-accent bg-accent/15 text-ink' : 'border-line text-mute hover:text-ink'
              }`}
            >
              {f === 'all' ? l('All', 'Tümü') : priorityLabel(f)}
            </button>
          ))}
        </div>
      </div>

      {rows.status === 'error' && (
        <ErrorBox className="m-4" error={rows.error} what={l('Fleet summary', 'Filo özeti')} onRetry={rows.reload} />
      )}

      {rows.status !== 'error' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm max-sm:block">
            <thead className="max-sm:sr-only">
              <tr className="text-xs uppercase tracking-wide text-mute">
                <th scope="col" className="py-2 pl-4 pr-2 font-semibold">{l('Battery', 'Batarya')}</th>
                <th scope="col" className="px-2 py-2 font-semibold">SOH</th>
                <th scope="col" className="px-2 py-2 font-semibold">{l('Priority', 'Öncelik')}</th>
                <th scope="col" className="py-2 pl-2 pr-4 font-semibold">{l('Signal', 'Sinyal')}</th>
              </tr>
            </thead>
            <tbody className="max-sm:block">
              {rows.status !== 'ok' &&
                Array.from({ length: 8 }, (_, i) => (
                  <tr key={i} className="border-t border-line">
                    <td colSpan={4} className="px-4 py-3.5">
                      <div className="h-4 animate-pulse rounded bg-card" />
                    </td>
                  </tr>
                ))}
              {rows.status === 'ok' &&
                slice.map((r) => {
                  const sel = r.id === selectedId
                  const st = PRIORITY_STYLE[r.priority]
                  return (
                    <tr
                      key={r.id}
                      onClick={() => onSelect(r.id)}
                      aria-current={sel ? 'true' : undefined}
                      className={`cursor-pointer border-t border-line hover:bg-card max-sm:grid max-sm:grid-cols-[1fr_auto_auto] max-sm:items-center max-[400px]:grid-cols-[1fr_auto] ${sel ? 'bg-card' : ''}`}
                    >
                      <td className={`border-l-4 py-2.5 pl-3 pr-2 ${sel ? 'border-accent' : st.edge}`}>
                        <button
                          type="button"
                          data-battery-id={r.id}
                          onClick={(e) => { e.stopPropagation(); onSelect(r.id) }}
                          className="whitespace-nowrap font-semibold tabular text-ink underline-offset-2 hover:underline"
                        >
                          {r.id}
                        </button>
                      </td>
                      <td className={`px-2 py-2.5 tabular ${levelSoh(r.soh) === 'warning' ? 'text-warn' : ''}`}>{pct(r.soh)}</td>
                      <td className="px-2 py-2.5 max-[400px]:col-span-2 max-[400px]:pl-4 max-[400px]:pt-0"><PriorityBadge priority={r.priority} /></td>
                      <td className="py-2.5 pl-2 pr-4 text-mute max-sm:col-span-3 max-sm:pt-0 max-sm:pl-4 max-[400px]:col-span-2">{r.signal}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          {rows.status === 'ok' && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-mute">
              <SearchX aria-hidden className="size-6" />
              <p>
                {query ? l(`No results for “${query}”.`, `“${query}” için sonuç yok.`) : l('No batteries match this filter.', 'Bu filtreyle eşleşen batarya yok.')} {l('Change your search or filter.', 'Aramayı veya filtreyi değiştirin.')}
              </p>
              <button
                type="button"
                onClick={() => { onQuery(''); onFilter('all') }}
                className="rounded-md border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent"
              >
                {l('Clear filters', 'Filtreleri temizle')}
              </button>
            </div>
          )}
        </div>
      )}

      {rows.status === 'ok' && filtered.length > 0 && (
        <nav aria-label={l('Pagination', 'Sayfalama')} className="mt-auto flex items-center justify-between border-t border-line px-4 py-2.5 text-xs text-mute">
          <span className="tabular">{l('Page', 'Sayfa')} {cur} / {pages}</span>
          <span className="flex gap-1.5">
            <button type="button" aria-label={l('Previous page', 'Önceki sayfa')} disabled={cur <= 1} onClick={() => onPage(cur - 1)}
              className="rounded-md border border-line p-1.5 enabled:hover:border-accent disabled:opacity-40">
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <button type="button" aria-label={l('Next page', 'Sonraki sayfa')} disabled={cur >= pages} onClick={() => onPage(cur + 1)}
              className="rounded-md border border-line p-1.5 enabled:hover:border-accent disabled:opacity-40">
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </span>
        </nav>
      )}
    </section>
  )
}
