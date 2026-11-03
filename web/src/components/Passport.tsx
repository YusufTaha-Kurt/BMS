import { BadgeCheck, FileClock, Fingerprint, Leaf } from 'lucide-react'
import type { ReactNode } from 'react'
import { CARBON, DEMO_RULES as R } from '../../shared/config.ts'
import { PRIORITY_LABEL } from '../../shared/rules.ts'
import type { DayRecord, HistoryFile } from '../../shared/types.ts'
import { dateShort, dateTr, num, pct } from '../lib/format.ts'
import { PRIORITY_STYLE } from '../lib/status.ts'

interface Props {
  history: HistoryFile
  day: number
}

/** Seçilen güne kadar öncelik değişimlerini denetlenebilir olay kaydına çevirir. */
function eventsOf(days: DayRecord[], upTo: number) {
  const out: { date: string; label: string; signal: string; priority: DayRecord['priority'] }[] = []
  let prev: DayRecord['priority'] | null = null
  for (const d of days.slice(0, upTo)) {
    if (d.priority !== prev) {
      out.push({ date: d.date, label: PRIORITY_LABEL[d.priority], signal: d.signal, priority: d.priority })
      prev = d.priority
    }
  }
  return out.reverse()
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-line/60 py-1 last:border-0">
      <dt className="text-mute">{k}</dt>
      <dd className="text-right font-medium tabular">{v}</dd>
    </div>
  )
}

function Box({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card p-3">
      <h4 className="mb-1.5 flex items-center gap-1.5 font-semibold">{icon}{title}</h4>
      {children}
    </div>
  )
}

export function Passport({ history, day }: Props) {
  const { profile, days, batteryId } = history
  const cur = days[day - 1]
  const events = eventsOf(days, day)
  const kwh = days.slice(0, day).reduce((a, d) => a + d.chargeWh, 0) / 1000 / CARBON.chargerEfficiency
  const co2 = kwh * CARBON.gridFactorKgPerKwh
  const lifecycle =
    cur.priority === 'critical' ? 'Teknik inceleme önerildi' : cur.soh < R.sohAttentionPct ? 'Değerlendirme adayı' : 'Aktif kullanım'

  return (
    <section id="passport" aria-labelledby="passport-title">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <h3 id="passport-title" className="flex items-center gap-1.5 text-sm font-bold">
          <Fingerprint aria-hidden className="size-4 text-accent" /> Dijital Batarya Pasaportu
        </h3>
        <span className="rounded border border-line px-1.5 py-0.5 text-[11px] text-mute" title="Regulation (EU) 2023/1542 hazırlık görünümü · sentetik kayıt">
          AB 2023/1542 · sentetik
        </span>
      </div>

      <div className="grid gap-2.5 text-xs md:grid-cols-2">
        <Box icon={<Fingerprint aria-hidden className="size-3.5" />} title="Kimlik">
          <dl>
            <Row k="Seri no" v={profile.serial} />
            <Row k="Model" v={`${profile.model} · ${profile.chemistry}`} />
            <Row k="Nominal" v={`${num(profile.nominalV)} V · ${profile.nominalAh} Ah`} />
            <Row k="Hizmete giriş" v={dateTr(profile.commissioned)} />
          </dl>
        </Box>

        <Box icon={<BadgeCheck aria-hidden className="size-3.5" />} title="Sağlık">
          <dl>
            <Row k="SOH (model, simüle)" v={pct(cur.soh)} />
            <Row k="İç direnç" v={cur.rMohm === null ? 'Ölçüm yok' : `${cur.rMohm} mΩ`} />
            <Row k="BMS SOH" v="Pilotta" />
            <Row k="Durum" v={lifecycle} />
          </dl>
        </Box>

        <Box icon={<FileClock aria-hidden className="size-3.5" />} title={`Olay kaydı · ${batteryId}`}>
          <ol className="space-y-1">
            {events.slice(0, 4).map((e) => (
              <li key={e.date} className="flex items-start gap-2">
                <span className="w-12 shrink-0 tabular text-mute">{dateShort(e.date)}</span>
                <span>
                  <span className={`font-semibold ${PRIORITY_STYLE[e.priority].text}`}>{e.label}</span>
                  {e.priority !== 'normal' && <span className="text-mute"> · {e.signal}</span>}
                </span>
              </li>
            ))}
          </ol>
        </Box>

        <Box icon={<Leaf aria-hidden className="size-3.5 text-ok" />} title="Operasyonel karbon">
          <dl>
            <Row k={`Enerji (1–${day}. gün)`} v={`${num(kwh, 1)} kWh`} />
            <Row k="Emisyon" v={`${num(co2, 1)} kg CO₂e`} />
          </dl>
          <p className="mt-1.5 text-mute">Demo faktörü {num(CARBON.gridFactorKgPerKwh, 2)} kg/kWh.</p>
        </Box>
      </div>
    </section>
  )
}
