import {
  CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { useId } from 'react'
import { useI18n } from '../lib/i18n.tsx'
import { useChartColors } from '../lib/chartColors.ts'

export interface SeriesDef {
  key: string
  label: string
  color: string
  dashed?: boolean
}
export interface RefDef {
  y: number
  label: string
  color: string
}

interface Props<T extends object> {
  title: string
  unit: string
  data: T[]
  xKey: string
  xDomain: [number, number]
  xTicks?: number[]
  xFormat?: (v: number) => string
  xLabel: string
  series: SeriesDef[]
  refs?: RefDef[]
  markX?: number
  yDomain?: [number | 'auto' | 'dataMin' | 'dataMax', number | 'auto' | 'dataMin' | 'dataMax']
  decimals?: number
  tickDecimals?: number
  height?: number
}


/** Eksik ölçümler null kalır; çizgi bu noktalarda kesilir (sıfırla doldurulmaz). */
export function MiniChart<T extends object>({
  title, unit, data, xKey, xDomain, xTicks, xFormat, xLabel, series, refs = [], markX,
  yDomain = ['auto', 'auto'], decimals = 1, tickDecimals = 0, height = 170,
}: Props<T>) {
  const { l, f: { num } } = useI18n()
  const colors = useChartColors()
  const id = useId()
  const values = data.map((item) => (item as Record<string, unknown>)[series[0].key])
  const measured = values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
  const gaps = values.length - measured.length
  const fmt = xFormat ?? ((v: number) => String(v))
  return (
    <figure aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`} className="rounded-lg border border-line bg-card p-3">
      <figcaption id={`${id}-title`} className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 text-xs">
        <span className="font-semibold text-ink">
          {title} <span className="font-normal text-mute">({unit})</span>
        </span>
        {series.length > 1 && <span className="flex flex-wrap gap-x-3 text-mute">
          {series.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1">
              <svg aria-hidden width="16" height="6">
                <line x1="0" y1="3" x2="16" y2="3" stroke={s.color} strokeWidth="2" strokeDasharray={s.dashed ? '3 3' : undefined} />
              </svg>
              {s.label}
            </span>
          ))}
        </span>}
      </figcaption>
      <p id={`${id}-summary`} className="chart-summary text-xs text-mute">
        {measured.length ? l(
          `${xLabel}: ${fmt(xDomain[0])}–${fmt(xDomain[1])}. ${series[0].label}: ${num(Math.min(...measured), decimals)}–${num(Math.max(...measured), decimals)} ${unit}. Missing: ${gaps}/${values.length}.`,
          `${xLabel}: ${fmt(xDomain[0])}–${fmt(xDomain[1])}. ${series[0].label}: ${num(Math.min(...measured), decimals)}–${num(Math.max(...measured), decimals)} ${unit}. Eksik: ${gaps}/${values.length}.`
        ) : l('No measurements.', 'Ölçüm yok.')}
        {refs.length > 0 && ` ${l('Thresholds', 'Eşikler')}: ${refs.map((ref) => `${num(ref.y, decimals)} ${unit}`).join(', ')}.`}
        <span className="sr-only">{series.map((seriesItem) => {
          const points = data.map((item) => (item as Record<string, unknown>)[seriesItem.key]).filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
          return points.length ? ` ${seriesItem.label}: ${l('first recorded', 'ilk kayıt')} ${num(points[0], decimals)} ${unit}; ${l('last recorded', 'son kayıt')} ${num(points[points.length - 1], decimals)} ${unit}; ${l('missing', 'eksik')} ${data.length - points.length}/${data.length}.` : ` ${seriesItem.label}: ${l('No measurements.', 'Ölçüm yok.')}`
        }).join('')}</span>
      </p>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`} data={data} margin={{ top: 6, right: 8, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              type="number"
              domain={xDomain}
              ticks={xTicks}
              tickFormatter={fmt}
              tick={{ fill: colors.tick, fontSize: 12 }}
              stroke={colors.grid}
              allowDataOverflow
              height={24}
            />
            <YAxis domain={yDomain} tick={{ fill: colors.tick, fontSize: 12 }} stroke={colors.grid} width={44} tickFormatter={(v: number) => num(v, tickDecimals)} />
            <Tooltip
              contentStyle={{ background: colors.tooltipBg, border: `1px solid ${colors.grid}`, borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: colors.tooltipInk }}
              labelFormatter={(v) => `${xLabel}: ${fmt(Number(v))}`}
              formatter={(v) => (typeof v === 'number' ? `${num(v, decimals)} ${unit}` : l('No measurement', 'Ölçüm yok'))}
              isAnimationActive={false}
            />
            {refs.map((r) => (
              <ReferenceLine key={r.label} y={r.y} stroke={r.color} strokeDasharray="4 3"
                label={{ value: r.label, fill: r.color, fontSize: 12, position: 'insideTopLeft' }} />
            ))}
            {markX !== undefined && <ReferenceLine x={markX} stroke={colors.main} strokeWidth={1.5} />}
            {series.map((s) => (
              <Line
                key={s.key}
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={s.dashed ? 1.5 : 2}
                strokeDasharray={s.dashed ? '5 4' : undefined}
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  )
}
