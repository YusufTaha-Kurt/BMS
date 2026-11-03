import {
  CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { useI18n } from '../lib/i18n.tsx'

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

const TICK = { fill: '#a3b3cf', fontSize: 11 }

/** Eksik ölçümler null kalır; çizgi bu noktalarda kesilir (sıfırla doldurulmaz). */
export function MiniChart<T extends object>({
  title, unit, data, xKey, xDomain, xTicks, xFormat, xLabel, series, refs = [], markX,
  yDomain = ['auto', 'auto'], decimals = 1, tickDecimals = 0, height = 170,
}: Props<T>) {
  const { l, f: { num } } = useI18n()
  const fmt = xFormat ?? ((v: number) => String(v))
  return (
    <figure className="rounded-lg border border-line bg-card p-3">
      <figcaption className="mb-1 flex flex-wrap items-baseline justify-between gap-x-3 text-xs">
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
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -8 }}>
            <CartesianGrid stroke="#263a5e" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              type="number"
              domain={xDomain}
              ticks={xTicks}
              tickFormatter={fmt}
              tick={TICK}
              stroke="#263a5e"
              allowDataOverflow
              height={24}
            />
            <YAxis domain={yDomain} tick={TICK} stroke="#263a5e" width={44} tickFormatter={(v: number) => num(v, tickDecimals)} />
            <Tooltip
              contentStyle={{ background: '#0a1224', border: '1px solid #263a5e', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e8eef9' }}
              labelFormatter={(v) => `${xLabel}: ${fmt(Number(v))}`}
              formatter={(v) => (typeof v === 'number' ? `${num(v, decimals)} ${unit}` : l('No measurement', 'Ölçüm yok'))}
              isAnimationActive={false}
            />
            {refs.map((r) => (
              <ReferenceLine key={r.label} y={r.y} stroke={r.color} strokeDasharray="4 3"
                label={{ value: r.label, fill: r.color, fontSize: 10, position: 'insideTopLeft' }} />
            ))}
            {markX !== undefined && <ReferenceLine x={markX} stroke="#5aa9ff" strokeWidth={1.5} />}
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
